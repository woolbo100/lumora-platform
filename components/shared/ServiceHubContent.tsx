import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";

type FAQItem = {
  question: string;
  answer: string;
};

type ServiceHubContentProps = {
  introTitle?: string;
  introText: string[];
  steps: string[];
  example: string[];
  faqs: FAQItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function ServiceHubContent({
  introTitle = "서비스 소개",
  introText,
  steps,
  example,
  faqs,
  ctaLabel,
  ctaHref,
}: ServiceHubContentProps) {
  return (
    <section className="mx-auto mt-20 w-full max-w-4xl px-6 pb-20 sm:px-8 lg:px-0">
      <div className="space-y-16">
        <GlassPanel className="aurora-hover-surface aurora-hover flex p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Overview</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
            {introTitle}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            {introText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="aurora-hover-surface aurora-hover flex p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">How It Works</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">이용 방법</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step}
                className="aurora-hover rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]"
              >
                <span className="mr-2 font-semibold text-[var(--color-secondary)]">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </GlassPanel>

        <GlassPanel className="aurora-hover-surface aurora-hover flex p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Sample Result</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">예시 결과</h2>
          <div className="aurora-hover mt-8 rounded-[24px] border border-white/10 bg-white/6 p-6">
            <div className="space-y-4 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              {example.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="aurora-hover-surface aurora-hover flex p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">FAQ</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
            자주 묻는 질문
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="aurora-hover rounded-[22px] border border-white/10 bg-white/6 p-5 text-base leading-8 text-[var(--foreground-soft)]"
              >
                <p className="font-semibold text-[var(--foreground)]">Q. {faq.question}</p>
                <p className="mt-2">A. {faq.answer}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="aurora-hover-surface aurora-hover p-8 text-center sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Start Now</p>
          <h2 className="mt-4 font-display text-3xl text-[var(--foreground)] sm:text-4xl">
            지금 바로 확인해보세요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            지금의 흐름을 읽고, 필요한 방향을 차분하게 확인할 수 있도록 준비해 두었습니다.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href={ctaHref}>{ctaLabel}</CTAButton>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
