import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ZodError } from "zod";

export type AdminSession = {
  userId: string;
  role: string;
  email: string;
};

/**
 * Require an authenticated admin session for an API route.
 * Returns the session info, or a NextResponse error to return directly.
 */
export async function requireAdmin(
  allowedRoles: string[] = ["ADMIN", "EDITOR", "AUTHOR"]
): Promise<AdminSession | NextResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as { role?: string }).role || "AUTHOR";

  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return {
    userId: session.user.id,
    role,
    email: session.user.email || "",
  };
}

export function isErrorResponse(
  result: AdminSession | NextResponse
): result is NextResponse {
  return result instanceof NextResponse;
}

/** Standard error handler for admin API routes */
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", issues: error.issues },
      { status: 400 }
    );
  }

  // Prisma unique constraint violation
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  ) {
    return NextResponse.json(
      { error: "A record with this value already exists (unique constraint)" },
      { status: 409 }
    );
  }

  console.error("Admin API error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
