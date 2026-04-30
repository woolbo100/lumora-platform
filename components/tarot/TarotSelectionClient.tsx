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
                  : "border-white/8 bg-[linear-gradient(135deg,rgba(25,18,48,0.75),rgba(18,12,38,0.62)_58%,rgba(12,10,32,0.8))] hover:-translate-y-1 hover:border-white/18 hover:bg-[linear-gradient(135deg,rgba(35,22,65,0.85),rgba(25,18,48,0.75))] hover:shadow-[0_18px_48px_rgba(22,14,45,0.38)]"
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
        <div className="mt-8 flex flex-col md:mt-14">
          {/* Mobile selected count display */}
          <div className="z-20 -mx-8 mb-4 flex justify-center border-b border-white/5 bg-[var(--background)]/60 py-3 backdrop-blur-md md:hidden">
            <span className="text-sm font-bold tracking-[0.2em] text-[var(--color-secondary)]">
              선택한 카드 {selectedCardIds.length} / 3
            </span>
          </div>

          <div className="scrollbar-hide grid max-h-[460px] grid-cols-4 gap-2 overflow-y-auto pb-32 sm:grid-cols-2 md:max-h-none md:overflow-visible md:pb-0 lg:grid-cols-4 xl:grid-cols-5">
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
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-30 flex w-full flex-col items-center justify-center gap-3 bg-[var(--background)]/80 p-5 backdrop-blur-xl md:sticky md:bottom-6 md:mx-auto md:mt-10 md:max-w-5xl md:flex-row md:gap-4 md:rounded-[28px] md:border md:border-white/10 md:bg-[linear-gradient(135deg,rgba(25,18,48,0.92),rgba(18,12,38,0.88)_58%,rgba(12,10,32,0.94))] md:px-5 md:py-5 md:shadow-[0_24px_70px_rgba(8,6,20,0.42)]">
        <button
          type="button"
          onClick={() => router.push("/tarot")}
          className="hidden min-h-12 items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:border-white/24 hover:bg-white/6 md:inline-flex"
        >
          허브로 돌아가기
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCategoryKey || selectedCardIds.length !== 3}
          className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-10 py-3 text-sm font-bold tracking-[0.18em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale md:min-h-12 md:w-auto"
        >
          {selectedCardIds.length === 3 ? "타로 해석하기" : `${3 - selectedCardIds.length}장 더 선택해 주세요`}
        </button>
      </div>
    </section>
  );
}
