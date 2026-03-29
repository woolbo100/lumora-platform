import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Naming",
  description:
    "기존 사주 엔진을 재사용해 부족한 오행과 목적에 맞는 이름 방향을 설계하는 선천코드 이름설계 서비스입니다.",
};

export default function NamingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Energy Naming" title="Naming Design">
      {children}
    </ServiceHubLayout>
  );
}
