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


      <AuraTestClient embedded />
    </main>
  );
}
