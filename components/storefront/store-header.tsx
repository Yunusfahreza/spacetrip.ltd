"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronLeft, Menu, Home, Search, ReceiptText, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { StoreDrawer } from "@/components/storefront/store-drawer";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/products", label: "Koleksi", icon: Search },
  { href: "/orders", label: "Orders", icon: ReceiptText },
  { href: "/profile", label: "Profil", icon: User },
];

export function StoreHeader({
  title,
  backHref,
  rightHref,
  rightLabel,
  showMenu = true,
  className,
}: {
  title?: string;
  backHref?: string;
  rightHref?: string;
  rightLabel?: string;
  showMenu?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  function close() {
    setOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-(--st-border) bg-white/95 px-5 py-3 backdrop-blur md:my-4 md:rounded-2xl md:border md:shadow-[0_4px_20px_rgba(17,24,39,0.04)]",
          className
        )}
      >
        {/* Mobile Header (< md) */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <div className="w-10">
            {backHref ? (
              <Link
                href={backHref}
                aria-label="Back"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--st-border) bg-white text-(--st-text)"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : null}
          </div>

          <div className="min-w-0 flex-1 text-center">
            {title ? (
              <div className="truncate text-sm font-semibold tracking-tight text-(--st-text)">
                {title}
              </div>
            ) : (
              <Link href="/" className="text-base font-bold tracking-tight text-(--st-text)">
                spacetrip
              </Link>
            )}
          </div>

          <div className="flex w-10 items-center justify-end">
            {showMenu ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={rightLabel ?? "Menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--st-border) bg-white text-(--st-text)"
              >
                <Menu className="h-5 w-5" />
              </button>
            ) : rightHref ? (
              <Link
                href={rightHref}
                aria-label={rightLabel ?? "Menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--st-border) bg-white text-(--st-text)"
              >
                <Menu className="h-5 w-5" />
              </Link>
            ) : (
              <div className="h-10 w-10" />
            )}
          </div>
        </div>

        {/* Desktop Web Navbar (>= md) */}
        <div className="hidden items-center justify-between gap-6 md:flex">
          <div className="flex items-center gap-3">
            {backHref ? (
              <Link
                href={backHref}
                aria-label="Back"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--st-border) bg-white text-(--st-text) transition hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : null}

            <Link href="/" className="text-lg font-bold tracking-tight text-(--st-text)">
              spacetrip
            </Link>

            {title ? (
              <>
                <span className="text-(--st-border)">/</span>
                <span className="text-sm font-medium text-(--st-text-muted)">{title}</span>
              </>
            ) : null}
          </div>

          <nav className="flex items-center gap-1.5">
            {navItems.map((it) => {
              const active = it.href === "/" ? pathname === "/" : pathname?.startsWith(it.href);
              const Icon = it.icon;

              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-(--st-primary) text-white"
                      : "text-(--st-text-muted) hover:bg-gray-100 hover:text-(--st-text)"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span>{it.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <StoreDrawer open={open} onClose={close} />
    </>
  );
}
