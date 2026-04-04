"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { egenVsTetoQuestions } from "@/data/egenVsTetoQuestions";
import {
  calculateEgenVsTetoScores,
  getEgenVsTetoType,
} from "@/lib/egenVsTetoCalculator";
import { type EgenVsTetoAnswer } from "@/types/egenVsTeto";

export function EgenVsTetoTestClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<EgenVsTetoAnswer[]>([]);
  const totalQuestions = egenVsTetoQuestions.length;
  const currentQuestion = egenVsTetoQuestions[answers.length];
  const progress = (answers.length / totalQuestions) * 100;

  const selectedAnswer = useMemo(
    () => answers[currentQuestion?.id ? currentQuestion.id - 1 : -1],
    [answers, currentQuestion],
  );

  function handleSelect(answer: EgenVsTetoAnswer) {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = [...answers];
    nextAnswers[currentQuestion.id - 1] = answer;

    if (nextAnswers.length >= totalQuestions) {
      const { egenScore, tetoScore } = calculateEgenVsTetoScores(nextAnswers);
      const type = getEgenVsTetoType(egenScore, tetoScore);
      const params = new URLSearchParams({
        type,
        egen: String(egenScore),
        teto: String(tetoScore),
      });

      router.push(`/egen-vs-teto/result?${params.toString()}`);
      return;
    }

    setAnswers(nextAnswers);
  }

  function handleBack() {
    if (answers.length === 0) {
      return;
    }

    setAnswers((current) => current.slice(0, -1));
  }

  function handleReset() {
    setAnswers([]);
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <GlassPanel className="border-[var(--color-secondary)]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(10,13,28,0.35))] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Egen vs Teto Test
        </p>
        <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          감정형과 이성형 사이,
          <br />
          지금의 연애 결을 읽어보세요
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)]">
          20문항에 가볍게 답하면 나의 연애 본능이 어떤 쪽으로 더 기울어 있는지
          직관적으로 확인할 수 있습니다.
        </p>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/65">
            <span>진행률</span>
            <span>
              {answers.length + 1} / {totalQuestions}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f0cda1] via-[#cba3ff] to-[#89b6ff] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-[var(--foreground-soft)]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-4">
            질문은 연애에서 자주 드러나는 반응과 감정 습관을 기준으로 구성했습니다.
          </div>
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-4">
            너무 고민하기보다 지금의 나에게 더 가까운 쪽을 골라주세요.
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Question {currentQuestion.id}
        </p>
        <h3 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          {currentQuestion.question}
        </h3>

        <div className="mt-8 grid gap-4">
          {[
            { label: "A", text: currentQuestion.optionA, value: "A" as const },
            { label: "B", text: currentQuestion.optionB, value: "B" as const },
          ].map((option) => {
            const isSelected = selectedAnswer === option.value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`aurora-hover rounded-[24px] border px-5 py-5 text-left transition duration-300 ${
                  isSelected
                    ? "border-[var(--color-secondary)]/70 bg-[linear-gradient(135deg,rgba(240,205,161,0.12),rgba(185,144,255,0.08)_65%,rgba(255,255,255,0.05))] shadow-[0_18px_50px_rgba(76,60,144,0.22)]"
                    : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] hover:border-[var(--color-primary)]/45 hover:bg-white/10"
                }`}
              >
                <span className="block text-xs uppercase tracking-[0.28em] text-[var(--color-secondary)]">
                  {option.label}
                </span>
                <span className="mt-3 block text-base leading-7 text-[var(--foreground)]">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={answers.length === 0}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition disabled:cursor-not-allowed disabled:opacity-35"
          >
            이전 질문
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="aurora-hover aurora-hover-soft inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 시작
          </button>
          <CTAButton href="/egen-vs-teto" variant="secondary">
            허브로 이동
          </CTAButton>
        </div>
      </GlassPanel>
    </div>
  );
}
