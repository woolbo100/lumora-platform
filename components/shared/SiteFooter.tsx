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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex flex-col transition duration-200 hover:opacity-90"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-secondary)] sm:text-xs">
                Inner Symbolism Platform
              </span>
              <span className="mt-1 font-display text-2xl tracking-wider text-[var(--foreground)] sm:text-3xl">
                LUMORA
              </span>
            </Link>
            <p className="text-xs text-[var(--foreground-muted)] opacity-60">
              © 2026 Lumora. All rights reserved.
            </p>
          </div>
          
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
        
        <p className="border-t border-white/5 pt-8 text-[13px] font-light tracking-wide text-[var(--foreground-muted)] opacity-60">
          당신의 마음을 읽고, 흐름을 비추는 공간
        </p>
      </div>
      </div>
    </footer>
  );
}
