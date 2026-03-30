import Link from "next/link";

export function NamingHero() {
  return (
    <section className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
          Energy Naming
        </p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--foreground)] sm:text-6xl md:text-7xl">
          당신의 이름,
          <br />
          그냥 지은 이름인가요?
        </h1>
        <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
          이름은 ‘소리’가 아니라
          {"\n"}당신의 인생 흐름을 결정하는 에너지 코드입니다.
          {"\n\n"}선천코드 분석을 기반으로
          {"\n"}당신의 부족한 기운을 채우고
          {"\n"}운의 흐름을 바꾸는 이름을 설계합니다.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/naming/start"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_22px_70px_rgba(89,72,173,0.32)] transition duration-300 hover:-translate-y-1"
          >
            무료 이름 생성 시작하기
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로 돌아가기
          </Link>
          <Link
            href="/naming/premium"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            프리미엄 리포트 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
