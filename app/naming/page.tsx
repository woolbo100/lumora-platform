import Link from "next/link";

import { NamingHero } from "@/components/naming/NamingHero";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function NamingPage() {
  return (
    <>
      <NamingHero />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <GlassPanel className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Concept
            </p>
            <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
              이름의 첫소리 안에도
              <br />
              고유한 리듬이 있습니다
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              이름코드는 이름의 초성을 발음기관 기준 오행으로 풀어내어, 내 이름이 어떤 흐름으로 기억되는지
              감성적으로 읽어보는 서비스입니다.
              {"\n\n"}
              정밀한 작명이나 개명 추천이 아니라, 지금의 이름이 전하는 결을 가볍게 이해하고 스스로를 바라보는
              참고용 콘텐츠로 구성했습니다.
            </p>
          </GlassPanel>

          <GlassPanel className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Output
            </p>
            <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
              이름 오행 분석부터
              <br />
              보완 발음까지 한 번에
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "초성 리스트와 오행 분포 요약",
                "이름 에너지 흐름 해석",
                "부족한 기운 최대 2개 안내",
                "보완 발음과 이름 느낌 추천 카드",
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

        <GlassPanel className="p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">How It Works</p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
            이름코드 분석 흐름
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "1. 이름 입력",
              "2. 초성 추출",
              "3. 오행 분포 계산",
              "4. 에너지 흐름 해석",
            ].map((step) => (
              <div
                key={step}
                className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-5 text-base text-[var(--foreground-soft)]"
              >
                {step}
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-8 sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Start</p>
              <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
                나의 이름 코드 알아보기
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                이름은 필수, 생년월일은 선택입니다. 이름의 소리에서 느껴지는 오행 흐름과 부족한 기운을 가볍게
                살펴보고, 나와 잘 맞는 이름 느낌까지 확인해보세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/naming/start"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830]"
              >
                무료 시작
              </Link>
              <Link
                href="/naming/premium"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
              >
                심화 리포트 보기
              </Link>
            </div>
          </div>
        </GlassPanel>

        <ServiceHubContent {...serviceHubContent.naming} />
      </main>
    </>
  );
}
