import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";

type ServiceCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
};

export function ServiceCard({
  href,
  eyebrow,
  title,
  description,
  badge,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full w-full"
      aria-label={`${title} 서비스로 이동`}
    >
      <GlassPanel className="flex h-full min-h-[250px] flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--color-primary)]/35 hover:shadow-[0_30px_90px_rgba(51,40,108,0.42)] sm:p-7">
        <div className="mb-7 flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
            {eyebrow}
          </span>
          <span className="rounded-full border border-[var(--color-secondary)]/24 bg-[linear-gradient(135deg,rgba(213,195,165,0.16),rgba(213,195,165,0.05))] px-3 py-1 text-[11px] font-medium text-[var(--color-secondary)] shadow-[0_0_24px_rgba(213,195,165,0.08)]">
            {badge}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-3xl text-[var(--foreground)]">{title}</h3>
          <p className="whitespace-pre-line text-sm leading-7 text-[var(--foreground-soft)]">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] transition group-hover:translate-x-1">
            서비스 보러가기
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </GlassPanel>
    </Link>
  );
}
