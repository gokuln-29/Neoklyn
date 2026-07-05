import crypto from "crypto";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export type UploadResult = {
  url: string;
  publicId: string | null;
  width: number | null;
  height: number | null;
};

function cloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function signParams(params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(sorted + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");
}

async function uploadToCloudinary(file: File, folder: string): Promise<UploadResult> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
  const timestamp = String(Math.floor(Date.now() / 1000));
  const paramsToSign: Record<string, string> = { folder: `neoklyn/${folder}`, timestamp };
  const signature = signParams(paramsToSign);

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", process.env.CLOUDINARY_API_KEY!);
  form.append("timestamp", timestamp);
  form.append("folder", `neoklyn/${folder}`);
  form.append("signature", signature);

  const resourceType = file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : "raw";
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Cloudinary upload failed (${res.status})`);
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width ?? null,
    height: data.height ?? null,
  };
}

async function uploadToLocal(file: File, folder: string): Promise<UploadResult> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safeName), bytes);
  return {
    url: `/uploads/${folder}/${safeName}`,
    publicId: null,
    width: null,
    height: null,
  };
}

export async function uploadMedia(file: File, folder: string): Promise<UploadResult & { storage: "cloudinary" | "local" }> {
  if (cloudinaryConfigured()) {
    const result = await uploadToCloudinary(file, folder);
    return { ...result, storage: "cloudinary" };
  }
  const result = await uploadToLocal(file, folder);
  return { ...result, storage: "local" };
}

export async function deleteMedia(opts: { publicId: string | null; url: string; mimeType: string }): Promise<void> {
  if (opts.publicId && cloudinaryConfigured()) {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
    const timestamp = String(Math.floor(Date.now() / 1000));
    const paramsToSign: Record<string, string> = { public_id: opts.publicId, timestamp };
    const signature = signParams(paramsToSign);

    const form = new FormData();
    form.append("public_id", opts.publicId);
    form.append("api_key", process.env.CLOUDINARY_API_KEY!);
    form.append("timestamp", timestamp);
    form.append("signature", signature);

    const resourceType = opts.mimeType.startsWith("video/") ? "video" : opts.mimeType.startsWith("image/") ? "image" : "raw";
    await fetch(`https://api.cloudinary.com/v1_1/${cloud}/${resourceType}/destroy`, {
      method: "POST",
      body: form,
    });
    return;
  }

  // Local file
  if (opts.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", opts.url));
    } catch {
      // File already gone — ignore
    }
  }
}
