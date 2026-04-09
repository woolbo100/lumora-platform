"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HomeRedirectButton } from "@/components/shared/HomeRedirectButton";

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
        "sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-out",
        scrolled
          ? "border-[rgba(118,98,214,0.08)] bg-[rgba(10,12,28,0.68)] backdrop-blur-[14px] shadow-[0_14px_38px_rgba(9,11,30,0.34),0_0_26px_rgba(126,108,232,0.12)]"
          : "bg-[rgba(10,12,28,0.02)] shadow-none backdrop-blur-0"
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <HomeRedirectButton
          ariaLabel="Go to home"
          className="text-sm font-medium tracking-[0.2em] text-white/90 hover:text-white"
        >
          LUMORA
        </HomeRedirectButton>

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
