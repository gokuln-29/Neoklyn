import { db } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { CONTACT_EMAIL } from "@/lib/contact";
import { NURTURE_DAYS, buildNurtureEmail, type NurtureContext, type Track } from "@/lib/nurtureContent";
import { canSignUnsubscribe, unsubscribeApiUrl, unsubscribePageUrl } from "@/lib/unsubscribe";

type LeadRow = Awaited<ReturnType<typeof db.lead.findMany>>[number];

const DAY = 24 * 60 * 60 * 1000;
const MAX_LATE_MS = 5 * DAY; // don't send a stale email if the job was down for days
const MIN_GAP_MS = 20 * 60 * 60 * 1000; // at most one email a day per lead
// Statuses that mean a person is already talking to the lead, so automation stops.
const ACTIVE_STATUSES = ["NEW", "NURTURING"] as const;

function metaOf(lead: LeadRow): Record<string, unknown> {
  return lead.metadata && typeof lead.metadata === "object" && !Array.isArray(lead.metadata)
    ? (lead.metadata as Record<string, unknown>)
    : {};
}

export function trackFor(lead: LeadRow): Track | null {
  if (lead.source === "website_audit") return "website";
  if (lead.source === "estimate_wizard") return "estimate";
  if (lead.source === "audit_landing_page") return "ai";
  return null;
}

function contextFor(lead: LeadRow, track: Track): NurtureContext {
  const meta = metaOf(lead);
  const ctx: NurtureContext = { firstName: (lead.name || "").trim().split(/\s+/)[0] || undefined };
  if (track === "website") {
    try {
      ctx.host = new URL(String(meta.url || "")).hostname.replace(/^www\./, "");
    } catch {
      /* leave undefined */
    }
    if (typeof meta.score === "number") ctx.score = meta.score;
    if (Array.isArray(meta.topFixes)) {
      // New leads store {label, fix}; older ones stored check ids only.
      ctx.topFixes = meta.topFixes
        .filter((f): f is { label: string; fix: string } => !!f && typeof f === "object" && "label" in f && "fix" in f)
        .map((f) => ({ label: String(f.label), fix: String(f.fix) }));
    }
  }
  if (track === "estimate" && typeof meta.projectType === "string") ctx.projectType = meta.projectType;
  return ctx;
}

export type NurtureResult = {
  considered: number;
  sent: Array<{ email: string; track: Track; step: number; subject: string }>;
  skipped: Record<string, number>;
};

/**
 * Sends the next due follow-up email to each eligible lead. A lead is eligible
 * only if it opted in (metadata.nurture_ok, set when the form showed the
 * notice), has not unsubscribed, and nobody has started talking to them.
 */
export async function runNurture(opts: { dryRun?: boolean; now?: Date } = {}): Promise<NurtureResult> {
  const now = opts.now ?? new Date();
  const result: NurtureResult = { considered: 0, sent: [], skipped: {} };
  const skip = (reason: string) => {
    result.skipped[reason] = (result.skipped[reason] || 0) + 1;
  };

  if (!canSignUnsubscribe()) {
    throw new Error("No signing secret for unsubscribe links. Set UNSUBSCRIBE_SECRET (or AUTH_SECRET) before sending marketing email.");
  }

  const candidates = await db.lead.findMany({
    where: {
      type: { in: ["AUDIT_QUIZ", "CONSULTATION"] },
      status: { in: [...ACTIVE_STATUSES] },
      sequenceStage: { lt: NURTURE_DAYS.length },
      createdAt: { gte: new Date(now.getTime() - 40 * DAY) },
    },
    orderBy: { createdAt: "asc" },
    take: 500,
  });

  // If a person is already in conversation with this address, stop all automation for it.
  const emails = [...new Set(candidates.map((l) => l.email.toLowerCase()))];
  const engaged = new Set(
    (
      await db.lead.findMany({
        where: {
          email: { in: emails, mode: "insensitive" },
          OR: [{ type: "CONTACT" }, { status: { in: ["CONTACTED", "QUALIFIED", "BOOKED", "CLOSED"] } }],
        },
        select: { email: true },
      })
    ).map((l) => l.email.toLowerCase())
  );

  for (const lead of candidates) {
    result.considered++;
    const meta = metaOf(lead);
    const track = trackFor(lead);
    if (!track) {
      skip("no track for source");
      continue;
    }
    if (meta.nurture_ok !== true) {
      skip("did not opt in");
      continue;
    }
    if (meta.unsubscribed_at) {
      skip("unsubscribed");
      continue;
    }
    if (engaged.has(lead.email.toLowerCase())) {
      skip("already in conversation");
      continue;
    }

    const step = lead.sequenceStage + 1;
    const due = lead.createdAt.getTime() + NURTURE_DAYS[lead.sequenceStage] * DAY;
    if (now.getTime() < due) {
      skip("not due yet");
      continue;
    }
    if (now.getTime() - due > MAX_LATE_MS) {
      skip("overdue, too stale to send");
      continue;
    }
    const lastSent = typeof meta.nurture_last_sent_at === "string" ? Date.parse(meta.nurture_last_sent_at) : 0;
    if (lastSent && now.getTime() - lastSent < MIN_GAP_MS) {
      skip("sent within 20 hours");
      continue;
    }

    const { subject, html } = buildNurtureEmail(track, step, contextFor(lead, track), unsubscribePageUrl(lead.email));
    result.sent.push({ email: lead.email, track, step, subject });
    if (opts.dryRun) continue;

    const ok = await sendMail({
      from: `"Gokulnath at NeoKlyn" <${CONTACT_EMAIL}>`,
      to: lead.email,
      replyTo: CONTACT_EMAIL,
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<${unsubscribeApiUrl(lead.email)}>, <mailto:${CONTACT_EMAIL}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (!ok) {
      result.sent.pop();
      skip("mail not configured");
      continue;
    }
    await db.lead.update({
      where: { id: lead.id },
      data: {
        sequenceStage: { increment: 1 },
        metadata: { ...meta, nurture_last_sent_at: now.toISOString() },
      },
    });
  }
  return result;
}
