import { HeroSplineScene } from "@/components/home/HeroSplineScene";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  const serviceItems = services.filter((service) => service.type === "service");
  const blogItem = services.find((service) => service.type === "blog");
  const introductionParagraphs = [
    "LUMORA는 감정과 관계, 그리고 내면의 흐름을 이해하기 위한 심리 기반 해석 플랫폼입니다.",
    "타로 리딩, 애착유형 분석, 연애패턴 코드, 재회 가능성 테스트 등 다양한 도구를 통해 자신의 감정과 관계를 더 깊이 바라볼 수 있도록 돕고 있습니다.",
    "LUMORA의 콘텐츠는 심리적 통찰과 감성적 해석을 바탕으로 구성되며, 단순한 결과 제공이 아닌 자기 이해를 돕는 것을 목표로 합니다.",
  ];
  const introductionPoints = [
    "반복되는 감정의 흐름과 선택의 패턴을 읽습니다.",
    "관계 안에서 나를 더 분명하게 이해할 수 있도록 돕습니다.",
    "개인이 직접 기획하고 운영하며, 콘텐츠와 경험을 계속 개선합니다.",
  ];

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
              타로 리딩, 애착유형 분석, 연애패턴 코드, 재회 가능성 테스트 등 다양한
              심리 기반 도구를 통해 감정과 관계의 흐름을 더 깊이 바라보도록 돕는
              해석 플랫폼입니다.
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

      <section className="pb-8">
        <GlassPanel className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
                About LUMORA
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
                단순한 결과가 아니라, 나를 더 깊이 이해하도록 돕는 해석의 공간
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {introductionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                  우리는 누구나 반복되는 감정의 흐름과 선택의 패턴을 가지고 있으며,
                  이를 이해하는 과정이 더 나은 관계와 삶으로 이어진다고 믿습니다.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {introductionPoints.map((point, index) => (
                <div
                  key={point}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-5 shadow-[0_18px_50px_rgba(7,10,28,0.2)]"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-secondary)]">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="pb-20 pt-8 lg:pt-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              SIGNATURE SERVICES
            </p>
            <h2 className="font-display text-4xl text-[var(--foreground)]">
              감정과 관계의 흐름을 해석하는 시그니처 도구
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
