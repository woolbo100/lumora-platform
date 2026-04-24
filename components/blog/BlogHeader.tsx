"use client";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { useLanguageStore } from "@/store/languageStore";

export function BlogHeader() {
  const { language } = useLanguageStore();
  const isEn = language === "en";

  const t = {
    eyebrow: isEn ? "LUMORA JOURNAL" : "LUMORA JOURNAL",
    title: isEn ? "Lumora Blog" : "루모라 블로그",
    description: isEn 
      ? "Lumora continues to clarify stories about relationships, emotions, and self-understanding. Browse through articles that read your current mind and help your next choice by category."
      : "루모라는 관계와 감정, 자기 이해에 관한 이야기를 더 선명하게 정리해 나갑니다. 지금의 마음을 읽고 다음 선택을 돕는 글을 카테고리별로 편하게 둘러보세요.",
    categoryTitle: isEn ? "Browse by Category" : "카테고리별 보기",
    categoryDescription: isEn
      ? "Explore categories: Romance/Reunion, Tarot/Saju, Psychology, Attraction, Growth, and Mindfulness."
      : "연애/재회, 타로/사주, 심리코드, 매력/자존감, 레벨업자기계발, 마음공부 카테고리를 빠르게 둘러볼 수 있습니다.",
  };

  return (
    <>
      <GlassPanel className="overflow-hidden">
        <section className="relative px-8 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,131,235,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,162,255,0.14),transparent_28%)]" />

          <div className="relative">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                {t.eyebrow}
              </p>
              <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
                {t.title}
              </h1>
              <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {t.description}
              </p>
            </div>
          </div>
        </section>
      </GlassPanel>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-2xl text-[var(--foreground)]">
              {t.categoryTitle}
            </h2>
            <p className="text-sm leading-7 text-[var(--foreground-soft)]">
              {t.categoryDescription}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
