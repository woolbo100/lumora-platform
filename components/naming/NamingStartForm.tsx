"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateNamingInput } from "@/lib/naming/name-generator";
import { type NameCodeInput } from "@/types/naming";

const INITIAL_FORM: NameCodeInput = {
  name: "",
  birth_date: "",
};

export function NamingStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<NameCodeInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof NameCodeInput>(key: K, value: NameCodeInput[K]) {
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
      name: validated.data.name,
    });

    if (validated.data.birth_date) {
      params.set("birth_date", validated.data.birth_date);
    }

    startTransition(() => {
      router.push(`/naming/result?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Name Code
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          이름의 첫소리에서
          <br />
          흐름을 읽어봅니다
        </h2>
        <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          이름의 초성을 오행으로 풀어보면, 소리의 결이 어떤 리듬으로 이어지는지 가볍게 살펴볼 수 있어요.
          이름코드는 좋은 이름을 판정하는 서비스가 아니라, 내 이름이 가진 분위기와 흐름을 감성적으로 읽어보는
          무료 참고용 콘텐츠입니다.
        </p>

        <div className="mt-8 grid gap-4">
          {[
            "초성 추출 후 발음기관 기준 오행 분포 분석",
            "이름 에너지 흐름을 3~5문단으로 직관적으로 해석",
            "비어 있는 기운과 보완 발음 방향 안내",
            "이름 느낌 추천 카드까지 한 번에 확인",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-4 text-base leading-7 text-[var(--foreground-soft)]"
            >
              {item}
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Start</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          나의 이름 코드 알아보기
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          이름은 필수, 생년월일은 선택입니다. 생년월일은 결과에 함께 적어두는 참고 정보로만 사용됩니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <label className="grid gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              Name
            </span>
            <input
              className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none placeholder:text-white/35"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </label>

          <label className="grid gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              Birth Date
            </span>
            <input
              type="date"
              className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none"
              value={form.birth_date ?? ""}
              onChange={(event) => updateField("birth_date", event.target.value)}
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
              {isPending ? "이름 코드를 읽고 있어요..." : "이름 코드 결과 보기"}
            </button>
            <CTAButton href="/naming" variant="secondary">
              서비스 소개 보기
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
