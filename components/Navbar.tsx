import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          Medical Catalog
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            الرئيسية
          </Link>

          <Link
            href="/admin"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}