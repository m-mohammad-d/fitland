import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const tempPath = path.join("/tmp", file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  fs.writeFileSync(tempPath, buffer);

  const uploadResult = await cloudinary.uploader.upload(tempPath, {
    public_id: `image_${Math.random().toString(36).substr(2, 9)}`,
  });

  fs.unlinkSync(tempPath);

  console.log(uploadResult);
}
