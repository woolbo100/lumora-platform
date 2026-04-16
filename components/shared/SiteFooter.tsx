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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-[var(--foreground-muted)]">© Lumora</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--foreground-soft)] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <p className="text-[13px] font-light tracking-wide text-[var(--foreground-muted)] opacity-60">
          당신의 마음을 읽고, 흐름을 비추는 공간
        </p>
      </div>
    </footer>
  );
}
