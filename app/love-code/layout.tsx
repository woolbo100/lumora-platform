import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Love Code",
  description:
    "Lumora Code 안에서 오늘의 연애 행동 추천과 관계 흐름 힌트를 확인하는 러브코드 허브 페이지입니다.",
};

export default function LoveCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Love Code" title="러브코드">
      {children}
    </ServiceHubLayout>
  );
}
