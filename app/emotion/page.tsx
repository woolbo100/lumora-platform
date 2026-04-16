import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function EmotionPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-32 pb-12 sm:px-8 lg:px-12">
      <section className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-start px-6 pt-12 pb-24 text-center sm:px-8">
          <div className="mb-6 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(255,236,236,0.16),rgba(255,255,255,0.03))] text-5xl text-[var(--color-secondary)] shadow-[0_0_60px_rgba(142,116,255,0.16)]">
            ✦
          </div>
          <p className="font-display text-6xl text-[var(--foreground)] sm:text-7xl md:text-8xl">
            감정코드리딩
          </p>
          <h1 className="mt-8 font-display text-3xl leading-tight text-[var(--color-secondary)] sm:text-4xl md:text-5xl">
            <span className="block sm:whitespace-nowrap">오늘의 감정, 그냥 지나치고 있나요?</span>
          </h1>
          <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
            당신의 감정은
            {"\n"}지금의 상태를 알려주는 신호이자
            {"\n"}앞으로의 방향을 알려주는 메시지입니다.
            {"\n\n"}지금 느끼는 감정을 입력하면
            {"\n"}그 의미와 흐름을 해석하고
            {"\n"}당신에게 필요한 확언을 제안합니다.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/emotion/start"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_20px_60px_rgba(115,88,232,0.28)]"
            >
              지금 감정 입력하기
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              LUMORA 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel className="aurora-hover-surface aurora-hover p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Meaning</p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">
            감정은 지금의 에너지 흐름을 보여줍니다
          </h2>
          <p className="mt-6 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            같은 불안이라도
            {"\n"}누군가에게는 기회의 신호이고
            {"\n"}누군가에게는 휴식이 필요한 신호일 수 있습니다.
            {"\n\n"}이 서비스는
            {"\n"}당신의 감정과 상태를 기반으로
            {"\n"}현재의 에너지 흐름을 읽어드립니다.
          </p>
        </GlassPanel>

        <GlassPanel className="aurora-hover-surface aurora-hover p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Example</p>
          <h2 className="mt-4 font-display text-4xl text-[var(--foreground)]">리딩 예시</h2>
          <div className="mt-8 grid gap-4">
            <div className="aurora-hover rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]">
              입력: “요즘 이유 없이 불안하고 마음이 흔들려요”
            </div>
            <div className="aurora-hover rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]">
              결과: 지금은 새로운 변화 직전에 나타나는 불안정한 에너지 상태입니다.
            </div>
            <div className="aurora-hover rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]">
              확언: 나는 지금의 흐름을 신뢰한다 / 나는 안정되어 있다 / 나는 필요한 방향으로 나아간다
            </div>
          </div>
        </GlassPanel>
      </div>

      <ServiceHubContent {...serviceHubContent.emotion} />
    </main>
  );
}
