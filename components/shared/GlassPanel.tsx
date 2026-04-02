import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(150deg,rgba(255,255,255,0.11),rgba(255,210,245,0.05)_42%,rgba(132,196,255,0.04)_68%,rgba(34,26,58,0.26)_100%)] shadow-[var(--shadow-glow-soft)] backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,210,245,0.16),transparent_34%),radial-gradient(circle_at_88%_90%,rgba(132,196,255,0.12),transparent_28%)] opacity-78" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.42)] to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
