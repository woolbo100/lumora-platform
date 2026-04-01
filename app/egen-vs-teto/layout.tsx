import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | 에겐 vs 테토녀 테스트",
  description:
    "20문항으로 나의 연애 본능과 연애 성향을 가볍고 직관적으로 확인하는 에겐 vs 테토녀 테스트 허브 페이지입니다.",
};

export default function EgenVsTetoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout
      eyebrow="RELATION TYPE TEST"
      title="에겐 vs 테토녀 테스트"
      backgroundVariant="rose"
    >
      {children}
    </ServiceHubLayout>
  );
}
