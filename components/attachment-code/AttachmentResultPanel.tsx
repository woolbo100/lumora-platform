"use client";

import { useState } from "react";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { attachmentQuestions } from "@/data/attachmentQuestions";
import { getAttachmentResultByType } from "@/lib/attachmentCalculator";
import { type AttachmentType } from "@/types/attachment";

const scoreLabels: Record<AttachmentType, string> = {
  secure: "안정형",
  anxious: "불안형",
  avoidant: "회피형",
  fearful: "혼합형",
};

const STORAGE_KEY = "lumora-attachment-code-store";

function getStoredAttachmentResult(): {
  storedType: AttachmentType | null;
  answeredCount: number;
} {
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
      resultType?: AttachmentType | null;
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

type AttachmentResultPanelProps = {
  initialType?: AttachmentType;
};

export function AttachmentResultPanel({
  initialType,
}: AttachmentResultPanelProps) {
  const [storedResult, setStoredResult] = useState(getStoredAttachmentResult);
  const resultType = initialType ?? storedResult.storedType ?? "secure";
  const result = getAttachmentResultByType(resultType);

  function resetStoredResult() {
    window.localStorage.removeItem(STORAGE_KEY);
    setStoredResult({
      storedType: null,
      answeredCount: 0,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Result Profile
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {result.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
          {result.shortDescription}
        </p>
        <p className="mt-5 max-w-3xl leading-8 text-[var(--foreground-soft)]">
          {result.detailedDescription}
        </p>

        <div className="mt-10 grid gap-4">
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              관계 패턴 설명
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.relationshipPattern}</p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              감정 습관
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.emotionalHabit}</p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              두려움 포인트
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.fearPoint}</p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              회복 가이드
            </p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.healingGuide}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton href="/attachment-code/test">테스트 다시하기</CTAButton>
          <button
            type="button"
            onClick={resetStoredResult}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            결과 초기화
          </button>
        </div>

        <ResultShareActions
          testName="애착유형 테스트"
          resultTitle={result.title}
          resultSummary={result.shortDescription}
          resultUrl={typeof window !== "undefined" ? window.location.href : ""}
          hubUrl="https://www.lumoracode.kr/attachment-code"
        />
      </GlassPanel>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Analysis Notes</p>
        <div className="mt-6 grid gap-4">
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">응답 현황</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {storedResult.answeredCount} / {attachmentQuestions.length}
            </p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">주요 코드</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              {scoreLabels[resultType]}
            </p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">추천 메시지</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.recommendedMessage}</p>
          </div>
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">키워드 요약</p>
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
          <div className="result-card-glow rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">백도화 리포트</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">
              관계의 서사와 감정 패턴을 더 깊이 읽고 싶다면, 백도화 리포트에서
              당신의 애착 코드가 어떤 장면에서 활성화되는지 정교하게 확인해보세요.
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex text-sm font-semibold text-[var(--color-secondary)]"
            >
              백도화 리포트 CTA 보기 →
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
