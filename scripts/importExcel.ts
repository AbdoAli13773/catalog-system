import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(process.cwd(), "data", "products.xlsx");

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const products = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${products.length} products`);

  await prisma.product.deleteMany();

  for (const item of products as any[]) {
    await prisma.product.create({
      data: {
        code: String(item.code),
        name: String(item.name),
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: `/images/${item.image}`,
      },
    });
  }

  console.log("Import completed ✅");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });