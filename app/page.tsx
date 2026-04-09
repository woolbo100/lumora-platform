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
    <main className="relative z-0 flex min-h-screen w-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-x-[-10%] top-[-12%] h-[42rem] bg-[radial-gradient(ellipse_at_center,rgba(184,132,255,0.18)_0%,rgba(137,96,224,0.12)_34%,rgba(58,30,94,0.05)_58%,transparent_82%)] blur-3xl" />
        <div className="absolute inset-x-[-8%] top-[26%] h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(126,88,214,0.1)_0%,rgba(96,62,175,0.06)_30%,rgba(48,24,85,0.03)_54%,transparent_80%)] blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[-6rem] h-[78rem] -z-20">
        <Image
          src={heroAuroraImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.26] blur-[2px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,32,0.16)_0%,rgba(26,12,40,0.08)_14%,rgba(28,14,44,0.03)_30%,rgba(29,14,46,0.02)_48%,rgba(28,13,43,0.08)_62%,rgba(22,10,35,0.16)_76%,rgba(18,8,28,0.26)_88%,rgba(15,6,23,0.36)_100%)]" />
        <div className="absolute inset-x-[-8%] bottom-[-8rem] h-[28rem] bg-[radial-gradient(ellipse_at_center,rgba(176,126,255,0.18)_0%,rgba(130,86,222,0.12)_30%,rgba(68,32,116,0.05)_56%,transparent_78%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[20rem] bg-[linear-gradient(180deg,rgba(18,8,28,0)_0%,rgba(18,8,28,0.08)_28%,rgba(18,8,28,0.18)_52%,rgba(18,8,28,0.3)_76%,rgba(18,8,28,0.4)_100%)]" />
      </div>

      <section className="relative z-0 flex w-full flex-1 items-center justify-center overflow-visible pb-28 pt-28 lg:pb-36 lg:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-[2%] bottom-[-4rem] -z-10">
          <div className="absolute left-[9%] top-[12%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88),rgba(255,255,255,0.1)_46%,transparent_72%)] opacity-60 blur-[1px] [animation:lumoraSparkle_4.6s_ease-in-out_infinite]" />
          <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(214,226,255,0.82),rgba(214,226,255,0.1)_50%,transparent_76%)] opacity-54 [animation:lumoraSparkle_4s_ease-in-out_infinite_0.8s]" />
          <div className="absolute left-[30%] top-[18%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(210,188,255,0.82),rgba(210,188,255,0.08)_52%,transparent_78%)] opacity-44 [animation:lumoraSparkle_5.2s_ease-in-out_infinite_1.3s]" />
          <div className="absolute right-[11%] top-[16%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88),rgba(255,255,255,0.1)_46%,transparent_74%)] opacity-58 blur-[1px] [animation:lumoraSparkle_5s_ease-in-out_infinite_1.1s]" />
          <div className="absolute right-[18%] top-[34%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(188,220,255,0.84),rgba(188,220,255,0.1)_50%,transparent_76%)] opacity-52 [animation:lumoraSparkle_3.8s_ease-in-out_infinite_0.6s]" />
          <div className="absolute right-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(205,190,255,0.82),rgba(205,190,255,0.08)_50%,transparent_76%)] opacity-42 [animation:lumoraSparkle_4.3s_ease-in-out_infinite_1.7s]" />
          <div className="absolute left-[14%] top-[24%] h-6 w-6 [animation:lumoraTwinkle_4.1s_ease-in-out_infinite]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          </div>
          <div className="absolute right-[29%] bottom-[24%] h-5 w-5 [animation:lumoraTwinkle_4.8s_ease-in-out_infinite_2s]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[rgba(132,196,255,0.68)] shadow-[0_0_8px_rgba(132,196,255,0.3)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[rgba(132,196,255,0.68)] shadow-[0_0_8px_rgba(132,196,255,0.3)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-x-0 top-[46%] -z-0 h-[28rem] -translate-y-1/2 opacity-46">
            <HeroSplineScene scene="https://prod.spline.design/0btuJlO8ODRyNQ1h/scene.splinecode" />
          </div>

          <div className="relative z-10 w-full max-w-4xl space-y-6">
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

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <AdBanner className="pb-8 lg:pb-10" />
      </div>

      <section className="mx-auto w-full max-w-7xl bg-transparent px-6 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
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
