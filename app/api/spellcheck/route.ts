export const config = {
  runtime: 'nodejs',
}

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Nspell from "nspell";

import { NextResponse } from "next/server";
import isoCodes from '../../lib/languages-code-list.json'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const { word, langCode } = await req.json();
  
  const iso1 = isoCodes.find((codes: any) => codes['alpha3-b'] === langCode)?.alpha2;

  if (!word) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  const affPath = `dictionaries/${iso1}/index.aff`;  // Шлях до файлів в S3
  const dicPath = `dictionaries/${iso1}/index.dic`;

  console.log('Dictionary aff path:', affPath);
  console.log('Dictionary dic path:', dicPath);

  
  try {
 

    // Отримання файлів з S3
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME is not set");
    }

    const affParams = {
      Bucket: bucketName,
      Key: affPath,
    };

    const dicParams = {
      Bucket: bucketName,
      Key: dicPath,
    };

    const affData = await s3Client.send(new GetObjectCommand(affParams));
    const dicData = await s3Client.send(new GetObjectCommand(dicParams));

    // Читання вмісту файлів
    const aff = await streamToString(affData.Body);
    const dic = await streamToString(dicData.Body);

    if (!aff || !dic) {
      return NextResponse.json({ error: "Dictionary files not found" }, { status: 404 });
    }


    const dict = new Nspell(aff, dic);

    if (!dict) {
      return NextResponse.json({ correct: true, suggestions: [] });
    }

    const isCorrect = dict.correct(word);
    const suggestions = isCorrect ? [] : dict.suggest(word);

    return NextResponse.json({ correct: isCorrect, suggestions });
  } catch (error) {
    console.error("Error loading dictionary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


async function streamToString(stream: any): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}