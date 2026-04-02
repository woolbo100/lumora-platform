import Link from "next/link";

const navigationLinks = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[120] border-b border-[var(--color-secondary)]/15 bg-[rgba(15,15,23,0.72)] backdrop-blur-xl">
      <div className="relative z-[121] mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="홈으로 이동"
          className="relative z-[122] flex min-h-[56px] min-w-[220px] cursor-pointer flex-col justify-center rounded-xl px-2 py-1 pointer-events-auto transition duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/60"
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
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/42 hover:bg-[rgba(247,231,206,0.08)] hover:text-[var(--color-secondary)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tarot"
            className="hidden min-h-10 items-center justify-center rounded-full border border-[#f7e7ce]/55 bg-[linear-gradient(135deg,#f7e7ce,#d4af37)] px-5 py-2 text-sm font-semibold tracking-[0.14em] text-[#111] shadow-[0_10px_30px_rgba(212,175,55,0.24),0_0_22px_rgba(212,175,55,0.2)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_14px_36px_rgba(212,175,55,0.36),0_0_30px_rgba(212,175,55,0.28)] sm:inline-flex"
          >
            나의 코드 열기
          </Link>
        </nav>
      </div>
    </header>
  );
}

