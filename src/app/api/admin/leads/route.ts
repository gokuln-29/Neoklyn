import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import type { Prisma, LeadType, LeadStatus } from "@prisma/client";

// GET /api/admin/leads — list with filters
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const params = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const perPage = Math.min(100, Math.max(1, parseInt(params.get("perPage") || "25", 10)));
    const type = params.get("type");
    const status = params.get("status");
    const search = params.get("search")?.trim();
    const from = params.get("from");
    const to = params.get("to");

    const where: Prisma.LeadWhereInput = {};
    if (type && ["CONTACT", "CONSULTATION", "NEWSLETTER", "AI_DEMO", "PDF_DOWNLOAD"].includes(type)) {
      where.type = type as LeadType;
    }
    if (status && ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"].includes(status)) {
      where.status = status as LeadStatus;
    }
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }
    if (from || to) {
      where.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(`${to}T23:59:59`) } : {}),
      };
    }

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      db.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
