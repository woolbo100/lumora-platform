import { GlassPanel } from "@/components/shared/GlassPanel";
import { CTAButton } from "@/components/shared/CTAButton";
import { type LoveCodeResult } from "@/types/loveCode";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import Link from "next/link";

type LoveCodeResultPanelProps = {
  result: LoveCodeResult;
};

export function LoveCodeResultPanel({ result }: LoveCodeResultPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-20 px-6 pb-20 sm:px-8 lg:px-0">
      
      {/* 1. 별자리 개별 성향 분석 */}
      <section className="w-full">
        <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Zodiac Personality Analysis
        </h2>
        <div className="flex flex-col gap-10">
          {/* 나의 성향 */}
          <GlassPanel className="result-card-glow flex flex-col p-8 sm:p-12 border-white/5 bg-white/2 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
              <span className="font-display text-8xl text-white">Me</span>
            </div>
            <div className="mb-8 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] opacity-60 mb-3">내 별자리 성격</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-5xl text-white sm:text-6xl">{result.mySignLabel}</h3>
                <div className="inline-block px-4 py-1 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 self-start">
                  <span className="text-xl font-bold text-[var(--color-secondary)]">
                    {result.mySignKeyword}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xl font-medium leading-relaxed text-white/90">
                {result.mySignPersonality}
              </p>
              <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              <p className="text-base leading-relaxed text-[var(--foreground-soft)] sm:text-lg italic">
                {result.mySignDeepReading}
              </p>
            </div>
          </GlassPanel>

          {/* 상대의 성향 */}
          <GlassPanel className="result-card-glow flex flex-col p-8 sm:p-12 border-white/5 bg-white/2 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
              <span className="font-display text-8xl text-white">Partner</span>
            </div>
            <div className="mb-8 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] opacity-60 mb-3">상대 별자리 성격</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-5xl text-white sm:text-6xl">{result.partnerSignLabel}</h3>
                <div className="inline-block px-4 py-1 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 self-start">
                  <span className="text-xl font-bold text-[var(--color-secondary)]">
                    {result.partnerSignKeyword}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xl font-medium leading-relaxed text-white/90">
                {result.partnerSignPersonality}
              </p>
              <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              <p className="text-base leading-relaxed text-[var(--foreground-soft)] sm:text-lg italic">
                {result.partnerSignDeepReading}
              </p>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* 2. 별자리 관계 코드 및 상세 궁합 */}
      <section className="w-full">
        <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Compatibility Synergy
        </h2>
        <GlassPanel className="result-panel-glow w-full border-[var(--color-secondary)]/30 bg-[linear-gradient(135deg,rgba(213,195,165,0.22),rgba(122,104,217,0.14)_55%,rgba(255,255,255,0.06))] p-10 sm:p-16 text-center shadow-[0_32px_96px_rgba(66,55,128,0.28)]">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="font-display text-5xl text-white sm:text-7xl [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
                  {result.mySignLabel}
                </div>
              </div>
              <div className="text-4xl text-[var(--color-secondary)]/40 font-light translate-y-2 sm:text-5xl">×</div>
              <div className="flex flex-col items-center gap-2">
                <div className="font-display text-5xl text-white sm:text-7xl [text-shadow:0_0_30px_rgba(255,255,255,0.3)]">
                  {result.partnerSignLabel}
                </div>
              </div>
            </div>
            
            <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-secondary)]/50 to-transparent" />
            
            <p className="mt-12 text-3xl font-display font-medium leading-relaxed text-white sm:text-4xl">
              "{result.constellationSummary}"
            </p>
            <p className="mt-8 text-lg leading-[1.8] text-white/80 max-w-2xl mx-auto sm:text-xl">
              {result.detailedCompatibility}
            </p>
          </div>
        </GlassPanel>
      </section>

      {/* 3. 현재 관계 읽기 & 핵심 문제 */}
      <section className="w-full">
        <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Relationship Diagnosis
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <GlassPanel className="result-card-glow flex flex-col p-8 sm:p-10 border-white/8 bg-white/4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-secondary)]">현재 관계 리딩</p>
            </div>
            <p className="text-lg font-medium leading-8 text-white sm:text-xl">
              {result.currentRelationshipReading}
            </p>
          </GlassPanel>
          <GlassPanel className="result-card-glow flex flex-col p-8 sm:p-10 border-white/8 bg-white/4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-rose-400" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-400">발견된 핵심 문제</p>
            </div>
            <p className="text-lg font-medium leading-8 text-white sm:text-xl">
              {result.keyIssue}
            </p>
          </GlassPanel>
        </div>
      </section>

      {/* 4. 투데이 액션 리스트 가이드 */}
      <section className="w-full">
        <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Action Guidelines
        </h2>
        <GlassPanel className="result-card-glow flex flex-col p-8 sm:p-12 border-[var(--color-secondary)]/40 bg-[linear-gradient(135deg,rgba(247,231,206,0.12),rgba(122,104,217,0.12))] shadow-[0_20px_60px_rgba(115,88,232,0.15)]">
          <h3 className="text-xl font-bold text-white mb-12 text-center pb-6 border-b border-white/10">
            오늘 당신이 실천해야 할 구체적인 행동들
          </h3>
          
          <div className="flex flex-col gap-12">
            {result.todayActionList.map((action, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-secondary)] text-lg font-bold text-[var(--background)] shadow-[0_0_20px_rgba(122,104,217,0.4)]">
                    {idx + 1}
                  </div>
                  <p className="text-xl font-bold text-white leading-relaxed pt-1 sm:text-2xl">
                    {action}
                  </p>
                </div>
                <div className="ml-14 rounded-3xl bg-white/5 border border-white/10 p-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
                  <div className="absolute -top-3 left-8 px-4 bg-[#1A1825] text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-widest border border-white/10 rounded-full z-10">
                    이렇게 말하거나 행동해보세요
                  </div>
                  <p className="text-xl font-display italic text-[var(--color-secondary)] relative z-10 sm:text-2xl leading-relaxed">
                    {result.todayActionExampleList[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      {/* 5. 핵심 마음가짐 & 최종 행동 지침 */}
      <section className="w-full">
        <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Core Mindset & Conclusion
        </h2>
        <div className="grid grid-cols-1 gap-10">
          <GlassPanel className="result-card-glow p-10 sm:p-14 border-amber-400/30 bg-amber-400/5 shadow-[0_0_80px_rgba(251,191,36,0.08)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400/40" />
            <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-amber-400 mb-8">핵심 마음가짐</h4>
            <p className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
              {result.coreMindset}
            </p>
          </GlassPanel>

          <GlassPanel className="result-card-glow p-10 sm:p-14 border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/5 shadow-[0_0_80px_rgba(122,104,217,0.12)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-secondary)]/40" />
            <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)] mb-8">최종 행동 가이드</h4>
            <p className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
              {result.finalActionTip}
            </p>
          </GlassPanel>
        </div>
      </section>

      {/* 공유 및 하단 내비게이션 */}
      <section className="w-full mt-10">
        <ResultShareActions
          testName="러브코드 분석"
          resultTitle={`${result.mySignLabel} × ${result.partnerSignLabel} 궁합`}
          resultSummary={result.constellationSummary}
          hubUrl="/love-code"
        />
        
        <div className="mt-20 flex flex-col gap-8 items-center">
          <CTAButton href="/love-code" variant="secondary" className="px-16 py-5 text-lg">
            다시 분석하기
          </CTAButton>
          <Link 
            href="/services" 
            className="text-sm tracking-widest uppercase font-bold text-white/30 hover:text-[var(--color-secondary)] hover:text-white/60 transition-all duration-300 border-b border-transparent hover:border-white/20 pb-1"
          >
            Explore All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
