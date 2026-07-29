import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  code: string;
  name: string;
  image?: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              💊
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="line-clamp-2 text-lg font-bold text-slate-800">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Code: {product.code}
          </p>

          <div className="mt-5 flex items-center text-blue-600 font-medium group-hover:gap-3 gap-2 transition-all">
            <span>عرض الصنف</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}