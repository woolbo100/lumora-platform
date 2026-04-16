import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "연애패턴코드 | LUMORA",
  description:
    "LUMORA 안에서 관계 패턴과 감정의 흐름을 섬세하게 읽어보는 연애패턴코드 허브 페이지입니다.",
};

export default function RelationshipPatternLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Inner Pattern" title="연애패턴코드">
      {children}
    </ServiceHubLayout>
  );
}
