import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { applyRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

function uploadBufferToCloudinary(
  buffer: Buffer,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "soledrop",
        resource_type: "image",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "anonymous";
  const rateCheck = await applyRateLimit(ip);

  if (rateCheck.error) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateCheck.headers },
    );
  }

  try {
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary server credentials are not configured" },
        { status: 500 },
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const filePart = formData.get("file");

      if (!filePart || typeof filePart === "string") {
        return NextResponse.json(
          { error: "Image file required" },
          { status: 400 },
        );
      }

      if (!("arrayBuffer" in filePart)) {
        return NextResponse.json(
          { error: "Unsupported file payload" },
          { status: 400 },
        );
      }

      const arrayBuffer = await filePart.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await uploadBufferToCloudinary(buffer);

      return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL required" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "soledrop",
      transformation: [
        { width: 800, height: 800, crop: "limit", quality: "auto" },
      ],
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
