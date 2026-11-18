import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createLeadSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";
import { handleApiError } from "@/lib/adminApi";
import { cleanAttribution, notifyOwnerOfLead, segmentFromBudget, sendLeadAutoReply } from "@/lib/leadFollowUp";

// POST /api/leads — public lead capture (rate limited)
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
  const rl = rateLimit(getRateLimitKey(ip, "leads"), { limit: 10, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const data = createLeadSchema.parse(await req.json());

    const meta =
      data.metadata && typeof data.metadata === "object" ? (data.metadata as Record<string, unknown>) : {};
    const attribution = cleanAttribution(meta.attribution);
    const budget = typeof meta.budget === "string" ? meta.budget : undefined;
    // Larger budgets get the "hot" tag so they show first in admin and in the owner alert.
    const segment = data.segment ?? (data.type === "CONTACT" ? segmentFromBudget(budget) : undefined);

    const lead = await db.lead.create({
      data: {
        type: data.type,
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message || null,
        source: data.source || null,
        segment,
        metadata: data.metadata ? JSON.parse(JSON.stringify({ ...meta, attribution })) : undefined,
      },
    });

    // Instant follow-up for form and chat leads. The estimate and audit
    // routes send their own emails, so they are not repeated here.
    if (data.type === "CONTACT" || data.type === "AI_DEMO") {
      void notifyOwnerOfLead({
        name: data.name,
        email: data.email,
        company: data.company,
        source: data.source,
        segment,
        budget,
        message: data.message,
        attribution,
      });
      void sendLeadAutoReply({ email: data.email, name: data.name, ip });
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
