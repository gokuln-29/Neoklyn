import { sendMail, isMailerConfigured } from "@/lib/mailer";
import { rateLimit } from "@/lib/rateLimit";
import { CAL_URL, CONTACT_EMAIL, whatsappUrl } from "@/lib/contact";

export type Segment = "hot" | "warm" | "cold";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "referrer",
  "landing_page",
  "captured_at",
] as const;

/** Keeps only known string fields from client-supplied attribution. */
export function cleanAttribution(raw: unknown): Record<string, string> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) out[key] = value.trim().slice(0, 200);
  }
  return Object.keys(out).length ? out : undefined;
}

// Budget ranges (as submitted by the contact form) that signal a larger project.
const HIGH_BUDGETS = new Set([
  "₹3L-₹8L",
  "₹8L+",
  "$15K-$30K",
  "$30K-$50K",
  "$50K+",
  "£15K-£30K",
  "£30K-£50K",
  "£50K+",
  "AED 100K-200K",
  "AED 200K+",
  "S$20K-S$40K",
  "S$40K-S$70K",
  "S$70K+",
]);

/**
 * "hot" = a larger budget, so reply first. Everything else is "warm": the
 * ₹50K-3L range is NeoKlyn's core offer, so it is not treated as low priority.
 */
export function segmentFromBudget(budget?: string | null): Segment {
  if (budget && HIGH_BUDGETS.has(budget.trim())) return "hot";
  return "warm";
}

export function shell(title: string, body: string): string {
  return `<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0c0c12;color:#f4f4f5;border-radius:14px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
    <div style="padding:22px 28px;border-bottom:1px solid rgba(6,182,212,0.35);"><h1 style="margin:0;font-size:20px;">${title}</h1></div>
    <div style="padding:24px 28px;font-size:15px;line-height:1.7;color:#d4d4d8;">${body}</div>
    <div style="padding:14px 28px;font-size:12px;color:#71717a;background:rgba(6,182,212,0.05);">NeoKlyn · Bengaluru · neoklyn.com</div>
  </div>`;
}

export function linkBtn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;border-radius:8px;background:#06B6D4;color:#04141a;text-decoration:none;font-weight:600;font-size:14px;">${label}</a>`;
}

/**
 * Instant acknowledgement to a new lead, so they know it arrived and what
 * happens next. Capped per address and per IP so the form can't be used to
 * send mail to other people. Never throws.
 */
export async function sendLeadAutoReply(input: { email: string; name?: string | null; ip?: string | null }) {
  try {
    if (!isMailerConfigured()) return;
    const email = input.email.trim().toLowerCase();
    if (!rateLimit(`autoreply:email:${email}`, { limit: 1, windowSeconds: 24 * 60 * 60 }).success) return;
    if (input.ip && !rateLimit(`autoreply:ip:${input.ip}`, { limit: 5, windowSeconds: 60 * 60 }).success) return;

    const first = (input.name || "").trim().split(/\s+/)[0];
    const greeting = first ? `Hi ${escapeHtml(first)},` : "Hi,";
    await sendMail({
      from: `"NeoKlyn" <${CONTACT_EMAIL}>`,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "We got your message — here's what happens next",
      html: shell(
        "Thanks for reaching out",
        `<p>${greeting}</p>
         <p>Your message reached us. A senior engineer reads every enquiry personally and will reply with honest feasibility, a rough timeline and a price range. That is usually within a few hours, and always within 24 hours.</p>
         <p><strong>Want a faster answer?</strong> Message us on WhatsApp or pick a time for a 20-minute call.</p>
         <p>${linkBtn(whatsappUrl("Hi NeoKlyn, I just sent an enquiry from the website"), "WhatsApp us")}${linkBtn(CAL_URL, "Book a 20-min call")}</p>
         <p>While you wait, these may help: <a href="https://neoklyn.com/estimate" style="color:#06B6D4;">instant price estimate</a> · <a href="https://neoklyn.com/website-audit" style="color:#06B6D4;">free website audit</a> · <a href="https://neoklyn.com/work" style="color:#06B6D4;">our work</a>.</p>
         <p>— Team NeoKlyn</p>`
      ),
    });
  } catch (error) {
    console.error("Lead auto-reply failed:", error);
  }
}

/** Immediate alert to the owner with the lead's details and a one-click reply. Never throws. */
export async function notifyOwnerOfLead(input: {
  name?: string | null;
  email: string;
  company?: string | null;
  source?: string | null;
  segment?: Segment | null;
  budget?: string | null;
  message?: string | null;
  attribution?: Record<string, string>;
}) {
  try {
    if (!isMailerConfigured()) return;
    const tag = input.segment === "hot" ? "[HOT] " : "";
    const who = input.name || input.email;
    const rows: Array<[string, string | null | undefined]> = [
      ["Name", input.name],
      ["Email", input.email],
      ["Company", input.company],
      ["Budget", input.budget],
      ["Source", input.source],
      ["Came from", input.attribution?.utm_source || input.attribution?.referrer],
      ["Campaign", input.attribution?.utm_campaign],
      ["Landing page", input.attribution?.landing_page],
    ];
    const table = rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="color:#a1a1aa;padding:4px 14px 4px 0;vertical-align:top;">${k}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("");
    await sendMail({
      from: `"NeoKlyn Website" <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: input.email,
      subject: `${tag}New lead: ${who} (${input.source || "website"})`,
      html: shell(
        `${tag}New lead`,
        `<table style="border-collapse:collapse;font-size:14px;">${table}</table>
         ${input.message ? `<p style="margin-top:16px;white-space:pre-wrap;">${escapeHtml(input.message)}</p>` : ""}
         <p style="margin-top:18px;"><a href="mailto:${escapeHtml(input.email)}" style="color:#06B6D4;">Reply by email</a> · Reply within the hour.</p>`
      ),
    });
  } catch (error) {
    console.error("Owner lead alert failed:", error);
  }
}
