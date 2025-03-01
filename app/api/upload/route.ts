import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log(formData, ' form data')
    console.log(file, ' file')


    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = generateFileName(file.name);


    const uploadParams = {
      Bucket: process.env.AWS_PHOTO_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    };

    console.log(uploadParams, ' params')

    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_PHOTO_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("❌ Помилка при завантаженні у S3:", error);

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

const generateFileName = (originalName: string) => {
  const timestamp = Date.now(); 

  const hash = crypto.createHash("sha256").update(originalName + timestamp).digest("hex").substring(0, 8);
  const extension = originalName.split(".").pop(); 

  return `${timestamp}-${hash}.${extension}`;
};
