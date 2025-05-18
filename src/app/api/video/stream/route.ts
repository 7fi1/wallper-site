// app/api/video/stream/route.ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

const BUCKET_NAME = process.env.MODERATE_BUCKET_NAME!;

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return new Response("Missing video name", { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: name,
    });

    const { Body, ContentType } = await s3.send(command);

    return new Response(Body as ReadableStream, {
      headers: {
        "Content-Type": ContentType || "video/mp4",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
    });
  } catch (err) {
    console.error("Stream error:", err);
    return new Response("Error while streaming", { status: 500 });
  }
}
