"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateEmotionInput } from "@/lib/emotion/interpreter";
import { type EmotionInput, type EmotionTag } from "@/types/emotion";

const INITIAL_FORM: EmotionInput = {
  emotion_text: "",
  emotion_tag: "anxiety",
  intensity: 3,
};

const TAG_OPTIONS: EmotionTag[] = ["anxiety", "sad", "excited", "tired", "empty", "happy"];

export function EmotionStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<EmotionInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof EmotionInput>(key: K, value: EmotionInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateEmotionInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams({
      emotion_text: validated.data.emotion_text,
      intensity: String(validated.data.intensity ?? 3),
    });

    if (validated.data.emotion_tag) {
      params.set("emotion_tag", validated.data.emotion_tag);
    }

    startTransition(() => {
      router.push(`/emotion/result?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Emotion Flow
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          감정코드 리딩 시스템
        </h2>
        <div className="mt-8 grid gap-4">
          {[
            "1. 감정 입력",
            "2. 감정 상태 분석",
            "3. 에너지 흐름 해석",
            "4. 방향 제시",
            "5. 맞춤 확언 생성",
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
          지금 감정 입력하기
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금의 감정을 적어 주시면 의미, 흐름, 방향, 그리고 당신에게 필요한 확언까지 함께
          제안합니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <label className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Emotion Text
            </span>
            <textarea
              className="min-h-40 rounded-[22px] border border-white/10 bg-white/8 px-5 py-4 text-base text-[var(--foreground)] outline-none"
              value={form.emotion_text}
              onChange={(event) => updateField("emotion_text", event.target.value)}
              placeholder="예: 요즘 이유 없이 불안하고 마음이 흔들려요"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Emotion Tag
              </span>
              <select
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                value={form.emotion_tag ?? ""}
                onChange={(event) => updateField("emotion_tag", event.target.value as EmotionTag)}
              >
                {TAG_OPTIONS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Intensity
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                type="range"
                min={1}
                max={5}
                step={1}
                value={form.intensity ?? 3}
                onChange={(event) => updateField("intensity", Number(event.target.value))}
              />
              <p className="text-sm text-[var(--foreground-soft)]">현재 강도: {form.intensity ?? 3}</p>
            </label>
          </div>

          {errors.length > 0 ? (
            <div className="rounded-[24px] border border-rose-400/24 bg-rose-300/8 p-5 text-sm leading-7 text-rose-100">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(89,72,173,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isPending ? "리딩 생성 중..." : "감정 리딩 시작하기"}
            </button>
            <CTAButton href="/emotion/premium" variant="secondary">
              심층 분석 보기
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
