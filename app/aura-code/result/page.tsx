import { AuraResult } from "@/components/aura-code/AuraResult";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오라코드 테스트 | 감정과 차크라 흐름으로 보는 나의 오라",
  description:
    "감정 상태와 7개 차크라 흐름을 바탕으로 현재의 오라 색과 에너지 결을 해석해보세요. 무료 오라코드 테스트.",
};

export default function AuraCodeResultPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Aura Code Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          오라코드 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금의 당신에게 가장 선명한 차크라와 감정의 움직임, 그리고 오라의
          색감을 한 장의 감성 리딩처럼 정리해드립니다.
        </p>
      </section>

      <AuraResult />
    </main>
  );
}
