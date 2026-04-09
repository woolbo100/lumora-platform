"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,12,28,0.72)] backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(140,120,255,0.18)]"
          : "bg-transparent"
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.2em] text-white/90 hover:text-white"
        >
          LUMORA
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/80">
          <Link href="/about" className="hover:text-white">
            소개
          </Link>
          <Link href="/tarot" className="hover:text-white">
            타로
          </Link>
          <Link href="/blog" className="hover:text-white">
            블로그
          </Link>
        </nav>
      </div>
    </header>
  );
}