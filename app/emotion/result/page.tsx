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
    rhythm: "Pause and organize",
    needed:
      "Reacting quickly is less helpful right now than slowing down and reading what your current state is trying to tell you.",
    actions: [
      "Notice your body for 3 minutes and focus on what feels tight before trying to solve anything.",
      "Reduce today's decisions to one priority so your mind has a single direction to return to.",
      "Write down the exact source of pressure instead of holding it as a vague feeling.",
    ],
  },
  sad: {
    rhythm: "Recover and reconnect",
    needed:
      "This is a moment to acknowledge what hurts and rebuild stability gently instead of forcing an immediate change.",
    actions: [
      "Name the feeling in one sentence so it becomes clearer and less shapeless.",
      "Do one basic recovery action such as water, a short walk, or real rest.",
      "Reach out to one safe person instead of carrying the whole mood alone.",
    ],
  },
  excited: {
    rhythm: "Expand with direction",
    needed:
      "Your energy is strong, but it will become meaningful only when it is gathered into a clear next move.",
    actions: [
      "Choose one opportunity worth acting on now instead of trying to chase everything at once.",
      "Turn today's motivation into one concrete action before the momentum scatters.",
      "Keep a little space between confidence and overcommitment.",
    ],
  },
  tired: {
    rhythm: "Restore before pushing",
    needed:
      "The priority is not adding more effort, but reducing overload and recovering enough clarity to move again.",
    actions: [
      "Separate what truly must be done today from what can wait.",
      "Block a short recovery window and protect it like an appointment.",
      "Track what is draining you most so recovery becomes more targeted.",
    ],
  },
  empty: {
    rhythm: "Reconnect with meaning",
    needed:
      "Rather than filling the emptiness quickly, it may help more to notice what you have lost touch with emotionally.",
    actions: [
      "Write down three words for what your inner state feels like today.",
      "Return to one small thing that used to make you feel grounded or alive.",
      "Reduce numbness by adding a little more real contact, reflection, or movement to your day.",
    ],
  },
  happy: {
    rhythm: "Expand with balance",
    needed:
      "This is a good flow to build on, especially if you anchor it into gratitude, rhythm, and sustainable action.",
    actions: [
      "Record what is making this moment feel good so you can revisit the pattern later.",
      "Use the current lift to move one meaningful thing forward.",
      "Protect the balance so good momentum does not turn into overextension.",
    ],
  },
} as const;

const INTENSITY_SUMMARIES = {
  1: "The emotional signal is light, but still worth noticing.",
  2: "The feeling is subtle and may be easy to overlook if you stay busy.",
  3: "This emotion is clear enough to guide your next step.",
  4: "The feeling is strong and deserves deliberate care.",
  5: "Your emotional state is intense and should be handled gently and intentionally.",
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
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Emotion Guide</p>
        <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
          {EMOTION_TAG_LABELS[result.detected_tag]} 상태에서 지금 가장 필요한 흐름
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {EMOTION_FOCUS_GUIDES[result.detected_tag].needed}
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Recommended Rhythm</p>
            <p className="mt-3 text-2xl font-display text-[var(--foreground)]">
              {EMOTION_FOCUS_GUIDES[result.detected_tag].rhythm}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
              {INTENSITY_SUMMARIES[result.intensity as keyof typeof INTENSITY_SUMMARIES]}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Recommended Actions</p>
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
            Recommended Affirmations
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
                  Affirmation {index + 1}
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
