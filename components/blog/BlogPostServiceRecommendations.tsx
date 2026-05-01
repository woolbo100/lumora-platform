import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { getBlogServiceRecommendations } from "@/lib/blog-service-recommendations";
import type { BlogPost } from "@/types/blog";

type BlogPostServiceRecommendationsProps = {
  post: BlogPost;
};

export function BlogPostServiceRecommendations({
  post,
}: BlogPostServiceRecommendationsProps) {
  const recommendation = getBlogServiceRecommendations(post);
  const primaryHref = recommendation.items[0]?.href ?? "/services";

  return (
    <section className="pt-3">
      <GlassPanel className="border-[rgba(182,150,221,0.28)] bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,231,244,0.08)_45%,rgba(139,187,255,0.06)_100%)]">
        <div className="flex flex-col gap-8 p-7 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
          <div className="max-w-2xl space-y-5">
            <div className="space-y-1.5">
              {recommendation.heading.map((line) => (
                <h2
                  key={line}
                  className="font-display text-2xl leading-tight text-[var(--foreground)] sm:text-[2rem]"
                >
                  {line}
                </h2>
              ))}
            </div>

            {recommendation.body ? (
              <div className="space-y-1">
                {recommendation.body.map((line) => (
                  <p
                    key={line}
                    className="text-base leading-7 text-[var(--foreground-soft)] sm:text-[17px]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : null}

            <ul className="space-y-3">
              {recommendation.items.map((item) => (
                <li key={`${post.slug}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-base text-[var(--foreground-soft)] transition hover:text-white"
                  >
                    <span className="text-lg text-[#f2d3ff] transition group-hover:scale-110">
                      ✨
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pb-1">
            <Link
              href={primaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(239,214,255,0.12)_52%,rgba(160,194,255,0.1))] px-5 py-3 text-sm font-medium text-[var(--foreground)] shadow-[0_12px_30px_rgba(33,16,68,0.18)] transition hover:-translate-y-0.5 hover:border-white/28 hover:text-white"
            >
              {recommendation.ctaLabel}
            </Link>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
