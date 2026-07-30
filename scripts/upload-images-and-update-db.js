require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const BUCKET = "products";
const uploadsDir = path.join(__dirname, "../uploads");

async function main() {
  const files = fs.readdirSync(uploadsDir);

  console.log(`Found ${files.length} images...\n`);

  let uploaded = 0;
  let skipped = 0;
  let updated = 0;

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);

    if (!fs.statSync(filePath).isFile()) continue;

    const buffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error && !error.message.toLowerCase().includes("exists")) {
      console.log(`❌ ${file} -> ${error.message}`);
      continue;
    }

    if (error) {
      skipped++;
    } else {
      uploaded++;
    }

    const publicUrl =
      `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file}`;

    const result = await prisma.product.updateMany({
      where: {
        image: {
          endsWith: file,
        },
      },
      data: {
        image: publicUrl,
      },
    });

    updated += result.count;

    console.log(`✅ ${file}`);
  }

  console.log("\n===========================");
  console.log(`Uploaded : ${uploaded}`);
  console.log(`Skipped  : ${skipped}`);
  console.log(`Updated  : ${updated}`);
  console.log("===========================");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});