"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateDreamInput } from "@/lib/dream/interpreter";
import { type DreamInput } from "@/types/dream";

const INITIAL_FORM: DreamInput = {
  dream_text: "",
};

export function DreamStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<DreamInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof DreamInput>(key: K, value: DreamInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateDreamInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams(validated.data);

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
          꿈 → 의미 → 흐름 → 행동 방향
        </h2>
        <div className="mt-8 grid gap-4">
          {[
            "1. 꿈 내용에서 상징 추출",
            "2. 상징 의미 매핑",
            "3. 상징의 연결 의미 해석",
            "4. 현재 흐름과 행동 방향 제시",
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
          꿈의 장면을 바탕으로 지금 무의식이 전하는 메시지와 흐름을 읽어냅니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <label className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Dream Text
            </span>
            <textarea
              className="min-h-40 rounded-[22px] border border-white/10 bg-white/8 px-5 py-4 text-base text-[var(--foreground)] outline-none"
              value={form.dream_text}
              onChange={(event) => updateField("dream_text", event.target.value)}
              placeholder="어젯밤 꾼 꿈 내용을 가능한 한 구체적으로 적어 주세요."
            />
          </label>

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
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isPending ? "해몽 생성 중..." : "무료 꿈해몽 시작하기"}
            </button>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
