import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | 이름코드",
  description:
    "이름의 초성을 발음기관 기준 오행으로 분석해 이름 에너지 흐름, 부족한 기운, 보완 발음 방향을 읽어보는 루모라 이름코드 서비스입니다.",
};

export default function NamingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Name Code" title="이름코드">
      {children}
    </ServiceHubLayout>
  );
}
