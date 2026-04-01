import type { Metadata } from "next";

import { EgenVsTetoResultPanel } from "@/components/egen-vs-teto/EgenVsTetoResultPanel";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { parseEgenVsTetoResultParams } from "@/lib/egenVsTetoCalculator";

export const metadata: Metadata = {
  title: "에겐 vs 테토녀 테스트 결과 | Lumora Code",
  description:
    "에겐형, 테토녀형, 혼합형 중 어떤 연애 성향에 가까운지 결과를 확인하고 공유해보세요.",
};

type EgenVsTetoResultPageProps = {
  searchParams: Promise<{
    type?: string;
    egen?: string;
    teto?: string;
  }>;
};

export default async function EgenVsTetoResultPage({
  searchParams,
}: EgenVsTetoResultPageProps) {
  const params = await searchParams;
  const result = parseEgenVsTetoResultParams(params);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Egen vs Teto Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          연애 본능 테스트 결과
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금의 연애 반응이 어느 쪽 결에 더 가까운지 가볍고 직관적인 카드로 정리한
          결과 페이지입니다.
        </p>
      </section>

      {result ? (
        <EgenVsTetoResultPanel result={result} />
      ) : (
        <GlassPanel className="p-8 text-center sm:p-10">
          <p className="text-lg leading-8 text-[var(--foreground-soft)]">
            결과를 확인하려면 먼저 테스트를 진행해주세요.
          </p>
        </GlassPanel>
      )}
    </main>
  );
}
