"use client";

import { useEffect, useState } from "react";

import { SajuResultView } from "@/components/saju/SajuResultView";
import { getAnalysisFromSessionStorage } from "@/lib/analysis/session-storage";
import { type SharedSajuAnalysis } from "@/types/analysis";

function ErrorPanel() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center">
      <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Analysis Error</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          사주 분석 데이터를 찾을 수 없어요
        </h1>
        <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
          <p>이 결과는 브라우저에만 잠시 보관돼요.</p>
          <p>새로고침이나 재접속 후에는 사라질 수 있으니, 사주 입력 화면에서 다시 분석해주세요.</p>
        </div>
      </div>
    </section>
  );
}

export function SajuResultClient({ analysisId }: { analysisId: string }) {
  const [analysis, setAnalysis] = useState<SharedSajuAnalysis | null | undefined>(undefined);

  useEffect(() => {
    setAnalysis(getAnalysisFromSessionStorage(analysisId));
  }, [analysisId]);

  if (analysis === undefined) {
    return null;
  }

  if (!analysis) {
    return <ErrorPanel />;
  }

  return <SajuResultView result={analysis.saju} analysisId={analysis.id} />;
}
