import Link from "next/link";

import { DreamShareButton } from "@/components/dream/DreamShareButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { interpretDream, validateDreamInput } from "@/lib/dream/interpreter";
import { type DreamCompanion, type DreamEmotion, type DreamSituation } from "@/types/dream";

type DreamResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function ErrorState({ errors }: { errors: string[] }) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center">
      <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Validation Error</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">입력값을 다시 확인해 주세요</h1>
        <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function DreamResultPage({ searchParams }: DreamResultPageProps) {
  const params = await searchParams;
  const validated = validateDreamInput({
    dream_text: getSingleValue(params.dream_text),
    emotion: getSingleValue(params.emotion) as DreamEmotion | undefined,
    situation: getSingleValue(params.situation) as DreamSituation | undefined,
    companion: getSingleValue(params.companion) as DreamCompanion | undefined,
  });

  if (!validated.success) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
        <ErrorState errors={validated.errors} />
      </main>
    );
  }

  const result = interpretDream(validated.data);
  const primarySymbol = result.matchedSymbols[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Dream Result</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          한 줄 요약
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {result.summary}
        </p>
        <div className="result-card-glow mt-6 rounded-[22px] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Main Symbol</p>
          <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
            {primarySymbol.keyword} 상징
          </p>
          <p className="mt-2 text-base leading-7 text-[var(--foreground-soft)]">
            {primarySymbol.meaning}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {result.symbols.map((symbol) => (
            <span
              key={symbol}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]"
            >
              {symbol}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="result-panel-glow p-8">
          <div className="grid gap-4">
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Dream Narrative</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.narrative}
              </p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Psychology</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.psychology}
              </p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">핵심 상징 해석</p>
          <div className="mt-6 grid gap-4">
            {result.symbol_insights.map((item) => (
              <div key={item.title} className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">행동 가이드</p>
          <div className="mt-6 grid gap-4">
            {result.action_guides.map((guide, index) => (
              <div key={`${index + 1}-${guide}`} className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Action {index + 1}</p>
                <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{guide}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="result-panel-glow p-8">
          <div className="grid gap-4">
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Energy Flow</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.energy_flow}</p>
            </div>
            <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Closing Message</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.closing_message}</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Premium Preview</p>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.premium_preview}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <DreamShareButton />
          <Link
            href="/dream/start"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 해몽하기
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}
