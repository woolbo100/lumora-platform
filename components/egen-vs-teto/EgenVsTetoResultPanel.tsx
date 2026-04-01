"use client";

import { useState } from "react";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { type EgenVsTetoResult } from "@/types/egenVsTeto";

type EgenVsTetoResultPanelProps = {
  result: EgenVsTetoResult;
};

export function EgenVsTetoResultPanel({ result }: EgenVsTetoResultPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return;
    }

    const payload = `${result.shareText}\n${window.location.href}`;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Egen vs Teto Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {result.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--foreground-soft)]">
          {result.subtitle}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              에겐 점수
            </p>
            <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
              {result.egenScore}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">
              테토 점수
            </p>
            <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
              {result.tetoScore}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-[var(--color-secondary)]/24 bg-[linear-gradient(135deg,rgba(213,195,165,0.14),rgba(122,104,217,0.08)_55%,rgba(255,255,255,0.04))] p-6 shadow-[0_20px_60px_rgba(66,55,128,0.18)]">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-secondary)]">
            연애 팁
          </p>
          <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">{result.tip}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton href="/egen-vs-teto/test">테스트 다시하기</CTAButton>
          <CTAButton href="/egen-vs-teto" variant="secondary">
            허브로 돌아가기
          </CTAButton>
        </div>
      </GlassPanel>

      <div className="grid gap-6">
        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Strengths</p>
          <div className="mt-6 grid gap-4">
            {result.strengths.map((strength) => (
              <div
                key={strength}
                className="rounded-[22px] border border-white/10 bg-white/6 p-5"
              >
                <p className="leading-7 text-[var(--foreground-soft)]">✔ {strength}</p>
              </div>
            ))}
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">하지만</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">✔ {result.caution}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Share</p>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">공유 문구</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.shareText}</p>
          </div>
          <button
            type="button"
            onClick={handleCopyLink}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]"
          >
            {copied ? "복사 완료" : "링크 복사"}
          </button>
        </GlassPanel>
      </div>
    </div>
  );
}
