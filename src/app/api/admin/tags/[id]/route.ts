import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { updateTagSchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/tags/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const data = updateTagSchema.parse(await req.json());
    const tag = await db.tag.update({ where: { id }, data });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "Tag",
      entityId: id,
      metadata: { name: tag.name },
    });

    return NextResponse.json({ tag });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/admin/tags/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const tag = await db.tag.delete({ where: { id } });

    await logAudit({
      userId: session.userId,
      action: "DELETE",
      entity: "Tag",
      entityId: id,
      metadata: { name: tag.name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
