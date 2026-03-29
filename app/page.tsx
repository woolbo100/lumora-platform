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

      <section className="relative flex flex-1 items-center py-16 lg:py-24">
        <div className="pointer-events-none absolute left-[-8%] top-[8%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.26),transparent_64%)] blur-3xl [animation:lumoraFloat_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute right-[-5%] top-[15%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.18),transparent_68%)] blur-3xl [animation:lumoraFloat_16s_ease-in-out_infinite_reverse]" />
        <div className="pointer-events-none absolute bottom-[8%] left-[22%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.14),transparent_68%)] blur-3xl [animation:lumoraPulse_11s_ease-in-out_infinite]" />

        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-8">
          <div className="relative max-w-2xl">
            <div className="pointer-events-none absolute -left-8 top-6 h-20 w-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-md [animation:lumoraFloat_10s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute right-[8%] top-[14%] h-3 w-3 rounded-full bg-[var(--color-secondary)] shadow-[0_0_20px_rgba(213,195,165,0.7)]" />
            <div className="pointer-events-none absolute left-[12%] top-[44%] h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(120,162,255,0.9)]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_42%,rgba(8,10,24,0.34))] p-8 shadow-[0_24px_80px_rgba(6,8,24,0.45)] backdrop-blur-2xl sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(122,104,217,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%)]" />
              <div className="relative space-y-7">
                <p className="text-sm uppercase tracking-[0.34em] text-[var(--foreground-muted)]">
                  Dreamlike Insight Experience
                </p>

                <div className="space-y-5">
                  <h2 className="font-display text-5xl leading-[0.95] text-[var(--foreground)] [text-shadow:0_0_28px_rgba(213,195,165,0.12)] sm:text-6xl lg:text-7xl">
                    당신의 감정과
                    <br />
                    무의식을 비추는
                    <br />
                    판타지 시그널
                  </h2>
                  <p className="max-w-xl text-lg leading-8 text-[var(--foreground-soft)] sm:text-xl">
                    타로와 감정 코드, 관계 해석이 하나의 꿈결 같은 여정으로 이어지도록
                    디자인했습니다. 첫 장면에서부터 빛과 오브가 흐르며, LUMORA의
                    신비로운 분위기를 더 깊게 느낄 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                  <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">
                    Tarot Reading
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">
                    Emotion Code
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">
                    Relationship Insight
                  </span>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <CTAButton href="/tarot">타로 리딩 시작</CTAButton>
                  <CTAButton href="/emotion" variant="secondary">
                    감정 코드 보기
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-x-[10%] top-6 h-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.36),transparent_72%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-[16%] bottom-0 h-20 rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.34),transparent_70%)] blur-3xl" />
            <div className="relative isolate overflow-hidden rounded-[2.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04)_38%,rgba(10,12,24,0.58))] shadow-[0_30px_110px_rgba(10,12,32,0.52)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_22%),radial-gradient(circle_at_bottom,rgba(122,104,217,0.2),transparent_34%)]" />
              <div className="pointer-events-none absolute left-6 top-6 z-20 flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)]/85" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/85" />
              </div>
              <div className="relative min-h-[430px] sm:min-h-[520px]">
                <HeroSplineScene scene="https://prod.spline.design/0btuJlO8ODRyNQ1h/scene.splinecode" />
              </div>
              <div className="pointer-events-none absolute inset-x-8 bottom-6 z-20 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,10,24,0.72),rgba(22,22,46,0.34))] px-5 py-4 backdrop-blur-xl">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[var(--foreground-muted)]">
                  Fantasy Aura
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                  빛의 층과 유리 패널, Spline 오브제가 겹쳐지며 첫 화면부터 몽환적인
                  에너지를 전달합니다.
                </p>
              </div>
            </div>
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
              당신의 내면을 읽고 연결하는 서비스
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
