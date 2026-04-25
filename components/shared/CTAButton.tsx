"use client";

import Link from "next/link";

import { HomeRedirectButton } from "@/components/shared/HomeRedirectButton";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const styles =
    variant === "primary"
      ? "aurora-hover-surface aurora-hover-strong border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] hover:border-[rgba(236,228,255,0.78)] hover:brightness-102"
      : variant === "secondary"
      ? "aurora-hover-surface aurora-hover-soft border border-[rgba(255,255,255,0.24)] bg-[linear-gradient(135deg,rgba(255,210,245,0.15),rgba(186,155,255,0.12)_55%,rgba(132,196,255,0.08)_100%)] text-[var(--foreground)] shadow-[0_8px_24px_rgba(18,14,38,0.28)] hover:border-[rgba(255,255,255,0.34)] hover:bg-[linear-gradient(135deg,rgba(255,210,245,0.2),rgba(186,155,255,0.16)_55%,rgba(132,196,255,0.1)_100%)] hover:brightness-103"
      : "border border-[var(--color-secondary)]/30 bg-transparent text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/50";
  const sharedClassName = `relative z-20 inline-flex min-h-12 items-center justify-center rounded-full whitespace-nowrap px-6 py-3 text-sm font-semibold tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/70 ${styles} ${className}`;

  if (href === "/") {
    return <HomeRedirectButton className={sharedClassName}>{children}</HomeRedirectButton>;
  }

  return (
    <Link
      href={href}
      className={sharedClassName}
    >
      {children}
    </Link>
  );
}
