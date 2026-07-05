import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { updateLeadStatusSchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/leads/[id] — update status
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const data = updateLeadStatusSchema.parse(await req.json());
    const lead = await db.lead.update({ where: { id }, data: { status: data.status } });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "Lead",
      entityId: id,
      metadata: { status: data.status },
    });

    return NextResponse.json({ lead });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/admin/leads/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    await db.lead.delete({ where: { id } });

    await logAudit({
      userId: session.userId,
      action: "DELETE",
      entity: "Lead",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
