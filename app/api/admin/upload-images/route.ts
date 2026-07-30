import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { prisma } from "@/lib/prisma";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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

    if (!file.name.toLowerCase().endsWith(".zip")) {
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

    let count = 0;

    for (const entry of zip.getEntries()) {
      if (entry.isDirectory) continue;

      const ext = path.extname(entry.entryName).toLowerCase();

      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

      const filename = path.basename(entry.entryName);

      const contentType =
        ext === ".png"
          ? "image/png"
          : ext === ".webp"
          ? "image/webp"
          : "image/jpeg";

      const { error } = await supabase.storage
        .from("products")
        .upload(filename, entry.getData(), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error(`Failed to upload ${filename}:`, error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("products")
        .getPublicUrl(filename);

      const code = path.parse(filename).name;

      await prisma.product.updateMany({
        where: {
          code,
        },
        data: {
          image: publicUrl,
        },
      });

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