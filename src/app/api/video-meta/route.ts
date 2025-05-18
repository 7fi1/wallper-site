import { NextResponse, NextRequest } from "next/server";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req: NextRequest) {
  const { KEY_TO_FETCH } = await req.json();
  if (!KEY_TO_FETCH) {
    return NextResponse.json({ error: "Отсутствует ключ" }, { status: 400 });
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      id: { S: KEY_TO_FETCH },
    },
  };

  try {
    const command = new GetItemCommand(params);
    const data = await client.send(command);

    if (!data.Item) {
      return NextResponse.json({ error: "Ключ не найден" }, { status: 404 });
    }

    const videoMeta = {
      id: data.Item.id.S,
      age: data.Item.age.S,
      author: data.Item.author.S,
      createdAt: data.Item.createdAt.S,
      duration: parseInt(data.Item.duration.N, 10),
      isPublic: data.Item.createdAt.BOOL,
      likes: parseInt(data.Item.likes.N, 10),
      name: data.Item.name.S,
      resolution: data.Item.resolution.S,
      sizeMB: parseInt(data.Item.sizeMB.N, 10),
      status: data.Item.status.S,
    };

    return NextResponse.json(videoMeta);
  } catch (err) {
    console.error("Ошибка при получении метаданных видео:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
