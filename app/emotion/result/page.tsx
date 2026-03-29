import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { interpretEmotion, validateEmotionInput } from "@/lib/emotion/interpreter";

type EmotionResultPageProps = {
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

export default async function EmotionResultPage({ searchParams }: EmotionResultPageProps) {
  const params = await searchParams;
  const intensityRaw = getSingleValue(params.intensity);
  const validated = validateEmotionInput({
    emotion_text: getSingleValue(params.emotion_text),
    emotion_tag: getSingleValue(params.emotion_tag) as
      | "anxiety"
      | "sad"
      | "excited"
      | "tired"
      | "empty"
      | "happy"
      | undefined,
    intensity: intensityRaw ? Number(intensityRaw) : undefined,
  });

  if (!validated.success) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
        <ErrorState errors={validated.errors} />
      </main>
    );
  }

  const result = interpretEmotion(validated.data);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Emotion Result</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          감정이 전하는 핵심 메시지
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {result.core_reading}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]">
            detected · {result.detected_tag}
          </span>
          <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]">
            intensity · {result.intensity}
          </span>
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="p-8">
          <div className="grid gap-4">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Emotion Analysis</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.emotion_analysis}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Energy State</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.energy_state}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Flow Direction</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.flow_direction}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-8">
          <div className="grid gap-4">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Affirmation</p>
              <div className="mt-3 grid gap-3">
                {result.affirmation.map((line) => (
                  <p
                    key={line}
                    className="rounded-[18px] border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-3 text-base text-[var(--foreground-soft)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Advice</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.advice}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Warning</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{result.warning}</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Premium Preview</p>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.premium_preview}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/emotion/premium"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-6 py-3 text-sm font-semibold text-[#1c1830]"
          >
            심층 분석 보기
          </Link>
          <Link
            href="/emotion/start"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
          >
            다시 리딩하기
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}
