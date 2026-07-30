const Database = require("better-sqlite3");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const sqlite = new Database("prisma/dev.db");

async function main() {
  const products = sqlite.prepare("SELECT * FROM Product").all();

  console.log(`Found ${products.length} products...`);

  let count = 0;

  for (const p of products) {
    await prisma.product.upsert({
      where: { code: p.code },
      update: {
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        image: p.image,
      },
      create: {
        code: p.code,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        image: p.image,
      },
    });

    count++;

    if (count % 100 === 0) {
      console.log(`${count}/${products.length}`);
    }
  }

  console.log("✅ Migration completed!");

  sqlite.close();
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});