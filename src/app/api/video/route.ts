// app/api/video/route.ts
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { DynamoDBClient, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";

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

const dynamo = new DynamoDBClient({ region: "eu-north-1" });
const BUCKET_NAME = process.env.MODERATE_BUCKET_NAME!;
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!;

export async function GET() {
  try {
    const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const listResponse = await s3.send(listCommand);

    const allVideoObjects =
      listResponse.Contents?.filter((obj) =>
        obj.Key?.match(/\.(mp4|mov|webm)$/)
      ) || [];

    const keysWithoutExt = allVideoObjects.map((obj) =>
      obj
        .Key!.split("/")
        .pop()!
        .replace(/\.[^/.]+$/, "")
    );

    const dynamoKeys = keysWithoutExt.map((name) => ({
      id: { S: name },
    }));

    const batchCommand = new BatchGetItemCommand({
      RequestItems: {
        [TABLE_NAME]: {
          Keys: dynamoKeys,
          ProjectionExpression: "id, #st",
          ExpressionAttributeNames: { "#st": "status" },
        },
      },
    });

    const batchResponse = await dynamo.send(batchCommand);
    const items = batchResponse.Responses?.[TABLE_NAME] || [];

    const pendingSet = new Set(
      items
        .filter((item) => item.status?.S === "Pending")
        .map((item) => item.id?.S)
        .filter((id): id is string => Boolean(id))
    );

    const videos = await Promise.all(
      allVideoObjects
        .filter((obj) => {
          const nameWithoutExt = obj
            .Key!.split("/")
            .pop()!
            .replace(/\.[^/.]+$/, "");
          return pendingSet.has(nameWithoutExt);
        })
        .map(async (obj) => {
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
        })
    );

    return NextResponse.json(videos);
  } catch (err) {
    console.error("S3 or DynamoDB error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
