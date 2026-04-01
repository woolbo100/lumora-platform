"use client";

import { blogCategories } from "@/data/blogCategories";
import {
  type BlogAiArticleType,
  type BlogAiLength,
  type BlogAiTone,
  type BlogCategory,
} from "@/types/blog";

type BlogAiAssistantPanelProps = {
  topicKeyword: string;
  topicSuggestions: string[];
  isGeneratingTopics: boolean;
  topicError: string;
  keyword: string;
  secondaryKeyword: string;
  category: BlogCategory;
  postType: BlogAiArticleType;
  tone: BlogAiTone;
  length: BlogAiLength;
  includeFaq: boolean;
  includeCTA: boolean;
  includeInternalLinks: boolean;
  isGenerating: boolean;
  generationError: string;
  generationSuccess: string;
  onKeywordChange: (value: string) => void;
  onSecondaryKeywordChange: (value: string) => void;
  onCategoryChange: (value: BlogCategory) => void;
  onPostTypeChange: (value: BlogAiArticleType) => void;
  onToneChange: (value: BlogAiTone) => void;
  onLengthChange: (value: BlogAiLength) => void;
  onIncludeFaqChange: (value: boolean) => void;
  onIncludeCTAChange: (value: boolean) => void;
  onIncludeInternalLinksChange: (value: boolean) => void;
  onGenerate: () => void;
  onTopicKeywordChange: (value: string) => void;
  onGenerateTopics: () => void;
  onSelectTopic: (topic: string) => void;
  onReset: () => void;
};

const postTypeOptions: { value: BlogAiArticleType; label: string }[] = [
  { value: "adsense-info", label: "에드센스 승인용 정보글" },
  { value: "seo-info", label: "SEO 유입형 정보글" },
  { value: "service-bridge", label: "서비스 연결형 글" },
  { value: "compare-guide", label: "비교/가이드형 글" },
];

const toneOptions: { value: BlogAiTone; label: string }[] = [
  { value: "formal", label: "문어체" },
  { value: "gentle", label: "부드러운 설명형" },
  { value: "brand-emotional", label: "대표님 감성형" },
];

const lengthOptions: { value: BlogAiLength; label: string }[] = [
  { value: "1200", label: "1200자 내외" },
  { value: "1500", label: "1500자 내외" },
  { value: "1800", label: "1800자 내외" },
];

export function BlogAiAssistantPanel({
  topicKeyword,
  topicSuggestions,
  isGeneratingTopics,
  topicError,
  keyword,
  secondaryKeyword,
  category,
  postType,
  tone,
  length,
  includeFaq,
  includeCTA,
  includeInternalLinks,
  isGenerating,
  generationError,
  generationSuccess,
  onKeywordChange,
  onSecondaryKeywordChange,
  onCategoryChange,
  onPostTypeChange,
  onToneChange,
  onLengthChange,
  onIncludeFaqChange,
  onIncludeCTAChange,
  onIncludeInternalLinksChange,
  onGenerate,
  onTopicKeywordChange,
  onGenerateTopics,
  onSelectTopic,
  onReset,
}: BlogAiAssistantPanelProps) {
  return (
    <section className="rounded-[28px] border border-[var(--color-secondary)]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(146,126,232,0.08)_58%,rgba(12,14,28,0.2))] p-6 sm:p-7">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          AI 글쓰기 보조
        </p>
        <h2 className="font-display text-3xl text-[var(--foreground)] sm:text-4xl">
          AI 초안 생성 패널
        </h2>
        <p className="text-sm leading-7 text-[var(--foreground-soft)]">
          구조화된 AI 초안을 생성한 뒤 검토하고 수정해서 저장/발행하세요. 이 도구는
          자동 발행을 하지 않습니다.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          주제 추천
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <input
            type="text"
            value={topicKeyword}
            onChange={(event) => onTopicKeywordChange(event.target.value)}
            className="min-w-[220px] flex-1 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="주제 추천용 키워드를 입력하세요"
          />
          <button
            type="button"
            onClick={onGenerateTopics}
            disabled={isGeneratingTopics || !topicKeyword.trim()}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-xs font-semibold tracking-[0.16em] text-[var(--foreground-soft)] uppercase transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGeneratingTopics ? "추천 생성 중..." : "주제 추천 받기"}
          </button>
        </div>
        {topicError ? (
          <p className="mt-3 text-sm text-rose-200">{topicError}</p>
        ) : null}
        {topicSuggestions.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {topicSuggestions.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => onSelectTopic(topic)}
                className="rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-left text-sm text-[var(--foreground-soft)] transition hover:bg-white/10 hover:text-white"
              >
                {topic}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">메인 키워드</span>
          <input
            type="text"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="예: 연락 끊김 후 재연락 방법"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">
            보조 키워드 (선택)
          </span>
          <input
            type="text"
            value={secondaryKeyword}
            onChange={(event) => onSecondaryKeywordChange(event.target.value)}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="예: 관계 회복 팁"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">카테고리</span>
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value as BlogCategory)}
              className="w-full rounded-2xl border border-white/12 bg-[#161626] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary-strong)]"
            >
              {blogCategories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">글 유형</span>
            <select
              value={postType}
              onChange={(event) => onPostTypeChange(event.target.value as BlogAiArticleType)}
              className="w-full rounded-2xl border border-white/12 bg-[#161626] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary-strong)]"
            >
              {postTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">문체</span>
            <select
              value={tone}
              onChange={(event) => onToneChange(event.target.value as BlogAiTone)}
              className="w-full rounded-2xl border border-white/12 bg-[#161626] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary-strong)]"
            >
              {toneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">분량</span>
            <select
              value={length}
              onChange={(event) => onLengthChange(event.target.value as BlogAiLength)}
              className="w-full rounded-2xl border border-white/12 bg-[#161626] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary-strong)]"
            >
              {lengthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-[var(--foreground-soft)]">
            <span>FAQ 포함</span>
            <input
              type="checkbox"
              checked={includeFaq}
              onChange={(event) => onIncludeFaqChange(event.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary-strong)]"
            />
          </label>

          <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-[var(--foreground-soft)]">
            <span>CTA 포함</span>
            <input
              type="checkbox"
              checked={includeCTA}
              onChange={(event) => onIncludeCTAChange(event.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary-strong)]"
            />
          </label>

          <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-[var(--foreground-soft)]">
            <span>내부링크 추천 포함</span>
            <input
              type="checkbox"
              checked={includeInternalLinks}
              onChange={(event) => onIncludeInternalLinksChange(event.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary-strong)]"
            />
          </label>
        </div>
      </div>

      {generationError ? (
        <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {generationError}
        </div>
      ) : null}

      {generationSuccess ? (
        <div className="mt-4 rounded-2xl border border-emerald-300/18 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          {generationSuccess}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !keyword.trim()}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[#fbf6f0] uppercase shadow-[0_20px_60px_rgba(88,69,173,0.36),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? "생성 중..." : "AI 초안 생성"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] uppercase transition duration-300 hover:bg-white/10"
        >
          입력 초기화
        </button>
      </div>
    </section>
  );
}
