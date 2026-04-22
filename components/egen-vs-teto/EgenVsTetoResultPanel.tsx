"use client";

import { useState } from "react";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { type EgenVsTetoResult } from "@/types/egenVsTeto";

type EgenVsTetoResultPanelProps = {
  result: EgenVsTetoResult;
};

export function EgenVsTetoResultPanel({ result }: EgenVsTetoResultPanelProps) {
  const panelGlowClassName =
    "transition duration-300 hover:border-[rgba(214,194,255,0.32)] hover:shadow-[0_0_0_1px_rgba(214,194,255,0.12),0_0_28px_rgba(126,98,236,0.18)]";
  const cardGlowClassName =
    "transition duration-300 hover:border-[rgba(214,194,255,0.28)] hover:shadow-[0_0_0_1px_rgba(214,194,255,0.08),0_0_22px_rgba(126,98,236,0.12)]";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="flex flex-col gap-6">
        <GlassPanel
          className={`${panelGlowClassName} border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
            Egen vs Teto Result
          </p>
          <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
            {result.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--foreground-soft)]">{result.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className={`${cardGlowClassName} rounded-[24px] border border-white/10 bg-white/6 p-5`}>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">에겐 점수</p>
              <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
                {result.egenScore}
              </p>
            </div>
            <div className={`${cardGlowClassName} rounded-[24px] border border-white/10 bg-white/6 p-5`}>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">테토 점수</p>
              <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
                {result.tetoScore}
              </p>
            </div>
          </div>

          <div
            className={`${cardGlowClassName} mt-8 rounded-[26px] border border-[var(--color-secondary)]/24 bg-[linear-gradient(135deg,rgba(213,195,165,0.14),rgba(122,104,217,0.08)_55%,rgba(255,255,255,0.04))] p-6 shadow-[0_20px_60px_rgba(66,55,128,0.18)]`}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-secondary)]">
              연애 팁
            </p>
            <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">{result.tip}</p>
          </div>
        </GlassPanel>

        <ResultShareActions
          testName="연애 본능 테스트"
          resultTitle={result.title}
          resultSummary={result.subtitle}
          hubUrl="/egen-vs-teto"
          restartUrl="/egen-vs-teto/test"
        />
      </div>

      <div className="grid gap-6 content-start">
        <GlassPanel className={`${panelGlowClassName} p-8`}>
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Strengths & Caution</p>
          <div className="mt-6 grid gap-4">
            {result.strengths.map((strength) => (
              <div
                key={strength}
                className={`${cardGlowClassName} rounded-[22px] border border-white/10 bg-white/6 p-5`}
              >
                <p className="leading-7 text-[var(--foreground-soft)]">• {strength}</p>
              </div>
            ))}
            <div className={`${cardGlowClassName} rounded-[22px] border border-white/10 bg-white/6 p-5`}>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">주의할 점</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">• {result.caution}</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
