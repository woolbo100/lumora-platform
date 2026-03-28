import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`rounded-[28px] border border-white/15 bg-white/8 shadow-[0_24px_80px_rgba(8,10,30,0.45)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
