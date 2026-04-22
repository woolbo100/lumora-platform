import Link from "next/link";
import { redirect } from "next/navigation";

import TarotCardItem from "@/components/tarot/TarotCard";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { tarotCategoryMap } from "@/data/tarotCards";
import {
  findTarotCardsByIds,
  generateTarotReading,
  isTarotCategoryKey,
  parseCardIds,
} from "@/lib/tarotInterpreter";

export default async function TarotResultPage(
  props: PageProps<"/tarot/result">,
) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const cardIds = parseCardIds(
    typeof searchParams.cards === "string" ? searchParams.cards : undefined,
  );

  if (
    typeof category !== "string" ||
    !isTarotCategoryKey(category) ||
    cardIds.length !== 3
  ) {
    redirect("/tarot");
  }

  const selectedCards = findTarotCardsByIds(cardIds);

  if (selectedCards.length !== 3) {
    redirect(`/tarot/select?category=${category}`);
  }

  const reading = generateTarotReading(selectedCards, category);
  const sections = reading.split("\n\n");
  const categoryInfo = tarotCategoryMap[category];

  return (
    <main className="flex flex-1 flex-col gap-8 pb-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]/72">
          {categoryInfo.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          {categoryInfo.label} 타로 리딩 결과
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          선택한 카드 세 장을 바탕으로 현재 흐름, 감정의 중심, 그리고 다음
          방향까지 더 자세하게 정리했습니다.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {selectedCards.map((card, index) => (
          <TarotCardItem
            key={card.id}
            card={card}
            isRevealed
            priority={index === 0}
          />
        ))}
      </section>

      <GlassPanel className="result-panel-glow p-8 sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]/72">
              Detailed Reading
            </p>
            <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">
              카드가 전하는 상세 해석
            </h3>
          </div>
          <div className="rounded-full border border-[var(--color-secondary)]/25 bg-[var(--color-secondary)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            {selectedCards.map((card) => card.nameKr).join(" · ")}
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => {
            const [title, ...content] = section.split("\n").filter(Boolean);
            const heading = title.replace("### ", "");

            return (
              <section
                key={heading}
                className="border-t border-white/8 pt-6 first:border-t-0 first:pt-0"
              >
                <h4 className="font-display text-2xl text-[var(--color-secondary)]">
                  {heading}
                </h4>
                <div className="mt-4 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
                  {content.map((paragraph) => {
                    if (paragraph.startsWith("**핵심 키워드**")) {
                      return (
                        <p
                          key={paragraph}
                          className="result-card-glow rounded-2xl border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-4 text-[var(--color-secondary)]"
                        >
                          {paragraph.replace("**핵심 키워드** ", "핵심 키워드: ")}
                        </p>
                      );
                    }

                    return <p key={paragraph}>{paragraph}</p>;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </GlassPanel>

      <ResultShareActions
        testName="타로 리딩"
        resultTitle={`${categoryInfo.label} 타로 리딩 결과`}
        resultSummary={`선택한 카드: ${selectedCards.map((c) => c.nameKr).join(", ")}`}
        hubUrl="/tarot"
        restartUrl={`/tarot/select?category=${category}`}
      />
    </main>
  );
}
