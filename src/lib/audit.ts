import { db } from "@/lib/db";

/**
 * Log an admin action for audit trail
 */
export async function logAudit({
  userId,
  action,
  entity,
  entityId,
  metadata,
}: {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
      },
    });
  } catch (error) {
    // Don't let audit logging failures break the main operation
    console.error("Audit log error:", error);
  }
}
