import ExcelJS from "exceljs";

export async function importProducts(file: File) {
const arrayBuffer = await file.arrayBuffer();

const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  const workbook = new ExcelJS.Workbook();

await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[0];

const products: {
  code: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}[] = [];
  worksheet.eachRow((row, rowNumber) => {
    // تخطي أول صف (الهيدر)
    if (rowNumber === 1) return;

    products.push({
          code: row.getCell(3).value?.toString().trim() ?? "", // رقم الصنف
          name: row.getCell(2).value?.toString().trim() ?? "", // اسم الصنف
          quantity: Number(row.getCell(4).value ?? 0),
          price: Number(row.getCell(5).value ?? 0),
          image: `/uploads/${row.getCell(3).value?.toString().trim()}.jpg`,
});
  });

  return products;
}