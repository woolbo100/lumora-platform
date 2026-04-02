import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

type ServiceCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  type?: "service" | "blog";
};

export function ServiceCard({
  href,
  eyebrow,
  title,
  description,
  badge,
  type = "service",
}: ServiceCardProps) {
  const isBlog = type === "blog";

  return (
    <Link href={href} className="group block h-full w-full" aria-label={`${title} 서비스로 이동`}>
      <GlassPanel
        className={`flex h-full flex-col transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_18px_52px_rgba(132,196,255,0.12)] ${
          isBlog ? "min-h-[124px] p-5 sm:min-h-[132px] sm:p-6" : "min-h-[250px] p-6 sm:p-7"
        }`}
      >
        <div className={`flex items-center justify-between gap-4 ${isBlog ? "mb-4" : "mb-7"}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
            {eyebrow}
          </span>
          <span className="rounded-full border border-[rgba(255,255,255,0.24)] bg-[linear-gradient(135deg,rgba(255,210,245,0.2),rgba(186,155,255,0.12)_55%,rgba(132,196,255,0.08))] px-3 py-1 text-[11px] font-medium text-[var(--foreground)] shadow-[0_0_18px_rgba(186,155,255,0.14)]">
            {badge}
          </span>
        </div>

        <div className={isBlog ? "max-w-3xl space-y-2.5 text-left" : "space-y-4"}>
          <h3
            className={`font-display text-[var(--foreground)] ${
              isBlog ? "text-2xl sm:text-3xl" : "text-3xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`whitespace-pre-line text-[var(--foreground-soft)] ${
              isBlog ? "text-sm leading-6" : "text-sm leading-7"
            }`}
          >
            {description}
          </p>
        </div>

        <div className={`mt-auto ${isBlog ? "pt-5" : "pt-8"}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[rgba(255,255,255,0.84)] transition duration-300 group-hover:translate-x-1 group-hover:text-white">
            서비스 보러가기
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </GlassPanel>
    </Link>
  );
}
