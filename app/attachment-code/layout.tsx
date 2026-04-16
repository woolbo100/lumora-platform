import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "애착유형 코드 | LUMORA",
  description:
    "LUMORA 안에서 애착유형과 관계의 감정 흐름을 섬세하게 읽어보는 애착유형 코드 허브 페이지입니다.",
};

export default function AttachmentCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Inner Attachment" title="애착유형 코드">
      {children}
    </ServiceHubLayout>
  );
}
