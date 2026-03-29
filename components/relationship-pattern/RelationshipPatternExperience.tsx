"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { relationshipPatternQuestions } from "@/data/relationshipPatternQuestions";
import {
  calculateRelationshipPatternResult,
  getSelectedRelationshipPatternOption,
} from "@/lib/relationshipPatternCalculator";
import {
  type RelationshipPatternAnswerMap,
  type RelationshipPatternOption,
  type RelationshipPatternType,
} from "@/types/relationshipPattern";

const STORAGE_KEY = "lumora-relationship-pattern-store";

type RelationshipPatternRuntimeState = {
  currentIndex: number;
  answers: RelationshipPatternAnswerMap;
  resultType: RelationshipPatternType | null;
  completed: boolean;
};

const initialState: RelationshipPatternRuntimeState = {
  currentIndex: 0,
  answers: {},
  resultType: null,
  completed: false,
};

function getInitialRelationshipPatternState(): RelationshipPatternRuntimeState {
  if (typeof window === "undefined") {
    return initialState;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return initialState;
  }

  try {
    return JSON.parse(savedState) as RelationshipPatternRuntimeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialState;
  }
}

export function RelationshipPatternExperience() {
  const router = useRouter();
  const [state, setState] = useState<RelationshipPatternRuntimeState>(
    getInitialRelationshipPatternState,
  );
  const [hasEnteredExperience, setHasEnteredExperience] = useState(false);
  const totalQuestions = relationshipPatternQuestions.length;
  const currentQuestion =
    relationshipPatternQuestions[Math.min(state.currentIndex, totalQuestions - 1)];
  const progress = Math.min(((state.currentIndex + 1) / totalQuestions) * 100, 100);
  const selectedOption = currentQuestion
    ? getSelectedRelationshipPatternOption(state.answers, currentQuestion.id)
    : undefined;

  useEffect(() => {
    if (state.completed && state.resultType) {
      router.push(`/relationship-pattern/result?type=${state.resultType}`);
    }
  }, [router, state.completed, state.resultType]);

  function persist(nextState: RelationshipPatternRuntimeState) {
    setState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function handleSelectOption(
    questionId: number,
    option: RelationshipPatternOption,
  ) {
    const nextAnswers = {
      ...state.answers,
      [questionId]: option,
    };
    const nextResult = calculateRelationshipPatternResult(nextAnswers);
    const completed = Object.keys(nextAnswers).length >= totalQuestions;
    const nextState: RelationshipPatternRuntimeState = {
      currentIndex: Math.min(state.currentIndex + 1, totalQuestions),
      answers: nextAnswers,
      resultType: completed ? nextResult.topType : null,
      completed,
    };

    persist(nextState);
  }

  function moveToPreviousQuestion() {
    persist({
      ...state,
      currentIndex: Math.max(state.currentIndex - 1, 0),
    });
  }

  function resetRuntimeState() {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }

  const hasProgress = Object.keys(state.answers).length > 0;

  if (!currentQuestion) {
    return null;
  }

  if (!hasEnteredExperience) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(122,104,217,0.24),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(120,162,255,0.12),transparent_22%),linear-gradient(135deg,rgba(29,18,53,0.94),rgba(10,14,34,0.94)_58%,rgba(17,19,33,0.92))] px-6 py-16 text-center shadow-[0_30px_120px_rgba(6,8,22,0.45)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,194,138,0.12),transparent_62%)] blur-3xl" />
          <div className="absolute right-[12%] top-[18%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/12 bg-white/8 text-[var(--color-secondary)] shadow-[0_14px_40px_rgba(214,194,138,0.12)] backdrop-blur-xl">
            <span className="font-display text-6xl leading-none">✦</span>
          </div>

          <h2 className="font-display text-6xl text-[var(--foreground)] sm:text-7xl">
            Luna Pattern
          </h2>
          <p className="mt-5 text-2xl font-medium text-[var(--color-secondary)] sm:text-3xl">
            연애패턴 코드를 읽어보세요
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-9 text-[var(--foreground-soft)]">
            관계 안에서 반복되는 감정선과 반응의 결을 20개의 질문으로 천천히
            살펴봅니다. 사랑이 깊어질수록 나는 어디로 흐르는지, LUMORA의 감성
            리딩으로 부드럽게 비춰보세요.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setHasEnteredExperience(true)}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(89,72,173,0.28)] transition hover:-translate-y-0.5"
            >
              {hasProgress ? "이어서 분석하기" : "지금 시작하기"}
              <span className="ml-3 text-xl" aria-hidden="true">
                →
              </span>
            </button>

            {hasProgress ? (
              <button
                type="button"
                onClick={resetRuntimeState}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold text-[var(--foreground-soft)] transition hover:bg-white/10"
              >
                처음부터 다시 보기
              </button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <GlassPanel className="border-[var(--color-secondary)]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(10,13,28,0.35))] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Relationship Pattern Code
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          사랑 안에서 드러나는
          <br />
          당신의 흐름을 읽어보세요
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
          연애 안에서 반복되는 몰입, 희생, 거리감, 감정의 파도, 안정 지향성을
          차분하게 살펴보고 현재의 관계 패턴을 가장 닮은 코드로 정리해드립니다.
        </p>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/65">
            <span>진행률</span>
            <span>
              {Math.min(state.currentIndex + 1, totalQuestions)} / {totalQuestions}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-secondary)] via-[#ffe58f] to-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-[var(--foreground-soft)]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-4">
            질문은 실제 연애 장면에서 자주 반복되는 반응을 기준으로 설계되어
            있습니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-4">
            지금의 당신을 가장 닮은 감정선이 어느 방향으로 흐르는지 중심 패턴을
            부드럽게 읽어드립니다.
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Question {currentQuestion.id}
        </p>
        <h3 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          {currentQuestion.question}
        </h3>

        <div className="mt-8 grid gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption?.text === option.text;

            return (
              <button
                key={option.text}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, option)}
                className={`rounded-[24px] border px-5 py-5 text-left transition duration-300 ${
                  isSelected
                    ? "border-[var(--color-secondary)]/70 bg-[linear-gradient(135deg,rgba(213,195,165,0.12),rgba(122,104,217,0.08)_65%,rgba(255,255,255,0.05))] shadow-[0_18px_50px_rgba(76,60,144,0.22)]"
                    : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] hover:border-[var(--color-primary)]/45 hover:bg-white/10"
                }`}
              >
                <span className="block text-base leading-7 text-[var(--foreground)]">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={moveToPreviousQuestion}
            disabled={state.currentIndex === 0}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition disabled:cursor-not-allowed disabled:opacity-35"
          >
            이전 질문
          </button>
          <CTAButton href="/" variant="secondary">
            홈으로 이동
          </CTAButton>
          <button
            type="button"
            onClick={resetRuntimeState}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 시작
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
