import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | 매력코드",
  description:
    "LUMORA 안에서 당신만의 매력 결을 읽어보는 매력코드 허브 페이지입니다.",
};

export default function AttractionCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout
      eyebrow="Attraction Code"
      title="Attraction Code"
      backgroundVariant="rose"
    >
      {children}
    </ServiceHubLayout>
  );
}
