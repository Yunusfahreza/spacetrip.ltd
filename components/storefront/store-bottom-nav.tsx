"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Home, Search, ReceiptText, User } from "lucide-react";

type Item = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const items: Item[] = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/products", label: "Koleksi", icon: Search },
  { href: "/orders", label: "Orders", icon: ReceiptText },
  { href: "/profile", label: "Profil", icon: User },
];

export function StoreBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-[max(0px,env(safe-area-inset-bottom))] left-0 right-0 z-50 border-t border-(--st-border) bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname?.startsWith(it.href);
          const Icon = it.icon;

          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2.5 text-xs",
                active ? "font-semibold text-(--st-text)" : "text-(--st-text-muted)"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", active ? "text-(--st-text)" : "text-(--st-text-muted)")} />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
