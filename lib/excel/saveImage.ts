import fs from "fs-extra";
import path from "path";

export async function saveImage(
  imageBuffer: Buffer,
  fileName: string,
  extension: string
) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.ensureDir(uploadDir);

  const filePath = path.join(
    uploadDir,
    `${fileName}.${extension}`
  );

  await fs.writeFile(filePath, imageBuffer);

  return `/uploads/${fileName}.${extension}`;
}