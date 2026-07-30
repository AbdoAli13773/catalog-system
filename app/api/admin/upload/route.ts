import { NextResponse } from "next/server";
import { importProducts } from "@/lib/excel/importProducts";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        { status: 400 }
      );
    }

    const products = await importProducts(file);

 

    // حذف المنتجات القديمة
    for (const product of products) {
  await prisma.product.upsert({
    where: {
      code: product.code,
    },
    update: {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    },
    create: product,
  });
}

    return NextResponse.json({
      success: true,
      message: `${products.length} products imported successfully.`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Import failed.",
      },
      { status: 500 }
    );
  }
}