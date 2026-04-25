"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { NamingResultCard } from "@/components/naming/NamingResultCard";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { getAnalysisFromSessionStorage } from "@/lib/analysis/session-storage";
import { validateNamingInput } from "@/lib/naming/name-generator";
import { type NamingResult, type SajuNamingInput } from "@/types/naming";

type NamingResultClientProps = {
  input: Partial<SajuNamingInput>;
};

function ErrorState({ errors }: { errors: string[] }) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center">
      <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Validation Error</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          이름설계 입력을 다시 확인해주세요
        </h1>
        <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NamingResultClient({ input }: NamingResultClientProps) {
  const validated = useMemo(() => validateNamingInput(input), [input]);
  const [result, setResult] = useState<NamingResult | null | undefined>(undefined);
  const [error, setError] = useState<string[] | null>(validated.success ? null : validated.errors);

  useEffect(() => {
    if (!validated.success) {
      return;
    }

    const analysis = getAnalysisFromSessionStorage(validated.data.analysis_id);
    if (!analysis) {
      setError([
        "사주 공통 분석 데이터가 없어요.",
        "이름설계는 브라우저에 잠시 보관된 분석 데이터를 사용하므로, 사주 결과 화면에서 다시 이어서 시작해주세요.",
      ]);
      setResult(null);
      return;
    }

    const createNameDesign = async () => {
      try {
        const response = await fetch("/api/name-design", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...validated.data,
            analysis,
          }),
        });

        const payload = (await response.json()) as NamingResult & { error?: string };
        if (!response.ok) {
          throw new Error(payload.error ?? "이름설계 결과를 만들지 못했습니다.");
        }

        setResult(payload);
      } catch (caughtError) {
        setError([
          caughtError instanceof Error
            ? caughtError.message
            : "이름설계 결과를 생성하지 못했습니다.",
        ]);
        setResult(null);
      }
    };

    void createNameDesign();
  }, [validated]);

  if (error) {
    return <ErrorState errors={error} />;
  }

  if (result === undefined) {
    return null;
  }

  if (!result) {
    return <ErrorState errors={["이름설계 결과를 생성하지 못했습니다."]} />;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Name Design</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          같은 분석으로 이어진 이름 방향
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {result.namingDirection}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]">
            analysis id · {result.analysisId}
          </span>
          {result.lackingElements.map((element) => (
            <span
              key={element}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]"
            >
              부족 기운 · {element}
            </span>
          ))}
          {result.dominantElements.map((element) => (
            <span
              key={element}
              className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]"
            >
              중심 기운 · {element}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Shared Saju Base</p>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.sajuSummary}</p>

          <div className="mt-8 grid gap-4">
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">core</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.sajuAnalysis.saju.interp.core}
              </p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">social / wealth / love</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.sajuAnalysis.saju.interp.social_analysis}
                <br />
                <br />
                {result.sajuAnalysis.saju.interp.wealth_strategy}
                <br />
                <br />
                {result.sajuAnalysis.saju.interp.love_romance}
              </p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Premium CTA</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
            이름의 결을 더 깊게 이어서 보고 싶다면
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.premiumPreview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/naming/premium"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              프리미엄 리포트 보기
            </Link>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-5">
        {result.recommendations.map((candidate, index) => (
          <NamingResultCard key={candidate.id} candidate={candidate} rank={index + 1} />
        ))}
      </div>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Privacy Note
        </p>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
          입력하신 정보는 사주 분석 결과 생성에만 일시적으로 사용되며
          별도의 데이터베이스에 저장되지 않습니다.
          ※ 입력 정보는 저장되지 않으니 안심하고 이용하셔도 됩니다.
        </p>
      </GlassPanel>

      <ResultShareActions
        testName="이름설계 분석"
        resultTitle="공통 분석 기반 이름 방향"
        resultSummary={result.namingDirection}
        hubUrl="/naming"
        restartUrl={`/naming/start?analysisId=${encodeURIComponent(result.analysisId)}`}
      />
    </main>
  );
}
