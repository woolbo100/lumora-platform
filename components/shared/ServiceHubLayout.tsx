import type { ReactNode } from "react";
import Link from "next/link";

type ServiceHubLayoutProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function ServiceHubLayout({
  eyebrow,
  title,
  children,
}: ServiceHubLayoutProps) {
  return (
    <div className="relative">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
              {eyebrow}
            </p>
            <h1 className="mt-2 font-display text-2xl text-[var(--foreground)] sm:text-3xl">
              {title}
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로 돌아가기
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
