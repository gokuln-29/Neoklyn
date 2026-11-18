import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { logAudit } from "@/lib/audit";
import { getStats, importProspects, listProspects, parseProspectTable, type OutreachTab } from "@/lib/outreach";

const TABS = ["needs-input", "queue", "ready", "follow-ups", "sent", "closed"] as const;

// GET /api/admin/outreach?tab=queue: prospects for one tab, plus the stats
export async function GET(req: NextRequest) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;
  try {
    const tab = (req.nextUrl.searchParams.get("tab") || "queue") as OutreachTab;
    if (!TABS.includes(tab)) return NextResponse.json({ error: "Unknown tab" }, { status: 400 });
    const [prospects, stats] = await Promise.all([listProspects(tab), getStats()]);
    return NextResponse.json({ prospects, stats });
  } catch (error) {
    return handleApiError(error);
  }
}

const importSchema = z.object({ text: z.string().min(1).max(200_000) });

// POST /api/admin/outreach: import prospects from a pasted table
export async function POST(req: NextRequest) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;
  try {
    const { text } = importSchema.parse(await req.json());
    const parsed = parseProspectTable(text);
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const result = await importProspects(parsed.rows);
    await logAudit({ userId: session.userId, action: "CREATE", entity: "OutreachProspect", metadata: { added: result.added, skipped: result.skipped.length } });
    return NextResponse.json({ ...result, stats: await getStats() }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
