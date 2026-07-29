import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No ZIP file uploaded",
        },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".zip")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a ZIP file.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const zip = new AdmZip(buffer);

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let count = 0;

    for (const entry of zip.getEntries()) {
      if (entry.isDirectory) continue;

      const ext = path.extname(entry.entryName).toLowerCase();

      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

      const filename = path.basename(entry.entryName);

      fs.writeFileSync(
        path.join(uploadDir, filename),
        entry.getData()
      );

      count++;
    }

    return NextResponse.json({
      success: true,
      message: `${count} images uploaded successfully.`,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed.",
      },
      { status: 500 }
    );
  }
}