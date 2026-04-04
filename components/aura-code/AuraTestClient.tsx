"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { auraQuestions } from "@/data/auraQuestions";
import { calculateAuraResult } from "@/lib/auraScoring";
import { type AuraAnswerValue, type AuraAnswers, type AuraComputedResult } from "@/types/auraCode";

const STORAGE_KEY = "lumora-aura-code-v2";

type RuntimeState = {
  currentIndex: number;
  answers: AuraAnswers;
  result: AuraComputedResult | null;
  completed: boolean;
};

const answerOptions: { value: AuraAnswerValue; label: string }[] = [
  { value: 0, label: "거의 그렇지 않다" },
  { value: 1, label: "가끔 그렇다" },
  { value: 2, label: "자주 그렇다" },
];

const initialState: RuntimeState = {
  currentIndex: 0,
  answers: {},
  result: null,
  completed: false,
};

function getInitialState(): RuntimeState {
  if (typeof window === "undefined") {
    return initialState;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return initialState;
  }

  try {
    return JSON.parse(saved) as RuntimeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialState;
  }
}

type AuraTestClientProps = {
  embedded?: boolean;
};

export function AuraTestClient({ embedded = false }: AuraTestClientProps) {
  const router = useRouter();
  const [state, setState] = useState<RuntimeState>(getInitialState);
  const [started, setStarted] = useState(embedded);

  const currentQuestion = auraQuestions[Math.min(state.currentIndex, auraQuestions.length - 1)];
  const progress = ((state.currentIndex + 1) / auraQuestions.length) * 100;
  const selectedValue = currentQuestion ? state.answers[currentQuestion.id] : undefined;
  const hasProgress = Object.keys(state.answers).length > 0;

  useEffect(() => {
    if (state.completed && state.result) {
      router.push("/aura-code/result");
    }
  }, [router, state.completed, state.result]);

  function persist(nextState: RuntimeState) {
    setState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function answerQuestion(value: AuraAnswerValue) {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = {
      ...state.answers,
      [currentQuestion.id]: value,
    };
    const completed = Object.keys(nextAnswers).length >= auraQuestions.length;

    persist({
      currentIndex: Math.min(state.currentIndex + 1, auraQuestions.length),
      answers: nextAnswers,
      result: completed ? calculateAuraResult(nextAnswers) : null,
      completed,
    });
  }

  function goPrev() {
    persist({
      ...state,
      currentIndex: Math.max(0, state.currentIndex - 1),
    });
  }

  function resetAll() {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
    setStarted(embedded);
  }

  if (!currentQuestion) {
    return null;
  }

  if (!started) {
    return (
      <section className="aurora-hover relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(167,127,255,0.16),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(255,201,153,0.1),transparent_22%),radial-gradient(circle_at_22%_78%,rgba(99,182,219,0.12),transparent_24%),linear-gradient(135deg,rgba(18,16,34,0.96),rgba(8,12,28,0.96)_58%,rgba(10,11,22,0.98))] px-6 py-16 text-center shadow-[0_30px_120px_rgba(6,8,22,0.45)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[14%] top-[18%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(195,176,255,0.16),transparent_70%)] blur-3xl" />
          <div className="absolute right-[14%] bottom-[16%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(84,168,210,0.12),transparent_72%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Aura Reading
          </p>
          <h2 className="mt-5 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
            21문항 오라 리딩
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            각 문항에 대해 지금의 자신과 가장 가까운 정도를 선택해보세요.
            응답은 0점부터 2점까지 누적되며, 주요 차크라 상태와 전체 에너지 흐름,
            오라 색의 결로 이어집니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="aurora-hover aurora-hover-strong inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(245,226,191,0.95),rgba(176,151,255,0.92)_46%,rgba(91,174,214,0.88))] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(84,70,173,0.28)] transition hover:-translate-y-0.5"
            >
              {hasProgress ? "이어서 테스트하기" : "테스트 시작하기"}
            </button>
            {hasProgress ? (
              <button
                type="button"
                onClick={resetAll}
                className="aurora-hover aurora-hover-soft inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-[var(--foreground-soft)] transition hover:bg-white/6"
              >
                처음부터 다시
              </button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <GlassPanel className="p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Question Flow
        </p>
        <h3 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          감정과 차크라의 흐름을
          <br />
          한 문항씩 차분하게 살펴봅니다
        </h3>
        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
          0은 거의 그렇지 않다, 1은 가끔 그렇다, 2는 자주 그렇다를 뜻합니다.
          지금의 자신을 가장 가깝게 닮은 정도를 선택해보세요.
        </p>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/65">
            <span>진행률</span>
            <span>
              {Math.min(state.currentIndex + 1, auraQuestions.length)} / {auraQuestions.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,216,168,0.92),rgba(149,131,246,0.96),rgba(88,176,214,0.88))] transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-[var(--foreground-soft)]">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
            결과는 좋은지 나쁜지를 나누기보다, 지금 어떤 에너지 결이 선명한지
            읽어주는 해석형 리딩입니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
            모바일에서도 한 문항씩 집중해서 응답할 수 있도록 구성했습니다.
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Question {currentQuestion.id}
        </p>
        <h3 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
          {currentQuestion.text}
        </h3>

        <div className="mt-8 grid gap-4">
          {answerOptions.map((option) => {
            const active = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => answerQuestion(option.value)}
                className={`aurora-hover rounded-[24px] border px-5 py-5 text-left transition ${
                  active
                    ? "border-[var(--color-secondary)]/70 bg-[linear-gradient(135deg,rgba(245,223,193,0.12),rgba(135,117,232,0.08)_52%,rgba(95,191,179,0.08))] shadow-[0_18px_50px_rgba(76,60,144,0.22)]"
                    : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] hover:border-[var(--color-primary)]/45 hover:bg-white/10"
                }`}
              >
                <span className="block text-lg font-semibold text-[var(--foreground)]">
                  {option.value}
                </span>
                <span className="mt-2 block text-sm leading-7 text-[var(--foreground-soft)]">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={goPrev}
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
            onClick={resetAll}
            className="aurora-hover aurora-hover-soft inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 테스트
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
