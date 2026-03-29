import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Reunion Test",
  description:
    "LUMORA 안에서 재회 가능성과 관계의 다음 흐름을 차분하게 살펴보는 허브 페이지입니다.",
};

export default function ReunionTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Relation Outcome" title="Reunion Test">
      {children}
    </ServiceHubLayout>
  );
}
