import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { createCategorySchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

// GET /api/admin/categories
export async function GET() {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const categories = await db.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/admin/categories
export async function POST(req: NextRequest) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const data = createCategorySchema.parse(await req.json());
    const category = await db.category.create({ data });

    await logAudit({
      userId: session.userId,
      action: "CREATE",
      entity: "Category",
      entityId: category.id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
