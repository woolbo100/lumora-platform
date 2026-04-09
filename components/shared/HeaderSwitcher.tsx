"use client";

import { usePathname } from "next/navigation";

import NewHeader from "@/components/shared/NewHeader";

const newHeaderPaths = new Set(["/about", "/tarot"]);

export function HeaderSwitcher() {
  const pathname = usePathname();

  if (pathname && newHeaderPaths.has(pathname)) {
    return <NewHeader />;
  }

  return <NewHeader />;
}
