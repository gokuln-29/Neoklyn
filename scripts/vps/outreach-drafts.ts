/**
 * Turns your prospect list into personalised message drafts for you to send by hand.
 * It never contacts anyone. Real prospects come from you (Google Maps, Instagram,
 * LinkedIn), because the model cannot look businesses up and must not guess them.
 *
 * Put prospects in .automation/prospects.csv with this header:
 *   business,contact_name,channel,service,observation,website,sent
 *   Sri Clinic,Dr Priya,whatsapp,web,"No online booking",sriclinic.in,
 * "website" is optional. When it is filled in, the script runs the same
 * homepage audit as neoklyn.com/website-audit and the draft opens with one
 * measured finding, so you never have to guess what is wrong with their site.
 * Leave "sent" empty. Run the script: 15 unsent rows get drafts in
 * .automation/outreach/YYYY-MM-DD.md and are marked sent=drafted.
 *
 *   npx tsx scripts/vps/outreach-drafts.ts
 */
import { promises as fs } from "fs";
import path from "path";
import { NEOKLYN_FACTS, STATE_DIR, askClaude, ensureStateDir, getAnthropic } from "./common";
import { runWebsiteAudit, type AuditReport } from "../../src/lib/websiteAudit";

const BATCH = Number(process.env.OUTREACH_BATCH || 15);

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim())) rows.push(row);
  return rows;
}

const toCsv = (rows: string[][]) =>
  rows.map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";

async function main() {
  const file = path.join(STATE_DIR, "prospects.csv");
  let raw: string;
  try { raw = await fs.readFile(file, "utf-8"); } catch {
    console.error(`No ${file}. Create it with the header: business,contact_name,channel,service,observation,sent`);
    process.exit(1);
  }
  const rows = parseCsv(raw);
  const header = rows[0];
  const col = (name: string) => header.indexOf(name);
  const sentIdx = col("sent");
  if (sentIdx === -1 || ["business", "contact_name", "channel", "service", "observation"].some((c) => col(c) === -1)) {
    console.error("CSV header must be: business,contact_name,channel,service,observation,website,sent (website is optional)");
    process.exit(1);
  }
  const websiteIdx = col("website");

  const todo = rows.slice(1).filter((r) => !(r[sentIdx] || "").trim()).slice(0, BATCH);
  if (!todo.length) { console.log("No unsent prospects left. Add more rows."); return; }

  // Measured findings for prospects with a website (sequential and polite: one audit a second).
  const audits = new Map<number, AuditReport | string>();
  for (let i = 0; i < todo.length; i++) {
    const site = websiteIdx === -1 ? "" : (todo[i][websiteIdx] || "").trim();
    if (!site) continue;
    try {
      audits.set(i, await runWebsiteAudit(site));
      console.log(`Audited ${site}: ${(audits.get(i) as AuditReport).score}/100`);
    } catch (err) {
      audits.set(i, `audit failed: ${err instanceof Error ? err.message : "unknown error"}`);
      console.log(`Could not audit ${site}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const findingsFor = (i: number): string => {
    const a = audits.get(i);
    if (!a) return "";
    if (typeof a === "string") return ` audit_findings=(none: ${a})`;
    const issues = a.categories
      .flatMap((c) => c.checks)
      .filter((c) => c.status !== "pass")
      .slice(0, 4)
      .map((c) => `${c.label}: ${c.detail}`)
      .join(" | ");
    return ` audit_findings=(homepage scored ${a.score}/100. Measured issues: ${issues || "none found"})`;
  };

  const list = todo.map((r, i) =>
    `${i + 1}. business=${r[col("business")]}; contact=${r[col("contact_name")]}; channel=${r[col("channel")]}; service=${r[col("service")]}; observation=${r[col("observation")]};${findingsFor(i)}`).join("\n");

  const prompt = `Write one short cold message for each prospect below, from the founder of NeoKlyn.
Facts you may use, and nothing else about NeoKlyn:
${NEOKLYN_FACTS}

Rules: simple English, max 60 words each. Start with the specific observation so it is clearly not a mass message. When audit_findings are given, open with exactly ONE of those measured issues, described plainly and accurately (it comes from an automated check of their homepage, so do not exaggerate it or claim to have reviewed more), and offer to send the full free report. Never quote the numeric score unless it is below 60. Offer ONE low-pressure thing (a free 5-point website audit for web, a 20-minute call for AI agents, a rough estimate for mobile apps). Do not invent compliments, results, prices or claims about the prospect beyond the observation. Match the channel's tone (whatsapp/instagram casual, linkedin/email slightly formal, email adds a subject line).
Format exactly: "### N. Business (channel)" then the message, for every prospect.

${list}`;

  let output = await askClaude(getAnthropic(), prompt, 6000);
  const summaries = todo
    .map((r, i) => {
      const a = audits.get(i);
      if (!a || typeof a === "string") return a ? `- ${r[col("business")]}: ${a}` : "";
      return `- ${r[col("business")]} (${a.finalUrl}): ${a.score}/100. Top fixes: ${a.topFixes.map((f) => f.label).join(", ") || "none"}`;
    })
    .filter(Boolean);
  if (summaries.length) output += `\n\n---\n## Audit results behind these drafts (check before sending)\n${summaries.join("\n")}\n`;
  const dir = await ensureStateDir("outreach");
  const out = path.join(dir, `${new Date().toISOString().slice(0, 10)}.md`);
  await fs.writeFile(out, output);

  for (const r of todo) r[sentIdx] = "drafted";
  await fs.writeFile(file, toCsv(rows));
  console.log(`Wrote ${todo.length} drafts to ${out}. Review, edit, and send them yourself.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
