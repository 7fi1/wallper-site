import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const BUCKET_NAMES = (process.env.BUCKETS_URL ?? "")
  .split(",")
  .map((b) => b.trim())
  .filter(Boolean);

if (BUCKET_NAMES.length === 0) {
  throw new Error("No bucket names provided in BUCKETS_URL");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL ?? undefined,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

export async function GET() {
  try {
    let totalVideos = 0;
    let totalSize = 0;

    for (const bucket of BUCKET_NAMES) {
      const command = new ListObjectsV2Command({ Bucket: bucket });
      const result = await s3.send(command);

      const contents = result.Contents ?? [];

      totalVideos += contents.length;
      totalSize += contents.reduce((sum, file) => sum + (file.Size ?? 0), 0);
    }

    const totalSizeInGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);

    return NextResponse.json({
      totalVideos,
      totalSizeInGB,
    });
  } catch (err) {
    console.error("S3 error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: (err as Error).message },
      { status: 500 }
    );
  }
}
