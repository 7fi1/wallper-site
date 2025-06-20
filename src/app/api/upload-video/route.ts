// app/api/upload-video/route.ts

import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

const MODERATE_BUCKET = process.env.MODERATE_BUCKET_NAME!;
const APPROVED_BUCKET = process.env.USER_GENERATED_BUCKET_NAME!;

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Не указано имя видео" },
        { status: 400 }
      );
    }

    const key = name.startsWith("/") ? name.slice(1) : name;

    await s3.send(
      new CopyObjectCommand({
        Bucket: APPROVED_BUCKET,
        CopySource: `${MODERATE_BUCKET}/${key}`,
        Key: key,
      })
    );

    return NextResponse.json({ message: "Видео одобрено и перемещено" });
  } catch (err) {
    console.error("Ошибка при одобрении видео:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
