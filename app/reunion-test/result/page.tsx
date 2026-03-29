import { ReunionResultPanel } from "@/components/reunion-test/ReunionResultPanel";
import { type ReunionType } from "@/types/reunion";

type ReunionResultPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

const validTypes: ReunionType[] = ["high", "cautious", "closure", "newflow"];

export default async function ReunionResultPage({
  searchParams,
}: ReunionResultPageProps) {
  const params = await searchParams;
  const initialType = validTypes.includes(params.type as ReunionType)
    ? (params.type as ReunionType)
    : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Reunion Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          재회 가능성 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금 이 관계 안에 남아 있는 감정의 결, 서로의 거리감, 다시 이어질
          가능성을 흐름 중심으로 정리한 결과입니다.
        </p>
      </section>

      <ReunionResultPanel initialType={initialType} />
    </main>
  );
}
