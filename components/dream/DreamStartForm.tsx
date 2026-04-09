"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateDreamInput } from "@/lib/dream/interpreter";
import {
  type DreamCompanion,
  type DreamEmotion,
  type DreamInput,
  type DreamSituation,
} from "@/types/dream";

const INITIAL_FORM: DreamInput = {
  dream_text: "",
};

const EMOTION_OPTIONS: Array<{ value: DreamEmotion; label: string; emoji: string }> = [
  { value: "fear", label: "무서움", emoji: "😨" },
  { value: "sadness", label: "슬픔", emoji: "😢" },
  { value: "anger", label: "분노", emoji: "😠" },
  { value: "calm", label: "평온", emoji: "😌" },
  { value: "surprise", label: "놀람", emoji: "😮" },
];

const SITUATION_OPTIONS: Array<{ value: DreamSituation; label: string }> = [
  { value: "chased", label: "쫓김" },
  { value: "falling", label: "떨어짐" },
  { value: "conflict", label: "싸움" },
  { value: "discovery", label: "발견" },
  { value: "movement", label: "이동" },
];

const COMPANION_OPTIONS: Array<{ value: DreamCompanion; label: string }> = [
  { value: "alone", label: "혼자" },
  { value: "known", label: "아는 사람" },
  { value: "unknown", label: "모르는 사람" },
  { value: "family", label: "가족" },
];

const STEP_ITEMS = [
  { id: 1, label: "꿈 내용" },
  { id: 2, label: "감정 선택" },
  { id: 3, label: "상황 선택" },
  { id: 4, label: "등장 인물" },
] as const;

export function DreamStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<DreamInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  function updateField<K extends keyof DreamInput>(key: K, value: DreamInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function goNextStep() {
    setCurrentStep((current) => Math.min(current + 1, 4) as 1 | 2 | 3 | 4);
  }

  function goPreviousStep() {
    setCurrentStep((current) => Math.max(current - 1, 1) as 1 | 2 | 3 | 4);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateDreamInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams();

    Object.entries(validated.data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`/dream/result?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Dream Flow
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          꿈 → 감정 → 상황 → 해석
        </h2>
        <div className="mt-8 grid gap-4">
          {[
            "1. 꿈 내용을 자유롭게 입력",
            "2. 꿈에서 가장 크게 남은 감정 선택",
            "3. 꿈의 핵심 상황 선택",
            "4. 등장 인물과 상징을 함께 해석",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-4 text-base text-[var(--foreground-soft)]"
            >
              {item}
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Start</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          무료 꿈해몽 시작
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          꿈 내용과 감정, 상황, 등장 인물을 바탕으로 지금 무의식이 전하는 메시지와 흐름을 읽어냅니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STEP_ITEMS.map((step) => {
                const isActive = currentStep === step.id;
                const isPassed = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className={`rounded-[20px] border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[rgba(214,194,255,0.46)] bg-[linear-gradient(135deg,rgba(255,236,236,0.12),rgba(214,194,255,0.16)_44%,rgba(142,116,255,0.18)_100%)] shadow-[0_0_18px_rgba(126,98,236,0.12)]"
                        : isPassed
                          ? "border-[rgba(214,194,255,0.24)] bg-white/8"
                          : "border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Step {step.id}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{step.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {currentStep === 1 ? (
            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Dream Text
              </span>
              <textarea
                className="min-h-44 rounded-[22px] border border-white/10 bg-white/8 px-5 py-4 text-base text-[var(--foreground)] outline-none"
                value={form.dream_text}
                onChange={(event) => updateField("dream_text", event.target.value)}
                placeholder="어젯밤 꾼 꿈 내용을 가능한 한 구체적으로 적어 주세요."
              />
            </label>
          ) : null}

          {currentStep === 2 ? (
            <div className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Emotion
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {EMOTION_OPTIONS.map((option) => {
                  const isSelected = form.emotion === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("emotion", option.value)}
                      className={`rounded-[22px] border px-5 py-4 text-left transition ${
                        isSelected
                          ? "border-[rgba(214,194,255,0.46)] bg-[linear-gradient(135deg,rgba(255,236,236,0.12),rgba(214,194,255,0.16)_44%,rgba(142,116,255,0.18)_100%)] shadow-[0_0_18px_rgba(126,98,236,0.12)]"
                          : "border-white/10 bg-white/6 hover:border-[rgba(214,194,255,0.24)]"
                      }`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <p className="mt-3 text-base font-semibold text-[var(--foreground)]">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Situation
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {SITUATION_OPTIONS.map((option) => {
                  const isSelected = form.situation === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("situation", option.value)}
                      className={`rounded-[22px] border px-5 py-4 text-left text-base font-semibold transition ${
                        isSelected
                          ? "border-[rgba(214,194,255,0.46)] bg-[linear-gradient(135deg,rgba(255,236,236,0.12),rgba(214,194,255,0.16)_44%,rgba(142,116,255,0.18)_100%)] text-[var(--foreground)] shadow-[0_0_18px_rgba(126,98,236,0.12)]"
                          : "border-white/10 bg-white/6 text-[var(--foreground)] hover:border-[rgba(214,194,255,0.24)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Companion
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {COMPANION_OPTIONS.map((option) => {
                  const isSelected = form.companion === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("companion", option.value)}
                      className={`rounded-[22px] border px-5 py-4 text-left text-base font-semibold transition ${
                        isSelected
                          ? "border-[rgba(214,194,255,0.46)] bg-[linear-gradient(135deg,rgba(255,236,236,0.12),rgba(214,194,255,0.16)_44%,rgba(142,116,255,0.18)_100%)] text-[var(--foreground)] shadow-[0_0_18px_rgba(126,98,236,0.12)]"
                          : "border-white/10 bg-white/6 text-[var(--foreground)] hover:border-[rgba(214,194,255,0.24)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => updateField("companion", undefined)}
                className={`inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-sm transition ${
                  form.companion == null
                    ? "border-[rgba(214,194,255,0.4)] bg-white/10 text-[var(--foreground)]"
                    : "border-white/10 text-[var(--foreground-soft)] hover:border-[rgba(214,194,255,0.24)]"
                }`}
              >
                선택 없이 진행
              </button>
            </div>
          ) : null}

          {errors.length > 0 ? (
            <div className="rounded-[24px] border border-rose-400/24 bg-rose-300/8 p-5 text-sm leading-7 text-rose-100">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={goPreviousStep}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition hover:border-[rgba(214,194,255,0.24)]"
              >
                이전 단계
              </button>
            ) : null}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={goNextStep}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)]"
              >
                다음 단계
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {isPending ? "해몽 생성 중..." : "무료 꿈해몽 시작하기"}
              </button>
            )}
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
