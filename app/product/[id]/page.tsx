import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50"
      >
        ← الرجوع للأصناف
      </Link>

      <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-[450px] items-center justify-center text-8xl">
              💊
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            الصنف
          </span>

          <h1 className="text-4xl font-bold text-slate-800">
            {product.name}
          </h1>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              كود الصنف
            </p>

            <p className="mt-2 text-xl font-semibold text-slate-800">
              {product.code}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}