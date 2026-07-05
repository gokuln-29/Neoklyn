import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { updateSettingSchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

// GET /api/admin/settings — all settings grouped
export async function GET() {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const settings = await db.siteSetting.findMany({
      orderBy: [{ group: "asc" }, { key: "asc" }],
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/admin/settings — upsert one setting by key
export async function PATCH(req: NextRequest) {
  const session = await requireAdmin(["ADMIN"]);
  if (isErrorResponse(session)) return session;

  try {
    const data = updateSettingSchema.parse(await req.json());
    const setting = await db.siteSetting.upsert({
      where: { key: data.key },
      create: {
        key: data.key,
        value: JSON.parse(JSON.stringify(data.value)),
        group: data.group || "GENERAL",
        label: data.label,
      },
      update: {
        value: JSON.parse(JSON.stringify(data.value)),
        ...(data.label ? { label: data.label } : {}),
      },
    });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: setting.id,
      metadata: { key: data.key },
    });

    return NextResponse.json({ setting });
  } catch (error) {
    return handleApiError(error);
  }
}
