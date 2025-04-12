import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// Инициализация клиента S3
const s3 = new S3Client({
  region: "eu-north-1", // Ваш регион
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const OLD_BUCKET_NAME = "wallper-moderate"; // Исходный бакет
const NEW_BUCKET_NAME = "wallper-user-generated"; // Новый бакет

// Обработчик для переноса видео
export async function POST(req: Request) {
  try {
    const { name } = await req.json(); // Получаем ключ (name) из тела запроса

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Ключ видео не предоставлен" }),
        { status: 400 }
      );
    }

    // Шаг 1: Скачиваем видео из старого бакета
    const getCommand = new GetObjectCommand({
      Bucket: OLD_BUCKET_NAME,
      Key: name, // Ключ видео
    });

    const { Body } = await s3.send(getCommand);

    if (!Body) {
      return new Response(
        JSON.stringify({ error: "Не удалось скачать видео из S3" }),
        { status: 500 }
      );
    }

    // Шаг 2: Загружаем видео в новый бакет
    const putCommand = new PutObjectCommand({
      Bucket: NEW_BUCKET_NAME,
      Key: name, // Ключ видео
      Body: Body, // Тело видео
    });

    await s3.send(putCommand); // Отправка запроса на загрузку

    // Шаг 3: Удаляем видео из старого бакета
    const deleteCommand = new DeleteObjectCommand({
      Bucket: OLD_BUCKET_NAME,
      Key: name, // Ключ видео
    });

    await s3.send(deleteCommand); // Отправка запроса на удаление из S3

    return new Response(
      JSON.stringify({ message: "Видео успешно перенесено и удалено" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при перемещении видео:", error);
    return new Response(
      JSON.stringify({ error: "Не удалось переместить видео" }),
      { status: 500 }
    );
  }
}
