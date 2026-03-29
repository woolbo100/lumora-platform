import type { ReactNode } from "react";
import Link from "next/link";

type ServiceHubLayoutProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  backgroundVariant?: "default" | "rose";
};

export function ServiceHubLayout({
  eyebrow,
  title,
  children,
  backgroundVariant = "default",
}: ServiceHubLayoutProps) {
  const backgroundClassName =
    backgroundVariant === "rose"
      ? "bg-[radial-gradient(circle_at_top,rgba(244,201,221,0.11),transparent_18%),radial-gradient(circle_at_20%_22%,rgba(122,104,217,0.24),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,182,212,0.14),transparent_25%),radial-gradient(circle_at_52%_62%,rgba(213,195,165,0.1),transparent_32%),linear-gradient(180deg,rgba(17,11,31,0.82)_0%,rgba(15,12,30,0.9)_48%,rgba(10,10,24,0.96)_100%)]"
      : "bg-[radial-gradient(circle_at_top,rgba(213,195,165,0.07),transparent_22%),radial-gradient(circle_at_22%_26%,rgba(122,104,217,0.22),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(120,162,255,0.12),transparent_24%),linear-gradient(180deg,rgba(12,10,25,0.82)_0%,rgba(10,11,24,0.9)_50%,rgba(7,8,18,0.96)_100%)]";

  return (
    <div className="relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 ${backgroundClassName}`} />
      <div className="pointer-events-none absolute left-[14%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.2),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.08),transparent_68%)] blur-3xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
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
