import { RelationshipPatternResultPanel } from "@/components/relationship-pattern/RelationshipPatternResultPanel";
import { type RelationshipPatternType } from "@/types/relationshipPattern";

type RelationshipPatternResultPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

const validTypes: RelationshipPatternType[] = [
  "immersive",
  "sacrificial",
  "distant",
  "emotional",
  "stable",
];

export default async function RelationshipPatternResultPage({
  searchParams,
}: RelationshipPatternResultPageProps) {
  const params = await searchParams;
  const initialType = validTypes.includes(params.type as RelationshipPatternType)
    ? (params.type as RelationshipPatternType)
    : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Relationship Pattern Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          연애패턴 코드 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금의 당신이 사랑 안에서 어떤 흐름으로 움직이는지, 가장 두드러진
          패턴과 주의 포인트, 회복 가이드를 한 장의 리딩처럼 정리해드립니다.
        </p>
      </section>

      <RelationshipPatternResultPanel initialType={initialType} />
    </main>
  );
}
