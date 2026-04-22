import type { Metadata } from "next";
import Script from "next/script";

import NewHeader from "@/components/shared/NewHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { PageBackground } from "@/components/shared/PageBackground";
import KakaoInit from "@/components/shared/KakaoInit";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumoracode.kr"),
  title: "LUMORA | 마음 코드 해석 플랫폼",
  description:
    "타로 리딩, 애착유형 분석, 관계 흐름 해석과 감정 탐색을 통해 내 마음의 패턴을 읽어주는 루모라 플랫폼입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LUMORA | 마음 코드 해석 플랫폼",
    description:
      "타로 리딩, 애착유형 분석, 관계 흐름 해석과 감정 탐색을 통해 내 마음의 패턴을 읽어주는 루모라 플랫폼입니다.",
    url: "https://lumoracode.kr",
    siteName: "LUMORA",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ?? "";
  const shouldRenderAdsenseScript =
    adsenseId !== "" && adsenseId !== "?섏쨷???낅젰";

  return (
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="Cyw4aUDav7WKHtcNDrnjhHmuRF_v2HKk0pi0p81SRh4"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PV553EDK9W"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PV553EDK9W');
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
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className="min-h-full bg-transparent text-[var(--foreground)] antialiased"
        suppressHydrationWarning
      >
        <KakaoInit />
        <PageBackground />
        <NewHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
