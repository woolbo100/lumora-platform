"use client";

import Image from "next/image";

import type { TarotCard } from "@/data/tarotCards";

type TarotCardProps = {
  card: TarotCard;
  isSelected?: boolean;
  isRevealed?: boolean;
  onSelect?: () => void;
  priority?: boolean;
};

export default function TarotCardItem({
  card,
  isSelected = false,
  isRevealed = true,
  onSelect,
  priority = false,
}: TarotCardProps) {
  const clickable = typeof onSelect === "function";
  const suitLabel = card.suit === "major" ? "Major Arcana" : card.suit;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!clickable}
      className={`group relative overflow-hidden rounded-[24px] border text-left transition duration-300 ${
        clickable
          ? "cursor-pointer hover:-translate-y-1 hover:border-[var(--color-secondary)]/45"
          : "cursor-default"
      } ${
        isSelected
          ? "border-[var(--color-secondary)] bg-white/12 shadow-[0_20px_60px_rgba(214,194,138,0.16)]"
          : "border-white/10 bg-white/6"
      }`}
    >
      <div className="relative aspect-[3/5] w-full overflow-hidden bg-[#130f2b]">
        <Image
          src={card.imageUrl}
          alt={`${card.nameKr} 타로 카드`}
          fill
          priority={priority}
          className={`object-cover transition duration-500 ${
            isRevealed ? "scale-100 opacity-100" : "scale-[1.02] opacity-88"
          }`}
          sizes="(max-width: 768px) 40vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29]/84 via-transparent to-transparent" />
        {!isRevealed ? (
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(214,194,138,0.14),transparent_32%,rgba(255,255,255,0.04)_50%,transparent_68%,rgba(214,194,138,0.12))]" />
        ) : null}
      </div>

      <div className="space-y-2 px-4 py-4">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-secondary)]/72">
          {suitLabel}
        </p>
        <p className="font-display text-xl text-white">{card.nameKr}</p>
        <p className="text-sm text-white/60">{card.name}</p>
        <p className="text-sm leading-6 text-white/66">{card.meaningUpright}</p>
      </div>
    </button>
  );
}
