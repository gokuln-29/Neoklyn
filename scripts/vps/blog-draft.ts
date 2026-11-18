/**
 * Writes one SEO blog post and saves it to the CMS as a DRAFT through the
 * site's own automation endpoint. Publishing stays a human click in /admin.
 *
 *   npx tsx scripts/vps/blog-draft.ts            # write + post draft
 *   DRY_RUN=1 npx tsx scripts/vps/blog-draft.ts  # print only, post nothing
 */
import { promises as fs } from "fs";
import path from "path";
import {
  NEOKLYN_FACTS, SITE_URL, STATE_DIR, askClaude, ensureStateDir, getAnthropic, parseJsonObject, readJson, requireEnv,
} from "./common";
import { sendMail } from "../../src/lib/mailer";

type Topic = { topic: string; categorySlug: string; keyword: string };
type State = { usedTopics: string[] };
type Draft = {
  title: string; slug: string; excerpt: string; contentHtml: string; categorySlug: string; tagNames: string[];
  seo: { seoTitle: string; metaDescription: string; focusKeyword: string; keywords: string[] };
  linkedinPost: string; xPost: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

// A failed run used to be silent for days. Always tell the owner, success or not.
async function notify(subject: string, html: string) {
  const user = process.env.SMTP_USER;
  if (!user) return;
  try {
    await sendMail({ from: user, to: process.env.DIGEST_TO || user, subject, html });
  } catch (err) {
    console.warn("Notification email failed:", (err as Error).message);
  }
}

function validate(d: Draft, existingSlugs: string[]): string[] {
  const problems: string[] = [];
  const words = d.contentHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (!SLUG_RE.test(d.slug)) problems.push("slug must be lowercase-hyphenated");
  if (existingSlugs.includes(d.slug)) problems.push("slug already exists");
  if (d.seo.seoTitle.length > 70) problems.push("seoTitle over 70 chars");
  if (d.seo.metaDescription.length < 120 || d.seo.metaDescription.length > 170) problems.push("metaDescription must be 120-170 chars");
  if (words < 900) problems.push(`only ${words} words, need 900+`);
  if (/<h1/i.test(d.contentHtml)) problems.push("contentHtml must not contain <h1>");
  if (!/<h2/i.test(d.contentHtml)) problems.push("contentHtml needs <h2> sections");
  if (!/href="\/(services|estimate|audit|contact|how-we-work)/.test(d.contentHtml)) problems.push("needs an internal link");
  if (!/href="https:\/\//.test(d.contentHtml)) problems.push("needs one external authoritative link");
  if (!d.seo.seoTitle.toLowerCase().includes(d.seo.focusKeyword.toLowerCase().split(" ")[0])) problems.push("focus keyword missing from seoTitle");
  return problems;
}

function buildPrompt(t: Topic, existingSlugs: string[], problems: string[]) {
  return `You write blog posts for NeoKlyn (neoklyn.com). Output ONE JSON object and nothing else.

Topic: ${t.topic}
Focus keyword: ${t.keyword}
categorySlug: ${t.categorySlug}

Facts about NeoKlyn you may use. Do not state any other NeoKlyn fact:
${NEOKLYN_FACTS}

Rules:
- 1100-1400 words, direct and specific, written for a small-business owner or founder in India. Simple words, short sentences.
- NEVER invent statistics, client names, case studies, testimonials, prices or timelines. If you do not know a number, write around it.
- HTML only: <h2> sections, <p>, <ul><li>, <a href>. No <h1>.
- Focus keyword appears in seoTitle, in slug, and 3-6 times naturally in the body.
- 2+ internal links (relative paths from the facts list, e.g. /estimate or /services/mobile) woven into sentences, and 1+ external link to a genuinely authoritative source you are certain exists (official docs, Google, W3C, OWASP).
- End with a short, honest call to action pointing to /estimate or /contact.
- seoTitle max 70 chars. metaDescription 140-160 chars. slug lowercase-hyphenated, containing the keyword.
- Do not reuse these existing slugs: ${existingSlugs.join(", ") || "(none)"}.
${problems.length ? `\nYour previous attempt failed these checks, fix them: ${problems.join("; ")}\n` : ""}
JSON shape:
{"title":"","slug":"","excerpt":"max 200 chars","contentHtml":"","categorySlug":"${t.categorySlug}","tagNames":["2-4 short tags"],
"seo":{"seoTitle":"","metaDescription":"","focusKeyword":"${t.keyword}","keywords":["3-5"]},
"linkedinPost":"a 120-180 word LinkedIn post about the article, plain text, no hashtag spam, ends with the link https://neoklyn.com/insights/<slug>",
"xPost":"under 270 chars, ends with the link https://neoklyn.com/insights/<slug>"}`;
}

async function existingInsightSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    const xml = await res.text();
    return [...xml.matchAll(/\/insights\/([a-z0-9-]+)</g)].map((m) => m[1]);
  } catch {
    console.warn("Could not read sitemap; continuing without existing slugs.");
    return [];
  }
}

async function main() {
  const dryRun = process.env.DRY_RUN === "1";
  const topics: Topic[] = JSON.parse(await fs.readFile(path.join(__dirname, "topics.json"), "utf-8"));
  await ensureStateDir();
  const stateFile = path.join(STATE_DIR, "blog-state.json");
  const state = await readJson<State>(stateFile, { usedTopics: [] });

  const next = topics.find((t) => !state.usedTopics.includes(t.topic));
  if (!next) {
    console.log("All topics in scripts/vps/topics.json are used. Add more topics.");
    await notify("NeoKlyn blog drafts stopped: topic list is empty", "<p>Every topic in <code>scripts/vps/topics.json</code> has been used, so no new draft was written today. Add more topics to keep the daily drafts going.</p>");
    return;
  }

  const client = getAnthropic();
  const existing = await existingInsightSlugs();

  let draft: Draft | null = null;
  let problems: string[] = [];
  for (let attempt = 1; attempt <= 2; attempt++) {
    const raw = await askClaude(client, buildPrompt(next, existing, problems));
    try {
      draft = parseJsonObject<Draft>(raw);
      problems = validate(draft, existing);
    } catch (err) {
      problems = [`invalid JSON: ${(err as Error).message}`];
      draft = null;
    }
    if (draft && problems.length === 0) break;
    console.warn(`Attempt ${attempt} failed checks: ${problems.join("; ")}`);
  }
  if (!draft || problems.length) {
    console.error("Giving up for today. Nothing was posted.");
    await notify("NeoKlyn blog draft FAILED (quality checks)", `<p>Topic: ${esc(next.topic)}</p><p>The draft failed these checks twice, so nothing was posted: ${esc(problems.join("; "))}</p>`);
    process.exit(1);
  }

  const social = `# ${draft.title}\n\n## LinkedIn\n\n${draft.linkedinPost}\n\n## X\n\n${draft.xPost}\n`;
  const socialDir = await ensureStateDir("social");
  await fs.writeFile(path.join(socialDir, `${draft.slug}.md`), social);

  if (dryRun) {
    console.log(JSON.stringify(draft, null, 2));
    return;
  }

  const payload = { ...draft, linkedinPost: undefined, xPost: undefined };
  const res = await fetch(`${SITE_URL}/api/automation/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${requireEnv("AUTOMATION_API_KEY")}` },
    body: JSON.stringify(payload),
  });
  if (res.status !== 201) {
    const detail = `HTTP ${res.status} ${await res.text()}`;
    console.error(`Post failed: ${detail}`);
    await notify("NeoKlyn blog draft FAILED (could not save)", `<p>Topic: ${esc(next.topic)}</p><p>The CMS rejected the draft: ${esc(detail)}</p>`);
    process.exit(1);
  }

  state.usedTopics.push(next.topic);
  await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
  console.log(`Draft created: ${draft.slug}. Review and publish at /admin/posts. Social copy: .automation/social/${draft.slug}.md`);

  const left = topics.length - state.usedTopics.length;
  await notify(
    `NeoKlyn blog draft ready: ${draft.title}`,
    `<p>A new draft is waiting. Read it and click Publish here: <a href="https://neoklyn.com/admin/posts">neoklyn.com/admin/posts</a></p>
<p><b>${esc(draft.title)}</b><br>Once published: https://neoklyn.com/insights/${esc(draft.slug)}</p>
<h3>LinkedIn</h3><pre style="white-space:pre-wrap">${esc(draft.linkedinPost)}</pre>
<h3>X</h3><pre style="white-space:pre-wrap">${esc(draft.xPost)}</pre>
<p><small>${left} topic${left === 1 ? "" : "s"} left in the list.</small></p>`
  );
}

main().catch(async (err) => {
  console.error(err);
  await notify("NeoKlyn blog draft FAILED (unexpected error)", `<pre style="white-space:pre-wrap">${esc(String(err?.stack || err))}</pre>`);
  process.exit(1);
});
