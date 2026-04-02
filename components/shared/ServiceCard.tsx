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
        className={`flex h-full flex-col transition duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/38 hover:shadow-[0_24px_72px_rgba(212,175,55,0.16)] ${
          isBlog ? "min-h-[124px] p-5 sm:min-h-[132px] sm:p-6" : "min-h-[250px] p-6 sm:p-7"
        }`}
      >
        <div className={`flex items-center justify-between gap-4 ${isBlog ? "mb-4" : "mb-7"}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
            {eyebrow}
          </span>
          <span className="rounded-full border border-[var(--color-secondary)]/28 bg-[linear-gradient(135deg,rgba(247,231,206,0.22),rgba(212,175,55,0.06))] px-3 py-1 text-[11px] font-medium text-[var(--color-secondary)] shadow-[0_0_20px_rgba(212,175,55,0.12)]">
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] transition duration-300 group-hover:translate-x-1 group-hover:text-[#f7e7ce]">
            서비스 보러가기
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </GlassPanel>
    </Link>
  );
}
