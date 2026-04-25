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

type NamingStartFormProps = {
  analysisId: string;
};

const INITIAL_FORM = (analysisId: string): SajuNamingInput => ({
  analysis_id: analysisId,
  purpose: "wealth",
  current_name: "",
  preferred_style: undefined,
});

export function NamingStartForm({ analysisId }: NamingStartFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<SajuNamingInput>(INITIAL_FORM(analysisId));
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof SajuNamingInput>(key: K, value: SajuNamingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateNamingInput({
      ...form,
      analysis_id: analysisId,
    });

    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);

    const params = new URLSearchParams({
      analysisId: validated.data.analysis_id,
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
          Shared Analysis
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          같은 분석 데이터로
          <br />
          이름설계를 이어갑니다
        </h2>
        <div className="mt-8 grid gap-4">
          {[
            "1. 사주 공통 분석 데이터 확인",
            "2. 부족한 오행과 중심 기운 불러오기",
            "3. 목적에 맞는 이름 방향 설정",
            "4. 이름 에너지 후보 추천",
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
          {analysisId
            ? `연결된 분석 id: ${analysisId}`
            : "이름설계는 사주 결과에서 넘어온 분석 id를 기반으로만 진행됩니다."}
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Start</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          이름 에너지 설계
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          여기서는 새로운 사주 계산을 하지 않고, 이미 만든 분석 데이터를 바탕으로 이름의 방향만 설계합니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Purpose
            </span>
            <NamingPurposeSelector value={form.purpose} onChange={(value) => updateField("purpose", value)} />
          </div>

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
              disabled={isPending || !analysisId}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isPending ? "이름 방향을 정리하는 중..." : "이 분석으로 이름설계 보기"}
            </button>
            <CTAButton href="/saju/reading" variant="secondary">
              사주부터 다시 시작
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
