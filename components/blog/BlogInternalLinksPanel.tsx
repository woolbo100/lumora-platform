"use client";

import type { BlogAiInternalLinkItem } from "@/types/blog";

type BlogInternalLinksPanelProps = {
  internalLinks: BlogAiInternalLinkItem[];
};

export function BlogInternalLinksPanel({ internalLinks }: BlogInternalLinksPanelProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">
        내부링크 추천
      </p>
      {internalLinks.length === 0 ? (
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
          아직 내부링크 추천이 없습니다. 내부링크 옵션을 켜고 AI 초안을 생성해보세요.
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
