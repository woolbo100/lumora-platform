"use client";

import { useState } from "react";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareSection } from "@/components/shared/ResultShareSection";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";
import { auraQuestions } from "@/data/auraQuestions";
import { auraToneLabels, chakraFocus, chakraLabels, chakraMetadata } from "@/lib/auraMapping";
import { type AuraComputedResult } from "@/types/auraCode";

const STORAGE_KEY = "lumora-aura-code-v2";

function readStoredResult(): {
  result: AuraComputedResult | null;
  answeredCount: number;
} {
  if (typeof window === "undefined") {
    return { result: null, answeredCount: 0 };
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { result: null, answeredCount: 0 };
  }

  try {
    const parsed = JSON.parse(saved) as {
      answers?: Record<string, unknown>;
      result?: AuraComputedResult | null;
    };

    return {
      result: parsed.result ?? null,
      answeredCount: Object.keys(parsed.answers ?? {}).length,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { result: null, answeredCount: 0 };
  }
}

export function AuraResult() {
  const [stored, setStored] = useState(readStoredResult);
  const recommended = services.filter((service) =>
    ["/emotion", "/attachment-code", "/relationship-pattern", "/tarot"].includes(service.href),
  );

  if (!stored.result) {
    return (
      <GlassPanel className="result-panel-glow p-8 text-center sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Aura Result
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          테스트를 마친 뒤
          <br />
          결과 페이지가 열립니다
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금은 저장된 테스트 결과가 없어 리포트를 보여드릴 수 없습니다.
          21문항 테스트를 완료하면 주요 차크라 상태, 전체 에너지 흐름, 메인 오라와
          서브 오라가 이 페이지에 정리됩니다.
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/aura-code/test">테스트 시작하기</CTAButton>
        </div>
      </GlassPanel>
    );
  }

  const result = stored.result;

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    setStored({
      result: null,
      answeredCount: 0,
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <GlassPanel className="result-panel-glow p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
            Aura Report
          </p>
          <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
            당신의 오라 코드
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--foreground-soft)]">
            {result.summary}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="result-card-glow rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">메인 오라</p>
              <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                {result.mainAura.name}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                {result.mainAura.hue}
              </p>
            </div>
            <div className="result-card-glow rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">서브 오라</p>
              <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                {result.subAura.name}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                {result.subAura.hue}
              </p>
            </div>
            <div className="result-card-glow rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">상태 배지</p>
              <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                {result.stateBadge}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                {auraToneLabels[result.auraTone]}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">요약 해석</p>
              <p className="mt-3 leading-8 text-[var(--foreground-soft)]">{result.interpretation}</p>
            </div>
            <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">전체 에너지 흐름</p>
              <p className="mt-3 leading-8 text-[var(--foreground-soft)]">{result.flowMessage}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/aura-code/test">다시 테스트하기</CTAButton>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
            >
              결과 초기화
            </button>
          </div>

          <ResultShareSection
            shareTitle="나의 오라코드 결과 💫"
            results={{
              "메인 오라": result.mainAura.name,
              "상태 배지": result.stateBadge,
            }}
            description={result.flowMessage}
            testUrl="https://www.lumoracode.kr/aura-code/test"
            hubUrl="https://www.lumoracode.kr/aura-code"
          />
        </GlassPanel>

        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Reading Notes</p>
          <div className="mt-6 grid gap-4">
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">응답 현황</p>
              <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
                {stored.answeredCount} / {auraQuestions.length}
              </p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">전체 상태</p>
              <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
                {result.stateBadge}
              </p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">마무리 문구</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.closing}</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Chakra Highlights
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            지금 가장 선명한 흐름
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {result.primaryChakras.map((chakra) => {
            const meta = chakraMetadata[chakra.chakra];
            return (
              <GlassPanel key={chakra.chakra} className="result-panel-glow p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">주요 차크라</p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div 
                    className="h-3 w-3 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.15)]" 
                    style={{ backgroundColor: meta.color }}
                  />
                  <h3 className="text-2xl font-semibold text-[var(--foreground)]">
                    {chakraLabels[chakra.chakra]}
                    <span className="ml-1.5 text-lg font-medium opacity-50">({meta.number})</span>
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[var(--color-secondary)]">
                  {chakraFocus[chakra.chakra]}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                  {chakra.state === "blocked"
                    ? "지금은 이 차크라의 흐름이 안쪽으로 조용히 웅크린 상태에 가깝습니다."
                    : chakra.state === "overactive"
                      ? "지금은 이 차크라의 흐름이 바깥으로 강하게 뻗어 나가며 존재감을 드러내는 상태에 가깝습니다."
                      : chakra.state === "mixed"
                        ? "지금은 막힘과 확장이 함께 스치며 전환의 결이 감지되는 상태에 가깝습니다."
                        : "이 차크라는 비교적 안정적인 결을 유지하고 있습니다."}
                </p>
              </GlassPanel>
            );
          })}

          {result.strengthChakra ? (() => {
            const meta = chakraMetadata[result.strengthChakra.chakra];
            return (
              <GlassPanel className="result-panel-glow p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">강점 차크라</p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div 
                    className="h-3 w-3 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.15)]" 
                    style={{ backgroundColor: meta.color }}
                  />
                  <h3 className="text-2xl font-semibold text-[var(--foreground)]">
                    {chakraLabels[result.strengthChakra.chakra]}
                    <span className="ml-1.5 text-lg font-medium opacity-50">({meta.number})</span>
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[var(--color-secondary)]">
                  {chakraFocus[result.strengthChakra.chakra]}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                  지금의 당신 안에서 비교적 안정적으로 흐르며 전체 리듬을 지지하는
                  결입니다. 완벽한 균형이라기보다, 현재의 자신을 붙들어주는 조용한
                  중심으로 이해해보면 좋습니다.
                </p>
              </GlassPanel>
            );
          })() : null}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Recommended
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            추천 서비스
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recommended.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
