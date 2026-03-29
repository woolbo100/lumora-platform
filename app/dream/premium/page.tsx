import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

export default function DreamPremiumPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Premium Dream</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          꿈이 삶의 흐름과 어떻게 연결되는지 더 깊게 봅니다
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          무료 결과가 핵심 상징과 메시지를 보여준다면, 프리미엄 해석은 반복 패턴, 현재 흐름,
          행동 가이드까지 연결하는 심층 리딩입니다.
        </p>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-8">
          <div className="grid gap-4">
            {[
              "꿈이 말하는 현재 인생 흐름",
              "반복되는 상징과 감정 패턴 분석",
              "관계 / 일 / 재물 흐름 연결 해석",
              "지금 필요한 행동 가이드",
              "무의식이 경고하는 지점 정리",
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

        <GlassPanel className="p-8">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">심층 해석으로 확장</h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">
            현재는 MVP 단계라 프리미엄 결제 연동 대신 전환 구조와 콘텐츠 설계만 먼저
            구현했습니다. 이후 결제, 구독, PDF 리포트 흐름으로 자연스럽게 연결할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dream/start"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              무료 해몽 시작하기
            </Link>
            <Link
              href="/dream"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
            >
              서비스 소개로
            </Link>
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
