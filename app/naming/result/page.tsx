import Link from "next/link";

import { NamingResultCard } from "@/components/naming/NamingResultCard";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import {
  formatElementSummary,
  generateNameCodeResult,
  getElementLabel,
  validateNamingInput,
} from "@/lib/naming/name-generator";
import { type NameCodeInput } from "@/types/naming";

type NamingResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function ErrorState({ errors }: { errors: string[] }) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center px-6 py-12 sm:px-8">
      <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Input Error</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          입력한 이름을 다시 확인해주세요
        </h1>
        <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/naming/start"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830]"
          >
            다시 시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}

export default async function NamingResultPage({ searchParams }: NamingResultPageProps) {
  const params = await searchParams;

  const input: Partial<NameCodeInput> = {
    name: getSingleValue(params.name),
    birth_date: getSingleValue(params.birth_date),
  };

  const validated = validateNamingInput(input);
  if (!validated.success) {
    return <ErrorState errors={validated.errors} />;
  }

  const result = generateNameCodeResult(validated.data);
  const elementSummary = formatElementSummary(result.elementCounts);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Name Code Result</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          나의 이름 코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {result.name}
          {result.birthDate ? ` · ${result.birthDate}` : ""}의 이름 흐름을 초성 발음 기준으로 풀어본 결과입니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]">
            초성 {result.initials.join(", ")}
          </span>
          {result.lackingElements.length > 0 ? (
            result.lackingElements.map((element) => (
              <span
                key={element}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]"
              >
                부족한 기운 {getElementLabel(element)}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]">
              오행이 고르게 분포되어 있어요
            </span>
          )}
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">이름 오행 분석</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">초성 리스트</p>
              <p className="mt-3 text-2xl text-[var(--foreground)]">
                {result.initials.length > 0 ? result.initials.join(" · ") : "분석 가능한 초성이 없어요"}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">오행 분포</p>
              <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">{elementSummary}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="result-panel-glow p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">부족한 기운</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">요약</p>
              <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">
                {result.lackingElements.length > 0
                  ? `부족한 기운: ${result.lackingElements.map((element) => getElementLabel(element)).join(", ")}`
                  : "비어 있는 기운이 두드러지지 않아 전체 흐름이 비교적 고르게 이어집니다."}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">안내</p>
              <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">
                부족한 기운은 좋고 나쁨의 기준이 아니라, 이름 안에서 상대적으로 여백처럼 느껴지는 결을 뜻합니다.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">에너지 해석</p>
        <div className="mt-6 grid gap-5">
          {result.energyFlow.map((paragraph) => (
            <div
              key={paragraph}
              className="rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]"
            >
              {paragraph}
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">보완 발음</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {result.complements.map((item) => (
            <div key={item.element} className="rounded-[22px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">이런 발음이 보완됩니다</p>
              <p className="mt-3 text-lg text-[var(--foreground)]">
                {item.label} · {item.initials.join(", ")}
              </p>
              <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">{item.message}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <section className="grid gap-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Name Mood Picks</p>
          <h2 className="mt-3 font-display text-4xl text-[var(--foreground)]">
            이런 이름 느낌이 잘 맞아요
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {result.styleCards.map((card) => (
            <NamingResultCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Guide</p>
        <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">{result.guidanceNote}</p>
      </GlassPanel>

      <ResultShareActions
        testName="이름코드"
        resultTitle="나의 이름 코드"
        resultSummary={result.energyFlow[0] ?? `${result.name} 이름의 흐름을 읽어본 결과예요.`}
        hubUrl="/naming"
        restartUrl="/naming/start"
      />
    </main>
  );
}
