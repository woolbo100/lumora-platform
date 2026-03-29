import Link from "next/link";

import { NamingHero } from "@/components/naming/NamingHero";
import { GlassPanel } from "@/components/shared/GlassPanel";

export default function NamingPage() {
  return (
    <>
      <NamingHero />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassPanel className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Concept
            </p>
            <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
              이름은 단순한 단어가 아닙니다.
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              당신이 타고난 선천코드(사주)는
              {"\n"}이미 에너지의 흐름을 가지고 있습니다.
              {"\n\n"}어떤 사람은 돈의 흐름이 강하고
              {"\n"}어떤 사람은 관계의 흐름이 강합니다.
              {"\n\n"}하지만 대부분은
              {"\n"}어딘가 부족한 기운을 가지고 태어납니다.
              {"\n\n"}이 서비스는
              {"\n"}그 부족한 에너지를 이름으로 보완합니다.
            </p>
          </GlassPanel>

          <GlassPanel className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Energy Naming
            </p>
            <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
              이름은 에너지를 담는 그릇입니다.
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              같은 사람이라도
              {"\n"}어떤 이름을 쓰느냐에 따라
              {"\n\n"}- 이미지
              {"\n"}- 관계
              {"\n"}- 기회
              {"\n\n"}가 달라집니다.
            </p>
            <div className="mt-8 rounded-[24px] border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 p-5 text-base leading-8 text-[var(--foreground-soft)]">
              추천 이름 예시: <strong className="text-[var(--foreground)]">서하린</strong>
              <br />
              부족한 금(金) 기운을 보완하여 재물 흐름과 결단력을 강화하는 구조입니다.
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
            System
          </p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
            선천코드 이름설계 시스템
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              "1. 사주 분석",
              "2. 오행 균형 분석",
              "3. 부족한 에너지 추출",
              "4. 목적 설정",
              "5. 이름 설계",
            ].map((step) => (
              <div
                key={step}
                className="rounded-[22px] border border-white/10 bg-white/6 p-5 text-base text-[var(--foreground-soft)]"
              >
                {step}
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
            Purpose
          </p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
            목적에 맞는 이름 방향을 선택하세요
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "돈 / 사업 / 수익 흐름",
              "연애 / 매력 / 인간관계",
              "브랜드 / SNS / 영향력",
              "힐링 / 자기성장 / 안정",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-5 text-base text-[var(--foreground-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-8 sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
                Premium
              </p>
              <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
                프리미엄 리포트에는 더 깊은 분석이 포함됩니다
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                이름이 바꾸는 인생 방향, 재물 흐름 변화 분석, 연애 / 관계 이미지 변화, 브랜드
                인상 분석, 추천 이름별 상세 해석까지 확장 가능한 구조로 설계했습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/naming/start"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-6 py-3 text-sm font-semibold text-[#1c1830]"
              >
                무료 시작
              </Link>
              <Link
                href="/naming/premium"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
              >
                프리미엄 보기
              </Link>
            </div>
          </div>
        </GlassPanel>
      </main>
    </>
  );
}
