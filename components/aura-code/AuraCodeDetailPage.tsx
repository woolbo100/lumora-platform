import { AuraResult } from "@/components/aura-code/AuraResult";
import { AuraTestClient } from "@/components/aura-code/AuraTestClient";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

const chakraHighlights = [
  {
    label: "ROOT",
    title: "루트 차크라",
    description: "지금의 안정감, 생활 리듬, 몸이 느끼는 현실 감각을 읽습니다.",
  },
  {
    label: "HEART",
    title: "하트 차크라",
    description: "관계 안에서 열리고 닫히는 마음의 온도와 공감의 흐름을 살핍니다.",
  },
  {
    label: "THIRD EYE",
    title: "써드아이 차크라",
    description: "직감, 여운, 분위기를 읽는 내면의 시선이 얼마나 살아 있는지 비춰봅니다.",
  },
];

export function AuraCodeDetailPage() {
  const recommendedServices = services.filter((service) =>
    ["/emotion", "/attachment-code", "/relationship-pattern", "/tarot"].includes(
      service.href,
    ),
  );

  return (
    <div className="space-y-16 pb-20 lg:space-y-24">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_20%_22%,rgba(155,128,255,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,188,138,0.12),transparent_24%),radial-gradient(circle_at_72%_72%,rgba(98,196,214,0.12),transparent_24%),linear-gradient(135deg,rgba(16,14,32,0.97),rgba(7,12,28,0.96)_52%,rgba(11,12,24,0.98))] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-[14%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(194,168,255,0.18),transparent_68%)] blur-3xl" />
          <div className="absolute right-[10%] top-[18%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,206,153,0.12),transparent_70%)] blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(113,196,222,0.1),transparent_64%)] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Aura Reading
          </p>
          <h1 className="mt-5 font-display text-5xl text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            오라코드 테스트
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg sm:leading-9">
            <p>
              사람은 감정 상태와 에너지 흐름에 따라
              <br className="hidden sm:block" /> 서로 다른 분위기와 존재감을 드러냅니다.
            </p>
            <p>
              이것을 우리는 흔히 ‘오라’라고 느끼며,
              <br className="hidden sm:block" /> 관계와 삶의 흐름에도 미묘한 영향을 받습니다.
            </p>
            <p>
              이 테스트는 7개 차크라와 감정 흐름을 바탕으로
              <br className="hidden sm:block" /> 현재의 에너지 상태와 어울리는 오라 색의 결을 해석해드립니다.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="#aura-test" className="min-w-[14rem]">
              테스트 시작하기
            </CTAButton>
            <CTAButton
              href="#aura-result"
              variant="secondary"
              className="min-w-[14rem]"
            >
              결과 미리보기
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="space-y-6" id="aura-intro">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Overview
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            오라는 보이지 않는 인상보다
            <br />
            더 섬세한 현재의 리듬입니다
          </h2>
          <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            이 페이지는 감정 상태와 차크라 흐름을 함께 바라보며, 지금의 당신이
            어떤 분위기와 존재감으로 드러나는지 읽기 위해 설계되었습니다. 결과는
            진단보다 자기이해에 가까운 감성 해석으로 제공됩니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassPanel className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Test Focus
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

          <GlassPanel className="p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              What You Get
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--foreground-soft)]">
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                주요 차크라 상태
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                전체 에너지 흐름
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                메인 오라와 서브 오라
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                감성적 해석문과 차크라 리딩
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="space-y-6" id="aura-test">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            21 Questions
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            21문항으로 지금의 에너지 결을 읽어보세요
          </h2>
          <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            각 문항은 루트부터 크라운까지 7개 차크라의 흐름을 따라가며,
            막힘·과활성·균형의 결을 함께 읽습니다. 모바일에서도 부담 없이 한
            문항씩 응답할 수 있도록 차분하게 구성했습니다.
          </p>
        </div>

        <AuraTestClient embedded />
      </section>

      <section className="space-y-6" id="aura-result">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Result Reading
          </p>
          <h2 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            결과는 차갑게 분류하지 않고
            <br />
            한 편의 리딩처럼 정리됩니다
          </h2>
          <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            테스트를 마치면 주요 차크라 상태, 전체 에너지 흐름, 메인 오라와
            서브 오라를 함께 묶어 읽어드립니다. 아직 테스트 전이라면 아래
            섹션은 결과 화면의 톤을 미리 보여주는 프리뷰처럼 작동합니다.
          </p>
        </div>

        <AuraResult />
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
            오라코드 테스트가 현재의 분위기와 존재감을 읽어줬다면, 아래 서비스로
            감정과 관계의 흐름을 더 입체적으로 이어서 살펴볼 수 있습니다.
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
