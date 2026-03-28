import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "LUMORA | 타로 리딩",
  description:
    "LUMORA 안에서 현재의 감정, 관계, 선택의 흐름을 읽어보는 타로 리딩 서비스입니다.",
};

export default function TarotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
              Mystic Insight
            </p>
            <h1 className="mt-2 font-display text-2xl text-white sm:text-3xl">
              Tarot Reading
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white/84 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로 돌아가기
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
