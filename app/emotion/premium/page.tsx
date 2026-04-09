import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

export default function EmotionPremiumPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Premium Emotion</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          반복 감정 패턴과 인생 흐름까지 확장합니다
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          무료 결과가 지금의 감정 상태를 읽는다면, 프리미엄은 반복 감정 구조와 삶의 흐름 연결까지
          보는 심층 분석입니다.
        </p>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-8">
          <div className="grid gap-4">
            {[
              "반복되는 감정 구조 해석",
              "감정이 생기는 패턴 분석",
              "에너지 흐름과 인생 단계 연결",
              "상황별 행동 가이드",
              "맞춤 확언 확장 리포트",
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
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">심층 감정 분석으로 이어가기</h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">
            현재 MVP에서는 프리미엄 결제 연동 대신 구조와 콘텐츠 방향만 먼저 구현했습니다. 이후
            결제, 구독, 리포트 저장 흐름으로 쉽게 확장할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/emotion/start"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              감정 리딩 시작하기
            </Link>
            <Link
              href="/emotion"
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
