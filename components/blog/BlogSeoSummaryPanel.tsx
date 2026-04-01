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
  return ok ? "양호" : "확인 필요";
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
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">SEO 요약</p>
      <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--foreground-soft)] md:grid-cols-2">
        <p>제목 길이: {titleLength}</p>
        <p>메타 설명 길이: {metaDescriptionLength}</p>
        <p>본문 글자 수: {contentLength}</p>
        <p>H2 개수: {h2Count}</p>
        <p>H3 개수: {h3Count}</p>
        <p>FAQ 개수: {faqCount}</p>
        <p>내부링크 추천 수: {internalLinkCount}</p>
        <p>슬러그: {statusLabel(hasSlug)}</p>
        <p>요약문: {statusLabel(hasExcerpt)}</p>
      </div>
    </section>
  );
}
