"use client";

import type { BlogAiInternalLinkItem } from "@/types/blog";

type BlogInternalLinksPanelProps = {
  internalLinks: BlogAiInternalLinkItem[];
};

export function BlogInternalLinksPanel({ internalLinks }: BlogInternalLinksPanelProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">
        Internal Link Suggestions
      </p>
      {internalLinks.length === 0 ? (
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
          No internal link suggestions yet. Generate a draft with internal links enabled.
        </p>
      ) : (
        <div className="mt-3 space-y-3 text-sm leading-7 text-[var(--foreground-soft)]">
          {internalLinks.map((item) => (
            <div key={`${item.anchorText}-${item.targetPath}`}>
              <p className="text-[var(--foreground)]">
                {item.anchorText} → {item.targetPath}
              </p>
              <p>{item.reason}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
