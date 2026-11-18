import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail, isMailerConfigured } from "@/lib/mailer";
import { cleanAttribution } from "@/lib/leadFollowUp";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";
import { AUDIT_QUESTIONS, type AuditAnswers } from "@/data/auditQuestions";
import { scoreAnswers, buildTakeaway } from "@/lib/auditScoring";

export const runtime = "nodejs";

type AuditRequestBody = {
  answers: Record<string, string>;
  name?: string;
  email: string;
  utmSource?: string;
  utmCampaign?: string;
  attribution?: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAnswers(raw: Record<string, string>): AuditAnswers | null {
  const answers = {} as AuditAnswers;
  for (const q of AUDIT_QUESTIONS) {
    const value = raw[q.key];
    if (!q.options.some((o) => o.value === value)) return null;
    answers[q.key] = value;
  }
  return answers;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
  const rl = rateLimit(getRateLimitKey(ip, "audit"), { limit: 10, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = (await req.json()) as AuditRequestBody;
    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const answers = validateAnswers(body.answers || {});
    if (!answers) {
      return NextResponse.json({ error: "All questions must be answered." }, { status: 400 });
    }

    const { score, segment } = scoreAnswers(answers);
    const takeaway = buildTakeaway(answers, segment);

    const lead = await db.lead.create({
      data: {
        type: "AUDIT_QUIZ",
        email,
        name: name || null,
        source: "audit_landing_page",
        segment,
        metadata: {
          answers,
          score,
          utm_source: body.utmSource || null,
          utm_campaign: body.utmCampaign || null,
          attribution: cleanAttribution(body.attribution) ?? null,
        },
      },
    });

    if (isMailerConfigured()) {
      void sendMail({
        from: '"NeoKlyn" <hello@neoklyn.com>',
        to: email,
        subject: "Your AI Automation Readiness results",
        html: `
          <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0c0c12;color:#f4f4f5;border-radius:14px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
            <div style="padding:24px 28px;border-bottom:1px solid rgba(6,182,212,0.35);background:linear-gradient(90deg,rgba(6,182,212,0.08),rgba(59,130,246,0.08));">
              <h1 style="margin:0;font-size:22px;">Your Readiness Audit Results</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Hi ${name || "there"}, here's your personalized takeaway.</p>
            </div>
            <div style="padding:24px 28px;">
              <p style="margin:0 0 22px;line-height:1.7;color:#e4e4e7;">${takeaway}</p>
              <a href="https://cal.com/neoklyn" style="display:inline-block;padding:12px 18px;border-radius:9px;background:#06b6d4;color:#032028;text-decoration:none;font-weight:700;">
                Book a Free 15-Min Consult
              </a>
            </div>
            <div style="padding:14px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#71717a;">
              NeoKlyn • Bengaluru • hello@neoklyn.com
            </div>
          </div>
        `,
      }).catch((error) => console.error("Audit result email failed:", error));
    }

    return NextResponse.json({ id: lead.id, segment, score, takeaway });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ error: "Failed to process the audit. Please try again." }, { status: 500 });
  }
}
