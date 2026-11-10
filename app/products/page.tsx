export const dynamic = "force-dynamic";

import Link from "next/link";

import { Search } from "lucide-react";

import { MobileShell } from "@/components/storefront/mobile-shell";
import { StoreHeader } from "@/components/storefront/store-header";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { publicListActiveCategories, publicListActiveProducts } from "@/lib/catalog/public";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const category = typeof sp.category === "string" ? sp.category : "";

  const [categories, products] = await Promise.all([
    publicListActiveCategories(),
    publicListActiveProducts({ q, categorySlug: category || undefined }),
  ]);

  return (
    <MobileShell>
      <StoreHeader title="Koleksi" backHref="/" />

      <main className="px-5 pb-10 md:px-0">
        <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-(--st-text) md:text-2xl">
              Koleksi thrift
            </h1>
            <div className="mt-1 text-xs text-(--st-text-muted) md:text-sm">
              Cari item favoritmu atau filter berdasarkan kategori.
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <section className="mt-5 rounded-2xl border border-(--st-border) bg-white p-4 shadow-[0_4px_16px_rgba(17,24,39,0.03)]">
          <form className="grid gap-3 md:grid-cols-[1fr_240px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--st-text-muted)" />
              <Input
                name="q"
                defaultValue={q}
                placeholder="Cari kaos, jeans, cargo..."
                className="h-10 rounded-full pl-9"
              />
            </div>

            <select
              name="category"
              defaultValue={category}
              className="h-10 rounded-full border border-(--st-border) bg-white px-4 text-sm text-(--st-text) focus:outline-none focus:ring-2 focus:ring-(--st-accent) focus:ring-offset-2 focus:ring-offset-white"
            >
              <option value="">Semua kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <Button type="submit" className="h-10 rounded-full px-6">
              Terapkan
            </Button>
          </form>
        </section>

        {/* Product Grid */}
        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {products.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-(--st-border) bg-white p-8 text-center text-sm text-(--st-text-muted)">
              Belum ada produk yang tersedia.
            </div>
          ) : (
            products.map((p) => {
              const imgs = (p.product_images ?? [])
                .slice()
                .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
              const hero = imgs[0] ?? null;
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={p.price}
                  image={hero ? { storage_path: hero.storage_path, alt: hero.alt ?? null } : null}
                />
              );
            })
          )}
        </section>

        <div className="mt-8 text-center text-xs text-(--st-text-muted)">
          Mau lihat status pesanan?{" "}
          <Link href="/orders" className="font-medium text-(--st-text) underline underline-offset-4">
            Buka Orders
          </Link>
        </div>
      </main>
    </MobileShell>
  );
}
