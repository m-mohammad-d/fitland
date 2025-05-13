import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const tempPath = path.join("/tmp", file.name);
    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(tempPath, buffer);

    const uploadResult = await cloudinary.uploader.upload(tempPath, {
      public_id: `image_${Math.random().toString(36).substr(2, 9)}`,
    });

    fs.unlinkSync(tempPath);

    return NextResponse.json(
      {
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
