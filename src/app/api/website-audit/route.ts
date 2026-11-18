import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail, isMailerConfigured } from "@/lib/mailer";
import { getRateLimitKey, rateLimit } from "@/lib/rateLimit";
import { AuditError, runWebsiteAudit, type AuditReport } from "@/lib/websiteAudit";
import { CONTACT_EMAIL, whatsappUrl } from "@/lib/contact";
import { cleanAttribution, escapeHtml, linkBtn, shell, type Segment } from "@/lib/leadFollowUp";

export const runtime = "nodejs";
export const maxDuration = 45;

// Each audit makes up to four outbound requests, so cap how many run at once.
const MAX_CONCURRENT = 3;
let inFlight = 0;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/**
 * A low score means visible problems, which is the best opening for a
 * follow-up, so those leads are tagged hot. Strong sites are tagged cold.
 */
function segmentForScore(score: number): Segment {
  if (score < 60) return "hot";
  if (score >= 85) return "cold";
  return "warm";
}

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function resultsEmail(report: AuditReport, name?: string): string {
  const first = (name || "").trim().split(/\s+/)[0];
  const fixes = report.topFixes
    .map(
      (f) =>
        `<li style="margin-bottom:10px;"><strong>${escapeHtml(f.label)}.</strong> ${escapeHtml(f.detail)}<br/><span style="color:#a1a1aa;">${escapeHtml(f.fix)}</span></li>`
    )
    .join("");
  const cats = report.categories
    .map((c) => `<tr><td style="padding:3px 16px 3px 0;color:#a1a1aa;">${escapeHtml(c.label)}</td><td><strong>${c.score}/100</strong></td></tr>`)
    .join("");
  const waMsg = `Hi NeoKlyn, I ran the website audit on ${host(report.finalUrl)} and got ${report.score}/100. Can you help me fix it?`;
  return shell(
    `Website audit: ${report.score}/100`,
    `<p>${first ? `Hi ${escapeHtml(first)},` : "Hi,"}</p>
     <p>Here is the quick health check for <strong>${escapeHtml(host(report.finalUrl))}</strong>. ${escapeHtml(report.verdict)}</p>
     <table style="border-collapse:collapse;margin:12px 0 18px;font-size:14px;">${cats}</table>
     <p style="margin-bottom:6px;"><strong>Fix these first:</strong></p>
     <ol style="padding-left:20px;margin-top:0;">${fixes || "<li>No major issues found.</li>"}</ol>
     <p style="font-size:13px;color:#a1a1aa;">${escapeHtml(report.limitations[0])}</p>
     <p>${linkBtn("https://neoklyn.com/estimate", "Get a free fix estimate")}${linkBtn(whatsappUrl(waMsg), "Talk to us on WhatsApp")}</p>
     <p>— Team NeoKlyn</p>`
  );
}

function ownerEmail(report: AuditReport, input: { email: string; name?: string }, segment: Segment): string {
  const issues = report.categories
    .flatMap((c) => c.checks)
    .filter((c) => c.status !== "pass")
    .map((c) => `<li>${c.status === "fail" ? "✗" : "!"} ${escapeHtml(c.label)}: ${escapeHtml(c.detail)}</li>`)
    .join("");
  return shell(
    `${segment === "hot" ? "[HOT] " : ""}Website audit lead: ${report.score}/100`,
    `<p><strong>${escapeHtml(input.name || input.email)}</strong> (<a href="mailto:${escapeHtml(input.email)}" style="color:#06B6D4;">${escapeHtml(input.email)}</a>) audited <a href="${escapeHtml(report.finalUrl)}" style="color:#06B6D4;">${escapeHtml(report.finalUrl)}</a>. They may be the site owner or just curious, so check before pitching.</p>
     <p>Score ${report.score}/100. Specific problems you can open with:</p>
     <ul style="padding-left:20px;">${issues}</ul>`
  );
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
  if (!rateLimit(getRateLimitKey(ip, "website-audit"), { limit: 5, windowSeconds: 600 }).success) {
    return NextResponse.json({ error: "Too many audits from your network. Please try again in a few minutes." }, { status: 429 });
  }

  let body: { url?: string; email?: string; name?: string; attribution?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim().slice(0, 100) || undefined;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email so we can send you the report." }, { status: 400 });
  }
  if (!rateLimit(`website-audit:email:${email}`, { limit: 5, windowSeconds: 24 * 60 * 60 }).success) {
    return NextResponse.json({ error: "You've reached today's limit for audits. Please try again tomorrow." }, { status: 429 });
  }

  if (inFlight >= MAX_CONCURRENT) {
    return NextResponse.json({ error: "We're busy right now. Please try again in a minute." }, { status: 503 });
  }

  inFlight++;
  let report: AuditReport;
  try {
    report = await runWebsiteAudit(String(body.url || ""));
  } catch (error) {
    if (error instanceof AuditError) {
      const status = error.code === "invalid_url" ? 400 : 422;
      return NextResponse.json({ error: error.message }, { status });
    }
    console.error("Website audit failed:", error);
    return NextResponse.json({ error: "Something went wrong running the audit. Please try again." }, { status: 500 });
  } finally {
    inFlight--;
  }

  const segment = segmentForScore(report.score);
  try {
    await db.lead.create({
      data: {
        type: "AUDIT_QUIZ",
        email,
        name: name || null,
        source: "website_audit",
        segment,
        message: `Website audit for ${report.finalUrl}: ${report.score}/100`,
        metadata: {
          kind: "website_audit",
          url: report.finalUrl,
          score: report.score,
          categoryScores: Object.fromEntries(report.categories.map((c) => [c.id, c.score])),
          topFixes: report.topFixes.map((f) => ({ id: f.id, label: f.label, fix: f.fix })),
          // The form tells people a few follow-up emails will come; this records that notice was shown.
          nurture_ok: true,
          attribution: cleanAttribution(body.attribution) ?? null,
        },
      },
    });
  } catch (error) {
    // The visitor still gets their report; the lead just isn't saved.
    console.error("Website audit lead persistence failed:", error);
  }

  const emailed = isMailerConfigured() && rateLimit(`website-audit:mail:${email}`, { limit: 2, windowSeconds: 3600 }).success;
  if (emailed) {
    void sendMail({
      from: '"NeoKlyn" <hello@neoklyn.com>',
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: `Your website audit: ${report.score}/100 for ${host(report.finalUrl)}`,
      html: resultsEmail(report, name),
    }).catch((error) => console.error("Audit results email failed:", error));
    void sendMail({
      from: `"NeoKlyn Website" <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `${segment === "hot" ? "[HOT] " : ""}Website audit: ${host(report.finalUrl)} scored ${report.score}`,
      html: ownerEmail(report, { email, name }, segment),
    }).catch((error) => console.error("Audit owner alert failed:", error));
  }

  return NextResponse.json({ report, emailed });
}
