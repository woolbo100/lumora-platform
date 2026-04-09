import { GlassPanel } from "@/components/shared/GlassPanel";
import { CTAButton } from "@/components/shared/CTAButton";
import { type LoveCodeResult } from "@/types/loveCode";

type LoveCodeResultPanelProps = {
  result: LoveCodeResult;
};

export function LoveCodeResultPanel({ result }: LoveCodeResultPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Love Code Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          러브코드 리포트
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--foreground-soft)]">
          {result.oneLineDiagnosis}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">궁합 점수</p>
            <p className="mt-3 text-4xl font-semibold text-[var(--foreground)]">
              {result.compatibilityScore}
            </p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">별자리 흐름</p>
            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
              {result.mySignLabel} × {result.partnerSignLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">상대 연애 성향</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.partnerStyle}</p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">현재 관계 상태 진단</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.currentRelationshipReading}</p>
          </div>
          <div className="result-card-glow rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)_58%,rgba(7,9,18,0.18))] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">핵심 문제</p>
            <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.keyIssue}</p>
          </div>
        </div>

        <div className="result-card-glow mt-8 rounded-[26px] border border-[var(--color-secondary)]/24 bg-[linear-gradient(135deg,rgba(213,195,165,0.14),rgba(122,104,217,0.08)_55%,rgba(255,255,255,0.04))] p-6 shadow-[0_20px_60px_rgba(66,55,128,0.18)]">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-secondary)]">
            Today Action
          </p>
          <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
            {result.todayAction}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton href="/love-code/start">다시 입력하기</CTAButton>
          <CTAButton href="/love-code" variant="secondary">
            서비스 소개로
          </CTAButton>
        </div>
      </GlassPanel>

      <div className="grid gap-6">
        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Action Notes</p>
          <div className="mt-6 grid gap-4">
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">하면 안 되는 행동</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.avoidAction}</p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">간단한 연애 전략</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.simpleStrategy}</p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">한 줄 결론</p>
              <p className="mt-3 leading-7 text-[var(--foreground-soft)]">{result.oneLineConclusion}</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
