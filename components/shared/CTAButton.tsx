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
      ? "bg-[var(--color-primary)] text-white shadow-[0_18px_50px_rgba(106,90,205,0.45)] hover:bg-[#7f71dc]"
      : "border border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/12 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/18";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
