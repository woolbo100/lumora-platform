import { HeroSplineScene } from "@/components/home/HeroSplineScene";
import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  const serviceItems = services.filter((service) => service.type === "service");
  const blogItem = services.find((service) => service.type === "blog");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-white/8 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Inner Symbolism Platform
          </p>
          <h1 className="mt-2 font-display text-2xl text-[var(--foreground)]">LUMORA</h1>
        </div>
        <CTAButton href="/tarot" className="hidden sm:inline-flex">
          타로 시작하기
        </CTAButton>
      </header>

      <section className="flex flex-1 items-center justify-center py-20 lg:py-28">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.18),transparent_62%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-[46%] h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(213,195,165,0.06),transparent_72%)] blur-xl" />

          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[30rem] -translate-y-1/2 opacity-70">
            <HeroSplineScene scene="https://prod.spline.design/0btuJlO8ODRyNQ1h/scene.splinecode" />
          </div>

          <div className="pointer-events-none absolute left-[14%] top-[18%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.16)_45%,transparent_72%)] opacity-80 blur-[1px] [animation:lumoraSparkle_4.2s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute right-[16%] top-[24%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,1),rgba(213,195,165,0.12)_52%,transparent_76%)] opacity-70 [animation:lumoraSparkle_3.4s_ease-in-out_infinite_0.8s]" />
          <div className="pointer-events-none absolute left-[22%] bottom-[24%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.95),rgba(120,162,255,0.12)_50%,transparent_74%)] opacity-75 [animation:lumoraSparkle_4.8s_ease-in-out_infinite_1.4s]" />
          <div className="pointer-events-none absolute right-[22%] bottom-[18%] h-6 w-6 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.12)_42%,transparent_72%)] opacity-75 blur-[1px] [animation:lumoraSparkle_5.2s_ease-in-out_infinite_2.1s]" />
          <div className="pointer-events-none absolute left-[20%] top-[26%] h-6 w-6 [animation:lumoraTwinkle_3.8s_ease-in-out_infinite]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.55)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.55)]" />
          </div>
          <div className="pointer-events-none absolute right-[20%] top-[38%] h-4 w-4 [animation:lumoraTwinkle_4.5s_ease-in-out_infinite_1s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[var(--color-secondary)]/80 shadow-[0_0_10px_rgba(213,195,165,0.5)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[var(--color-secondary)]/80 shadow-[0_0_10px_rgba(213,195,165,0.5)]" />
          </div>
          <div className="pointer-events-none absolute left-[26%] bottom-[20%] h-3 w-3 [animation:lumoraTwinkle_4.1s_ease-in-out_infinite_1.6s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(120,162,255,0.48)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(120,162,255,0.48)]" />
          </div>

          <div className="relative z-10 space-y-6">
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
              타로 리딩, 감정코드, 꿈해몽, 관계 분석까지 내면의 신호를 읽어내는 감각적인
              플랫폼입니다. 각 서비스는 하나의 흐름 안에서 자연스럽게 이어지고 LUMORA의 공통 결
              안에서 확장될 수 있도록 구성했습니다.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="/tarot">타로 리딩 시작</CTAButton>
            <CTAButton href="/emotion" variant="secondary">
              감정코드 보기
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8 lg:pt-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              SIGNATURE SERVICES
            </p>
            <h2 className="font-display text-4xl text-[var(--foreground)]">
              운의 흐름을 읽고 설계하는 서비스
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>

        {blogItem ? (
          <div className="mt-8">
            <ServiceCard {...blogItem} />
          </div>
        ) : null}
      </section>
    </main>
  );
}
