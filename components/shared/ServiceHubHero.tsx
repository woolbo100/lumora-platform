import Link from "next/link";

const HOME_URL = "https://www.lumoracode.kr";

type ServiceHubHeroProps = {
  title: string;
  titleClassName?: string;
  subtitle: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  primaryClassName?: string;
};

export function ServiceHubHero({
  title,
  titleClassName = "",
  subtitle,
  description,
  primaryHref,
  primaryLabel,
  primaryClassName = "",
}: ServiceHubHeroProps) {
  return (
    <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
        <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(213,195,165,0.18),rgba(255,255,255,0.03))] text-5xl text-[var(--color-secondary)] shadow-[0_0_60px_rgba(122,104,217,0.16)]">
          ✦
        </div>

        <h1
          className={`font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_30px_rgba(213,195,165,0.08)] sm:text-7xl md:text-8xl ${titleClassName}`}
        >
          {title}
        </h1>
        <p className="mt-5 text-2xl text-[var(--color-secondary)] sm:text-3xl">
          {subtitle}
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
          {description}
        </p>

        <div className="relative z-20 mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={primaryHref}
            className={`relative z-20 inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-10 py-4 text-lg font-semibold text-[#1c1830] shadow-[0_20px_65px_rgba(115,88,232,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(236,228,255,0.78)] ${primaryClassName}`}
          >
            {primaryLabel}
            <span className="ml-3 text-xl" aria-hidden="true">
              →
            </span>
          </Link>
          <Link
            href={HOME_URL}
            className="relative z-20 inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            LUMORA로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
