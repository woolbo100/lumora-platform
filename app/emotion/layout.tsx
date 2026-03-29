import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Emotion",
  description:
    "감정과 상태를 기반으로 에너지 흐름을 읽고 맞춤 확언을 제안하는 Lumora 감정코드 리딩 서비스입니다.",
};

export default function EmotionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Emotion Code Reading" title="Emotion Reading">
      {children}
    </ServiceHubLayout>
  );
}
