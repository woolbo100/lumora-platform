import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "소개" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/contact", label: "문의하기" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[rgba(255,255,255,0.1)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex flex-col transition duration-200 hover:opacity-90"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-secondary)] sm:text-xs">
                Inner Symbolism Platform
              </span>
              <span className="mt-1 font-display text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-br from-white via-[#e5d4ff] to-[#bfa3ff] sm:text-3xl">
                LUMORA
              </span>
            </Link>
            <div className="space-y-1">
              <p className="text-[13px] font-medium tracking-wide text-[var(--color-secondary)] opacity-90">
                루모라, 아우라와 빛이 만나는 지점
              </p>
              <p className="text-[13px] font-light tracking-wide text-[var(--foreground-soft)] opacity-80">
                당신의 마음을 읽고, 흐름을 비추는 공간
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:pt-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--foreground-soft)] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col border-t border-white/5 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-[var(--foreground-muted)] opacity-60">
            © 2026 Lumora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
