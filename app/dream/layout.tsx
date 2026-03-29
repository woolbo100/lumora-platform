import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Dream",
  description:
    "꿈의 상징, 감정, 현재 흐름을 함께 분석해 무의식의 메시지를 해석하는 Lumora 꿈해몽 서비스입니다.",
};

export default function DreamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Dream Interpretation" title="Dream Reading">
      {children}
    </ServiceHubLayout>
  );
}
