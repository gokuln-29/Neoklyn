import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { logAudit } from "@/lib/audit";
import type { ZodType } from "zod";

// Internal loose delegate shape — Prisma's generated delegate generics are too
// strict to type structurally, so the factory casts to this at the call sites.
type ModelDelegate = {
  findMany: (args?: object) => Promise<unknown[]>;
  create: (args: { data: object }) => Promise<{ id: string }>;
  update: (args: { where: { id: string }; data: object }) => Promise<{ id: string }>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

type CrudConfig = {
  /** Prisma model delegate, e.g. db.testimonial */
  model: object;
  /** Entity name for audit logs */
  entity: string;
  /** Zod schema for create (update uses .partial()) */
  createSchema: ZodType;
  updateSchema: ZodType;
  /** Prisma orderBy for list */
  orderBy?: object[];
};

export function makeCrudHandlers(config: CrudConfig) {
  const orderBy = config.orderBy || [{ sortOrder: "asc" }, { createdAt: "desc" }];
  const model = config.model as ModelDelegate;

  async function GET() {
    const session = await requireAdmin();
    if (isErrorResponse(session)) return session;
    try {
      const items = await model.findMany({ orderBy });
      return NextResponse.json({ items });
    } catch (error) {
      return handleApiError(error);
    }
  }

  async function POST(req: NextRequest) {
    const session = await requireAdmin(["ADMIN", "EDITOR"]);
    if (isErrorResponse(session)) return session;
    try {
      const data = config.createSchema.parse(await req.json());
      const item = await model.create({ data: data as object });
      await logAudit({ userId: session.userId, action: "CREATE", entity: config.entity, entityId: item.id });
      return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
      return handleApiError(error);
    }
  }

  async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin(["ADMIN", "EDITOR"]);
    if (isErrorResponse(session)) return session;
    try {
      const { id } = await params;
      const data = config.updateSchema.parse(await req.json());
      const item = await model.update({ where: { id }, data: data as object });
      await logAudit({ userId: session.userId, action: "UPDATE", entity: config.entity, entityId: id });
      return NextResponse.json({ item });
    } catch (error) {
      return handleApiError(error);
    }
  }

  async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin(["ADMIN", "EDITOR"]);
    if (isErrorResponse(session)) return session;
    try {
      const { id } = await params;
      await model.delete({ where: { id } });
      await logAudit({ userId: session.userId, action: "DELETE", entity: config.entity, entityId: id });
      return NextResponse.json({ success: true });
    } catch (error) {
      return handleApiError(error);
    }
  }

  return { GET, POST, PATCH, DELETE };
}

export { db };
