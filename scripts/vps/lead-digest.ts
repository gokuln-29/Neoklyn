/**
 * Morning email: leads from the last 24 hours, leads still untouched for 24h+,
 * each with a short suggested reply (written for you to edit and send yourself).
 *
 *   npx tsx scripts/vps/lead-digest.ts
 */
// common must load first: it reads .env before db.ts needs DATABASE_URL.
import { askClaude, getAnthropic } from "./common";
import { db } from "../../src/lib/db";
import { sendMail } from "../../src/lib/mailer";

type LeadRow = Awaited<ReturnType<typeof db.lead.findMany>>[number];

const esc = (s: string | null | undefined) =>
  (s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

async function suggestReply(lead: LeadRow): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) return "";
  const prompt = `Write a short WhatsApp reply (max 70 words, simple English) from NeoKlyn (a Bengaluru web, mobile app and AI agent studio) to this new enquiry.
Thank them, show you understood what they need, ask ONE useful question, and offer a free estimate at https://neoklyn.com/estimate. Do not invent prices, timelines or claims.
Name: ${lead.name ?? "unknown"}
Type: ${lead.type}
Message: ${lead.message ?? "(none)"}
Return only the reply text.`;
  try {
    return (await askClaude(getAnthropic(), prompt, 400)).trim();
  } catch {
    return "";
  }
}

function card(lead: LeadRow, reply: string) {
  const phone = lead.phone ? ` · ${esc(lead.phone)}` : "";
  return `<div style="border:1px solid #ddd;border-radius:8px;padding:12px;margin:12px 0">
<b>${esc(lead.name) || "Unknown"}</b> — ${esc(lead.type)}${lead.segment ? ` · <b>${esc(lead.segment)}</b>` : ""}<br>
${esc(lead.email)}${phone}${lead.company ? ` · ${esc(lead.company)}` : ""}<br>
<small>Source: ${esc(lead.source) || "n/a"} · ${lead.createdAt.toISOString().slice(0, 16).replace("T", " ")} UTC</small>
${lead.message ? `<p>${esc(lead.message)}</p>` : ""}
${reply ? `<p style="background:#f4f4f4;padding:8px"><b>Suggested reply:</b><br>${esc(reply)}</p>` : ""}
</div>`;
}

async function main() {
  const now = Date.now();
  const since = new Date(now - 24 * 60 * 60 * 1000);
  const fresh = await db.lead.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: "desc" }, take: 25 });
  const stale = await db.lead.findMany({
    where: { status: "NEW", createdAt: { lt: since, gte: new Date(now - 14 * 24 * 60 * 60 * 1000) } },
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  if (!fresh.length && !stale.length) {
    console.log("No new or waiting leads. No email sent.");
    return;
  }

  const freshHtml: string[] = [];
  for (const lead of fresh.slice(0, 10)) freshHtml.push(card(lead, await suggestReply(lead)));
  for (const lead of fresh.slice(10)) freshHtml.push(card(lead, ""));

  const html = `<h2>New leads (last 24h): ${fresh.length}</h2>${freshHtml.join("") || "<p>None.</p>"}
<h2>Still waiting for a first reply: ${stale.length}</h2>${stale.map((l) => card(l, "")).join("") || "<p>None.</p>"}
<p><small>Reply within 1 hour where you can. Update lead status in /admin/leads.</small></p>`;

  const user = process.env.SMTP_USER;
  if (!user) {
    console.log("SMTP_USER not set; printing instead.\n", html);
    return;
  }
  const ok = await sendMail({
    from: user,
    to: process.env.DIGEST_TO || user,
    subject: `NeoKlyn leads: ${fresh.length} new, ${stale.length} waiting`,
    html,
  });
  console.log(ok ? "Digest sent." : "Digest not sent (SMTP not configured).");
  await db.$disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
