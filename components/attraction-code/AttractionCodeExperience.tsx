"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { attractionQuestions } from "@/data/attractionQuestions";
import {
  calculateAttractionResult,
  getSelectedAttractionOption,
} from "@/lib/attractionCalculator";
import {
  type AttractionAnswerMap,
  type AttractionOption,
  type AttractionType,
} from "@/types/attraction";

const STORAGE_KEY = "lumora-attraction-code-store";

type AttractionRuntimeState = {
  currentIndex: number;
  answers: AttractionAnswerMap;
  resultType: AttractionType | null;
  completed: boolean;
};

const initialState: AttractionRuntimeState = {
  currentIndex: 0,
  answers: {},
  resultType: null,
  completed: false,
};

function getInitialAttractionState(): AttractionRuntimeState {
  // 테스트 진행 흐름을 새로고침해도 이어서 볼 수 있도록 상태를 보존합니다.
  if (typeof window === "undefined") {
    return initialState;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return initialState;
  }

  try {
    return JSON.parse(savedState) as AttractionRuntimeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialState;
  }
}

export function AttractionCodeExperience() {
  const router = useRouter();
  const [state, setState] = useState<AttractionRuntimeState>(
    getInitialAttractionState,
  );
  const totalQuestions = attractionQuestions.length;
  const currentQuestion =
    attractionQuestions[Math.min(state.currentIndex, totalQuestions - 1)];
  const progress = Math.min(((state.currentIndex + 1) / totalQuestions) * 100, 100);
  const selectedOption = currentQuestion
    ? getSelectedAttractionOption(state.answers, currentQuestion.id)
    : undefined;

  useEffect(() => {
    if (state.completed && state.resultType) {
      router.push(`/attraction-code/result?type=${state.resultType}`);
    }
  }, [router, state.completed, state.resultType]);

  function persist(nextState: AttractionRuntimeState) {
    setState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function handleSelectOption(questionId: number, option: AttractionOption) {
    const nextAnswers = {
      ...state.answers,
      [questionId]: option,
    };
    const nextResult = calculateAttractionResult(nextAnswers);
    const completed = Object.keys(nextAnswers).length >= totalQuestions;
    const nextState: AttractionRuntimeState = {
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
      <GlassPanel className="border-[var(--color-secondary)]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(27,17,38,0.3)_45%,rgba(10,13,28,0.35))] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Attraction Reading
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          당신 안에 이미 있는
          <br />
          매력의 결을 읽어보세요
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
          첫인상, 분위기, 친밀감, 존재감, 무드까지 여러 각도에서 매력을
          읽어내며 당신만의 끌림 포인트를 부드럽고 입체적으로 해석합니다.
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
              className="h-full rounded-full bg-gradient-to-r from-[#f4c9dd] via-[var(--color-secondary)] to-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-[var(--foreground-soft)]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.2))] p-4">
            질문은 당신의 첫인상, 친밀감, 분위기, 존재감을 여러 각도에서 읽을
            수 있도록 구성되어 있습니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(244,201,221,0.06)_58%,rgba(12,14,28,0.2))] p-4">
            결과는 겉으로 보이는 이미지보다, 사람의 마음에 오래 남는 매력의
            결을 중심으로 해석합니다.
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Question {currentQuestion.id}
        </p>
        <h3 className="mt-4 font-display text-[2rem] leading-[1.22] text-[var(--foreground)] sm:text-[2.75rem] sm:leading-[1.18]">
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
                    ? "border-[var(--color-secondary)]/70 bg-[linear-gradient(135deg,rgba(244,201,221,0.16),rgba(213,195,165,0.1)_55%,rgba(122,104,217,0.08))] shadow-[0_18px_50px_rgba(111,74,133,0.24)]"
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
