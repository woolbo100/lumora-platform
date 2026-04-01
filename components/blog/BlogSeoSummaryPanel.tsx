"use client";

type BlogSeoSummaryPanelProps = {
  titleLength: number;
  metaDescriptionLength: number;
  contentLength: number;
  h2Count: number;
  h3Count: number;
  faqCount: number;
  internalLinkCount: number;
  hasSlug: boolean;
  hasExcerpt: boolean;
};

function statusLabel(ok: boolean) {
  return ok ? "Good" : "Needs check";
}

export function BlogSeoSummaryPanel({
  titleLength,
  metaDescriptionLength,
  contentLength,
  h2Count,
  h3Count,
  faqCount,
  internalLinkCount,
  hasSlug,
  hasExcerpt,
}: BlogSeoSummaryPanelProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">SEO Summary</p>
      <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--foreground-soft)] md:grid-cols-2">
        <p>Title length: {titleLength}</p>
        <p>Meta description length: {metaDescriptionLength}</p>
        <p>Content length: {contentLength}</p>
        <p>H2 count: {h2Count}</p>
        <p>H3 count: {h3Count}</p>
        <p>FAQ count: {faqCount}</p>
        <p>Internal link suggestions: {internalLinkCount}</p>
        <p>Slug: {statusLabel(hasSlug)}</p>
        <p>Excerpt: {statusLabel(hasExcerpt)}</p>
      </div>
    </section>
  );
}
