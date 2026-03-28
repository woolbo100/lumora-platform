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
        {isRevealed ? (
          <>
            <Image
              src={card.imageUrl}
              alt={`${card.nameKr} 타로 카드`}
              fill
              priority={priority}
              className="object-cover transition duration-500"
              sizes="(max-width: 768px) 40vw, 16vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29]/84 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,195,142,0.18),transparent_24%),linear-gradient(180deg,rgba(35,22,62,1)_0%,rgba(23,16,46,1)_52%,rgba(14,11,31,1)_100%)]">
            <div className="absolute inset-4 rounded-[18px] border border-[var(--color-secondary)]/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
            <div className="absolute inset-7 rounded-[14px] border border-white/7" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-18 w-18 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/10 text-4xl text-[var(--color-secondary)]/92 shadow-[0_0_24px_rgba(219,195,142,0.18)]">
                ✦
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.36em] text-[var(--color-secondary)]/68">
                  Luna Tarot
                </p>
                <p className="mt-3 font-display text-2xl text-white/92">Hidden Arcana</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isRevealed ? (
        <div className="space-y-2 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-secondary)]/72">
            {suitLabel}
          </p>
          <p className="font-display text-xl text-white">{card.nameKr}</p>
          <p className="text-sm text-white/60">{card.name}</p>
          <p className="text-sm leading-6 text-white/66">{card.meaningUpright}</p>
        </div>
      ) : (
        <div className="border-t border-white/6 px-4 py-4">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40">
            선택하면 결과에서 공개됩니다
          </p>
        </div>
      )}
    </button>
  );
}
