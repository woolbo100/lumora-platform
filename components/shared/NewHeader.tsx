"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HomeRedirectButton } from "@/components/shared/HomeRedirectButton";

export default function NewHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "border-b border-[rgba(164,136,255,0.08)] bg-[rgba(8,5,20,0.68)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <HomeRedirectButton
          ariaLabel="Go to home"
          className="text-base font-semibold tracking-[0.22em] text-[rgba(255,255,255,0.85)] transition-colors duration-300 hover:text-white"
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

      {/* 헤더 하단 오로라 빛 번짐 레이어 (선이 아닌 은은한 번짐) */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-full h-16 bg-[radial-gradient(ellipse_at_top,rgba(152,112,244,0.14),transparent_60%)] blur-xl transition-opacity duration-700 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* 화면 위쪽부터 넓게 퍼져 내려오는 더 넓은 공간감 글로우 */}
      <div
        className={`pointer-events-none absolute inset-x-0 -bottom-32 h-[12rem] bg-[radial-gradient(ellipse_at_top,rgba(112,72,214,0.08),transparent_65%)] blur-3xl transition-opacity duration-700 ease-out -z-10 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
