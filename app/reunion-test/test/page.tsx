import { ReunionTestExperience } from "@/components/reunion-test/ReunionTestExperience";

export default function ReunionTestRunPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Relationship Restoration Analysis
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          재회 가능성 테스트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          헤어진 연인과의 현재 흐름을 분석하고, 다시 맞닿을 수 있는 가능성과
          서로를 향한 마음의 결을 정밀하게 읽어드립니다.
        </p>
      </section>


      <ReunionTestExperience />
    </main>
  );
}
