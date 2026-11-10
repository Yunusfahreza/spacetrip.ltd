import type React from "react";

import { StoreBottomNav } from "@/components/storefront/store-bottom-nav";

export function MobileShell({
  children,
  hideBottomNav,
}: {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}) {
  return (
    <div className="min-h-dvh overflow-x-clip bg-(--st-bg)">
      <div className="relative mx-auto min-h-dvh w-full max-w-6xl md:px-6">
        <div
          className={
            hideBottomNav
              ? "pb-10"
              : "pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-12"
          }
        >
          {children}
        </div>
        {hideBottomNav ? null : <StoreBottomNav />}
      </div>
    </div>
  );
}
