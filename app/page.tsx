export const dynamic = "force-dynamic";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { MobileShell } from "@/components/storefront/mobile-shell";
import { StoreHeader } from "@/components/storefront/store-header";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { publicListActiveProducts } from "@/lib/catalog/public";

export default async function Home() {
  const products = await publicListActiveProducts({ limit: 8 });

  return (
    <MobileShell>
      <StoreHeader rightHref="/products" rightLabel="Koleksi" />

      <main className="px-5 pb-10 md:px-0">
        {/* Hero Section */}
        <section className="mt-5 overflow-hidden rounded-[28px] border border-(--st-border) bg-white shadow-[0_12px_36px_rgba(17,24,39,0.06)]">
          <div className="relative flex min-h-[300px] flex-col justify-between bg-linear-to-br from-[#F7F8FA] via-white to-[#FFF4CC]/40 p-6 md:min-h-[360px] md:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-(--st-border) bg-white px-3 py-1 text-xs font-medium text-(--st-text-muted)">
                Kurasi thrift
              </div>
              <div className="rounded-full border border-(--st-border) bg-white px-3 py-1 text-xs font-medium text-(--st-text-muted)">
                Stok terbatas
              </div>
            </div>

            <div className="mt-8 max-w-xl md:mt-12">
              <h1 className="text-3xl font-bold tracking-tight text-(--st-text) md:text-5xl">
                Temuan dari Orbit.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-(--st-text-muted) md:text-base">
                Kurasi pakaian thrift pilihan dengan stok terbatas. Pilih gaya favoritmu dan pesan langsung sebelum kehabisan.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="h-11 rounded-full px-6">
                  <Link href="/products">
                    Lihat koleksi
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-full bg-white px-6">
                  <Link href="/profile?next=/products&intent=checkout">Masuk untuk pesan</Link>
                </Button>
              </div>

              <div className="mt-3 text-xs text-(--st-text-muted)">
                Untuk memesan, kamu perlu masuk dan melengkapi data profil.
              </div>
            </div>
          </div>
        </section>

        {/* Fokus Spacetrip - 3 Columns on Desktop, Stacked on Mobile */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-(--st-border) bg-white p-5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--st-accent-soft) text-xs font-bold text-(--st-text)">
              1
            </span>
            <div className="mt-3 text-sm font-semibold text-(--st-text)">Kurasi Wearable</div>
            <p className="mt-1 text-xs leading-relaxed text-(--st-text-muted)">
              Kurasi item thrift pilihan yang nyaman dan keren untuk dipakai harian.
            </p>
          </div>

          <div className="rounded-2xl border border-(--st-border) bg-white p-5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--st-accent-soft) text-xs font-bold text-(--st-text)">
              2
            </span>
            <div className="mt-3 text-sm font-semibold text-(--st-text)">Detail Jelas</div>
            <p className="mt-1 text-xs leading-relaxed text-(--st-text-muted)">
              Informasi ukuran, kondisi, dan ketersediaan stok ditampilkan transparan.
            </p>
          </div>

          <div className="rounded-2xl border border-(--st-border) bg-white p-5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--st-accent-soft) text-xs font-bold text-(--st-text)">
              3
            </span>
            <div className="mt-3 text-sm font-semibold text-(--st-text)">Update Rutin</div>
            <p className="mt-1 text-xs leading-relaxed text-(--st-text-muted)">
              Kaos, jaket, jeans, cargo, topi, dan item menarik lainnya hadir rutin.
            </p>
          </div>
        </section>

        {/* Produk Terbaru */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-(--st-text) md:text-xl">
                Produk terbaru
              </h2>
              <p className="mt-0.5 text-xs text-(--st-text-muted) md:text-sm">
                Update terbaru dari koleksi thrift Spacetrip
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-medium text-(--st-text) underline underline-offset-4 md:text-sm"
            >
              Lihat semua
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {products.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-(--st-border) bg-white p-8 text-center text-sm text-(--st-text-muted)">
                Belum ada produk yang tersedia saat ini.
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
          </div>
        </section>

        {/* Cara Belanja */}
        <section className="mt-10 rounded-3xl border border-(--st-border) bg-white p-6 md:p-8">
          <div className="text-base font-semibold text-(--st-text)">Cara belanja di Spacetrip</div>
          <ol className="mt-4 grid gap-4 text-sm text-(--st-text-muted) sm:grid-cols-2 md:grid-cols-4">
            <li className="rounded-xl bg-[#F7F8FA] p-4">
              <span className="font-semibold text-(--st-text)">1. Browse Koleksi</span>
              <p className="mt-1 text-xs">Temukan item thrift favoritmu di menu Koleksi.</p>
            </li>
            <li className="rounded-xl bg-[#F7F8FA] p-4">
              <span className="font-semibold text-(--st-text)">2. Masuk Akun</span>
              <p className="mt-1 text-xs">Login dengan Google atau Email untuk mulai memesan.</p>
            </li>
            <li className="rounded-xl bg-[#F7F8FA] p-4">
              <span className="font-semibold text-(--st-text)">3. Checkout</span>
              <p className="mt-1 text-xs">Pilih ukuran & jumlah, lalu kirim pesanan.</p>
            </li>
            <li className="rounded-xl bg-[#F7F8FA] p-4">
              <span className="font-semibold text-(--st-text)">4. Bayar & Pantau</span>
              <p className="mt-1 text-xs">Upload bukti bayar QRIS dan pantau di menu Orders.</p>
            </li>
          </ol>
        </section>
      </main>
    </MobileShell>
  );
}
