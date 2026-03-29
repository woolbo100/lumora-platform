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
        className={`flex h-full flex-col transition duration-300 hover:-translate-y-1.5 hover:border-[var(--color-primary)]/35 hover:shadow-[0_30px_90px_rgba(51,40,108,0.42)] ${
          isBlog ? "min-h-[220px] p-7 sm:p-8" : "min-h-[250px] p-6 sm:p-7"
        }`}
      >
        <div className={`flex items-center justify-between gap-4 ${isBlog ? "mb-6" : "mb-7"}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
            {eyebrow}
          </span>
          <span className="rounded-full border border-[var(--color-secondary)]/24 bg-[linear-gradient(135deg,rgba(213,195,165,0.16),rgba(213,195,165,0.05))] px-3 py-1 text-[11px] font-medium text-[var(--color-secondary)] shadow-[0_0_24px_rgba(213,195,165,0.08)]">
            {badge}
          </span>
        </div>

        <div className={isBlog ? "max-w-3xl space-y-4 text-left" : "space-y-4"}>
          <h3
            className={`font-display text-[var(--foreground)] ${
              isBlog ? "text-4xl sm:text-5xl" : "text-3xl"
            }`}
          >
            {title}
          </h3>
          <p className="whitespace-pre-line text-sm leading-7 text-[var(--foreground-soft)]">
            {description}
          </p>
        </div>

        <div className={`mt-auto ${isBlog ? "pt-10" : "pt-8"}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] transition group-hover:translate-x-1">
            서비스 보러가기
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </GlassPanel>
    </Link>
  );
}
