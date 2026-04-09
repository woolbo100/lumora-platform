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
    <main className="relative z-0 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#090814_0%,#0f1020_24%,#14142b_56%,#101126_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(144,126,255,0.18)_0%,rgba(99,89,188,0.12)_18%,rgba(35,34,72,0.08)_38%,transparent_68%),radial-gradient(circle_at_52%_32%,rgba(124,160,255,0.1)_0%,rgba(69,86,170,0.07)_22%,transparent_54%),radial-gradient(circle_at_24%_18%,rgba(193,145,255,0.08)_0%,transparent_34%),radial-gradient(circle_at_78%_24%,rgba(132,196,255,0.08)_0%,transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(86,68,162,0.08)_0%,transparent_28%,rgba(103,129,213,0.06)_48%,transparent_68%,rgba(118,86,176,0.08)_100%)]" />
        <div className="absolute inset-x-[-10%] top-[-8%] h-[42rem] bg-[radial-gradient(ellipse_at_center,rgba(142,126,255,0.16)_0%,rgba(102,117,212,0.1)_34%,rgba(32,34,68,0.05)_56%,transparent_78%)] blur-3xl" />
        <div className="absolute inset-x-[-4%] top-[26%] h-[34rem] bg-[radial-gradient(ellipse_at_center,rgba(104,94,188,0.14)_0%,rgba(73,82,154,0.1)_26%,rgba(30,31,58,0.04)_52%,transparent_76%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(8,8,18,0.08)_42%,rgba(7,7,16,0.22)_66%,rgba(4,4,10,0.46)_86%,rgba(2,2,7,0.76)_100%)]" />
      </div>

      <section className="relative left-1/2 right-1/2 z-0 flex w-screen flex-1 items-center justify-center overflow-visible -translate-x-1/2 pb-28 pt-28 lg:pb-36 lg:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-[-6rem] bottom-[-8rem] -z-20">
          <Image
            src={heroAuroraImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.14] blur-[3px]"
          />
        </div>
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

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-x-0 top-[46%] -z-0 h-[28rem] -translate-y-1/2 opacity-46">
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

      <section className="pb-20 pt-10 lg:pt-14">
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
