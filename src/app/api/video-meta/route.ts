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

    const item = data.Item;

    const videoMeta = {
      id: item.id.S,
      age: item.age.S,
      author: item.author.S,
      author_name: item.author_name?.S ?? "",
      createdAt: item.createdAt.S,
      duration: parseInt(item.duration.N, 10),
      isPublic: item.isPublic?.BOOL ?? false,
      likes: parseInt(item.likes.N, 10),
      name: item.name.S,
      resolution: item.resolution.S,
      sizeMB: parseFloat(item.sizeMB.N),
      status: item.status.S,
    };

    return NextResponse.json(videoMeta);
  } catch (err) {
    console.error("Ошибка при получении метаданных видео:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
