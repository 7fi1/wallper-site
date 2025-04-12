import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Инициализация клиента S3
const s3 = new S3Client({
  region: "eu-north-1", // Ваш регион
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = "wallper-moderate"; // Ваш бакет S3

// Обработчик для удаления видео
export async function DELETE(req: Request) {
  try {
    const { name } = await req.json(); // Получаем ключ (name) из тела запроса

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Ключ видео не предоставлен" }),
        { status: 400 }
      );
    }

    // Удаление видео по ключу (name) из S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: name, // Используем ключ, переданный в запросе
    });

    await s3.send(deleteCommand); // Отправка запроса на удаление
    return new Response(JSON.stringify({ message: "Видео успешно удалено" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка при удалении видео из S3:", error);
    return new Response(
      JSON.stringify({ error: "Не удалось удалить видео из S3" }),
      { status: 500 }
    );
  }
}
