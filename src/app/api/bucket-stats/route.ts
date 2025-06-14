import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";

const BUCKETS = [
  process.env.MODERATE_BUCKET_NAME!,
  process.env.USER_GENERATED_BUCKET_NAME!,
  process.env.WALLPER_VIDEO_BUCKET_NAME!,
];

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

export async function GET() {
  try {
    const results = await Promise.all(
      BUCKETS.map(async (bucket) => {
        let continuationToken: string | undefined = undefined;
        let videoCount = 0;
        let totalSize = 0;

        do {
          const command = new ListObjectsV2Command({
            Bucket: bucket,
            ContinuationToken: continuationToken,
          });

          const response = await s3.send(command);

          const contents: _Object[] = response.Contents ?? [];
          for (const obj of contents) {
            if (obj.Key?.endsWith(".mp4")) {
              videoCount++;
              totalSize += obj.Size ?? 0;
            }
          }

          continuationToken = response.IsTruncated
            ? response.NextContinuationToken
            : undefined;
        } while (continuationToken);

        const sizeMB = Math.round((totalSize / 1024 / 1024) * 10) / 10;

        return {
          name: bucket,
          videoCount,
          sizeMB,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("S3 error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
