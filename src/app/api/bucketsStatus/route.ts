import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    const urls = (process.env.BUCKETS_URL ?? "")
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    if (urls.length === 0) {
      return NextResponse.json(
        { error: "No valid URLs provided" },
        { status: 400 }
      );
    }

    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const xmlTexts = await Promise.all(responses.map((res) => res.text()));

    const parsedData = await Promise.all(
      xmlTexts.map((xml) => parseStringPromise(xml))
    );

    const allContents = parsedData.flatMap(
      (xml) => xml?.ListBucketResult?.Contents ?? []
    );

    const totalVideos = allContents.length;

    const fileSize = allContents.map((file) => ({
      size: parseInt(file.Size?.[0] ?? "0", 10),
    }));

    const totalSize = fileSize.reduce((acc, file) => acc + file.size, 0);
    const totalSizeInGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);

    return NextResponse.json({
      totalVideos,
      totalSizeInGB,
    });
  } catch (err) {
    console.error("Parse error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: (err as Error).message },
      { status: 500 }
    );
  }
}
