import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/contact", label: "문의하기" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-400 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="text-sm text-gray-500">© Lumora</p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition hover:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
