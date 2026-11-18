import dns from "node:dns";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import zlib from "node:zlib";

/**
 * Website audit: fetches a visitor-supplied homepage and runs ~25 checks on
 * speed, search visibility, conversion and trust. It reads the page the way a
 * crawler does (HTML and headers only, no JavaScript execution), so it says so
 * in the report instead of claiming Lighthouse-grade numbers.
 *
 * Because the URL is supplied by an anonymous visitor, fetching it is an SSRF
 * risk. Defences: http(s) only, default ports only, no IP literals or
 * single-label hosts, every resolved address is checked at connect time (so DNS
 * rebinding cannot swap in a private address), every redirect hop is
 * re-validated, and response size and time are capped.
 */

export type CheckStatus = "pass" | "warn" | "fail";
export type CheckCategory = "speed" | "seo" | "conversion" | "trust";

export type AuditCheck = {
  id: string;
  category: CheckCategory;
  label: string;
  status: CheckStatus;
  detail: string;
  fix?: string;
  weight: 1 | 2 | 3;
};

export type AuditCategory = {
  id: CheckCategory;
  label: string;
  score: number;
  checks: AuditCheck[];
};

export type AuditReport = {
  url: string;
  finalUrl: string;
  checkedAt: string;
  score: number;
  verdict: string;
  categories: AuditCategory[];
  topFixes: AuditCheck[];
  limitations: string[];
};

export class AuditError extends Error {
  constructor(
    public code: "invalid_url" | "unreachable" | "blocked" | "not_html",
    message: string
  ) {
    super(message);
  }
}

// ─── SSRF guards ────────────────────────────────────────

function isPrivateIPv4(ip: string): boolean {
  const [a, b, c] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

export function isPrivateIP(ip: string): boolean {
  if (net.isIPv4(ip)) return isPrivateIPv4(ip);
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === "::" || v === "::1") return true;
    // IPv4-mapped / NAT64 / unique-local / link-local / documentation / discard
    return (
      v.startsWith("::ffff:") ||
      v.startsWith("64:ff9b:") ||
      v.startsWith("100:") ||
      /^f[cd]/.test(v) ||
      /^fe[89ab]/.test(v) ||
      v.startsWith("2001:db8") ||
      v.startsWith("ff")
    );
  }
  return true;
}

/** Returns a safe, normalised URL or null. Adds https:// when no scheme is given. */
export function normalizeAuditUrl(input: string): URL | null {
  let raw = (input || "").trim();
  if (!raw || raw.length > 300) return null;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.username || url.password) return null;
  if (url.port && url.port !== "80" && url.port !== "443") return null;
  const host = url.hostname.toLowerCase();
  if (
    host.startsWith("[") ||
    net.isIP(host) ||
    !host.includes(".") ||
    host === "localhost" ||
    /\.(local|localhost|internal|lan|home|corp|test|invalid|example)$/.test(host)
  ) {
    return null;
  }
  url.hash = "";
  return url;
}

const guardedLookup: net.LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 4);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((entry) => isPrivateIP(entry.address))) {
      return callback(new Error("blocked_address") as NodeJS.ErrnoException, "", 4);
    }
    if (options.all) return callback(null, list);
    return callback(null, list[0].address, list[0].family);
  });
};

// ─── HTTP fetch with caps ───────────────────────────────

type RawResponse = {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
  ttfbMs: number;
  transferredBytes: number;
  htmlBytes: number;
  encoding: string;
  truncated: boolean;
};

const USER_AGENT = "NeoKlynAudit/1.0 (+https://neoklyn.com/website-audit)";

function requestOnce(url: URL, opts: { maxBytes: number; timeoutMs: number; readBody: boolean }): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const started = Date.now();
    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const req = lib.request(
      url,
      {
        method: "GET",
        lookup: guardedLookup,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5",
          "Accept-Encoding": "gzip, br",
        },
      },
      (res) => {
        const ttfbMs = Date.now() - started;
        const status = res.statusCode || 0;
        const encoding = String(res.headers["content-encoding"] || "").toLowerCase();
        const contentType = String(res.headers["content-type"] || "").toLowerCase();
        let transferredBytes = 0;
        res.on("data", (chunk: Buffer) => {
          transferredBytes += chunk.length;
        });

        const build = (chunks: Buffer[], truncated: boolean): RawResponse => {
          const buffer = Buffer.concat(chunks);
          return {
            status,
            headers: res.headers,
            body: buffer.toString("utf8"),
            ttfbMs,
            transferredBytes,
            htmlBytes: buffer.length,
            encoding,
            truncated,
          };
        };

        const isRedirect = status >= 300 && status < 400;
        const textual = /text\/|xml|json/.test(contentType) || contentType === "";
        if (!opts.readBody || isRedirect || !textual) {
          res.destroy();
          return finish(() => resolve(build([], false)));
        }

        let stream: NodeJS.ReadableStream = res;
        if (encoding === "gzip") stream = res.pipe(zlib.createGunzip());
        else if (encoding === "br") stream = res.pipe(zlib.createBrotliDecompress());
        else if (encoding === "deflate") stream = res.pipe(zlib.createInflate());

        const chunks: Buffer[] = [];
        let size = 0;
        stream.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > opts.maxBytes) {
            req.destroy();
            return finish(() => resolve(build(chunks, true)));
          }
          chunks.push(chunk);
        });
        stream.on("end", () => finish(() => resolve(build(chunks, false))));
        stream.on("error", () => finish(() => resolve(build(chunks, true))));
      }
    );

    const timer = setTimeout(() => {
      req.destroy();
      finish(() => reject(new AuditError("unreachable", "The site took too long to respond.")));
    }, opts.timeoutMs);

    req.on("error", (err) => {
      finish(() => {
        if (err.message === "blocked_address") reject(new AuditError("blocked", "That address can't be audited."));
        else reject(new AuditError("unreachable", "We couldn't reach that website."));
      });
    });
    req.end();
  });
}

async function fetchFollowing(
  start: URL,
  opts: { maxBytes: number; timeoutMs: number; readBody?: boolean }
): Promise<RawResponse & { finalUrl: URL; hops: number }> {
  let current = start;
  for (let hop = 0; hop <= 5; hop++) {
    const res = await requestOnce(current, { ...opts, readBody: opts.readBody ?? true });
    const location = res.headers.location;
    if (res.status >= 300 && res.status < 400 && location) {
      const next = normalizeAuditUrl(new URL(location, current).toString());
      if (!next) throw new AuditError("blocked", "The site redirects somewhere we can't audit.");
      current = next;
      continue;
    }
    return { ...res, finalUrl: current, hops: hop };
  }
  throw new AuditError("unreachable", "The site redirects too many times.");
}

// ─── HTML helpers (regex based, no dependencies) ────────

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  const inner = tag.replace(/^<\w+/, "").replace(/\/?>$/, "");
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner))) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

function decode(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tagsOf(html: string, name: string): string[] {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
}

function metaContent(metas: Record<string, string>[], key: string): string | undefined {
  const hit = metas.find((m) => (m.name || m.property || "").toLowerCase() === key);
  return hit?.content?.trim() || undefined;
}

const CTA_WORDS =
  /\b(contact|book|get (a )?(free )?(quote|started|estimate|consultation)|call (us|now)|enquir|inquir|appointment|schedule|request|talk to|whatsapp|buy now|order now|start (a )?project)\b/i;

// ─── Analysis ───────────────────────────────────────────

function analyse(args: {
  page: RawResponse & { finalUrl: URL; hops: number };
  httpRedirectsToHttps: boolean | null;
  hasRobots: boolean;
  hasSitemap: boolean;
}): AuditCheck[] {
  const { page, hasRobots, hasSitemap, httpRedirectsToHttps } = args;
  const html = page.body;
  const headers = page.headers;
  const checks: AuditCheck[] = [];
  const add = (c: AuditCheck) => checks.push(c);

  const metas = tagsOf(html, "meta").map(parseAttrs);
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<[^>]+>/g, ""));
  const description = metaContent(metas, "description") || "";
  const viewport = metaContent(metas, "viewport") || "";
  const robotsMeta = (metaContent(metas, "robots") || "").toLowerCase();
  const xRobots = String(headers["x-robots-tag"] || "").toLowerCase();
  const h1s = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || []).filter((h) => decode(h.replace(/<[^>]+>/g, "")).length > 0);
  const images = tagsOf(html, "img").map(parseAttrs);
  const scripts = tagsOf(html, "script").map(parseAttrs);
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({
    attrs: parseAttrs(`<a ${m[1]}>`),
    text: decode(m[2].replace(/<[^>]+>/g, " ")),
  }));
  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, " ")));
  const visibleText = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
  const words = visibleText ? visibleText.split(" ").length : 0;
  const isHttps = page.finalUrl.protocol === "https:";

  // — Speed & mobile —
  const ttfb = page.ttfbMs;
  add({
    id: "response-time",
    category: "speed",
    label: "Server response time",
    weight: 3,
    status: ttfb < 600 ? "pass" : ttfb < 1500 ? "warn" : "fail",
    detail: `The server started responding after about ${ttfb} ms (measured from our server, including connection setup).`,
    fix: "Slow responses usually come from cheap shared hosting, no caching, or heavy plugins. Better hosting, page caching and a CDN typically cut this sharply.",
  });
  add({
    id: "viewport",
    category: "speed",
    label: "Mobile-friendly viewport",
    weight: 3,
    status: /width\s*=\s*device-width/i.test(viewport) ? "pass" : "fail",
    detail: viewport ? `Viewport tag found: "${viewport}".` : "No viewport tag found, so phones show a shrunken desktop page.",
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and make sure the layout is responsive. Most of your visitors are on phones.',
  });
  const compressed = ["gzip", "br", "deflate"].includes(page.encoding);
  add({
    id: "compression",
    category: "speed",
    label: "Text compression",
    weight: 2,
    status: compressed ? "pass" : "fail",
    detail: compressed ? `Page is served compressed (${page.encoding}).` : "The page is sent uncompressed, so every visitor downloads more than needed.",
    fix: "Turn on gzip or Brotli compression on your server or CDN. It usually takes a few minutes and cuts page size by 60-80%.",
  });
  const htmlKb = Math.round(page.htmlBytes / 1024);
  add({
    id: "html-size",
    category: "speed",
    label: "Page HTML size",
    weight: 1,
    status: page.truncated || htmlKb > 400 ? "fail" : htmlKb > 150 ? "warn" : "pass",
    detail: page.truncated ? "The HTML is over 1.5 MB, which is very heavy." : `The HTML is about ${htmlKb} KB uncompressed.`,
    fix: "Large HTML usually means inline data or page-builder bloat. Trim unused sections and move scripts and styles into cached files.",
  });
  const externalScripts = scripts.filter((s) => s.src).length;
  add({
    id: "script-count",
    category: "speed",
    label: "Number of scripts",
    weight: 2,
    status: externalScripts <= 15 ? "pass" : externalScripts <= 30 ? "warn" : "fail",
    detail: `${externalScripts} external scripts load on the homepage.`,
    fix: "Remove plugins and trackers you don't use, and load the rest after the page appears. Each script slows phones down.",
  });
  if (images.length) {
    const noDims = images.filter((i) => !(i.width && i.height)).length;
    const share = noDims / images.length;
    add({
      id: "image-dimensions",
      category: "speed",
      label: "Image sizes declared",
      weight: 1,
      status: share <= 0.2 ? "pass" : share <= 0.6 ? "warn" : "fail",
      detail: `${noDims} of ${images.length} images have no width and height, which makes the page jump while it loads.`,
      fix: "Set width and height on images (or use your framework's image component) so the layout doesn't shift.",
    });
    const lazy = images.filter((i) => (i.loading || "").toLowerCase() === "lazy").length;
    add({
      id: "image-lazy",
      category: "speed",
      label: "Lazy-loaded images",
      weight: 1,
      status: images.length <= 6 || lazy > 0 ? "pass" : "warn",
      detail: images.length <= 6 ? `Only ${images.length} images on the page.` : `${lazy} of ${images.length} images load lazily.`,
      fix: 'Add loading="lazy" to images below the first screen so the top of the page appears faster.',
    });
  }

  // — Search visibility —
  const indexable = !/noindex/.test(robotsMeta) && !/noindex/.test(xRobots);
  add({
    id: "indexable",
    category: "seo",
    label: "Allowed to appear in Google",
    weight: 3,
    status: indexable ? "pass" : "fail",
    detail: indexable ? "No noindex instruction found." : "The page tells search engines not to index it (noindex).",
    fix: "Remove the noindex tag or header. A leftover 'discourage search engines' setting from development is a common cause.",
  });
  add({
    id: "title",
    category: "seo",
    label: "Page title",
    weight: 3,
    status: !title ? "fail" : title.length >= 25 && title.length <= 65 ? "pass" : "warn",
    detail: title ? `"${title.slice(0, 90)}" (${title.length} characters).` : "No page title found.",
    fix: "Write a title of 30-60 characters with what you do, where, and your name, e.g. 'Dental Clinic in Madurai | Smile Care'.",
  });
  add({
    id: "meta-description",
    category: "seo",
    label: "Meta description",
    weight: 2,
    status: !description ? "fail" : description.length >= 70 && description.length <= 165 ? "pass" : "warn",
    detail: description ? `${description.length} characters.` : "No meta description found, so Google picks random text for your search listing.",
    fix: "Write a 120-160 character summary that tells searchers why to click, including one benefit and a call to action.",
  });
  add({
    id: "h1",
    category: "seo",
    label: "One main heading (H1)",
    weight: 2,
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    detail: h1s.length === 0 ? "No H1 heading found." : h1s.length === 1 ? "Exactly one H1, as expected." : `${h1s.length} H1 headings found; one is clearer for search engines.`,
    fix: "Use a single H1 that states what the business does and who it's for, and use H2/H3 for the rest.",
  });
  const canonical = tagsOf(html, "link").map(parseAttrs).some((l) => (l.rel || "").toLowerCase() === "canonical" && l.href);
  add({
    id: "canonical",
    category: "seo",
    label: "Canonical link",
    weight: 1,
    status: canonical ? "pass" : "warn",
    detail: canonical ? "A canonical link is set." : "No canonical link, which can cause duplicate-page issues (www vs non-www, tracking URLs).",
    fix: 'Add <link rel="canonical" href="https://yourdomain.com/"> to the head of each page.',
  });
  add({
    id: "robots-sitemap",
    category: "seo",
    label: "robots.txt and sitemap",
    weight: 1,
    status: hasRobots && hasSitemap ? "pass" : hasRobots || hasSitemap ? "warn" : "fail",
    detail: `robots.txt: ${hasRobots ? "found" : "missing"}. sitemap.xml: ${hasSitemap ? "found" : "missing"}.`,
    fix: "Publish /robots.txt and /sitemap.xml and submit the sitemap in Google Search Console so new pages are found faster.",
  });
  const ogOk = !!metaContent(metas, "og:title") && !!metaContent(metas, "og:image");
  add({
    id: "open-graph",
    category: "seo",
    label: "Link preview (Open Graph)",
    weight: 1,
    status: ogOk ? "pass" : "warn",
    detail: ogOk ? "Shared links show a title and image." : "Missing og:title or og:image, so links shared on WhatsApp, LinkedIn and Facebook look plain.",
    fix: "Add Open Graph title, description and a 1200x630 image. It makes shared links far more clickable.",
  });
  const hasSchema = scripts.some((s) => (s.type || "").toLowerCase() === "application/ld+json");
  add({
    id: "structured-data",
    category: "seo",
    label: "Structured data",
    weight: 1,
    status: hasSchema ? "pass" : "warn",
    detail: hasSchema ? "Structured data (JSON-LD) found." : "No structured data, so you miss rich results such as business info and FAQs.",
    fix: "Add LocalBusiness or Organization JSON-LD with your name, address, phone and opening hours.",
  });
  if (images.length) {
    const noAlt = images.filter((i) => i.alt === undefined).length;
    const share = noAlt / images.length;
    add({
      id: "image-alt",
      category: "seo",
      label: "Image descriptions (alt text)",
      weight: 1,
      status: share === 0 ? "pass" : share <= 0.3 ? "warn" : "fail",
      detail: `${noAlt} of ${images.length} images have no alt text.`,
      fix: "Add short, specific alt text to meaningful images. It helps accessibility and image search.",
    });
  }
  add({
    id: "readable-without-js",
    category: "seo",
    label: "Content visible without JavaScript",
    weight: 2,
    status: words >= 150 ? "pass" : words >= 60 ? "warn" : "fail",
    detail: `About ${words} words of text are in the page's HTML.`,
    fix: "If the page is built entirely with JavaScript, search engines may see little. Render the main content on the server.",
  });

  // — Turning visitors into enquiries —
  const tel = anchors.filter((a) => (a.attrs.href || "").toLowerCase().startsWith("tel:")).length;
  const wa = anchors.filter((a) => /wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i.test(a.attrs.href || "")).length;
  const mail = anchors.filter((a) => (a.attrs.href || "").toLowerCase().startsWith("mailto:")).length;
  const forms = (html.match(/<form\b/gi) || []).length;
  const reach = tel + wa + mail + forms;
  add({
    id: "contact-route",
    category: "conversion",
    label: "Easy ways to contact you",
    weight: 3,
    status: reach >= 2 ? "pass" : reach === 1 ? "warn" : "fail",
    detail: `Found: ${tel} tap-to-call, ${wa} WhatsApp, ${mail} email link${mail === 1 ? "" : "s"}, ${forms} form${forms === 1 ? "" : "s"} on the homepage.`,
    fix: "Put a tap-to-call number, a WhatsApp button and a short enquiry form on the homepage. Visitors who have to hunt for contact details leave.",
  });
  add({
    id: "tap-to-call",
    category: "conversion",
    label: "Tap-to-call or WhatsApp on mobile",
    weight: 2,
    status: tel + wa > 0 ? "pass" : "fail",
    detail: tel + wa > 0 ? "A direct call or WhatsApp link is present." : "No tap-to-call or WhatsApp link, which most local customers prefer.",
    fix: "Add a sticky call or WhatsApp button on mobile. It is often the highest-converting element on a small-business site.",
  });
  const ctaCount =
    anchors.filter((a) => CTA_WORDS.test(a.text)).length + buttons.filter((b) => CTA_WORDS.test(b)).length;
  add({
    id: "clear-cta",
    category: "conversion",
    label: "Clear call to action",
    weight: 3,
    status: ctaCount >= 2 ? "pass" : ctaCount === 1 ? "warn" : "fail",
    detail: ctaCount ? `${ctaCount} contact, booking or quote buttons/links found.` : "No obvious 'contact', 'book' or 'get a quote' button found.",
    fix: "Add one primary button near the top (for example 'Book a free consultation') and repeat it further down the page.",
  });
  add({
    id: "form-present",
    category: "conversion",
    label: "Enquiry form",
    weight: 1,
    status: forms > 0 ? "pass" : "warn",
    detail: forms > 0 ? "An enquiry form was found." : "No form on the homepage. Many visitors prefer writing to calling.",
    fix: "Add a short form (name, phone or email, message). Fewer fields means more enquiries.",
  });

  // — Trust & security —
  add({
    id: "https",
    category: "trust",
    label: "Secure connection (HTTPS)",
    weight: 3,
    status: isHttps ? "pass" : "fail",
    detail: isHttps ? "The site loads over HTTPS." : "The site loads over plain HTTP. Browsers label it 'Not secure'.",
    fix: "Install a free SSL certificate (Let's Encrypt) and redirect all HTTP traffic to HTTPS.",
  });
  if (httpRedirectsToHttps !== null) {
    add({
      id: "http-redirect",
      category: "trust",
      label: "HTTP redirects to HTTPS",
      weight: 1,
      status: httpRedirectsToHttps ? "pass" : "warn",
      detail: httpRedirectsToHttps ? "Visitors who type http:// are sent to the secure version." : "The http:// version doesn't redirect to https://.",
      fix: "Add a permanent (301) redirect from http to https in your hosting settings.",
    });
  }
  add({
    id: "hsts",
    category: "trust",
    label: "HSTS header",
    weight: 1,
    status: headers["strict-transport-security"] ? "pass" : "warn",
    detail: headers["strict-transport-security"] ? "Strict-Transport-Security is set." : "No Strict-Transport-Security header.",
    fix: "Add 'Strict-Transport-Security: max-age=31536000' once HTTPS works everywhere.",
  });
  const secHeaders = [
    headers["x-content-type-options"],
    headers["x-frame-options"] || /frame-ancestors/i.test(String(headers["content-security-policy"] || "")),
    headers["referrer-policy"],
  ].filter(Boolean).length;
  add({
    id: "security-headers",
    category: "trust",
    label: "Basic security headers",
    weight: 1,
    status: secHeaders >= 2 ? "pass" : secHeaders === 1 ? "warn" : "fail",
    detail: `${secHeaders} of 3 common headers set (X-Content-Type-Options, clickjacking protection, Referrer-Policy).`,
    fix: "Add these headers in your server or hosting config. They are quick wins that protect visitors.",
  });
  const privacy = anchors.some((a) => /privacy/i.test(a.attrs.href || "") || /privacy/i.test(a.text));
  add({
    id: "privacy-link",
    category: "trust",
    label: "Privacy policy link",
    weight: 1,
    status: privacy ? "pass" : "warn",
    detail: privacy ? "A privacy policy link was found." : "No privacy policy link. It is expected wherever you collect enquiries and increasingly required.",
    fix: "Publish a short privacy policy and link it from the footer and next to any form.",
  });
  const favicon = tagsOf(html, "link").map(parseAttrs).some((l) => /icon/i.test(l.rel || ""));
  add({
    id: "favicon",
    category: "trust",
    label: "Favicon",
    weight: 1,
    status: favicon ? "pass" : "warn",
    detail: favicon ? "A favicon is set." : "No favicon, so browser tabs and Google results look unfinished.",
    fix: "Add a square logo icon as a favicon.",
  });

  return checks;
}

const CATEGORY_LABELS: Record<CheckCategory, string> = {
  speed: "Speed & mobile",
  seo: "Search visibility",
  conversion: "Turning visitors into enquiries",
  trust: "Trust & security",
};

function scoreOf(checks: AuditCheck[]): number {
  const total = checks.reduce((sum, c) => sum + c.weight, 0);
  if (!total) return 0;
  const earned = checks.reduce((sum, c) => sum + c.weight * (c.status === "pass" ? 1 : c.status === "warn" ? 0.5 : 0), 0);
  return Math.round((earned / total) * 100);
}

function verdictFor(score: number): string {
  if (score >= 85) return "Strong foundation. A few fixes would polish it.";
  if (score >= 70) return "Good base, with gaps that are likely costing you enquiries.";
  if (score >= 50) return "Needs work. Several issues are holding back traffic and enquiries.";
  return "Serious gaps. This site is probably losing most of its potential customers.";
}

export async function runWebsiteAudit(input: string): Promise<AuditReport> {
  const start = normalizeAuditUrl(input);
  if (!start) throw new AuditError("invalid_url", "Enter a valid website address, like yourbusiness.com.");

  const page = await fetchFollowing(start, { maxBytes: 1_500_000, timeoutMs: 12_000 });
  if (page.status >= 400) {
    throw new AuditError("unreachable", `The site returned an error (HTTP ${page.status}).`);
  }
  const contentType = String(page.headers["content-type"] || "").toLowerCase();
  if (contentType && !contentType.includes("html")) {
    throw new AuditError("not_html", "That address doesn't return a web page.");
  }

  const origin = page.finalUrl.origin;
  const small = { maxBytes: 200_000, timeoutMs: 5_000 };
  const [robots, sitemap, httpCheck] = await Promise.all([
    fetchFollowing(new URL("/robots.txt", origin), small).catch(() => null),
    fetchFollowing(new URL("/sitemap.xml", origin), small).catch(() => null),
    page.finalUrl.protocol === "https:"
      ? requestOnce(new URL(`http://${page.finalUrl.host}/`), { maxBytes: 1_000, timeoutMs: 5_000, readBody: false })
          .then((r) => (r.status >= 300 && r.status < 400 ? /^https:/i.test(String(r.headers.location || "")) : r.status < 300 ? false : null))
          .catch(() => null)
      : Promise.resolve(null),
  ]);

  const checks = analyse({
    page,
    hasRobots: !!robots && robots.status === 200 && /user-agent|disallow|sitemap/i.test(robots.body),
    hasSitemap: !!sitemap && sitemap.status === 200 && /<urlset|<sitemapindex/i.test(sitemap.body),
    httpRedirectsToHttps: httpCheck,
  });

  const categories: AuditCategory[] = (Object.keys(CATEGORY_LABELS) as CheckCategory[]).map((id) => {
    const inCategory = checks.filter((c) => c.category === id);
    return { id, label: CATEGORY_LABELS[id], score: scoreOf(inCategory), checks: inCategory };
  });

  const rank = (c: AuditCheck) => (c.status === "fail" ? 2 : 1) * 10 + c.weight;
  const topFixes = checks
    .filter((c) => c.status !== "pass" && c.fix)
    .sort((a, b) => rank(b) - rank(a))
    .slice(0, 3);

  const score = scoreOf(checks);
  return {
    url: start.toString(),
    finalUrl: page.finalUrl.toString(),
    checkedAt: new Date().toISOString(),
    score,
    verdict: verdictFor(score),
    categories,
    topFixes,
    limitations: [
      "This checks your homepage only, reading its HTML and headers the way a search crawler does. It does not run JavaScript.",
      "Response time is measured from our server, so visitors in other places may see different speeds.",
      "It is a quick health check, not a full audit. A full review also covers content quality, backlinks and real-device testing.",
    ],
  };
}
