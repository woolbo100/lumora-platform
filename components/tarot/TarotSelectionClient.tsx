"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TarotCardItem from "@/components/tarot/TarotCard";
import {
  tarotCategoryMap,
  tarotCards,
  type TarotCategoryKey,
} from "@/data/tarotCards";

type TarotSelectionClientProps = {
  categoryKey: TarotCategoryKey;
};

function shuffleCards<T>(items: T[]) {
  const cloned = [...items];

  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }

  return cloned;
}

export function TarotSelectionClient({
  categoryKey,
}: TarotSelectionClientProps) {
  const router = useRouter();
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [shuffledCards] = useState(() => shuffleCards(tarotCards));
  const category = tarotCategoryMap[categoryKey];

  const handleToggle = (cardId: number) => {
    setSelectedCardIds((current) => {
      if (current.includes(cardId)) {
        return current.filter((id) => id !== cardId);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, cardId];
    });
  };

  const handleNext = () => {
    if (selectedCardIds.length !== 3) {
      return;
    }

    router.push(
      `/tarot/result?category=${categoryKey}&cards=${selectedCardIds.join(",")}`,
    );
  };

  return (
    <section className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]/72">
          {category.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          {category.label} 리딩을 위한 카드 선택
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          마음이 머무는 카드 세 장을 골라 주세요. 78장 전체 덱에서 선택한 카드
          조합으로 현재 흐름과 다음 메시지를 읽어드립니다.
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          {selectedCardIds.length} / 3 selected
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {shuffledCards.map((card, index) => (
          <TarotCardItem
            key={card.id}
            card={card}
            isSelected={selectedCardIds.includes(card.id)}
            isRevealed
            onSelect={() => handleToggle(card.id)}
            priority={index < 5}
          />
        ))}
      </div>

      <div className="sticky bottom-6 mt-10 flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-[#120f2ccc] px-5 py-5 backdrop-blur-xl sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/tarot")}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-white/82 transition duration-300 hover:border-white/24 hover:bg-white/6"
        >
          카테고리 다시 선택
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={selectedCardIds.length !== 3}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#7f71dc] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          결과 보기
        </button>
      </div>
    </section>
  );
}
