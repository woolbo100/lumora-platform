import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "LUMORA | 마음 코드 해석 플랫폼",
  description:
    "타로 리딩, 애착유형 코드, 블로그 콘텐츠를 통해 내면의 신호를 해석하는 LUMORA 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body
        className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased"
        suppressHydrationWarning
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,131,235,0.08),transparent_34%),radial-gradient(circle_at_bottom,rgba(120,162,255,0.06),transparent_32%)]" />
          <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(122,104,217,0.3),_transparent_68%)] blur-3xl" />
          <div className="absolute right-[-10rem] top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(120,162,255,0.16),_transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-5rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(213,195,165,0.12),_transparent_72%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,18,0.1),rgba(5,7,18,0.22)_42%,rgba(5,7,18,0.44))]" />
        </div>
        {children}
      </body>
    </html>
  );
}
