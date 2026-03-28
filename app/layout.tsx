import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMORA | 마음코드 해석 플랫폼",
  description: "타로, 애착코드, 블로그를 통해 내면의 신호를 해석하는 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased"
        suppressHydrationWarning
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(106,90,205,0.34),_transparent_68%)] blur-3xl" />
          <div className="absolute right-[-8rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.16),_transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[-4rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(92,119,255,0.18),_transparent_72%)] blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
