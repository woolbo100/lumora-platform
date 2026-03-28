"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { attachmentQuestions } from "@/data/attachmentQuestions";
import { calculateAttachmentResult, getSelectedAttachmentOption } from "@/lib/attachmentCalculator";
import { type AttachmentAnswerMap, type AttachmentOption, type AttachmentType } from "@/types/attachment";

const STORAGE_KEY = "lumora-attachment-code-store";

type AttachmentRuntimeState = {
  currentIndex: number;
  answers: AttachmentAnswerMap;
  resultType: AttachmentType | null;
  completed: boolean;
};

const initialState: AttachmentRuntimeState = {
  currentIndex: 0,
  answers: {},
  resultType: null,
  completed: false,
};

function getInitialAttachmentRuntimeState(): AttachmentRuntimeState {
  if (typeof window === "undefined") {
    return initialState;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return initialState;
  }

  try {
    return JSON.parse(savedState) as AttachmentRuntimeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialState;
  }
}

export function AttachmentCodeExperience() {
  const router = useRouter();
  const [state, setState] = useState<AttachmentRuntimeState>(
    getInitialAttachmentRuntimeState,
  );
  const totalQuestions = attachmentQuestions.length;
  const currentQuestion = attachmentQuestions[Math.min(state.currentIndex, totalQuestions - 1)];
  const progress = Math.min(((state.currentIndex + 1) / totalQuestions) * 100, 100);
  const selectedOption = currentQuestion
    ? getSelectedAttachmentOption(state.answers, currentQuestion.id)
    : undefined;

  useEffect(() => {
    if (state.completed && state.resultType) {
      router.push(`/attachment-code/result?type=${state.resultType}`);
    }
  }, [router, state.completed, state.resultType]);

  function persist(nextState: AttachmentRuntimeState) {
    setState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function handleSelectOption(questionId: number, option: AttachmentOption) {
    const nextAnswers = {
      ...state.answers,
      [questionId]: option,
    };
    const nextResult = calculateAttachmentResult(nextAnswers);
    const completed = Object.keys(nextAnswers).length >= totalQuestions;
    const nextState: AttachmentRuntimeState = {
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
          Attachment Code
        </p>
        <h2 className="mt-4 font-display text-4xl text-white">
          관계 속 감정 패턴을
          <br />
          정제된 흐름으로 읽어보세요
        </h2>
        <p className="mt-5 text-sm leading-7 text-white/70">
          20개의 질문을 통해 사랑 앞에서 내가 어떻게 반응하는지 차분하게
          확인합니다. 각 답변은 안정형, 불안형, 회피형, 혼합형 코드로 연결되어
          결과 리포트를 완성합니다.
        </p>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/65">
            <span>진행도</span>
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

        <div className="mt-10 grid gap-3 text-sm text-white/68">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            안정형, 불안형, 회피형, 혼합형의 반응 흐름을 균형 있게 비교합니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            감정 과잉 해석보다 현재 관계에서 반복되는 패턴을 읽는 데 초점을 둡니다.
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Question {currentQuestion.id}
        </p>
        <h3 className="mt-4 font-display text-4xl text-white sm:text-5xl">
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
                    ? "border-[var(--color-secondary)]/70 bg-[var(--color-secondary)]/12 shadow-[0_18px_50px_rgba(255,215,0,0.08)]"
                    : "border-white/10 bg-white/6 hover:border-[var(--color-primary)]/45 hover:bg-white/10"
                }`}
              >
                <span className="block text-base leading-7 text-white">{option.text}</span>
                <span className="mt-2 block text-xs uppercase tracking-[0.25em] text-white/40">
                  {option.type}
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
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition disabled:cursor-not-allowed disabled:opacity-35"
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
            처음부터 다시
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
