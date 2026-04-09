import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { interpretEmotion, validateEmotionInput } from "@/lib/emotion/interpreter";

type EmotionResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const EMOTION_TAG_LABELS = {
  anxiety: "불안",
  sad: "슬픔",
  excited: "설렘",
  tired: "피로",
  empty: "공허",
  happy: "행복",
} as const;

const EMOTION_FOCUS_GUIDES = {
  anxiety: {
    rhythm: "잠시 멈추고 정리하는 흐름",
    needed:
      "지금은 빠르게 반응하는 것보다, 현재 상태가 무엇을 말하고 있는지 천천히 읽어보는 것이 더 중요합니다.",
    actions: [
      "무언가를 해결하려 하기 전에 3분만 몸의 긴장부터 천천히 살펴보세요.",
      "오늘의 결정은 한 가지 우선순위로만 좁혀 마음이 돌아올 기준점을 만들어 주세요.",
      "막연한 불안으로 두기보다, 압박의 원인을 문장으로 적어 보세요.",
    ],
  },
  sad: {
    rhythm: "회복하고 다시 연결되는 흐름",
    needed:
      "지금은 억지로 바꾸려 하기보다, 무엇이 아픈지 인정하고 안정감을 천천히 다시 세우는 시간이 더 필요합니다.",
    actions: [
      "지금 감정을 한 문장으로 붙잡아 보세요. 감정이 훨씬 선명해집니다.",
      "물 마시기, 짧은 산책, 충분한 휴식처럼 기본 회복 행동 하나를 바로 해보세요.",
      "혼자 다 버티기보다, 안전하게 기대할 수 있는 사람 한 명과 연결해 보세요.",
    ],
  },
  excited: {
    rhythm: "방향을 만들며 확장하는 흐름",
    needed:
      "에너지는 충분히 올라와 있지만, 그것이 의미 있는 결과가 되려면 분명한 다음 움직임으로 모아져야 합니다.",
    actions: [
      "모든 가능성을 다 잡으려 하기보다, 지금 바로 움직일 한 가지 기회를 선택하세요.",
      "퍼져 있는 의욕을 흩어지기 전에 오늘의 구체적인 행동 하나로 바꿔 보세요.",
      "자신감과 무리한 확장 사이의 간격을 조금 남겨 두세요.",
    ],
  },
  tired: {
    rhythm: "밀어붙이기보다 회복이 먼저인 흐름",
    needed:
      "지금의 우선순위는 더 애쓰는 것이 아니라, 과부하를 줄이고 다시 움직일 수 있을 만큼의 여유를 회복하는 것입니다.",
    actions: [
      "오늘 반드시 해야 할 일과 미뤄도 되는 일을 분리해 보세요.",
      "짧더라도 회복 시간을 일정처럼 확보하고 지켜 주세요.",
      "무엇이 가장 많이 에너지를 빼앗는지 기록해 회복 방향을 분명히 하세요.",
    ],
  },
  empty: {
    rhythm: "의미와 다시 연결되는 흐름",
    needed:
      "공허함을 급하게 채우기보다, 지금 내가 무엇과 감정적으로 멀어져 있는지 알아차리는 일이 더 도움이 됩니다.",
    actions: [
      "오늘 내 안이 어떤 느낌인지 세 단어로 적어 보세요.",
      "예전에 나를 살아 있게 하던 작은 감각 하나로 다시 돌아가 보세요.",
      "하루에 연결, 성찰, 움직임을 조금 더 넣어 무감각을 줄여 보세요.",
    ],
  },
  happy: {
    rhythm: "균형 있게 확장되는 흐름",
    needed:
      "지금의 좋은 흐름은 감사, 리듬, 그리고 지속 가능한 행동과 연결될 때 더 오래 이어질 수 있습니다.",
    actions: [
      "무엇이 지금을 좋게 만드는지 기록해 두면 나중에 같은 흐름을 다시 만들 수 있습니다.",
      "현재의 좋은 기운으로 의미 있는 일 하나를 앞으로 밀어 보세요.",
      "좋은 흐름이 과한 확장으로 바뀌지 않도록 균형을 지켜 주세요.",
    ],
  },
} as const;

const INTENSITY_SUMMARIES = {
  1: "감정 신호는 가볍지만 충분히 알아차릴 가치가 있습니다.",
  2: "미세한 감정이라 바쁘면 쉽게 놓칠 수 있는 상태입니다.",
  3: "지금의 감정은 다음 선택을 이끌 만큼 충분히 선명합니다.",
  4: "감정의 강도가 높아 의식적인 돌봄이 필요한 상태입니다.",
  5: "감정이 매우 강하게 올라와 있으니 부드럽고 의도적으로 다루는 것이 좋습니다.",
} as const;

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
            detected · {EMOTION_TAG_LABELS[result.detected_tag]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]">
            intensity · {result.intensity}
          </span>
          <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--foreground-soft)]">
            {INTENSITY_SUMMARIES[result.intensity as keyof typeof INTENSITY_SUMMARIES]}
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

      <GlassPanel className="p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">감정 가이드</p>
        <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
          {EMOTION_TAG_LABELS[result.detected_tag]} 상태에서 지금 가장 필요한 흐름
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {EMOTION_FOCUS_GUIDES[result.detected_tag].needed}
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">추천 리듬</p>
            <p className="mt-3 text-2xl font-display text-[var(--foreground)]">
              {EMOTION_FOCUS_GUIDES[result.detected_tag].rhythm}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
              {INTENSITY_SUMMARIES[result.intensity as keyof typeof INTENSITY_SUMMARIES]}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">추천 행동</p>
            <div className="mt-4 grid gap-3">
              {EMOTION_FOCUS_GUIDES[result.detected_tag].actions.map((action) => (
                <p
                  key={action}
                  className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm leading-7 text-[var(--foreground-soft)]"
                >
                  {action}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-[24px] border border-[var(--color-secondary)]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(157,139,227,0.1)_55%,rgba(108,92,198,0.12))] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            맞춤 확언 추천
          </p>
          <h2 className="mt-3 font-display text-2xl text-[var(--foreground)] sm:text-3xl">
            {EMOTION_TAG_LABELS[result.detected_tag]} 흐름에 맞는 확언 추천
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">
            마지막으로 지금 감정의 흐름을 안정적으로 붙잡을 수 있도록 맞춤 확언을 추천해 드립니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {result.affirmation.map((line, index) => (
              <div
                key={line}
                className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-4 text-base text-[var(--foreground)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  확언 {index + 1}
                </p>
                <p className="mt-3 leading-7">{line}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
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
