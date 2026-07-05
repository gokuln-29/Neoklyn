import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Only configure if credentials are provided
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export { cloudinary };

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
}

/**
 * Upload a file buffer to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "general",
  filename?: string
): Promise<UploadResult> {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `neoklyn/${folder}`,
        public_id: filename ? filename.split(".")[0] : undefined,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width || 0,
          height: result.height || 0,
          size: result.bytes || 0,
          mimeType: `${result.resource_type}/${result.format}`,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Delete an asset from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}
