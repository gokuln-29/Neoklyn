import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { logAudit } from "@/lib/audit";
import type { Prisma } from "@prisma/client";

// GET /api/admin/media - list all media assets
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || undefined;
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "all"; // all, image, video, pdf

    // Build query conditions
    const where: Prisma.MediaWhereInput = {};
    if (folder) {
      where.folder = folder;
    }
    if (search) {
      where.filename = { contains: search, mode: "insensitive" };
    }
    if (type !== "all") {
      if (type === "pdf") {
        where.mimeType = { contains: "pdf", mode: "insensitive" };
      } else {
        where.mimeType = { contains: type, mode: "insensitive" };
      }
    }

    const mediaList = await db.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(mediaList);
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

// POST /api/admin/media - upload new media asset
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(buffer, folder, file.name);
    } catch (err) {
      console.error("Cloudinary upload failed, falling back to local storage:", err);
      // Fallback: store the file on local disk under public/uploads so the URL actually works
      const { writeFile, mkdir } = await import("fs/promises");
      const path = await import("path");
      const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "general";
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const dir = path.join(process.cwd(), "public", "uploads", safeFolder);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, safeName), buffer);
      uploadResult = {
        url: `/uploads/${safeFolder}/${safeName}`,
        publicId: `mock_${Date.now()}`,
        width: null as number | null,
        height: null as number | null,
        size: file.size,
        mimeType: file.type,
      };
    }

    // Save metadata in database
    const media = await db.media.create({
      data: {
        filename: file.name,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        mimeType: uploadResult.mimeType || file.type,
        size: uploadResult.size || file.size,
        width: uploadResult.width,
        height: uploadResult.height,
        altText,
        folder,
        uploadedById: session.user.id,
      },
    });

    // Log the audit trail
    await logAudit({
      userId: session.user.id,
      action: "UPLOAD",
      entity: "Media",
      entityId: media.id,
      metadata: { filename: file.name, url: media.url },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Media upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
