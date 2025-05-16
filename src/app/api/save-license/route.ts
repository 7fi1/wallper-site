import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
  try {
    const { licenseUuid } = await req.json();

    if (!licenseUuid) {
      return NextResponse.json(
        { error: "licenseUuid is required" },
        { status: 400 }
      );
    }

    const bucketName = process.env.S3_BUCKET_NAME!;
    const fileKey = "license_keys.json";

    let existingData: Record<string, { devices: string[] }> = {};

    try {
      const data = await s3
        .getObject({ Bucket: bucketName, Key: fileKey })
        .promise();

      const fileContent = data.Body?.toString("utf-8") || "{}";
      existingData = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== "NoSuchKey") {
        console.error("S3 read error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    if (!existingData[licenseUuid]) {
      existingData[licenseUuid] = { devices: [] };

      await s3
        .putObject({
          Bucket: bucketName,
          Key: fileKey,
          Body: JSON.stringify(existingData, null, 2),
          ContentType: "application/json",
        })
        .promise();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("S3 Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
