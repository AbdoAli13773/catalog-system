import ProductCard from "./ProductCard";

type Product = {
  id: number;
  code: string;
  name: string;
  image?: string | null;
};

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
        <div className="text-5xl">📦</div>

        <h3 className="mt-4 text-xl font-semibold text-slate-700">
          لا توجد أصناف
        </h3>

        <p className="mt-2 text-slate-500">
          جرّب البحث بكلمة مختلفة.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}