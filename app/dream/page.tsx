import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function DreamPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <section className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
        <div className="aurora-hover relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Dream Interpretation
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--foreground)] sm:text-6xl md:text-7xl">
            꿈은 단순한 장면이 아니라
            <br />
            무의식이 보내는 상징의 언어입니다.
          </h1>
          <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
            어젯밤의 꿈 속에는
            {"\n"}지금의 감정, 다가오는 변화,
            {"\n"}마음 깊은 곳의 메시지가 담겨 있습니다.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/dream/start"
              className="aurora-hover aurora-hover-strong inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-8 py-4 text-base font-semibold text-[#1c1830]"
            >
              무료 해몽 시작하기
            </Link>
            <Link
              href="/"
              className="aurora-hover aurora-hover-soft inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              LUMORA 홈으로 돌아가기
            </Link>
            <Link
              href="/dream/premium"
              className="aurora-hover aurora-hover-soft inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              심층 해석 보기
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Meaning</p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
            같은 꿈이라도 지금의 흐름에 따라 달라집니다
          </h2>
          <p className="mt-6 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            같은 꿈이라도
            {"\n"}현재 상황과 감정에 따라 의미는 달라집니다.
            {"\n\n"}이 서비스는
            {"\n"}꿈의 상징 + 감정 + 현재 흐름을 함께 분석하여
            {"\n"}당신의 무의식이 전달하는 메시지를 해석합니다.
          </p>
        </GlassPanel>

        <GlassPanel className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Examples</p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">자주 해몽하는 꿈</h2>
          <div className="mt-8 grid gap-4">
            {[
              "물이 넘치는 꿈",
              "뱀이 나오는 꿈",
              "이가 빠지는 꿈",
              "하늘을 나는 꿈",
              "돌아가신 사람이 나오는 꿈",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-white/6 p-5 text-base text-[var(--foreground-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <ServiceHubContent {...serviceHubContent.dream} />
    </main>
  );
}
