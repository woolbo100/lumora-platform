import type { Metadata } from "next";
import Script from "next/script";

import { HomeRedirectAnchorHandler } from "@/components/shared/HomeRedirectAnchorHandler";
import NewHeader from "@/components/shared/NewHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

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
        <HomeRedirectAnchorHandler />
        <NewHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
