import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Saju",
  description:
    "기존 별하 사주 구조를 유지한 채 Lumora 안으로 통합한 사주 리포트 서비스입니다.",
};

export default function SajuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Eastern Destiny Reading" title="Saju Reading">
      {children}
    </ServiceHubLayout>
  );
}
