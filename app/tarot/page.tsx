import Image from "next/image";
import Link from "next/link";

import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function TarotPage() {
  return (
    <>
      <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tarot/tarotmain.png"
            alt="타로 허브 배경"
            fill
            priority
            className="scale-[1.03] object-cover opacity-38"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,195,165,0.08),transparent_22%),radial-gradient(circle_at_50%_35%,rgba(122,104,217,0.16),transparent_34%),linear-gradient(180deg,rgba(13,11,28,0.5)_0%,rgba(10,11,23,0.68)_52%,rgba(7,8,18,0.86)_100%)]" />
        </div>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
          <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(213,195,165,0.18),rgba(255,255,255,0.03))] text-5xl text-[var(--color-secondary)] shadow-[0_0_60px_rgba(122,104,217,0.16)]">
            ✦
          </div>

          <h1 className="font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_30px_rgba(213,195,165,0.08)] sm:text-7xl md:text-8xl">
            Luna Tarot
          </h1>
          <p className="mt-5 font-myeongjo text-2xl text-[var(--color-secondary)] sm:text-3xl">
            지금 필요한 메시지를 카드로 확인해보세요
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
            현재 감정과 관계의 흐름, 지금 필요한 방향을 타로 카드로 조용히 해석합니다. 질문을 고르고
            카드를 선택하면 지금의 상태와 앞으로의 흐름을 읽어드릴게요.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/tarot/select"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-10 py-4 text-lg font-semibold text-[#1c1830] shadow-[0_22px_70px_rgba(89,72,173,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(89,72,173,0.38)]"
            >
              타로 시작하기
              <span className="ml-3 text-xl" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              LUMORA로 돌아가기
            </Link>
          </div>
        </section>
      </main>
      <ServiceHubContent {...serviceHubContent.tarot} />
    </>
  );
}
