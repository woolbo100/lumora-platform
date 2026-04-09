"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HOME_URL = "https://www.lumoracode.kr";

const navigationLinks = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`relative sticky top-0 z-[120] overflow-visible border-b bg-[rgba(19,17,34,0.56)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500 ${
        isScrolled
          ? "border-[rgba(255,255,255,0.14)] shadow-[0_10px_30px_rgba(10,11,24,0.22),0_12px_36px_rgba(116,94,210,0.16),0_18px_46px_rgba(76,137,214,0.12)]"
          : "border-[rgba(255,255,255,0.12)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-[-2rem] z-[130] h-20 transition duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 bottom-[1.7rem] h-px bg-gradient-to-r from-transparent via-[rgba(214,198,255,0.86)] to-transparent shadow-[0_0_18px_rgba(176,151,255,0.42)]" />
        <div className="absolute inset-x-[6%] bottom-[0.75rem] h-10 bg-[radial-gradient(circle_at_center,rgba(204,186,255,0.42),rgba(122,214,255,0.28)_28%,rgba(255,205,235,0.2)_52%,rgba(19,17,34,0)_74%)] blur-xl" />
        <div className="absolute inset-x-[12%] bottom-[-0.2rem] h-16 bg-[radial-gradient(circle_at_center,rgba(116,94,210,0.34),rgba(76,137,214,0.24)_38%,rgba(255,205,235,0.12)_58%,rgba(19,17,34,0)_78%)] blur-2xl" />
        <div className="absolute inset-x-[22%] bottom-[-1.05rem] h-14 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(19,17,34,0)_78%)] blur-2xl" />
      </div>
      <div className="relative z-[121] mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href={HOME_URL}
          aria-label="홈으로 이동"
          className="aurora-link relative z-[122] flex min-h-[56px] min-w-[220px] cursor-pointer flex-col justify-center rounded-xl px-2 py-1 pointer-events-auto transition duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/60"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-secondary)] sm:text-xs">
            Inner Symbolism Platform
          </span>
          <span className="mt-1 font-display text-xl text-[var(--foreground)] sm:text-2xl">
            LUMORA
          </span>
        </Link>

        <nav className="relative z-20 flex items-center gap-2 sm:gap-3">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="aurora-hover-surface aurora-hover-soft inline-flex min-h-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.34)] hover:bg-[rgba(186,155,255,0.12)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tarot"
            className="aurora-hover-surface aurora-hover-strong hidden min-h-10 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-5 py-2 text-sm font-semibold tracking-[0.14em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:brightness-102 sm:inline-flex"
          >
            나의 코드 열기
          </Link>
        </nav>
      </div>
    </header>
  );
}
