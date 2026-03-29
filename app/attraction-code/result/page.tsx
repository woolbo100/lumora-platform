import { AttractionResultPanel } from "@/components/attraction-code/AttractionResultPanel";
import { type AttractionType } from "@/types/attraction";

type AttractionResultPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

const validTypes: AttractionType[] = [
  "elegant",
  "lovely",
  "chic",
  "warm",
  "mystic",
];

export default async function AttractionResultPage({
  searchParams,
}: AttractionResultPageProps) {
  const params = await searchParams;
  const initialType = validTypes.includes(params.type as AttractionType)
    ? (params.type as AttractionType)
    : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Attraction Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          매력 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          당신 안에 이미 있는 끌림의 결과 관계 안에서 더 깊게 빛나는 강점을
          정리한 결과입니다.
        </p>
      </section>

      <AttractionResultPanel initialType={initialType} />
    </main>
  );
}
