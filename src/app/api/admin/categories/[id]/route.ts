import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { updateCategorySchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/admin/categories/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const data = updateCategorySchema.parse(await req.json());
    const category = await db.category.update({ where: { id }, data });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "Category",
      entityId: id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ category });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const postCount = await db.post.count({ where: { categoryId: id } });
    if (postCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${postCount} post(s) use this category. Reassign them first.` },
        { status: 409 }
      );
    }

    const category = await db.category.delete({ where: { id } });

    await logAudit({
      userId: session.userId,
      action: "DELETE",
      entity: "Category",
      entityId: id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
