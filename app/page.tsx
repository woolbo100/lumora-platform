import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-white/8 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Inner Symbolism Platform
          </p>
          <h1 className="mt-2 font-display text-2xl text-[var(--foreground)]">
            LUMORA
          </h1>
        </div>
        <CTAButton href="/tarot" className="hidden sm:inline-flex">
          타로 시작하기
        </CTAButton>
      </header>

      <section className="flex flex-1 items-center justify-center py-20 lg:py-28">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.18),transparent_62%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-[46%] h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(213,195,165,0.06),transparent_72%)] blur-xl" />

          <div className="relative space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              마음의 흐름과 상징을 읽는 공간
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_28px_rgba(213,195,165,0.08)] sm:text-7xl lg:text-8xl">
                LUMORA
              </h2>
              <p className="text-2xl font-medium text-[var(--color-secondary)] sm:text-3xl">
                마음 코드 해석 플랫폼
              </p>
            </div>
            <p className="mx-auto max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              타로 리딩, 애착유형 코드, 블로그 콘텐츠를 통해 내면의 신호를
              읽어내는 감각적인 플랫폼입니다. 각 서비스는 하나의 흐름 안에서
              자연스럽게 이어지고, LUMORA의 공통 톤 안에서 확장될 수 있도록
              구성했습니다.
            </p>
          </div>

          <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="/tarot">타로 리딩 시작</CTAButton>
            <CTAButton href="/attraction-code" variant="secondary">
              매력코드 보기
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-8 lg:pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              Core Services
            </p>
            <h2 className="font-display text-4xl text-[var(--foreground)]">
              지금 바로 시작할 수 있는 서비스
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
}
