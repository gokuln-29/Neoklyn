import type { OutreachChannel, OutreachProspect, OutreachStatus, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { AuditError, normalizeAuditUrl, runWebsiteAudit, type AuditCheck } from "@/lib/websiteAudit";

/**
 * Human-approved outreach. The system finds nothing and sends nothing by itself:
 * it imports prospects you chose, audits their site, drafts a message built on a
 * real finding or on an observation you wrote, and then waits. You approve each
 * draft and send it yourself (WhatsApp or email link, or copy for Instagram and
 * LinkedIn), then mark it sent. Follow-ups are scheduled and prepared the same way.
 */

export const DAILY_TARGET = 15;
export const DAILY_SOFT_LIMIT = 25;
const DAY = 24 * 60 * 60 * 1000;
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// ─── Normalising contact details ────────────────────────

/** Digits only with country code, ready for wa.me. Assumes India for 10-digit numbers. */
export function normalizePhone(raw?: string | null): string | null {
  if (!raw) return null;
  let digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  digits = digits.replace(/^00/, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`;
  return digits.length >= 11 && digits.length <= 15 ? digits : null;
}

export function normalizeEmail(raw?: string | null): string | null {
  const email = (raw || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 ? email : null;
}

/** Canonical https URL for a website, or null when it is not a valid public address. */
export function normalizeWebsite(raw?: string | null): string | null {
  if (!raw || !raw.trim()) return null;
  const url = normalizeAuditUrl(raw);
  return url ? `${url.protocol}//${url.host}${url.pathname === "/" ? "/" : url.pathname}` : null;
}

function websiteHost(url?: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

function normalizeHandle(raw?: string | null): string | null {
  const handle = (raw || "").trim().replace(/^@/, "").replace(/\/$/, "");
  return handle ? handle.slice(0, 200) : null;
}

const TITLES = /^(dr|mr|mrs|ms|miss|prof|er|ca|adv)\.?$/i;

/** First name for a greeting, keeping a title: "Dr Ravi Kumar" becomes "Dr Ravi". */
function firstName(contact?: string | null): string {
  const parts = (contact || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  return TITLES.test(parts[0]) && parts[1] ? `${parts[0].replace(/\.$/, "")} ${parts[1]}` : parts[0];
}

// ─── CSV / pasted-table import ──────────────────────────

function parseDelimited(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delimiter) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim())) rows.push(row);
  return rows;
}

export type ImportRow = {
  businessName: string;
  contactName?: string;
  channel?: string;
  phone?: string;
  email?: string;
  handle?: string;
  website?: string;
  niche?: string;
  city?: string;
  observation?: string;
};

const HEADER_ALIASES: Record<keyof ImportRow, string[]> = {
  businessName: ["business", "businessname", "business_name", "name", "company", "clinic", "shop"],
  contactName: ["contact", "contactname", "contact_name", "owner", "person"],
  channel: ["channel", "via"],
  phone: ["phone", "mobile", "whatsapp", "number", "contact_number", "phone_number"],
  email: ["email", "mail", "email_address"],
  handle: ["handle", "instagram", "linkedin", "profile", "social"],
  website: ["website", "site", "url", "web"],
  niche: ["niche", "category", "type", "industry"],
  city: ["city", "location", "area", "town"],
  observation: ["observation", "note", "notes", "comment", "noticed"],
};

/** Accepts comma- or tab-separated text with a header row (as pasted from a spreadsheet). */
export function parseProspectTable(text: string): { rows: ImportRow[]; error?: string } {
  const trimmed = text.trim();
  if (!trimmed) return { rows: [], error: "Paste a table with a header row." };
  const firstLine = trimmed.split(/\r?\n/)[0];
  const delimiter = firstLine.includes("\t") ? "\t" : ",";
  const table = parseDelimited(trimmed, delimiter);
  if (table.length < 2) return { rows: [], error: "Add a header row and at least one prospect." };

  const header = table[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const indexOf = (field: keyof ImportRow) => header.findIndex((h) => HEADER_ALIASES[field].includes(h));
  const cols = Object.fromEntries((Object.keys(HEADER_ALIASES) as Array<keyof ImportRow>).map((f) => [f, indexOf(f)])) as Record<keyof ImportRow, number>;
  if (cols.businessName === -1) return { rows: [], error: 'The header row needs a "business" column.' };

  const rows = table.slice(1).map((cells) => {
    const get = (f: keyof ImportRow) => (cols[f] >= 0 ? (cells[cols[f]] || "").trim() : "");
    return {
      businessName: get("businessName"),
      contactName: get("contactName"),
      channel: get("channel"),
      phone: get("phone"),
      email: get("email"),
      handle: get("handle"),
      website: get("website"),
      niche: get("niche"),
      city: get("city"),
      observation: get("observation"),
    };
  });
  return { rows };
}

function pickChannel(requested: string | undefined, phone: string | null, email: string | null, handle: string | null): OutreachChannel {
  const want = (requested || "").trim().toUpperCase();
  if (want === "WHATSAPP" && phone) return "WHATSAPP";
  if (want === "EMAIL" && email) return "EMAIL";
  if (want === "INSTAGRAM" && handle) return "INSTAGRAM";
  if (want === "LINKEDIN" && handle) return "LINKEDIN";
  if (phone) return "WHATSAPP";
  if (email) return "EMAIL";
  return handle && /linkedin/i.test(handle) ? "LINKEDIN" : "INSTAGRAM";
}

export type ImportResult = {
  added: number;
  skipped: Array<{ business: string; reason: string }>;
};

const MAX_IMPORT_ROWS = 200;

export async function importProspects(rows: ImportRow[]): Promise<ImportResult> {
  const result: ImportResult = { added: 0, skipped: [] };
  const existing = await db.outreachProspect.findMany({
    select: { phone: true, email: true, handle: true, website: true, status: true },
  });
  const seen = {
    phone: new Map<string, OutreachStatus>(),
    email: new Map<string, OutreachStatus>(),
    handle: new Map<string, OutreachStatus>(),
    host: new Map<string, OutreachStatus>(),
  };
  for (const p of existing) {
    if (p.phone) seen.phone.set(p.phone, p.status);
    if (p.email) seen.email.set(p.email, p.status);
    if (p.handle) seen.handle.set(p.handle.toLowerCase(), p.status);
    const host = websiteHost(p.website);
    if (host) seen.host.set(host, p.status);
  }

  for (const row of rows.slice(0, MAX_IMPORT_ROWS)) {
    const business = (row.businessName || "").trim().slice(0, 200);
    if (!business) {
      result.skipped.push({ business: "(blank)", reason: "No business name" });
      continue;
    }
    const phone = normalizePhone(row.phone);
    const email = normalizeEmail(row.email);
    const handle = normalizeHandle(row.handle);
    const website = normalizeWebsite(row.website);
    if (row.website?.trim() && !website) {
      result.skipped.push({ business, reason: "Website address is not valid" });
      continue;
    }
    if (!phone && !email && !handle) {
      result.skipped.push({ business, reason: "No phone, email or social handle to contact" });
      continue;
    }

    const host = websiteHost(website);
    const matches = [
      phone ? seen.phone.get(phone) : undefined,
      email ? seen.email.get(email) : undefined,
      handle ? seen.handle.get(handle.toLowerCase()) : undefined,
      host ? seen.host.get(host) : undefined,
    ].filter(Boolean) as OutreachStatus[];
    if (matches.includes("OPTED_OUT")) {
      result.skipped.push({ business, reason: "Asked not to be contacted: skipped" });
      continue;
    }
    if (matches.length) {
      result.skipped.push({ business, reason: "Already in your list" });
      continue;
    }

    await db.outreachProspect.create({
      data: {
        businessName: business,
        contactName: row.contactName?.trim().slice(0, 120) || null,
        channel: pickChannel(row.channel, phone, email, handle),
        phone,
        email,
        handle,
        website,
        niche: row.niche?.trim().slice(0, 80) || null,
        city: row.city?.trim().slice(0, 80) || null,
        observation: row.observation?.trim().slice(0, 600) || null,
      },
    });
    if (phone) seen.phone.set(phone, "NEW");
    if (email) seen.email.set(email, "NEW");
    if (handle) seen.handle.set(handle.toLowerCase(), "NEW");
    if (host) seen.host.set(host, "NEW");
    result.added++;
  }
  if (rows.length > MAX_IMPORT_ROWS) {
    result.skipped.push({ business: `${rows.length - MAX_IMPORT_ROWS} more rows`, reason: `Import up to ${MAX_IMPORT_ROWS} at a time` });
  }
  return result;
}

// ─── Audit findings → plain sentences ───────────────────

export type StoredFinding = { id: string; label: string; status: string; detail: string };

function fragmentFor(f: StoredFinding): string {
  switch (f.id) {
    case "response-time": {
      const ms = Number(/about (\d+) ms/.exec(f.detail)?.[1]);
      return Number.isFinite(ms) ? `it takes about ${(ms / 1000).toFixed(1)} seconds just to start responding` : "it is slow to start responding";
    }
    case "viewport":
      return "it doesn't seem to be set up properly for phones";
    case "clear-cta":
      return "I couldn't find a clear 'book' or 'contact us' button on the first page";
    case "contact-route":
      return "it's hard to find a quick way to contact the business from the homepage";
    case "tap-to-call":
      return "there's no tap-to-call or WhatsApp button for people on mobile";
    case "title":
      return "the page title could be much clearer for Google";
    case "meta-description":
      return "there's no description for the Google search listing";
    case "h1":
      return "the main heading is missing or unclear, which makes it harder for Google to understand the page";
    case "indexable":
      return "Google is being told not to list the page (a noindex tag)";
    case "https":
      return "the site isn't using a secure (HTTPS) connection, so browsers show 'Not secure'";
    case "compression":
      return "the pages aren't compressed, so they load slower than they need to";
    case "readable-without-js":
      return "most of the content only appears with JavaScript, so Google may see very little";
    case "script-count":
      return "it loads a lot of scripts, which slows it down on phones";
    default:
      return `${f.label.toLowerCase()} could be improved`;
  }
}

/** Keep the findings worth opening a conversation with: failures first, then warnings. */
export function pickFindings(checks: AuditCheck[]): StoredFinding[] {
  const rank = (c: AuditCheck) => (c.status === "fail" ? 20 : 10) + c.weight;
  return checks
    .filter((c) => c.status !== "pass")
    .sort((a, b) => rank(b) - rank(a))
    .slice(0, 4)
    .map((c) => ({ id: c.id, label: c.label, status: c.status, detail: c.detail }));
}

// ─── Drafts ─────────────────────────────────────────────

const OPT_OUT_LINE = "If you'd rather I didn't message again, just say so and I won't.";

export type Draft = { text: string; subject?: string };

function ensureSentence(text: string): string {
  const t = text.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

/**
 * First message. Needs a real basis: a finding from the audit, or an observation
 * you wrote. Returns null otherwise, so generic mass messages can't be produced.
 */
export function buildDraft(p: Pick<OutreachProspect, "businessName" | "contactName" | "channel" | "niche" | "observation" | "auditFindings">): Draft | null {
  const findings = Array.isArray(p.auditFindings) ? (p.auditFindings as StoredFinding[]) : [];
  const observation = (p.observation || "").trim();
  const top = findings[0];
  let opening: string | null = null;
  if (observation) opening = ensureSentence(observation);
  else if (top) opening = `I had a look at ${p.businessName}'s website and one thing I noticed is that ${fragmentFor(top)}.`;
  if (!opening) return null;

  const hi = firstName(p.contactName) ? `Hi ${firstName(p.contactName)},` : "Hi,";
  const niche = (p.niche || "").toLowerCase();
  const what = /clinic|doctor|dental|physio|hospital/.test(niche) ? "fast websites and WhatsApp assistants for clinics" : "fast business websites and WhatsApp assistants";
  const offer = top || /website|site/i.test(observation)
    ? "I put together a short free audit of your site and can send it over. Would that be useful?"
    : "I can send you a short free audit of your site if that would be useful.";

  if (p.channel === "EMAIL") {
    return {
      subject: `A quick note about ${p.businessName}'s website`,
      text: `${hi}\n\n${opening}\n\nI'm Gokulnath from NeoKlyn in Bengaluru. We build ${what}. ${offer}\n\n${OPT_OUT_LINE}\n\nGokulnath\nNeoKlyn · neoklyn.com`,
    };
  }
  return { text: `${hi} ${opening} I'm Gokulnath from NeoKlyn in Bengaluru. We build ${what}. ${offer} ${OPT_OUT_LINE}` };
}

/** Follow-up number 1-3 (days 3, 7 and 14 after the first message). */
export function buildFollowUp(p: Pick<OutreachProspect, "businessName" | "contactName" | "niche" | "channel">, stage: number): Draft | null {
  const hi = firstName(p.contactName) ? `Hi ${firstName(p.contactName)},` : "Hi,";
  const niche = (p.niche || "").toLowerCase();
  const guide = /clinic|doctor|dental|physio|hospital/.test(niche)
    ? "https://neoklyn.com/solutions/website-for-clinics"
    : "https://neoklyn.com/insights/website-development-cost-guide";
  let text: string;
  if (stage === 1) text = `${hi} just checking you saw my note about ${p.businessName}'s website. Happy to send the audit whenever it's useful, no pressure at all.`;
  else if (stage === 2) text = `${hi} no rush on my earlier message. In case it's useful, here's a short read on what a small business website should involve: ${guide}. If you'd like the audit of ${p.businessName}'s site, I can send it any time.`;
  else if (stage === 3) text = `${hi} I'll close this out so I don't keep bothering you. If a better website or a WhatsApp assistant is on your list later, you can run the free audit yourself at https://neoklyn.com/website-audit. Wishing ${p.businessName} well. ${OPT_OUT_LINE}`;
  else return null;
  return p.channel === "EMAIL" ? { subject: `Re: ${p.businessName}'s website`, text: `${text}\n\nGokulnath\nNeoKlyn` } : { text };
}

// ─── Sending links ──────────────────────────────────────

export type PresentedProspect = OutreachProspect & {
  /** The message to send now: the draft, or the follow-up that is due. */
  message: string | null;
  subject: string | null;
  isFollowUp: boolean;
  followUpNumber: number | null;
  openUrl: string | null;
  openLabel: string | null;
  profileUrl: string | null;
};

export function present(p: OutreachProspect, now = new Date()): PresentedProspect {
  const due = p.status === "SENT" && p.nextFollowUpAt != null && p.nextFollowUpAt.getTime() <= now.getTime() && p.followUpStage < 3;
  const followUpNumber = due ? p.followUpStage + 1 : null;
  const draft: Draft | null = due && followUpNumber ? buildFollowUp(p, followUpNumber) : p.draft ? { text: p.draft, subject: p.channel === "EMAIL" ? buildDraft(p)?.subject : undefined } : null;
  const message = draft?.text ?? null;
  const subject = draft?.subject ?? null;

  let openUrl: string | null = null;
  let openLabel: string | null = null;
  if (message) {
    if (p.channel === "WHATSAPP" && p.phone) {
      openUrl = `https://wa.me/${p.phone}?text=${encodeURIComponent(message)}`;
      openLabel = "Open WhatsApp";
    } else if (p.channel === "EMAIL" && p.email) {
      openUrl = `mailto:${p.email}?subject=${encodeURIComponent(subject || `A quick note about ${p.businessName}'s website`)}&body=${encodeURIComponent(message)}`;
      openLabel = "Open email";
    }
  }
  let profileUrl: string | null = null;
  if (p.handle && (p.channel === "INSTAGRAM" || p.channel === "LINKEDIN")) {
    profileUrl = /^https?:\/\//i.test(p.handle) ? p.handle : p.channel === "INSTAGRAM" ? `https://instagram.com/${p.handle}` : `https://www.linkedin.com/in/${p.handle}`;
  }
  return { ...p, message, subject, isFollowUp: due, followUpNumber, openUrl, openLabel, profileUrl };
}

// ─── Preparing drafts (audit + draft) ───────────────────

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type PrepareResult = {
  processed: number;
  remaining: number;
  results: Array<{ id: string; business: string; score: number | null; queued: boolean; note?: string }>;
};

/** Audits and drafts up to `limit` new prospects. Call repeatedly until `remaining` is 0. */
export async function prepareBatch(limit = 4): Promise<PrepareResult> {
  const batch = await db.outreachProspect.findMany({
    where: { status: "NEW", auditedAt: null },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  const results: PrepareResult["results"] = [];

  for (const p of batch) {
    let score: number | null = null;
    let findings: StoredFinding[] | null = null;
    let note: string | undefined;
    if (p.website) {
      try {
        const report = await runWebsiteAudit(p.website);
        score = report.score;
        findings = pickFindings(report.categories.flatMap((c) => c.checks));
      } catch (error) {
        note = error instanceof AuditError ? `Couldn't audit the site: ${error.message}` : "Couldn't audit the site";
      }
      await sleep(800);
    }
    const draft = buildDraft({ ...p, auditFindings: findings as unknown as Prisma.JsonValue });
    if (!draft && !note) note = "Add something you noticed about this business (the Observation field) to create a draft.";
    await db.outreachProspect.update({
      where: { id: p.id },
      data: {
        auditScore: score,
        auditFindings: findings ? (findings as unknown as Prisma.InputJsonValue) : undefined,
        auditedAt: new Date(),
        draft: draft?.text ?? null,
        status: draft ? "QUEUED" : "NEW",
        notes: note ?? p.notes,
      },
    });
    results.push({ id: p.id, business: p.businessName, score, queued: !!draft, note });
  }
  const remaining = await db.outreachProspect.count({ where: { status: "NEW", auditedAt: null } });
  return { processed: batch.length, remaining, results };
}

// ─── Actions (the approval workflow) ────────────────────

export type OutreachAction = "approve" | "requeue" | "skip" | "sent" | "replied" | "won" | "lost" | "optout" | "regenerate";

const FOLLOW_UP_GAPS_DAYS: Record<number, number | null> = { 0: 3, 1: 4, 2: 7, 3: null };

export class OutreachError extends Error {}

export async function applyAction(id: string, action: OutreachAction, now = new Date()): Promise<OutreachProspect> {
  const p = await db.outreachProspect.findUnique({ where: { id } });
  if (!p) throw new OutreachError("Prospect not found");
  if (p.status === "OPTED_OUT") throw new OutreachError("This person asked not to be contacted, so nothing can change here.");

  const update = (data: Prisma.OutreachProspectUpdateInput) => db.outreachProspect.update({ where: { id }, data });

  switch (action) {
    case "approve":
      if (p.status !== "QUEUED") throw new OutreachError("Only queued drafts can be approved");
      if (!p.draft?.trim()) throw new OutreachError("Write or generate a message before approving");
      return update({ status: "APPROVED" });
    case "requeue":
      if (!["APPROVED", "SKIPPED", "LOST"].includes(p.status)) throw new OutreachError("Cannot send this back to the queue");
      return update({ status: p.draft?.trim() ? "QUEUED" : "NEW", nextFollowUpAt: null });
    case "skip":
      return update({ status: "SKIPPED", nextFollowUpAt: null });
    case "sent": {
      if (p.status === "APPROVED") {
        return update({ status: "SENT", followUpStage: 0, sentAt: now, lastSentAt: now, nextFollowUpAt: new Date(now.getTime() + 3 * DAY) });
      }
      if (p.status === "SENT" && p.nextFollowUpAt && p.nextFollowUpAt.getTime() <= now.getTime() && p.followUpStage < 3) {
        const stage = p.followUpStage + 1;
        const gap = FOLLOW_UP_GAPS_DAYS[stage];
        return update({ followUpStage: stage, lastSentAt: now, nextFollowUpAt: gap ? new Date(now.getTime() + gap * DAY) : null });
      }
      throw new OutreachError("Approve the draft before marking it as sent");
    }
    case "replied":
      return update({ status: "REPLIED", nextFollowUpAt: null });
    case "won":
      return update({ status: "WON", nextFollowUpAt: null });
    case "lost":
      return update({ status: "LOST", nextFollowUpAt: null });
    case "optout":
      return update({ status: "OPTED_OUT", nextFollowUpAt: null });
    case "regenerate": {
      if (!["NEW", "QUEUED", "APPROVED", "SKIPPED"].includes(p.status)) throw new OutreachError("Cannot redraft after sending");
      const draft = buildDraft(p);
      if (!draft) throw new OutreachError("Add an observation (something you noticed) first, so the message is specific");
      return update({ draft: draft.text, status: "QUEUED" });
    }
  }
}

// ─── Listing and stats ──────────────────────────────────

export type OutreachTab = "needs-input" | "queue" | "ready" | "follow-ups" | "sent" | "closed";

export function startOfIstDay(now = new Date()): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  ist.setUTCHours(0, 0, 0, 0);
  return new Date(ist.getTime() - IST_OFFSET_MS);
}

export async function listProspects(tab: OutreachTab, now = new Date()): Promise<PresentedProspect[]> {
  let where: Prisma.OutreachProspectWhereInput;
  let orderBy: Prisma.OutreachProspectOrderByWithRelationInput = { createdAt: "asc" };
  switch (tab) {
    case "needs-input":
      where = { status: "NEW" };
      break;
    case "queue":
      where = { status: "QUEUED" };
      break;
    case "ready":
      where = { status: "APPROVED" };
      break;
    case "follow-ups":
      where = { status: "SENT", followUpStage: { lt: 3 }, nextFollowUpAt: { lte: now } };
      orderBy = { nextFollowUpAt: "asc" };
      break;
    case "sent":
      where = { status: "SENT" };
      orderBy = { lastSentAt: "desc" };
      break;
    default:
      where = { status: { in: ["REPLIED", "WON", "LOST", "SKIPPED", "OPTED_OUT"] } };
      orderBy = { updatedAt: "desc" };
  }
  const rows = await db.outreachProspect.findMany({ where, orderBy, take: 200 });
  return rows.map((p) => present(p, now));
}

export type OutreachStats = {
  needsInput: number;
  queue: number;
  ready: number;
  followUpsDue: number;
  sent: number;
  sentToday: number;
  replied: number;
  won: number;
  dailyTarget: number;
  dailySoftLimit: number;
  unprepared: number;
};

export async function getStats(now = new Date()): Promise<OutreachStats> {
  const [needsInput, queue, ready, followUpsDue, sent, sentToday, replied, won, unprepared] = await Promise.all([
    db.outreachProspect.count({ where: { status: "NEW" } }),
    db.outreachProspect.count({ where: { status: "QUEUED" } }),
    db.outreachProspect.count({ where: { status: "APPROVED" } }),
    db.outreachProspect.count({ where: { status: "SENT", followUpStage: { lt: 3 }, nextFollowUpAt: { lte: now } } }),
    db.outreachProspect.count({ where: { status: "SENT" } }),
    db.outreachProspect.count({ where: { lastSentAt: { gte: startOfIstDay(now) } } }),
    db.outreachProspect.count({ where: { status: "REPLIED" } }),
    db.outreachProspect.count({ where: { status: "WON" } }),
    db.outreachProspect.count({ where: { status: "NEW", auditedAt: null } }),
  ]);
  return { needsInput, queue, ready, followUpsDue, sent, sentToday, replied, won, dailyTarget: DAILY_TARGET, dailySoftLimit: DAILY_SOFT_LIMIT, unprepared };
}
