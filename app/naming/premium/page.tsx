import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

export default function NamingPremiumPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Premium Report</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          이름의 결을 조금 더 깊게 읽는
          <br />
          심화 리포트
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          무료 이름코드가 가볍고 직관적인 흐름 읽기라면, 심화 리포트는 이름의 인상과 분위기를 더 섬세하게 해석해보는
          확장형 안내입니다. 현재는 소개 단계로 운영 중이며, 추후 유료 리포트 형태로 연결될 수 있도록 준비하고
          있습니다.
        </p>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Included</p>
          <div className="mt-6 grid gap-4">
            {[
              "이름 첫인상과 여운에 대한 확장 해석",
              "오행 분포의 감성적 밸런스 설명",
              "이름 느낌별 예시 리스트 확장 제공",
              "브랜드/활동명 방향 참고 문장",
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
            지금은 무료 이름코드부터
            <br />
            가볍게 시작해보세요
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">
            이름코드는 자기 이해를 위한 무료 참고용 서비스입니다. 심화 버전이 열리기 전까지는 현재 결과 화면을 통해
            이름의 흐름과 보완 방향을 충분히 살펴보실 수 있어요.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/naming/start"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830]"
            >
              무료 결과 보기
            </Link>
            <Link
              href="/naming"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
            >
              이름코드 소개 보기
            </Link>
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
