import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_46%,rgba(43,31,58,0.32)_100%)] shadow-[var(--shadow-glow-soft)] backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(247,231,206,0.18),transparent_34%),radial-gradient(circle_at_88%_90%,rgba(230,199,194,0.14),transparent_28%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,231,206,0.56)] to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
