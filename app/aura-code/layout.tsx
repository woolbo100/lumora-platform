import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Aura Code",
  description:
    "LUMORA 안에서 감정 흐름, 주요 차크라, 오라의 분위기를 함께 읽어보는 aura code 허브 페이지입니다.",
};

export default function AuraCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Aura Reading" title="Aura Code">
      {children}
    </ServiceHubLayout>
  );
}
