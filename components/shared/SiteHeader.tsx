import Link from "next/link";

const navigationLinks = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(9,8,20,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-secondary)] sm:text-xs">
            Inner Symbolism Platform
          </p>
          <p className="mt-1 font-display text-xl text-[var(--foreground)] sm:text-2xl">LUMORA</p>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/35 hover:text-[var(--color-secondary)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tarot"
            className="hidden min-h-10 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] px-5 py-2 text-sm font-semibold tracking-[0.14em] text-[#fbf6f0] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            타로 시작
          </Link>
        </nav>
      </div>
    </header>
  );
}
