import { SajuInputForm } from "@/components/saju/SajuInputForm";

export default function SajuReadingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Saju Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          사주 입력
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          태어난 순간의 정보를 바탕으로, 지금의 나를 이루는 기운의 흐름을 차분하게 읽어보는 시작점입니다.
        </p>
      </section>

      <SajuInputForm />
    </main>
  );
}
