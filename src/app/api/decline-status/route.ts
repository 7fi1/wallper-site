import { NextResponse, NextRequest } from "next/server";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { currentKey } = await req.json();

  if (!currentKey) {
    return NextResponse.json({ error: "Отсутствует ключ" }, { status: 400 });
  }

  const cleanKey = currentKey.replace(/\.mp4$/, "");

  try {
    const existing = await client.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Key: { id: { S: cleanKey } },
      })
    );

    if (!existing.Item) {
      return NextResponse.json({ error: "Ключ не найден" }, { status: 404 });
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        id: { S: cleanKey },
      },
      UpdateExpression: "SET #s = :status",
      ExpressionAttributeNames: {
        "#s": "status",
      },
      ExpressionAttributeValues: {
        ":status": { S: "Declined" },
      },
      ConditionExpression: "attribute_exists(id)",
      ReturnValues: "ALL_NEW" as const,
    };

    const command = new UpdateItemCommand(params);
    const data = await client.send(command);

    return NextResponse.json({
      message: "Статус обновлен",
      updatedItem: data.Attributes,
    });
  } catch (err) {
    console.error("Ошибка при обновлении статуса:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
