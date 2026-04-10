import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

const chakraHighlights = [
  {
    label: "ROOT",
    title: "루트 차크라",
    description:
      "지금의 안정감, 생활 리듬, 몸이 느끼는 현실 감각을 읽습니다.",
  },
  {
    label: "HEART",
    title: "하트 차크라",
    description:
      "관계 안에서 열리고 닫히는 마음의 온도와 공감의 흐름을 살핍니다.",
  },
  {
    label: "THIRD EYE",
    title: "써드아이 차크라",
    description:
      "직감, 여운, 분위기를 읽는 내면의 시선이 얼마나 살아 있는지 비춰봅니다.",
  },
];

const readingBenefits = [
  "주요 차크라 상태",
  "전체 에너지 흐름",
  "메인 오라와 서브 오라",
  "감성적 해석문과 차크라 리딩",
];

export function AuraCodeDetailPage() {
  const recommendedServices = services.filter((service) =>
    ["/emotion", "/attachment-code", "/relationship-pattern", "/tarot"].includes(
      service.href,
    ),
  );

  return (
    <div className="space-y-16 pb-20 lg:space-y-24">
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {/* 오라코드 고유 배경 레이어들을 제거하여 공통 PageBackground 사용 */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl flex-col justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
              Aura Reading
            </p>
            <h1 className="mt-5 font-display text-5xl text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              오라코드
            </h1>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg sm:leading-9">
              <p>
                사람은 감정 상태와 에너지 흐름에 따라
                <br className="hidden sm:block" /> 서로 다른 분위기와 존재감을 드러냅니다.
              </p>
              <p>
                이것을 우리는 흔히 오라라고 느끼며,
                <br className="hidden sm:block" /> 관계와 삶의 흐름에도 미묘한 영향을 받습니다.
              </p>
              <p>
                이 테스트는 7개 차크라와 감정 흐름을 바탕으로
                <br className="hidden sm:block" /> 현재의 에너지 상태와 어울리는 오라 색의 결을 해석해드립니다.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href="/aura-code/test" className="min-w-[14rem]">
                테스트 시작하기
              </CTAButton>
            </div>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassPanel className="border-white/12 bg-[linear-gradient(135deg,rgba(124,110,194,0.14),rgba(255,255,255,0.04)_52%,rgba(13,15,31,0.22))] p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                Overview
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl text-[var(--foreground)] sm:text-5xl">
                오라는 보이지 않는 인상보다
                <br />
                더 섬세한 현재의 리듬입니다
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                이 페이지는 감정 상태와 차크라 흐름을 함께 바라보며, 지금의 당신이 어떤
                분위기와 존재감으로 드러나는지 읽기 위해 설계되었습니다. 결과는 진단보다
                자기이해에 가까운 감성 해석으로 제공됩니다.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {chakraHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_56%,rgba(10,12,24,0.22))] p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_56%,rgba(14,16,34,0.24))] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
                What You Get
              </p>
              <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--foreground-soft)]">
                {readingBenefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-white/6 p-4"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[22px] border border-[var(--color-secondary)]/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(119,105,190,0.1)_52%,rgba(12,14,28,0.2))] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                  Start Now
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  허브에서 전체 흐름을 먼저 읽고, 실제 21문항은 별도 테스트 페이지에서
                  차분하게 이어갈 수 있도록 구성했습니다.
                </p>
                <div className="mt-5">
                  <CTAButton href="/aura-code/test" className="w-full justify-center">
                    테스트 시작하기
                  </CTAButton>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Recommended
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            함께 보면 더 선명해지는 리딩
          </h2>
          <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            오라코드 허브에서 현재의 분위기와 존재감을 읽었다면, 아래 서비스로 감정과
            관계의 흐름을 더 입체적으로 이어서 해석해볼 수 있습니다.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recommendedServices.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
