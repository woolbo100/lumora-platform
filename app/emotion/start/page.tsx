import { EmotionStartForm } from "@/components/emotion/EmotionStartForm";

export default function EmotionStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Emotion Start
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          감정 리딩 시작
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금의 감정과 강도를 입력하면 현재 에너지 상태와 방향, 맞춤 확언을 함께 제안합니다.
        </p>
      </section>

      <EmotionStartForm />
    </main>
  );
}
