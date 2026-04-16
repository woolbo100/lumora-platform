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
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pt-32 pb-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Integrated Aura Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          오라코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          감정과 차크라를 분리해서 보지 않고, 지금의 에너지 흐름이 어떤 색과
          분위기로 드러나는지 21문항으로 읽어냅니다. 주요 차크라 상태, 감정의
          흐름, 오라 색상을 한 번에 확인해보세요.
        </p>
      </section>

      <AuraTestClient embedded />
    </main>
  );
}
