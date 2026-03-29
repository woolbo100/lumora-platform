"use client";

import { useState } from "react";
import Link from "next/link";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { reunionQuestions } from "@/data/reunionQuestions";
import { getReunionResultByType } from "@/lib/reunionCalculator";
import { type ReunionType } from "@/types/reunion";

const scoreLabels: Record<ReunionType, string> = {
  high: "가능성 높음형",
  cautious: "조심스러운 회복형",
  closure: "정리 필요형",
  newflow: "새로운 흐름 전환형",
};

const STORAGE_KEY = "lumora-reunion-test-store";

function getStoredReunionResult(): {
  storedType: ReunionType | null;
  answeredCount: number;
} {
  // 결과 페이지 새로고침에도 마지막 응답 상태를 유지합니다.
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
      resultType?: ReunionType | null;
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

type ReunionResultPanelProps = {
  initialType?: ReunionType;
};

export function ReunionResultPanel({
  initialType,
}: ReunionResultPanelProps) {
  const [storedResult, setStoredResult] = useState(getStoredReunionResult);
  const resultType = initialType ?? storedResult.storedType ?? "cautious";
  const result = getReunionResultByType(resultType);

  function resetStoredResult() {
    window.localStorage.removeItem(STORAGE_KEY);
    setStoredResult({
      storedType: null,
      answeredCount: 0,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Reunion Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {result.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
          {result.shortDescription}
        </p>

        <div className="mt-10 grid gap-4">
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              현재 관계의 흐름
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.emotionalFlow}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              감정 거리와 현실 해석
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.detailedDescription}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              주의 포인트
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.warningPoint}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              행동 조언
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.actionGuide}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton href="/reunion-test/test">테스트 다시하기</CTAButton>
          <button
            type="button"
            onClick={resetStoredResult}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            결과 초기화
          </button>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Reading Notes
        </p>
        <div className="mt-6 grid gap-4">
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              응답 현황
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {storedResult.answeredCount} / {reunionQuestions.length}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              결과 유형
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {scoreLabels[resultType]}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              추천 메시지
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              {result.recommendedMessage}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
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
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
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
