import { EmotionStartForm } from "@/components/emotion/EmotionStartForm";

export default function EmotionStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Emotional Vibe Check
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          감성 리딩
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금 당신의 문장 안에 머문 감정의 결을 읽어드립니다. 짧은 글 속에
          숨겨진 감정의 지도를 그려보고 마음의 상태를 들여다보세요.
        </p>
      </section>


      <EmotionStartForm />
    </main>
  );
}
