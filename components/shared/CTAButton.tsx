import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
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
      ? "border border-[#f7e7ce]/55 bg-[linear-gradient(135deg,#f7e7ce,#d4af37)] text-[#111] shadow-[0_12px_34px_rgba(212,175,55,0.28),0_0_26px_rgba(212,175,55,0.2)] hover:border-[#f7e7ce]/85 hover:brightness-105 hover:shadow-[0_16px_42px_rgba(212,175,55,0.38),0_0_34px_rgba(212,175,55,0.3)]"
      : "border border-[var(--color-secondary)]/35 bg-[linear-gradient(135deg,rgba(247,231,206,0.16),rgba(212,175,55,0.1)_55%,rgba(11,10,20,0.42))] text-[var(--color-secondary)] shadow-[0_10px_28px_rgba(4,4,12,0.36)] hover:border-[var(--color-secondary)]/55 hover:brightness-105 hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]";

  return (
    <Link
      href={href}
      className={`relative z-20 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/70 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
