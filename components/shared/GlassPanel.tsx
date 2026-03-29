import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04)_48%,rgba(10,12,24,0.3)_100%)] shadow-[var(--shadow-glow-soft)] backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(122,104,217,0.14),transparent_34%)] opacity-90" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
