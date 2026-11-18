import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getRateLimitKey, rateLimit } from "@/lib/rateLimit";
import { verifyUnsubscribe } from "@/lib/unsubscribe";

export const runtime = "nodejs";

/**
 * Unsubscribes an email address from marketing follow-ups. Accepts the signed
 * (e, t) pair either in the query string (List-Unsubscribe one-click POST from
 * mail clients) or in a JSON body (the confirmation page).
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
  if (!rateLimit(getRateLimitKey(ip, "unsubscribe"), { limit: 20, windowSeconds: 60 }).success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let e = req.nextUrl.searchParams.get("e") || "";
  let t = req.nextUrl.searchParams.get("t") || "";
  if (!e || !t) {
    try {
      const body = (await req.json()) as { e?: string; t?: string };
      e = body.e || "";
      t = body.t || "";
    } catch {
      /* fall through to invalid */
    }
  }

  const email = verifyUnsubscribe(e, t);
  if (!email) return NextResponse.json({ error: "Invalid or expired link." }, { status: 400 });

  try {
    const leads = await db.lead.findMany({ where: { email: { equals: email, mode: "insensitive" } } });
    const stamp = new Date().toISOString();
    for (const lead of leads) {
      const meta = lead.metadata && typeof lead.metadata === "object" && !Array.isArray(lead.metadata) ? lead.metadata : {};
      await db.lead.update({ where: { id: lead.id }, data: { metadata: { ...meta, unsubscribed_at: stamp } } });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unsubscribe failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please email hello@neoklyn.com." }, { status: 500 });
  }
}
