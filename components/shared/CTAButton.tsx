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
      ? "border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] text-[#fbf6f0] shadow-[0_20px_60px_rgba(88,69,173,0.36),inset_0_1px_0_rgba(255,255,255,0.18)] hover:border-white/20 hover:shadow-[0_26px_70px_rgba(88,69,173,0.44),inset_0_1px_0_rgba(255,255,255,0.24)]"
      : "border border-[var(--color-secondary)]/26 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] text-[var(--color-secondary)] shadow-[0_16px_45px_rgba(8,10,30,0.28)] hover:border-[var(--color-secondary)]/42 hover:bg-[linear-gradient(135deg,rgba(213,195,165,0.14),rgba(255,255,255,0.05)_60%,rgba(12,14,28,0.18))]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
