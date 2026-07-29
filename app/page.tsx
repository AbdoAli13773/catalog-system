import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <Hero />

      <main className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">
            تصفح جميع الأصناف
          </h2>

          <p className="mt-2 text-slate-500">
            ابحث عن الصنف بالاسم أو الكود، واضغط على الصنف لعرض التفاصيل.
          </p>
        </div>

        <ProductCatalog />
      </main>
    </>
  );
}