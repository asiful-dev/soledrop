import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { applyRateLimit } from "@/lib/rate-limit";

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
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
