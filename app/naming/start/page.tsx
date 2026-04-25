import { NamingStartForm } from "@/components/naming/NamingStartForm";

type NamingStartPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NamingStartPage({ searchParams }: NamingStartPageProps) {
  const params = await searchParams;
  const analysisId = getSingleValue(params.analysisId) ?? "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Naming Start
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          선천코드 이름설계 시작
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          사주에서 이미 만든 공통 분석 데이터를 바탕으로, 이름 에너지 설계만 따로 이어서 진행합니다.
        </p>
      </section>

      <NamingStartForm analysisId={analysisId} />
    </main>
  );
}
