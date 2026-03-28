import Image from "next/image";
import Link from "next/link";

export default function TarotPage() {
  return (
    <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/tarot/tarotmain.png"
          alt="타로 허브 배경"
          fill
          priority
          className="object-cover opacity-38 scale-[1.03]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(205,154,188,0.08),transparent_24%),linear-gradient(180deg,rgba(36,24,64,0.68)_0%,rgba(24,18,48,0.62)_48%,rgba(16,13,34,0.76)_100%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
        <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(245,186,211,0.16),rgba(255,255,255,0.02))] text-5xl text-[#e7adc8] shadow-[0_0_60px_rgba(231,173,200,0.14)]">
          ✦
        </div>

        <h1 className="font-display text-6xl leading-none text-white sm:text-7xl md:text-8xl">
          Luna Tarot
        </h1>
        <p className="mt-5 font-myeongjo text-2xl text-[#d7a2bd] sm:text-3xl">
          당신의 감정과 흐름을 읽어보세요
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-white/62 sm:text-xl">
          은은하게 흐르는 감정의 결, 관계의 신호, 지금 필요한 메시지를 세 장의
          카드로 조용히 해석합니다. 먼저 리딩 공간에 들어가 카드를 뽑아보세요.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/tarot/select"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(90deg,#dbc3d3_0%,#f5aebc_100%)] px-10 py-4 text-lg font-semibold text-[#24183c] shadow-[0_18px_60px_rgba(245,174,188,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(245,174,188,0.34)]"
          >
            탐험 시작하기
            <span className="ml-3 text-xl" aria-hidden="true">
              →
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/5 px-8 py-4 text-sm font-semibold tracking-[0.18em] text-white/76 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로
          </Link>
        </div>
      </section>
    </main>
  );
}
