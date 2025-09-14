// app/api/video/route.ts
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
  _Object as S3Object,
} from "@aws-sdk/client-s3";
import {
  DynamoDBClient,
  BatchGetItemCommand,
  BatchGetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
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

const BATCH_SIZE = 100;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function listAllObjects(bucket: string): Promise<S3Object[]> {
  const results: S3Object[] = [];
  let token: string | undefined = undefined;
  do {
    const resp = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: token,
      })
    );
    results.push(...(resp.Contents ?? []));
    token = resp.IsTruncated ? resp.NextContinuationToken : undefined;
  } while (token);
  return results;
}

async function batchGetAllStatusByIds(ids: string[]) {
  if (ids.length === 0) return [];

  const keys = ids.map((id) => ({ id: { S: id } }));
  const batches = chunk(keys, BATCH_SIZE);
  const allItems: any[] = [];

  for (const Keys of batches) {
    let request = {
      RequestItems: {
        [TABLE_NAME]: {
          Keys,
          ProjectionExpression: "id, #st",
          ExpressionAttributeNames: { "#st": "status" },
        },
      },
    };

    let attempt = 0;
    while (true) {
      const resp: BatchGetItemCommandOutput = await dynamo.send(
        new BatchGetItemCommand(request)
      );

      allItems.push(...(resp.Responses?.[TABLE_NAME] ?? []));

      const unprocessed = resp.UnprocessedKeys?.[TABLE_NAME];
      const hasUnprocessed =
        !!unprocessed && (unprocessed.Keys?.length ?? 0) > 0;

      if (!hasUnprocessed) break;

      await new Promise((r) =>
        setTimeout(r, Math.min(8000, 250 * 2 ** attempt++))
      );

      request = {
        RequestItems: {
          [TABLE_NAME]: {
            Keys: resp.UnprocessedKeys![TABLE_NAME].Keys as {
              id: { S: string };
            }[],
            ProjectionExpression: "id, #st",
            ExpressionAttributeNames: { "#st": "status" },
          },
        },
      };
    }
  }

  return allItems;
}

export async function GET() {
  try {
    const allVideoObjects = (await listAllObjects(BUCKET_NAME)).filter((obj) =>
      obj.Key?.match(/\.(mp4|mov|webm)$/i)
    );

    const keysWithoutExt = Array.from(
      new Set(
        allVideoObjects
          .map((obj) => obj.Key?.split("/").pop() ?? "")
          .filter(Boolean)
          .map((name) => name.replace(/\.[^/.]+$/, ""))
      )
    );

    if (keysWithoutExt.length === 0) {
      return NextResponse.json([]);
    }

    const items = await batchGetAllStatusByIds(keysWithoutExt);

    const pendingSet = new Set(
      items
        .filter((it) => it.status?.S === "Pending")
        .map((it) => it.id?.S)
        .filter((id: unknown): id is string => typeof id === "string")
    );

    const pendingObjects = allVideoObjects.filter((obj) => {
      const base = obj.Key?.split("/").pop() ?? "";
      const nameWithoutExt = base.replace(/\.[^/.]+$/, "");
      return pendingSet.has(nameWithoutExt);
    });

    const videos = await Promise.all(
      pendingObjects.map(async (obj) => {
        const head = await s3.send(
          new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: obj.Key! })
        );

        return {
          url: `/api/video/stream?name=${encodeURIComponent(obj.Key!)}`,
          name: obj.Key?.split("/").pop(),
          size: head.ContentLength ?? obj.Size,
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
