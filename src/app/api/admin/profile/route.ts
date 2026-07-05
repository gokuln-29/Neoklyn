import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { changePasswordSchema } from "@/lib/validation";
import { logAudit } from "@/lib/audit";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  bio: z.string().max(2000).optional().nullable(),
  avatar: z.string().max(500).optional().nullable(),
});

// GET /api/admin/profile — current user info
export async function GET() {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, role: true, avatar: true, bio: true, createdAt: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/admin/profile — update name/bio/avatar
export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const data = updateProfileSchema.parse(await req.json());
    const user = await db.user.update({
      where: { id: session.userId },
      data,
      select: { id: true, email: true, name: true, role: true, avatar: true, bio: true },
    });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "User",
      entityId: session.userId,
      metadata: { profile: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/admin/profile — change password
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const data = changePasswordSchema.parse(await req.json());

    const user = await db.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentValid = await bcrypt.compare(data.currentPassword, user.password);
    if (!currentValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(data.newPassword, 12);
    await db.user.update({
      where: { id: session.userId },
      data: { password: hashed },
    });

    await logAudit({
      userId: session.userId,
      action: "PASSWORD_CHANGE",
      entity: "User",
      entityId: session.userId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
