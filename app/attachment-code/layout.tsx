import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/shared/ServiceHubLayout";

export const metadata: Metadata = {
  title: "LUMORA | Attachment Code",
  description:
    "LUMORA 안에서 애착유형과 관계의 감정 흐름을 섬세하게 읽어보는 허브 페이지입니다.",
};

export default function AttachmentCodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServiceHubLayout eyebrow="Inner Attachment" title="Attachment Code">
      {children}
    </ServiceHubLayout>
  );
}
