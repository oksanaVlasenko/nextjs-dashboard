import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand  } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: NextRequest) {
  try {
    const { fileUrl } = await req.json()

    if (!fileUrl) {
      return NextResponse.json({ error: "File URL is required" }, { status: 400 });
    }

    const fileName = fileUrl.split("/").pop()

    const params = {
      Bucket: process.env.AWS_PHOTO_BUCKET_NAME!,
      Key: fileName,
    };

    await s3Client.send(new DeleteObjectCommand(params));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Deleting failed" }, { status: 500 });
  }
}
