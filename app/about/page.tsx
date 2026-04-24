"use client";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { useLanguageStore } from "@/store/languageStore";

const introductionParagraphsKo = [
  "LUMORA는 감정과 관계, 그리고 내면의 흐름을 이해하기 위한 심리 기반 해석 플랫폼입니다.",
  "이곳에서는 타로 리딩, 애착유형 분석, 연애패턴 코드, 재회 가능성 테스트 등 다양한 도구를 통해 자신의 감정과 관계를 더 깊이 바라볼 수 있도록 돕고 있습니다.",
  "우리는 누구나 반복되는 감정의 흐름과 선택의 패턴을 가지고 있으며, 이를 이해하는 과정이 더 나은 관계와 삶으로 이어진다고 믿습니다.",
  "LUMORA의 콘텐츠는 심리적 통찰과 감성적 해석을 바탕으로 구성되며, 단순한 결과 제공이 아닌 자기 이해를 돕는 것을 목표로 합니다.",
  "본 사이트는 개인이 직접 기획하고 운영하는 플랫폼으로, 지속적인 콘텐츠 업데이트와 개선을 통해 더 나은 경험을 제공하고자 합니다.",
];

const introductionParagraphsEn = [
  "LUMORA is a psychology-based interpretation platform for understanding emotions, relationships, and inner flows.",
  "Here, we help you look deeper into your emotions and relationships through various tools such as tarot reading, attachment style analysis, dating pattern codes, and reunion possibility tests.",
  "We believe that everyone has repeating emotional flows and patterns of choice, and that the process of understanding them leads to better relationships and lives.",
  "LUMORA's content is based on psychological insights and emotional interpretations, aiming to help self-understanding rather than just providing simple results.",
  "This site is a platform planned and operated directly by an individual, aiming to provide a better experience through continuous content updates and improvements.",
];

const valuesKo = [
  {
    title: "Psychology Based",
    description: "심리적 흐름과 관계 패턴을 바탕으로 감정을 더 입체적으로 읽어냅니다.",
  },
  {
    title: "Emotional Insight",
    description: "감성적인 해석을 더해 결과가 아닌 이해의 경험으로 연결합니다.",
  },
  {
    title: "Continuous Growth",
    description: "직접 기획하고 운영하며 콘텐츠와 사용 경험을 꾸준히 다듬어 갑니다.",
  },
];

const valuesEn = [
  {
    title: "Psychology Based",
    description: "We read emotions more multidimensionally based on psychological flows and relationship patterns.",
  },
  {
    title: "Emotional Insight",
    description: "We add emotional interpretations to connect results with an experience of understanding.",
  },
  {
    title: "Continuous Growth",
    description: "We personally plan and operate, constantly refining content and user experience.",
  },
];

export default function AboutPage() {
  const { language } = useLanguageStore();
  const isEn = language === "en";

  const paragraphs = isEn ? introductionParagraphsEn : introductionParagraphsKo;
  const values = isEn ? valuesEn : valuesKo;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          About LUMORA
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          {isEn ? "A Space for Interpretation to Deepen Understanding of Emotions and Relationships" : "감정과 관계를 더 깊이 이해하기 위한 해석의 공간"}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {isEn 
            ? "We aim for a platform that helps you calmly look at the flow of your emotions and choices, rather than just a tool showing simple results."
            : "단순한 결과를 보여주는 도구가 아니라, 나의 감정과 선택의 흐름을 차분하게 바라보게 돕는 플랫폼을 지향합니다."
          }
        </p>
      </section>

      <section className="mt-14">
        <GlassPanel className="p-8 sm:p-10 lg:p-12">
          <div className="space-y-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </GlassPanel>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <GlassPanel key={value.title} className="h-full p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-secondary)]">
              {value.title}
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
              {value.description}
            </p>
          </GlassPanel>
        ))}
      </section>
    </main>
  );
}

