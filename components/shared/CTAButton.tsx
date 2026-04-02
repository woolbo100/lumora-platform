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
      ? "border border-[#f7e7ce]/50 bg-[linear-gradient(135deg,#f7e7ce_0%,#f3d9d5_42%,#d8b354_100%)] text-[#15121f] shadow-[0_10px_26px_rgba(212,175,55,0.22),0_0_20px_rgba(255,210,245,0.12)] hover:border-[#f7e7ce]/72 hover:brightness-103 hover:shadow-[0_14px_34px_rgba(212,175,55,0.26),0_0_28px_rgba(186,155,255,0.16)]"
      : "border border-[rgba(255,255,255,0.24)] bg-[linear-gradient(135deg,rgba(255,210,245,0.15),rgba(186,155,255,0.12)_55%,rgba(132,196,255,0.08)_100%)] text-[var(--foreground)] shadow-[0_8px_24px_rgba(18,14,38,0.28)] hover:border-[rgba(255,255,255,0.34)] hover:bg-[linear-gradient(135deg,rgba(255,210,245,0.2),rgba(186,155,255,0.16)_55%,rgba(132,196,255,0.1)_100%)] hover:brightness-103";

  return (
    <Link
      href={href}
      className={`relative z-20 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/70 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
