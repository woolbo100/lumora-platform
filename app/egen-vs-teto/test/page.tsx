import type { Metadata } from "next";

import { EgenVsTetoTestClient } from "@/components/egen-vs-teto/EgenVsTetoTestClient";

export const metadata: Metadata = {
  title: "에겐 vs 테토녀 테스트 | 20문항으로 알아보는 연애 본능 테스트",
  description:
    "20문항으로 나의 연애 본능과 연애 성향을 확인해보세요. 에겐형, 테토녀형, 혼합형 중 어떤 결에 가까운지 직관적으로 보여드립니다.",
};

export default function EgenVsTetoTestPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Egen vs Teto Test
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          에겐 vs 테토녀 테스트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          20문항으로 나의 연애 본능을 가볍게 점검해보세요. 질문마다 더 가까운 쪽을
          고르면 에겐형, 테토녀형, 혼합형 중 현재의 결을 직관적으로 확인할 수 있습니다.
        </p>
      </section>

      <EgenVsTetoTestClient />
    </main>
  );
}
