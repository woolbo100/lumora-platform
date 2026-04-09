"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { NamingPurposeSelector } from "@/components/naming/NamingPurposeSelector";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateNamingInput } from "@/lib/naming/name-generator";
import { type NamingStyle, type SajuNamingInput } from "@/types/naming";

const STYLE_OPTIONS: { value: NamingStyle; label: string }[] = [
  { value: "soft", label: "soft" },
  { value: "elegant", label: "elegant" },
  { value: "bright", label: "bright" },
  { value: "strong", label: "strong" },
  { value: "luxurious", label: "luxurious" },
  { value: "modern", label: "modern" },
  { value: "neutral", label: "neutral" },
  { value: "calm", label: "calm" },
];

const INITIAL_FORM: SajuNamingInput = {
  gender: "female",
  birth_date: "",
  birth_time: "",
  purpose: "wealth",
  current_name: "",
  preferred_style: undefined,
};

export function NamingStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<SajuNamingInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof SajuNamingInput>(key: K, value: SajuNamingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateNamingInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams({
      gender: validated.data.gender,
      birth_date: validated.data.birth_date,
      birth_time: validated.data.birth_time,
      purpose: validated.data.purpose,
    });

    if (validated.data.current_name) {
      params.set("current_name", validated.data.current_name);
    }

    if (validated.data.preferred_style) {
      params.set("preferred_style", validated.data.preferred_style);
    }

    startTransition(() => {
      router.push(`/naming/result?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Naming Flow
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          선천코드 이름설계 시스템
        </h2>
        <div className="mt-8 grid gap-4">
          {[
            "1. 사주 분석",
            "2. 오행 균형 분석",
            "3. 부족한 에너지 추출",
            "4. 목적 설정",
            "5. 이름 설계",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-4 text-base text-[var(--foreground-soft)]"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 p-5 text-base leading-8 text-[var(--foreground-soft)]">
          이름은 단순한 단어가 아니라 부족한 기운을 보완하고, 원하는 인생 방향에 힘을
          실어 주는 에너지 그릇으로 설계됩니다.
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Start</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          무료 이름 생성
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          기존 사주 엔진으로 선천코드를 읽고, 부족한 오행과 목적에 맞는 이름 방향을
          설계합니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Gender
              </span>
              <select
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                value={form.gender}
                onChange={(event) => updateField("gender", event.target.value as SajuNamingInput["gender"])}
              >
                <option value="female">female</option>
                <option value="male">male</option>
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Current Name
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                value={form.current_name ?? ""}
                onChange={(event) => updateField("current_name", event.target.value)}
                placeholder="선택 입력"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Birth Date
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                type="date"
                value={form.birth_date}
                onChange={(event) => updateField("birth_date", event.target.value)}
              />
            </label>

            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Birth Time
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
                type="time"
                value={form.birth_time}
                onChange={(event) => updateField("birth_time", event.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Purpose
            </span>
            <NamingPurposeSelector value={form.purpose} onChange={(value) => updateField("purpose", value)} />
          </div>

          <label className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Preferred Style
            </span>
            <select
              className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
              value={form.preferred_style ?? ""}
              onChange={(event) =>
                updateField(
                  "preferred_style",
                  (event.target.value || undefined) as SajuNamingInput["preferred_style"],
                )
              }
            >
              <option value="">선택 안 함</option>
              {STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              {isPending ? "이름 설계 중..." : "무료 이름 생성 시작하기"}
            </button>
            <CTAButton href="/naming/premium" variant="secondary">
              프리미엄 리포트 보기
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
