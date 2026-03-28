import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Inner Symbolism Platform
          </p>
          <h1 className="mt-2 font-display text-2xl text-white">LUMORA</h1>
        </div>
        <CTAButton href="/tarot" className="hidden sm:inline-flex">
          타로 시작하기
        </CTAButton>
      </header>

      <section className="flex flex-1 items-center justify-center py-20 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              마음의 흐름과 상징을 읽는 공간
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
                LUMORA
              </h2>
              <p className="text-2xl font-medium text-[var(--color-secondary)] sm:text-3xl">
                마음 코드 해석 플랫폼
              </p>
            </div>
            <p className="mx-auto max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
              타로 리딩, 애착유형 코드, 블로그 콘텐츠를 통해 내면의 신호를
              읽어내는 감각적인 플랫폼입니다. 각 서비스는 하나의 흐름 안에서
              자연스럽게 이어지고, LUMORA의 공통 톤 안에서 확장될 수 있도록
              구성했습니다.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="/tarot">타로 리딩 시작</CTAButton>
            <CTAButton href="/attachment-code" variant="secondary">
              애착유형 코드 보기
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-8 lg:pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Core Services
            </p>
            <h2 className="font-display text-4xl text-white">
              지금 바로 시작할 수 있는 서비스
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
}
