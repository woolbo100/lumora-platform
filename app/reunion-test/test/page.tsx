import { ReunionTestExperience } from "@/components/reunion-test/ReunionTestExperience";

export default function ReunionTestRunPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pt-44">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Reunion Possibility Test
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          재회 가능성 테스트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금 관계의 온도와 거리감, 남아 있는 미련, 다시 대화가 열릴 가능성까지
          함께 읽어보는 현실 조언형 리딩입니다. 감정만이 아니라 흐름과 타이밍도
          함께 살펴보세요.
        </p>
      </section>

      <ReunionTestExperience />
    </main>
  );
}
