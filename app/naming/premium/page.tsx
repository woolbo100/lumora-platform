import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

export default function NamingPremiumPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Premium Report</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          이름이 바꾸는 인생 방향까지 읽는 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          무료 결과가 방향 제안이라면, 프리미엄 리포트는 이름별 인생 흐름 변화와 목적별
          확장 가능성까지 연결하는 심층 리딩입니다.
        </p>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Included</p>
          <div className="mt-6 grid gap-4">
            {[
              "이름이 바꾸는 인생 방향",
              "재물 흐름 변화 분석",
              "연애 / 관계 이미지 변화",
              "브랜드 인상 분석",
              "추천 이름별 상세 해석",
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
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Next Step</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
            무료 추천에서 심층 설계로 확장
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">
            현재 MVP에서는 유료 결제 연동까지 넣지 않고, 프리미엄 전환 페이지와 구조만 먼저
            정리해 두었습니다. 이후 결제, CRM, PDF 리포트로 자연스럽게 확장할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/naming/start"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              무료 결과 먼저 보기
            </Link>
            <Link
              href="/naming"
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
