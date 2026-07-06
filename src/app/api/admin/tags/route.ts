import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { createTagSchema, generateSlug } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

// GET /api/admin/tags?search= — supports autocomplete
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const search = req.nextUrl.searchParams.get("search")?.trim();
    const tags = await db.tag.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
      take: search ? 10 : undefined,
    });
    return NextResponse.json({ tags });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/admin/tags — create (slug auto-generated if omitted)
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const body = await req.json();
    if (body.name && !body.slug) {
      body.slug = generateSlug(body.name);
    }
    const data = createTagSchema.parse(body);

    // Idempotent by design: the AI "suggest tags" feature frequently suggests
    // tags that already exist, which is a normal, expected case, not an error.
    const existing = await db.tag.findUnique({ where: { name: data.name } });
    if (existing) {
      return NextResponse.json({ tag: existing }, { status: 200 });
    }

    const tag = await db.tag.create({ data });

    await logAudit({
      userId: session.userId,
      action: "CREATE",
      entity: "Tag",
      entityId: tag.id,
      metadata: { name: tag.name },
    });

    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
