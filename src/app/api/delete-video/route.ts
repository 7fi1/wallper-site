import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

const MODERATE_BUCKET_NAME = process.env.MODERATE_BUCKET_NAME!;

export async function DELETE(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Ключ видео не предоставлен" }),
        { status: 400 }
      );
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: MODERATE_BUCKET_NAME,
      Key: name,
    });

    await s3.send(deleteCommand);
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
