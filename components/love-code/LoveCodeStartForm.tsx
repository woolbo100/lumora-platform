"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { validateLoveCodeInput } from "@/lib/loveCodeCalculator";
import {
  type LoveCodeCurrentSituation,
  type LoveCodeInput,
  type LoveCodeRelationshipStatus,
} from "@/types/loveCode";

const INITIAL_FORM: LoveCodeInput = {
  myBirthDate: "",
  partnerBirthDate: "",
  relationshipStatus: "some",
  currentSituation: "mutual-no-progress",
};

const relationshipOptions: { value: LoveCodeRelationshipStatus; label: string }[] = [
  { value: "some", label: "썸" },
  { value: "crush", label: "짝사랑" },
  { value: "dating", label: "연애중" },
  { value: "reunion", label: "재회" },
  { value: "no-contact", label: "연락 끊김" },
  { value: "ambiguous", label: "애매한 관계" },
];

const currentSituationOptions: { value: LoveCodeCurrentSituation; label: string }[] = [
  { value: "no-contact-first", label: "상대가 먼저 연락 안 함" },
  { value: "i-like-more", label: "내가 더 좋아하는 느낌" },
  { value: "mutual-no-progress", label: "서로 호감은 있으나 진전 없음" },
  { value: "recent-fight", label: "최근 싸움" },
  { value: "want-reconnect", label: "다시 연락하고 싶음" },
  { value: "push-pull", label: "밀당 중" },
  { value: "hard-to-express", label: "감정 표현이 어려움" },
];

export function LoveCodeStartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<LoveCodeInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);

  function updateField<K extends keyof LoveCodeInput>(key: K, value: LoveCodeInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validated = validateLoveCodeInput(form);
    if (!validated.success) {
      setErrors(validated.errors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams({
      myBirthDate: form.myBirthDate,
      partnerBirthDate: form.partnerBirthDate,
      relationshipStatus: form.relationshipStatus,
      currentSituation: form.currentSituation,
    });

    startTransition(() => {
      router.push(`/love-code/result?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.35))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Love Code Input
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          오늘의 연애 행동을
          <br />
          가장 실용적인 방식으로 읽습니다
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          별자리 기반 흐름과 현재 관계의 분위기를 함께 반영해, 지금 어떤 행동이
          더 어울리는지 짧고 직관적으로 정리합니다.
        </p>

        <div className="mt-8 grid gap-4">
          {[
            "1. 내 생년월일 입력",
            "2. 상대 생년월일 입력",
            "3. 관계 상태 선택",
            "4. 현재 상황 선택",
            "5. 오늘의 행동 추천 확인",
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
          러브코드 입력하기
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          내 생년월일, 상대 생년월일, 현재 관계 상태를 입력하면 오늘의 연애
          행동 추천을 카드형 리포트로 보여드립니다.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                My Birth Date
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--color-secondary)]/45 focus:bg-white/10"
                type="date"
                value={form.myBirthDate}
                onChange={(event) => updateField("myBirthDate", event.target.value)}
              />
            </label>

            <label className="grid gap-3">
              <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
                Partner Birth Date
              </span>
              <input
                className="min-h-14 rounded-[22px] border border-white/10 bg-white/8 px-5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--color-secondary)]/45 focus:bg-white/10"
                type="date"
                value={form.partnerBirthDate}
                onChange={(event) => updateField("partnerBirthDate", event.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Relationship Status
            </span>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relationshipOptions.map((option) => {
                const selected = form.relationshipStatus === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("relationshipStatus", option.value)}
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

          <div className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-[var(--color-secondary)] uppercase">
              Current Situation
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentSituationOptions.map((option) => {
                const selected = form.currentSituation === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("currentSituation", option.value)}
                    className={`min-h-14 rounded-[22px] border px-5 py-4 text-left text-base font-semibold transition ${
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
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_24px_70px_rgba(89,72,173,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isPending ? "리포트 생성 중..." : "오늘의 추천 보기"}
            </button>
            <CTAButton href="/love-code" variant="secondary">
              서비스 소개로
            </CTAButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
