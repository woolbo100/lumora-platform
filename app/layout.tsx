import type { Metadata } from "next";
import Script from "next/script";

import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "LUMORA | 마음 코드 해석 플랫폼",
  description:
    "타로 리딩, 애착유형 분석, 연애패턴 코드, 재회 가능성 테스트를 통해 감정과 관계의 흐름을 해석하는 LUMORA 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ?? "";
  const shouldRenderAdsenseScript =
    adsenseId !== "" && adsenseId !== "나중에_입력";

  return (
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="Cyw4aUDav7WKHtcNDrnjhHmuRF_v2HKk0pi0p81SRh4"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H86NT2M7KT"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H86NT2M7KT');
          `}
        </Script>
        {shouldRenderAdsenseScript ? (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body
        className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased"
        suppressHydrationWarning
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(230,199,194,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(108,79,166,0.24),transparent_34%),linear-gradient(165deg,#0f0f17_0%,#1a1a2e_48%,#2b1f3a_100%)]" />
          <div className="absolute left-1/2 top-[-5rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.14),_rgba(212,175,55,0.04)_34%,_transparent_70%)] blur-3xl" />
          <div className="absolute right-[-8rem] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(122,90,178,0.2),_transparent_72%)] blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-6rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(230,199,194,0.16),_transparent_72%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.28),rgba(8,8,16,0.42)_42%,rgba(8,8,16,0.62))]" />
        </div>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
