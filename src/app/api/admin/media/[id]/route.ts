import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { logAudit } from "@/lib/audit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const media = await db.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    // Delete from Cloudinary if publicId exists
    if (media.publicId && !media.publicId.startsWith("mock_")) {
      await deleteFromCloudinary(media.publicId);
    }

    // Delete from database
    await db.media.delete({
      where: { id },
    });

    // Log the audit trail
    await logAudit({
      userId: session.user.id,
      action: "DELETE",
      entity: "Media",
      entityId: id,
      metadata: { filename: media.filename, url: media.url },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
