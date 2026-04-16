"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import TarotCardItem from "@/components/tarot/TarotCard";
import {
  tarotCategories,
  tarotCategoryMap,
  tarotCards,
  type TarotCategoryKey,
} from "@/data/tarotCards";

type TarotSelectionClientProps = {
  initialCategoryKey?: TarotCategoryKey;
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
  initialCategoryKey,
}: TarotSelectionClientProps) {
  const router = useRouter();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<
    TarotCategoryKey | undefined
  >(initialCategoryKey);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const shuffledCards = useMemo(() => shuffleCards(tarotCards), []);
  const selectedCategory = selectedCategoryKey
    ? tarotCategoryMap[selectedCategoryKey]
    : undefined;

  const handleCategorySelect = (categoryKey: TarotCategoryKey) => {
    setSelectedCategoryKey(categoryKey);
    setSelectedCardIds([]);
    router.replace(`/tarot/select?category=${categoryKey}`);
  };

  const handleToggle = (cardId: number) => {
    if (!selectedCategoryKey) {
      return;
    }

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
    if (!selectedCategoryKey || selectedCardIds.length !== 3) {
      return;
    }

    router.push(
      `/tarot/result?category=${selectedCategoryKey}&cards=${selectedCardIds.join(",")}`,
    );
  };

  return (
    <section className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]/72">
          {selectedCategory?.eyebrow ?? "Mystic Spread"}
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          {selectedCategory
            ? `${selectedCategory.label} 리딩을 위한 카드 선택`
            : "어떤 흐름을 읽고 싶은지 먼저 골라 주세요"}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {selectedCategory
            ? "이제 카드 세 장을 뽑아 주세요. 선택 화면에서는 카드의 뒷면만 보이고, 결과 페이지에서만 실제 카드가 드러납니다."
            : "주제를 먼저 정하면 그 감정선에 맞는 리딩 흐름으로 카드 뽑기를 시작할 수 있습니다."}
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          {selectedCategory
            ? `${selectedCardIds.length} / 3 selected`
            : "Choose a reading topic"}
        </p>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tarotCategories.map((category) => {
          const active = category.key === selectedCategoryKey;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => handleCategorySelect(category.key)}
              className={`aurora-hover rounded-[26px] border p-7 text-left transition duration-300 ${
                active
                  ? "border-[var(--color-secondary)]/32 bg-[linear-gradient(135deg,rgba(122,104,217,0.25),rgba(45,35,82,0.65)_65%,rgba(20,15,45,0.85))] shadow-[0_18px_50px_rgba(60,50,124,0.28)]"
                  : "border-white/8 bg-[linear-gradient(135deg,rgba(12,14,35,0.72),rgba(10,12,28,0.58)_58%,rgba(8,10,22,0.78))] hover:-translate-y-1 hover:border-white/18 hover:bg-[linear-gradient(135deg,rgba(20,15,45,0.85),rgba(12,14,35,0.72))] hover:shadow-[0_18px_48px_rgba(9,11,24,0.38)]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-secondary)]/72">
                {category.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">
                {category.label}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {selectedCategory ? (
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {shuffledCards.map((card, index) => (
            <TarotCardItem
              key={card.id}
              card={card}
              isSelected={selectedCardIds.includes(card.id)}
              isRevealed={false}
              onSelect={() => handleToggle(card.id)}
              priority={index < 5}
            />
          ))}
        </div>
      ) : null}

      <div className="sticky bottom-6 mt-10 flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,16,34,0.88),rgba(10,12,24,0.78)_58%,rgba(28,21,55,0.82))] px-5 py-5 shadow-[0_24px_70px_rgba(8,10,25,0.38)] backdrop-blur-2xl sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/tarot")}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:border-white/24 hover:bg-white/6"
        >
          허브로 돌아가기
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCategoryKey || selectedCardIds.length !== 3}
          className="aurora-hover-surface aurora-hover-strong inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-3 text-sm font-semibold tracking-[0.18em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:brightness-102 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          결과 보기
        </button>
      </div>
    </section>
  );
}
