import { SajuResultClient } from "@/components/saju/SajuResultClient";

type SajuResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SajuResultPage({ searchParams }: SajuResultPageProps) {
  const params = await searchParams;
  const analysisId = getSingleValue(params.id) ?? "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <SajuResultClient analysisId={analysisId} />
    </main>
  );
}
