"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";

type Product = {
  id: number;
  code: string;
  name: string;
  image: string;
};

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.code.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  return (
    <section className="space-y-8">
      <SearchBar value={search} onChange={setSearch} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
            الأصناف
        </h2>

        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
          {filteredProducts.length} صنف
        </span>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}