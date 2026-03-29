import Link from "next/link";

import { NamingResultCard } from "@/components/naming/NamingResultCard";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { generateNamingResult, validateNamingInput } from "@/lib/naming/name-generator";

type NamingResultPageProps = {
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

export default async function NamingResultPage({ searchParams }: NamingResultPageProps) {
  const params = await searchParams;
  const validated = validateNamingInput({
    gender: getSingleValue(params.gender) as "male" | "female" | undefined,
    birth_date: getSingleValue(params.birth_date),
    birth_time: getSingleValue(params.birth_time),
    purpose: getSingleValue(params.purpose) as
      | "wealth"
      | "love"
      | "brand"
      | "healing"
      | undefined,
    current_name: getSingleValue(params.current_name),
    preferred_style: getSingleValue(params.preferred_style) as
      | "soft"
      | "elegant"
      | "bright"
      | "strong"
      | "luxurious"
      | "modern"
      | "neutral"
      | "calm"
      | undefined,
  });

  if (!validated.success) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
        <ErrorState errors={validated.errors} />
      </main>
    );
  }

  const result = generateNamingResult(validated.data);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Naming Result</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          당신에게 필요한 이름의 방향
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {result.namingDirection}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {result.lackingElements.map((element) => (
            <span
              key={element}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]"
            >
              부족한 오행 · {element}
            </span>
          ))}
          {result.dominantElements.map((element) => (
            <span
              key={element}
              className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]"
            >
              강한 기운 · {element}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Saju Summary</p>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.sajuSummary}</p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">core</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.sajuResult.interp.core}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">사회 / 재물 / 관계</p>
              <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
                {result.sajuResult.interp.social_analysis}
                <br />
                <br />
                {result.sajuResult.interp.wealth_strategy}
                <br />
                <br />
                {result.sajuResult.interp.love_romance}
              </p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Premium CTA</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
            이름별 상세 해석까지 이어서 볼 수 있습니다
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">{result.premiumPreview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/naming/premium"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              프리미엄 리포트 보기
            </Link>
            <Link
              href="/naming/start"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
            >
              다시 설계하기
            </Link>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-5">
        {result.recommendations.map((candidate, index) => (
          <NamingResultCard key={candidate.id} candidate={candidate} rank={index + 1} />
        ))}
      </div>
    </main>
  );
}
