import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { logAudit } from "@/lib/audit";
import { applyAction, getStats, normalizeEmail, normalizePhone, normalizeWebsite, OutreachError, present } from "@/lib/outreach";

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  action: z.enum(["approve", "requeue", "skip", "sent", "replied", "won", "lost", "optout", "regenerate"]).optional(),
  draft: z.string().max(4000).optional(),
  notes: z.string().max(2000).optional(),
  observation: z.string().max(600).optional(),
  contactName: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  email: z.string().max(254).optional(),
  website: z.string().max(300).optional(),
});

// PATCH /api/admin/outreach/[id]: edit fields and/or apply one workflow action
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;
  try {
    const { id } = await params;
    const body = patchSchema.parse(await req.json());

    const existing = await db.outreachProspect.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    if (existing.status === "OPTED_OUT") {
      return NextResponse.json({ error: "This person asked not to be contacted, so nothing can change here." }, { status: 409 });
    }

    // Edits first (a sent message cannot be rewritten after the fact).
    const data: Record<string, unknown> = {};
    if (body.draft !== undefined) {
      if (["SENT", "REPLIED", "WON", "LOST"].includes(existing.status)) {
        return NextResponse.json({ error: "A message that was already sent can't be edited" }, { status: 409 });
      }
      data.draft = body.draft.trim() || null;
      // Editing an approved message sends it back for another look.
      if (existing.status === "APPROVED") data.status = "QUEUED";
    }
    if (body.notes !== undefined) data.notes = body.notes.trim() || null;
    if (body.observation !== undefined) data.observation = body.observation.trim() || null;
    if (body.contactName !== undefined) data.contactName = body.contactName.trim() || null;
    if (body.phone !== undefined) {
      const phone = normalizePhone(body.phone);
      if (body.phone.trim() && !phone) return NextResponse.json({ error: "That phone number doesn't look right" }, { status: 400 });
      data.phone = phone;
    }
    if (body.email !== undefined) {
      const email = normalizeEmail(body.email);
      if (body.email.trim() && !email) return NextResponse.json({ error: "That email address doesn't look right" }, { status: 400 });
      data.email = email;
    }
    if (body.website !== undefined) {
      const website = normalizeWebsite(body.website);
      if (body.website.trim() && !website) return NextResponse.json({ error: "That website address isn't valid" }, { status: 400 });
      data.website = website;
    }
    if (Object.keys(data).length) await db.outreachProspect.update({ where: { id }, data });

    const prospect = body.action ? await applyAction(id, body.action) : await db.outreachProspect.findUniqueOrThrow({ where: { id } });
    if (body.action) {
      await logAudit({ userId: session.userId, action: "UPDATE", entity: "OutreachProspect", entityId: id, metadata: { action: body.action } });
    }
    return NextResponse.json({ prospect: present(prospect), stats: await getStats() });
  } catch (error) {
    if (error instanceof OutreachError) return NextResponse.json({ error: error.message }, { status: 409 });
    return handleApiError(error);
  }
}

// DELETE /api/admin/outreach/[id]: remove a prospect (not allowed for people who opted out,
// so they cannot be re-imported and contacted again)
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;
  try {
    const { id } = await params;
    const existing = await db.outreachProspect.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    if (existing.status === "OPTED_OUT") {
      return NextResponse.json({ error: "Opted-out contacts are kept so they are never messaged again" }, { status: 409 });
    }
    await db.outreachProspect.delete({ where: { id } });
    await logAudit({ userId: session.userId, action: "DELETE", entity: "OutreachProspect", entityId: id });
    return NextResponse.json({ success: true, stats: await getStats() });
  } catch (error) {
    return handleApiError(error);
  }
}
