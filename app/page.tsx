import Image from "next/image";
import { HeroSplineScene } from "@/components/home/HeroSplineScene";
import { AdBanner } from "@/components/AdBanner";
import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

const heroAuroraImage =
  "/images/main/buzasun_aura_energy_background_glowing_light_waves_purple_pin_32813a50-5dc5-4f7a-ae75-17b23889eccd_3.png";

export default function Home() {
  const serviceItems = services.filter((service) => service.type === "service");
  const blogItem = services.find((service) => service.type === "blog");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <section className="relative left-1/2 right-1/2 z-0 isolate flex w-screen flex-1 items-center justify-center overflow-visible -translate-x-1/2 pb-36 pt-24 lg:pb-44 lg:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-[-5rem] bottom-[-16rem] -z-20">
          <Image
            src={heroAuroraImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.17] blur-[2px]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-[-2rem] bottom-[-16rem] -z-20 bg-[linear-gradient(180deg,rgba(13,11,31,0.76)_0%,rgba(18,15,40,0.47)_20%,rgba(21,17,45,0.32)_42%,rgba(17,15,40,0.18)_62%,rgba(15,13,34,0.09)_76%,rgba(15,13,34,0.025)_86%,rgba(15,13,34,0)_100%)]" />
        <div className="pointer-events-none absolute inset-x-[-6%] bottom-[-13rem] -z-20 h-[22rem] bg-[radial-gradient(ellipse_at_center,rgba(118,106,214,0.16)_0%,rgba(95,122,196,0.12)_24%,rgba(58,66,118,0.08)_44%,rgba(15,13,34,0)_72%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-18rem] -z-20 h-[22rem] bg-[linear-gradient(180deg,rgba(15,13,34,0)_0%,rgba(15,13,34,0.08)_18%,rgba(15,13,34,0.2)_40%,rgba(15,13,34,0.42)_68%,rgba(15,13,34,0.72)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[-12rem] -z-10">
          <div className="absolute left-[8%] top-[12%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.14)_45%,transparent_72%)] opacity-72 blur-[1px] [animation:lumoraSparkle_4.2s_ease-in-out_infinite]" />
          <div className="absolute left-[11%] top-[26%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(214,235,255,0.95),rgba(214,235,255,0.12)_48%,transparent_76%)] opacity-64 [animation:lumoraSparkle_3.6s_ease-in-out_infinite_0.4s]" />
          <div className="absolute left-[18%] top-[34%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,210,245,0.92),rgba(255,210,245,0.12)_52%,transparent_76%)] opacity-68 [animation:lumoraSparkle_3.8s_ease-in-out_infinite_0.7s]" />
          <div className="absolute left-[24%] top-[14%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,236,210,0.92),rgba(255,236,210,0.12)_50%,transparent_76%)] opacity-56 blur-[1px] [animation:lumoraSparkle_5.4s_ease-in-out_infinite_1.3s]" />
          <div className="absolute left-[12%] bottom-[18%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(132,196,255,0.9),rgba(132,196,255,0.14)_50%,transparent_74%)] opacity-64 [animation:lumoraSparkle_4.8s_ease-in-out_infinite_1.4s]" />
          <div className="absolute left-[34%] bottom-[28%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,210,245,0.96),rgba(255,210,245,0.14)_52%,transparent_78%)] opacity-62 [animation:lumoraSparkle_3.2s_ease-in-out_infinite_1.8s]" />
          <div className="absolute right-[10%] top-[16%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(255,255,255,0.12)_45%,transparent_74%)] opacity-70 blur-[1px] [animation:lumoraSparkle_5.1s_ease-in-out_infinite_1.2s]" />
          <div className="absolute right-[8%] top-[30%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(188,228,255,0.95),rgba(188,228,255,0.12)_50%,transparent_76%)] opacity-62 [animation:lumoraSparkle_4s_ease-in-out_infinite_0.9s]" />
          <div className="absolute right-[18%] top-[38%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,210,245,0.95),rgba(255,210,245,0.12)_52%,transparent_76%)] opacity-62 [animation:lumoraSparkle_3.4s_ease-in-out_infinite_0.8s]" />
          <div className="absolute right-[26%] top-[20%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.94),rgba(255,255,255,0.12)_48%,transparent_76%)] opacity-58 blur-[1px] [animation:lumoraSparkle_4.9s_ease-in-out_infinite_1.7s]" />
          <div className="absolute right-[14%] bottom-[14%] h-6 w-6 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.12)_42%,transparent_72%)] opacity-72 blur-[1px] [animation:lumoraSparkle_5.2s_ease-in-out_infinite_2.1s]" />
          <div className="absolute right-[20%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(132,196,255,0.94),rgba(132,196,255,0.14)_50%,transparent_76%)] opacity-60 [animation:lumoraSparkle_3.7s_ease-in-out_infinite_1.1s]" />
          <div className="absolute left-[42%] top-[10%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,210,245,0.92),rgba(255,210,245,0.1)_50%,transparent_76%)] opacity-52 [animation:lumoraSparkle_4.4s_ease-in-out_infinite_2.4s]" />
          <div className="absolute left-[48%] bottom-[16%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(255,255,255,0.14)_48%,transparent_78%)] opacity-56 [animation:lumoraSparkle_3.3s_ease-in-out_infinite_0.6s]" />
          <div className="absolute left-[16%] top-[22%] h-6 w-6 [animation:lumoraTwinkle_3.8s_ease-in-out_infinite]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.55)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.55)]" />
          </div>
          <div className="absolute right-[22%] top-[30%] h-4 w-4 [animation:lumoraTwinkle_4.5s_ease-in-out_infinite_1s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[var(--color-secondary)]/80 shadow-[0_0_10px_rgba(213,195,165,0.5)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[var(--color-secondary)]/80 shadow-[0_0_10px_rgba(213,195,165,0.5)]" />
          </div>
          <div className="absolute left-[28%] bottom-[18%] h-3 w-3 [animation:lumoraTwinkle_4.1s_ease-in-out_infinite_1.6s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(212,175,55,0.44)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[var(--color-accent)]/75 shadow-[0_0_10px_rgba(212,175,55,0.44)]" />
          </div>
          <div className="absolute right-[30%] bottom-[24%] h-5 w-5 [animation:lumoraTwinkle_4.9s_ease-in-out_infinite_2.2s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[rgba(132,196,255,0.82)] shadow-[0_0_10px_rgba(132,196,255,0.42)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[rgba(132,196,255,0.82)] shadow-[0_0_10px_rgba(132,196,255,0.42)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[30rem] -translate-y-1/2 opacity-60">
            <HeroSplineScene scene="https://prod.spline.design/0btuJlO8ODRyNQ1h/scene.splinecode" />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--foreground-muted)]">
              AURA · LIGHT · ENERGY
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-5xl leading-[1.14] whitespace-pre-line text-[var(--foreground)] [text-shadow:0_0_30px_rgba(255,210,245,0.2)] sm:text-6xl lg:text-7xl">
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
              className="bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_22px_rgba(214,194,255,0.12)] hover:brightness-102 hover:shadow-[0_14px_36px_rgba(115,88,232,0.32),0_0_28px_rgba(186,155,255,0.16)]"
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
            <h2 className="font-display text-4xl text-white [text-shadow:0_0_18px_rgba(255,210,245,0.12)]">
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
