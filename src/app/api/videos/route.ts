import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = "wallper-moderate";

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
          url: `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${obj.Key}`,
          name: obj.Key?.split("/").pop(),
          size: head.ContentLength,
          age: head.Metadata.age,
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
