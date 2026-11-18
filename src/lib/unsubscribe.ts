import { createHmac, timingSafeEqual } from "node:crypto";

const SITE = "https://neoklyn.com";

function secret(): string | null {
  return process.env.UNSUBSCRIBE_SECRET || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || null;
}

/** True when unsubscribe links can be signed. Marketing mail must not be sent without it. */
export function canSignUnsubscribe(): boolean {
  return !!secret();
}

function sign(email: string): string {
  const key = secret();
  if (!key) throw new Error("No secret configured for unsubscribe links (UNSUBSCRIBE_SECRET, AUTH_SECRET or NEXTAUTH_SECRET).");
  return createHmac("sha256", key).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function encodeEmail(email: string): string {
  return Buffer.from(email.trim().toLowerCase(), "utf8").toString("base64url");
}

export function decodeEmail(encoded: string): string | null {
  try {
    const email = Buffer.from(encoded, "base64url").toString("utf8");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 ? email : null;
  } catch {
    return null;
  }
}

/** Verifies the (email, token) pair from an unsubscribe link. */
export function verifyUnsubscribe(encodedEmail: string, token: string): string | null {
  const email = decodeEmail(encodedEmail);
  if (!email || !secret()) return null;
  const expected = Buffer.from(sign(email));
  const given = Buffer.from(String(token || ""));
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  return email;
}

/** Link shown in the email footer (opens a confirmation page). */
export function unsubscribePageUrl(email: string): string {
  return `${SITE}/unsubscribe?e=${encodeEmail(email)}&t=${sign(email)}`;
}

/** URL for the List-Unsubscribe header; mail clients POST to it for one-click unsubscribe. */
export function unsubscribeApiUrl(email: string): string {
  return `${SITE}/api/unsubscribe?e=${encodeEmail(email)}&t=${sign(email)}`;
}
