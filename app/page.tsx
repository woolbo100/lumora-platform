import { HeroSplineScene } from "@/components/home/HeroSplineScene";
import { AdBanner } from "@/components/AdBanner";
import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  const serviceItems = services.filter((service) => service.type === "service");
  const blogItem = services.find((service) => service.type === "blog");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <section className="flex flex-1 items-center justify-center py-24 lg:py-32">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          <div className="pointer-events-none absolute left-1/2 top-[48%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(36,24,45,0.66),rgba(21,19,37,0.44)_38%,rgba(11,11,20,0.12)_66%,transparent_78%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-[46%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7e7ce]/24 bg-[radial-gradient(circle,rgba(230,199,194,0.2),rgba(212,175,55,0.11)_46%,transparent_74%)] blur-xl" />

          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[30rem] -translate-y-1/2 opacity-68">
            <HeroSplineScene scene="https://prod.spline.design/0btuJlO8ODRyNQ1h/scene.splinecode" />
          </div>

          <div className="pointer-events-none absolute left-[14%] top-[18%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.16)_45%,transparent_72%)] opacity-80 blur-[1px] [animation:lumoraSparkle_4.2s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute right-[16%] top-[24%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.98),rgba(212,175,55,0.12)_52%,transparent_76%)] opacity-70 [animation:lumoraSparkle_3.4s_ease-in-out_infinite_0.8s]" />
          <div className="pointer-events-none absolute left-[22%] bottom-[24%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(230,199,194,0.86),rgba(230,199,194,0.14)_50%,transparent_74%)] opacity-75 [animation:lumoraSparkle_4.8s_ease-in-out_infinite_1.4s]" />
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
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(212,175,55,0.44)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(212,175,55,0.44)]" />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              AURA · LIGHT · ENERGY
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-5xl leading-[1.14] whitespace-pre-line text-[var(--foreground)] [text-shadow:0_0_34px_rgba(247,231,206,0.14)] sm:text-6xl lg:text-7xl">
                {"보이지 않던 당신의 빛,\n루모라에서 선명해지다"}
              </h2>
              <p className="text-2xl font-medium whitespace-pre-line text-[var(--color-secondary)] sm:text-3xl">
                {"당신의 내면에는 이미\n빛나는 코드가 존재합니다"}
              </p>
            </div>
            <p className="mx-auto max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              루모라는 감정의 결, 분위기의 흐름, 그리고 당신만의 매력을
              더 깊고 섬세하게 비춰주는 공간입니다.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton
              href="/tarot"
              className="bg-[linear-gradient(135deg,#f7e7ce,#d4af37)] text-[#111] shadow-[0_14px_38px_rgba(212,175,55,0.3),0_0_30px_rgba(212,175,55,0.22)] hover:brightness-105 hover:shadow-[0_18px_46px_rgba(212,175,55,0.38),0_0_38px_rgba(212,175,55,0.3)]"
            >
              나의 코드 열기
            </CTAButton>
            <CTAButton href="/emotion" variant="secondary">
              매력 흐름 확인하기
            </CTAButton>
          </div>
        </div>
      </section>

      <AdBanner className="pb-8 lg:pb-10" />

      <section className="pb-20 pt-8 lg:pt-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              SIGNATURE SERVICES
            </p>
            <h2 className="font-display text-4xl text-[var(--foreground)]">
              당신의 에너지와 매력 흐름을 해석하는 시그니처 리추얼
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
