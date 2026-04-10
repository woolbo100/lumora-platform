"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HomeRedirectButton } from "@/components/shared/HomeRedirectButton";

export default function NewHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(currentScrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full isolate transform-gpu transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-[#a488ff]/10 bg-[#080514]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 relative z-20">
        <HomeRedirectButton
          ariaLabel="Go to home"
          className="text-base font-semibold tracking-[0.22em] bg-clip-text text-transparent bg-gradient-to-br from-white via-[#e5d4ff] to-[#bfa3ff] opacity-95 drop-shadow-[0_0_12px_rgba(180,140,255,0.25)] transition-all duration-700 hover:opacity-100 hover:drop-shadow-[0_0_16px_rgba(190,160,255,0.4)]"
        >
          LUMORA
        </HomeRedirectButton>

        <nav className="flex items-center gap-7 text-[13px] font-medium tracking-wide text-[rgba(255,255,255,0.65)]">
          <Link href="/about" className="transition-colors hover:text-white">
            ABOUT
          </Link>
          <Link href="/tarot" className="transition-colors hover:text-white">
            TAROT
          </Link>
          <Link href="/blog" className="transition-colors hover:text-white">
            BLOG
          </Link>
        </nav>
      </div>

      {/* 헤더 하단 오로라 빛 번짐 레이어 (확실히 보이게 농도 증가) */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-full h-20 bg-[radial-gradient(ellipse_at_top,rgba(164,124,255,0.4),transparent_70%)] blur-2xl transition-opacity duration-700 ease-out z-10 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* 화면 위쪽부터 넓게 퍼져 내려오는 더 넓은 공간감 글로우 */}
      <div
        className={`pointer-events-none absolute inset-x-0 -bottom-40 h-[16rem] bg-[radial-gradient(ellipse_at_top,rgba(132,88,234,0.25),transparent_65%)] blur-3xl transition-opacity duration-700 ease-out -z-10 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
