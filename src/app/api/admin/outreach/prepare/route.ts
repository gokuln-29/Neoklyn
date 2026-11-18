import { NextResponse } from "next/server";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { getStats, prepareBatch } from "@/lib/outreach";

export const runtime = "nodejs";
export const maxDuration = 60;

// POST /api/admin/outreach/prepare: audit and draft the next few new prospects.
// The page calls this repeatedly until nothing is left, so no single request runs long.
export async function POST() {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;
  try {
    const result = await prepareBatch(4);
    return NextResponse.json({ ...result, stats: await getStats() });
  } catch (error) {
    return handleApiError(error);
  }
}
