import Link from "next/link";

const navigationLinks = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[120] border-b border-[rgba(255,255,255,0.12)] bg-[rgba(19,17,34,0.56)] backdrop-blur-xl">
      <div className="relative z-[121] mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
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
            className="aurora-hover-surface aurora-hover-strong hidden min-h-10 items-center justify-center rounded-full border border-[#f7e7ce]/52 bg-[linear-gradient(135deg,#f7e7ce_0%,#f3d9d5_42%,#d8b354_100%)] px-5 py-2 text-sm font-semibold tracking-[0.14em] text-[#15121f] shadow-[0_10px_26px_rgba(212,175,55,0.22),0_0_20px_rgba(255,210,245,0.12)] transition duration-300 hover:-translate-y-0.5 hover:brightness-103 sm:inline-flex"
          >
            나의 코드 열기
          </Link>
        </nav>
      </div>
    </header>
  );
}
