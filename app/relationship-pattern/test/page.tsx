import { RelationshipPatternExperience } from "@/components/relationship-pattern/RelationshipPatternExperience";

export default function RelationshipPatternTestPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Premium Relationship Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          연애패턴 코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          사랑이 깊어질수록 드러나는 감정의 결과 관계의 습관을 20개의 질문으로
          읽어냅니다. 몰입, 희생, 거리감, 감정의 파도, 안정 지향성 중 지금의
          당신을 가장 닮은 흐름을 섬세하게 비춰보세요.
        </p>
      </section>


      <RelationshipPatternExperience />
    </main>
  );
}
