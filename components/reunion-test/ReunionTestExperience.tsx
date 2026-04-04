"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { reunionQuestions } from "@/data/reunionQuestions";
import {
  calculateReunionResult,
  getSelectedReunionOption,
} from "@/lib/reunionCalculator";
import {
  type ReunionAnswerMap,
  type ReunionOption,
  type ReunionType,
} from "@/types/reunion";

const STORAGE_KEY = "lumora-reunion-test-store";

type ReunionRuntimeState = {
  currentIndex: number;
  answers: ReunionAnswerMap;
  resultType: ReunionType | null;
  completed: boolean;
};

const initialState: ReunionRuntimeState = {
  currentIndex: 0,
  answers: {},
  resultType: null,
  completed: false,
};

function getInitialReunionState(): ReunionRuntimeState {
  // 재방문 시 이어서 진행할 수 있도록 로컬 상태를 복원합니다.
  if (typeof window === "undefined") {
    return initialState;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return initialState;
  }

  try {
    return JSON.parse(savedState) as ReunionRuntimeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialState;
  }
}

export function ReunionTestExperience() {
  const router = useRouter();
  const [state, setState] = useState<ReunionRuntimeState>(getInitialReunionState);
  const totalQuestions = reunionQuestions.length;
  const currentQuestion =
    reunionQuestions[Math.min(state.currentIndex, totalQuestions - 1)];
  const progress = Math.min(((state.currentIndex + 1) / totalQuestions) * 100, 100);
  const selectedOption = currentQuestion
    ? getSelectedReunionOption(state.answers, currentQuestion.id)
    : undefined;

  useEffect(() => {
    if (state.completed && state.resultType) {
      router.push(`/reunion-test/result?type=${state.resultType}`);
    }
  }, [router, state.completed, state.resultType]);

  function persist(nextState: ReunionRuntimeState) {
    setState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function handleSelectOption(questionId: number, option: ReunionOption) {
    const nextAnswers = {
      ...state.answers,
      [questionId]: option,
    };
    const nextResult = calculateReunionResult(nextAnswers);
    const completed = Object.keys(nextAnswers).length >= totalQuestions;
    const nextState: ReunionRuntimeState = {
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

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <GlassPanel className="border-[var(--color-secondary)]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(10,13,28,0.35))] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Reunion Possibility Reading
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          지금 남아 있는 감정의 결과
          <br />
          관계의 흐름을 읽어보세요
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
          연락의 온도, 거리감, 미련의 결, 다시 대화가 열릴 가능성까지 함께
          살펴보며 재회 가능성을 감정과 현실의 균형 안에서 읽어드립니다.
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
            질문은 실제 재회 고민에서 자주 마주하는 감정선과 현실 조건을 함께
            반영해 구성했습니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-4">
            결과는 희망 고문보다 흐름 중심의 해석에 가깝습니다. 가능성과 거리감을
            함께 읽어보세요.
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
                className={`aurora-hover rounded-[24px] border px-5 py-5 text-left transition duration-300 ${
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
            허브로 이동
          </CTAButton>
          <button
            type="button"
            onClick={resetRuntimeState}
            className="aurora-hover aurora-hover-soft inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 시작
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
