"use client";

import { useState } from "react";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { type NameCodeStyleCard } from "@/types/naming";

type NamingResultCardProps = {
  card: NameCodeStyleCard;
};

export function NamingResultCard({ card }: NamingResultCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassPanel className="result-panel-glow p-6 sm:p-7">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full flex-col gap-4 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
              Name Mood
            </p>
            <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">{card.title}</h3>
            <p className="mt-2 text-base text-[var(--foreground-soft)]">{card.subtitle}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-[var(--foreground-soft)]">
            {isOpen ? "닫기" : "열기"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {card.examples.map((example) => (
            <span
              key={example}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]"
            >
              {example}
            </span>
          ))}
        </div>
      </button>

      {isOpen ? (
        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/6 p-5">
          <p className="text-base leading-8 text-[var(--foreground-soft)]">{card.description}</p>
        </div>
      ) : null}
    </GlassPanel>
  );
}
