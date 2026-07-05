import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createLeadSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey } from "@/lib/rateLimit";
import { handleApiError } from "@/lib/adminApi";

// POST /api/leads — public lead capture (rate limited)
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || null;
  const rl = rateLimit(getRateLimitKey(ip, "leads"), { limit: 10, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const data = createLeadSchema.parse(await req.json());

    const lead = await db.lead.create({
      data: {
        type: data.type,
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message || null,
        source: data.source || null,
        metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : undefined,
      },
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
