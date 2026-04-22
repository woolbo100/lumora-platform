"use client";

import { useState } from "react";
import Link from "next/link";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { attractionQuestions } from "@/data/attractionQuestions";
import { getAttractionResultByType } from "@/lib/attractionCalculator";
import { type AttractionType } from "@/types/attraction";

const scoreLabels: Record<AttractionType, string> = {
  elegant: "우아한 존재감형",
  lovely: "사랑스러운 친밀형",
  chic: "시크한 매혹형",
  warm: "공감형 따뜻함",
  mystic: "신비로운 분위기형",
};

const STORAGE_KEY = "lumora-attraction-code-store";

function getStoredAttractionResult(): {
  storedType: AttractionType | null;
  answeredCount: number;
} {
  // 결과 페이지 새로고침 후에도 마지막 분석 흐름을 유지합니다.
  if (typeof window === "undefined") {
    return {
      storedType: null,
      answeredCount: 0,
    };
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return {
      storedType: null,
      answeredCount: 0,
    };
  }

  try {
    const parsed = JSON.parse(savedState) as {
      answers?: Record<string, unknown>;
      resultType?: AttractionType | null;
    };

    return {
      storedType: parsed.resultType ?? null,
      answeredCount: Object.keys(parsed.answers ?? {}).length,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);

    return {
      storedType: null,
      answeredCount: 0,
    };
  }
}

type AttractionResultPanelProps = {
  initialType?: AttractionType;
};

export function AttractionResultPanel({
  initialType,
}: AttractionResultPanelProps) {
  const [storedResult, setStoredResult] = useState(getStoredAttractionResult);
  const resultType = initialType ?? storedResult.storedType ?? "lovely";
  const result = getAttractionResultByType(resultType);

  function resetStoredResult() {
    window.localStorage.removeItem(STORAGE_KEY);
    setStoredResult({
      storedType: null,
      answeredCount: 0,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(244,201,221,0.07)_32%,rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Attraction Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {result.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
          {result.shortDescription}
        </p>

        <div className="mt-10 grid gap-4">
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.07)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              매력 포인트
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.attractionPoint}
            </p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.07)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              관계 스타일
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.relationshipStyle}
            </p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.07)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              더 빛나는 조언
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.improvementTip}
            </p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.07)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              더 깊은 해석
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.detailedDescription}
            </p>
          </div>
        </div>

        <ResultShareActions
          testName="매력 리포트"
          resultTitle={result.title}
          resultSummary={result.shortDescription}
          hubUrl="/attraction-code"
          restartUrl="/attraction-code/test"
        />
      </GlassPanel>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Reading Notes
        </p>
        <div className="mt-6 grid gap-4">
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              응답 현황
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {storedResult.answeredCount} / {attractionQuestions.length}
            </p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              결과 유형
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {scoreLabels[resultType]}
            </p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              한 줄 조언
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.improvementTip}
            </p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              핵심 키워드
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-3 py-1 text-xs font-medium text-[var(--color-secondary)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              다른 리딩 이어보기
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/relationship-pattern"
                className="inline-flex rounded-full border border-[var(--color-secondary)]/18 px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]"
              >
                연애패턴 코드 보기
              </Link>
              <Link
                href="/attachment-code"
                className="inline-flex rounded-full border border-[var(--color-secondary)]/18 px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]"
              >
                애착유형 코드 보기
              </Link>
              <Link
                href="/tarot"
                className="inline-flex rounded-full border border-[var(--color-secondary)]/18 px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]"
              >
                타로 리딩 보기
              </Link>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
