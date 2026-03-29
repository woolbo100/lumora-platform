import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Attraction Code",
  description:
    "LUMORA 안에서 당신의 고유한 매력과 사람을 끌어당기는 결을 읽어보는 허브 페이지입니다.",
};

export default function AttractionCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Attractive Code" title="Attraction Code">
      {children}
    </ServiceHubLayout>
  );
}
