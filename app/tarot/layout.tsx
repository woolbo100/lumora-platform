import type { Metadata } from "next";

import "./globals.css";
import { TarotBackground } from "@/components/tarot/TarotBackground";

export const metadata: Metadata = {
  title: "LUMORA | 타로 리딩",
  description:
    "LUMORA 안에서 현재 감정, 관계, 선택의 흐름을 읽어보는 타로 리딩 서비스입니다.",
};

export default function TarotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <TarotBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pt-32 pb-12 sm:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
