"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getSajuQueryString, validateSajuInput } from "@/lib/saju-engine";
import { type SajuFormInput, type SajuProfile } from "@/types/saju";

const INITIAL_FORM: SajuProfile = {
  name: "",
  gender: "male",
  birth_date: "",
  birth_time: "",
  mode: "no-ai",
};

type SajuInputFormProps = {
  initialValue?: Partial<SajuFormInput>;
};

export function SajuInputForm({ initialValue }: SajuInputFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<SajuProfile>({
    ...INITIAL_FORM,
    ...initialValue,
    mode: initialValue?.mode === "ai" ? "ai" : "no-ai",
    gender: initialValue?.gender === "female" ? "female" : "male",
  });
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof SajuProfile>(key: K, value: SajuProfile[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateSajuInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const query = getSajuQueryString(validated.data);

    startTransition(() => {
      router.push(`/saju/loading?${query}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Saju Ritual
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[var(--foreground)] sm:text-5xl">
          당신의 사주
          <br />
          에너지 흐름을
          <br />
          루모라 안에서
          <br />
          읽어냅니다
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          생년월일과 태어난 시간을 입력하면, 타고난 기운의 결을 따라 당신 안에 흐르는
          에너지와 관계의 리듬을 차분하게 읽어드립니다. 복잡한 설명보다 지금의 나를
          이해하기 쉬운 문장으로 정리해드립니다.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">설명 내용</p>
            <p className="mt-3 whitespace-pre-line text-lg leading-7 text-[var(--foreground-soft)]">
              {"루모라는 사주의 핵심 구조를 바탕으로\n타고난 에너지,\n관계의 흐름,\n감정의 리듬,\n재물과 일의 방향\n이 네 가지 흐름을 중심으로 해석합니다."}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">기준</p>
            <p className="mt-3 whitespace-pre-line text-lg leading-7 text-[var(--foreground-soft)]">
              {"루모라는 안정적인 해석 흐름을 위해\n일관된 분석 구조를 기반으로 결과를 제공합니다."}
            </p>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Input Form</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          사주 분석 시작
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          이름, 성별, 생년월일, 태어난 시간을 입력하면 당신의 선천적인 흐름을 가볍지만 깊이
          있게 읽어드립니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <label className="grid gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              Name
            </span>
            <input
              className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none transition placeholder:text-white/34 focus:border-[var(--color-secondary)]/45 focus:bg-white/10"
              name="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="이름을 입력해주세요"
              autoComplete="name"
            />
          </label>

          <div className="grid gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              Gender
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
              ].map((option) => {
                const selected = form.gender === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("gender", option.value as SajuProfile["gender"])}
                    className={`min-h-14 rounded-[22px] border px-5 text-left text-base font-semibold transition ${
                      selected
                        ? "border-[var(--color-secondary)]/55 bg-[linear-gradient(135deg,rgba(213,195,165,0.18),rgba(122,104,217,0.14)_62%,rgba(255,255,255,0.04))] text-[var(--foreground)]"
                        : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] text-[var(--foreground-soft)] hover:border-white/20"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                Birth Date
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--color-secondary)]/45 focus:bg-white/10"
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={(event) => updateField("birth_date", event.target.value)}
              />
            </label>

            <label className="grid gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                Birth Time
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--color-secondary)]/45 focus:bg-white/10"
                type="time"
                name="birth_time"
                value={form.birth_time}
                onChange={(event) => updateField("birth_time", event.target.value)}
              />
            </label>
          </div>

          {errors.length > 0 ? (
            <div className="rounded-[24px] border border-rose-400/24 bg-rose-300/8 p-5 text-sm leading-7 text-rose-100">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isPending ? "분석을 준비하고 있어요..." : "사주 리딩 보러가기"}
            </button>
            <CTAButton href="/saju" variant="secondary">
              서비스 소개 보기
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
