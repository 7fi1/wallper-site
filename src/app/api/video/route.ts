// app/api/video/route.ts
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const listResponse = await s3.send(listCommand);

    const videos = await Promise.all(
      listResponse.Contents?.filter((obj) =>
        obj.Key?.match(/\.(mp4|mov|webm)$/)
      ).map(async (obj) => {
        const head = await s3.send(
          new HeadObjectCommand({
            Bucket: BUCKET_NAME,
            Key: obj.Key!,
          })
        );

        return {
          url: `/api/video/stream?name=${encodeURIComponent(obj.Key!)}`,  
          name: obj.Key?.split("/").pop(),
          size: head.ContentLength,
          age: head.Metadata?.age,
          category: head.Metadata?.category,
        };
      }) || []
    );

    return NextResponse.json(videos);
  } catch (err) {
    console.error("S3 error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
