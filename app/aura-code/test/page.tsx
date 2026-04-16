import { AuraTestClient } from "@/components/aura-code/AuraTestClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오라코드 | 감정과 차크라 흐름으로 보는 나의 오라",
  description:
    "감정 상태와 7개 차크라 흐름을 바탕으로 현재의 오라 색과 에너지 결을 해석해보세요. 무료 오라코드 리딩.",
  openGraph: {
    title: "오라코드 | 감정과 차크라 흐름으로 보는 나의 오라",
    description:
      "감정 상태와 7개 차크라 흐름을 바탕으로 현재의 오라 색과 에너지 결을 해석해보세요. 무료 오라코드 리딩.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "오라코드 | 감정과 차크라 흐름으로 보는 나의 오라",
    description:
      "감정 상태와 7개 차크라 흐름을 바탕으로 현재의 오라 색과 에너지 결을 해석해보세요. 무료 오라코드 리딩.",
  },
};

export default function AuraCodeTestPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Aura & Energy Analysis
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          오라코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          지금 당신의 에너지 상태와 고유한 오라 컬러를 분석합니다. 7개의 차크라
          밸런스와 함께 당신이 지닌 가장 빛나는 결을 읽어드립니다.
        </p>
      </section>


      <AuraTestClient embedded />
    </main>
  );
}
