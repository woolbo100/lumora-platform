import Link from "next/link";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { CTAButton } from "@/components/shared/CTAButton";
import { type LoveCodeResult } from "@/types/loveCode";

type LoveCodeResultPanelProps = {
  result: LoveCodeResult;
};

export function LoveCodeResultPanel({ result }: LoveCodeResultPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
      {/* 별자리 영역 강조 - 당신의 관계 코드 (최적화) */}
      <GlassPanel className="result-panel-glow w-full border-[var(--color-secondary)]/30 bg-[linear-gradient(135deg,rgba(213,195,165,0.22),rgba(122,104,217,0.14)_55%,rgba(255,255,255,0.06))] p-12 text-center shadow-[0_32px_96px_rgba(66,55,128,0.28)]">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/70">
          Your Relationship Code
        </p>
        <div className="mt-10 flex items-center justify-center gap-8">
          <div className="font-display text-5xl text-white sm:text-6xl [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
            {result.mySignLabel}
          </div>
          <div className="text-3xl text-[var(--color-secondary)]/40 font-light">×</div>
          <div className="font-display text-5xl text-white sm:text-6xl [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
             {result.partnerSignLabel}
          </div>
        </div>
        <div className="mt-10 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[var(--color-secondary)]/30 to-transparent" />
        <p className="mt-10 text-xl font-medium leading-relaxed text-white/90 sm:text-2xl italic">
          "{result.constellationSummary}"
        </p>
      </GlassPanel>

      <div className="flex w-full flex-col gap-5">
        {/* 3. 카드 구조 - 관계 상태 */}
        <div className="result-card-glow rounded-[28px] border border-white/8 bg-white/4 p-7 backdrop-blur-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">현재 관계 상태</p>
          <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            {result.currentRelationshipReading}
          </p>
        </div>

        {/* 4. 카드 구조 - 핵심 문제 */}
        <div className="result-card-glow rounded-[28px] border border-white/8 bg-white/4 p-7 backdrop-blur-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">핵심 문제</p>
          <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            {result.keyIssue}
          </p>
        </div>

        {/* 5. TODAY ACTION 강조 (실제 행동 문건 예시 포함) */}
        <div className="result-card-glow rounded-[28px] border border-[var(--color-secondary)]/40 bg-[linear-gradient(135deg,rgba(247,231,206,0.12),rgba(122,104,217,0.12))] p-8 shadow-[0_15px_45px_rgba(115,88,232,0.12)]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-secondary)]">Today Action</p>
          <p className="mt-5 text-lg font-medium leading-9 text-white sm:text-xl">
            {result.todayAction}
          </p>
          
          <div className="mt-6 rounded-2xl bg-white/5 p-6 border border-white/8 shadow-inner">
            <p className="text-[10px] text-white/30 mb-3 tracking-widest uppercase font-bold">실제 행동 문장 예시</p>
            <p className="text-xl font-display italic text-[var(--color-secondary)] pr-2">
              {result.todayActionExample}
            </p>
          </div>
        </div>
      </div>

      {/* 6. CTA 버튼 추가 */}
      <div className="mt-4 w-full flex flex-col gap-6">
        <CTAButton 
          href="/blog/love-code-deep-dive" 
          className="aurora-hover-surface w-full py-5 text-xl font-bold shadow-[0_25px_60px_rgba(115,88,232,0.35)]"
        >
          더 깊은 연애 코드 보기
        </CTAButton>
        
        <div className="flex gap-6 justify-center items-center">
          <CTAButton href="/love-code/start" variant="secondary" className="px-8 !min-h-12 text-sm">
            다시 하기
          </CTAButton>
          <Link 
            href="/love-code" 
            className="text-xs tracking-widest uppercase font-bold text-white/20 hover:text-[var(--color-secondary)] transition-all duration-300"
          >
            서비스 소개로
          </Link>
        </div>
      </div>
    </div>
  );
}
