import { LoveCodeStartForm } from "@/components/love-code/LoveCodeStartForm";

export default function LoveCodeStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Love Code
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          러브코드
        </h1>
        <p className="mt-4 text-2xl text-[var(--color-secondary)] sm:text-3xl">
          오늘의 연애 행동 추천
        </p>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          내 생년월일과 상대 생년월일, 현재 관계 상태를 입력하면 지금 필요한
          행동 힌트와 관계 흐름을 카드형으로 정리해드립니다.
        </p>
      </section>

      <LoveCodeStartForm />
    </main>
  );
}
