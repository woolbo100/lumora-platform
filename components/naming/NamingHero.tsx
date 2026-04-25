import Link from "next/link";

export function NamingHero() {
  return (
    <section className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Name Code</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-[var(--foreground)] sm:text-6xl md:text-7xl">
          이름의 첫소리로,
          <br />
          나의 흐름을 읽어봅니다
        </h1>
        <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
          이름코드는 초성 발음 기준 오행으로 이름의 에너지 흐름을 가볍고 직관적으로 살펴보는 서비스입니다.
          {"\n\n"}좋고 나쁨을 가르는 대신, 내 이름이 어떤 결로 들리고 어떤 기운이 비어 보이는지 감성적으로
          읽어드립니다.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/naming/start"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-semibold text-[#1c1830] shadow-[0_22px_70px_rgba(115,88,232,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(236,228,255,0.78)]"
          >
            무료 이름코드 시작하기
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로
          </Link>
        </div>
      </div>
    </section>
  );
}
