"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import { BlogAiAssistantPanel } from "@/components/blog/BlogAiAssistantPanel";
import { BlogImageAltPanel } from "@/components/blog/BlogImageAltPanel";
import { BlogInternalLinksPanel } from "@/components/blog/BlogInternalLinksPanel";
import { BlogPublishChecklist } from "@/components/blog/BlogPublishChecklist";
import { BlogSeoSummaryPanel } from "@/components/blog/BlogSeoSummaryPanel";
import { blogCategories } from "@/data/blogCategories";
import { slugifyBlogValue } from "@/lib/blog-slug";
import {
  type BlogAiArticleType,
  type BlogAiDraftResult,
  type BlogAiFaqItem,
  type BlogAiInternalLinkItem,
  type BlogAiLength,
  type BlogAiTone,
  type BlogCategory,
} from "@/types/blog";

type BlogComposerFormProps = {
  action: (formData: FormData) => Promise<void>;
  error?: string;
  message?: string;
  successMessage?: string;
  submitLabel?: string;
  initialValues?: {
    title?: string;
    slug?: string;
    category?: string;
    summary?: string | null;
    metaDescription?: string | null;
    imageUrl?: string | null;
    content?: string;
    originalSlug?: string;
  };
};

const errorMessageMap: Record<string, string> = {
  "missing-fields": "Title and content are required.",
  "invalid-category": "Please choose a valid category.",
  "invalid-slug": "Please review the slug value.",
  "save-failed": "Saving failed. Check your permissions or duplicate slug.",
};

type ManualChecklistState = {
  personalVoiceAdded: boolean;
  naturalToneChecked: boolean;
  adToneChecked: boolean;
  typoChecked: boolean;
  brandToneChecked: boolean;
};

function hasEditorContent(values: {
  title: string;
  slug: string;
  summary: string;
  metaDescription: string;
  content: string;
}) {
  return Boolean(
    values.title.trim() ||
      values.slug.trim() ||
      values.summary.trim() ||
      values.metaDescription.trim() ||
      values.content.trim(),
  );
}

function normalizeDraftResponse(payload: unknown): BlogAiDraftResult | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source =
    "draft" in payload && payload.draft && typeof payload.draft === "object"
      ? payload.draft
      : payload;

  if (!source || typeof source !== "object") {
    return null;
  }

  const draft = source as Partial<BlogAiDraftResult>;

  if (!draft.title || !draft.content) {
    return null;
  }

  return {
    title: draft.title ?? "",
    slug: draft.slug ?? "",
    excerpt: draft.excerpt ?? "",
    metaDescription: draft.metaDescription ?? "",
    content: draft.content ?? "",
    faq: Array.isArray(draft.faq) ? draft.faq : [],
    internalLinks: Array.isArray(draft.internalLinks) ? draft.internalLinks : [],
    imageAltText: draft.imageAltText ?? "",
    checklist: Array.isArray(draft.checklist) ? draft.checklist : [],
  };
}

function countMatches(value: string, regex: RegExp) {
  return (value.match(regex) ?? []).length;
}

export function BlogComposerForm({
  action,
  error,
  message,
  successMessage,
  submitLabel = "Publish",
  initialValues,
}: BlogComposerFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [category, setCategory] = useState<BlogCategory>(
    (initialValues?.category as BlogCategory | undefined) ?? blogCategories[0]!.slug,
  );
  const [summary, setSummary] = useState(initialValues?.summary ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initialValues?.metaDescription ?? "",
  );
  const [content, setContent] = useState(initialValues?.content ?? "");

  const [keyword, setKeyword] = useState("");
  const [topicKeyword, setTopicKeyword] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState<string[]>([]);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState(false);
  const [topicError, setTopicError] = useState("");
  const [secondaryKeyword, setSecondaryKeyword] = useState("");
  const [postType, setPostType] = useState<BlogAiArticleType>("adsense-info");
  const [tone, setTone] = useState<BlogAiTone>("formal");
  const [length, setLength] = useState<BlogAiLength>("1500");
  const [includeFaq, setIncludeFaq] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [includeInternalLinks, setIncludeInternalLinks] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [generationSuccess, setGenerationSuccess] = useState("");
  const [aiChecklist, setAiChecklist] = useState<string[]>([]);
  const [aiInternalLinks, setAiInternalLinks] = useState<BlogAiInternalLinkItem[]>([]);
  const [aiFaq, setAiFaq] = useState<BlogAiFaqItem[]>([]);
  const [aiImageAltText, setAiImageAltText] = useState("");
  const [aiGenerated, setAiGenerated] = useState(false);
  const [manualChecklist, setManualChecklist] = useState<ManualChecklistState>({
    personalVoiceAdded: false,
    naturalToneChecked: false,
    adToneChecked: false,
    typoChecked: false,
    brandToneChecked: false,
  });

  const contentLength = content.trim().length;
  const h2Count = countMatches(content, /^##\s+/gm);
  const h3Count = countMatches(content, /^###\s+/gm);
  const targetMinLength = Number(length) || 1500;
  const faqCount = aiFaq.length;
  const internalLinkCount = aiInternalLinks.length;

  const autoChecklist = useMemo(
    () => [
      {
        label: "Main keyword in title",
        passed:
          !keyword.trim() ||
          title.toLowerCase().includes(keyword.trim().toLowerCase()),
        detail: "Title should include the main keyword naturally.",
      },
      {
        label: "Meta description exists",
        passed: Boolean(metaDescription.trim()),
        detail: "Fill meta description for search snippets.",
      },
      {
        label: "At least 3 H2 headings",
        passed: h2Count >= 3,
        detail: `Detected H2: ${h2Count}`,
      },
      {
        label: "Minimum content length",
        passed: contentLength >= targetMinLength,
        detail: `Current ${contentLength} / target ${targetMinLength}+`,
      },
      {
        label: "Slug exists",
        passed: Boolean(slug.trim()),
        detail: "Slug should be lowercase and hyphen-based.",
      },
      {
        label: "Excerpt exists",
        passed: Boolean(summary.trim()),
        detail: "Excerpt helps feed cards and SEO snippets.",
      },
      {
        label: "FAQ section availability",
        passed: !includeFaq || faqCount > 0,
        detail: includeFaq ? `FAQ count ${faqCount}` : "FAQ option disabled",
      },
      {
        label: "Internal links availability",
        passed: !includeInternalLinks || internalLinkCount > 0,
        detail: includeInternalLinks
          ? `Suggested links ${internalLinkCount}`
          : "Internal link option disabled",
      },
      {
        label: "Image alt suggestion",
        passed: Boolean(aiImageAltText.trim()),
        detail: "Add image alt text before publishing.",
      },
    ],
    [
      aiImageAltText,
      contentLength,
      faqCount,
      h2Count,
      includeFaq,
      includeInternalLinks,
      internalLinkCount,
      keyword,
      metaDescription,
      slug,
      summary,
      targetMinLength,
      title,
    ],
  );

  const publishWarnings = useMemo(() => {
    const warnings: string[] = [];

    if (!title.trim()) warnings.push("Title is required.");
    if (!metaDescription.trim()) warnings.push("Meta description is recommended.");
    if (!content.trim()) warnings.push("Content is required.");
    if (h2Count < 3) warnings.push("Add at least 3 H2 headings for structure.");
    if (contentLength < targetMinLength) {
      warnings.push(`Increase content length to around ${targetMinLength}+ characters.`);
    }

    return warnings;
  }, [content, contentLength, h2Count, metaDescription, targetMinLength, title]);

  function handleTitleChange(nextTitle: string) {
    setTitle(nextTitle);

    if (!slug.trim()) {
      setSlug(slugifyBlogValue(nextTitle));
    }
  }

  function resetAssistantInputs() {
    setKeyword("");
    setTopicKeyword("");
    setTopicSuggestions([]);
    setTopicError("");
    setSecondaryKeyword("");
    setPostType("adsense-info");
    setTone("formal");
    setLength("1500");
    setIncludeFaq(true);
    setIncludeCTA(true);
    setIncludeInternalLinks(true);
    setGenerationError("");
    setGenerationSuccess("");
    setAiChecklist([]);
    setAiInternalLinks([]);
    setAiFaq([]);
    setAiImageAltText("");
    setAiGenerated(false);
  }

  function handleManualChecklistChange(key: keyof ManualChecklistState, value: boolean) {
    setManualChecklist((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerateAiDraft() {
    await handleGenerateAiDraftWithKeyword();
  }

  async function handleGenerateAiDraftWithKeyword(forcedKeyword?: string) {
    const currentKeyword = forcedKeyword?.trim() || keyword.trim();

    if (!currentKeyword) {
      setGenerationError("Please enter the main keyword.");
      return;
    }

    const shouldConfirmOverwrite = hasEditorContent({
      title,
      slug,
      summary,
      metaDescription,
      content,
    });

    if (shouldConfirmOverwrite) {
      const confirmed = window.confirm(
        "Current title/excerpt/meta/content may be overwritten by the AI draft. Continue?",
      );

      if (!confirmed) {
        return;
      }
    }

    setIsGenerating(true);
    setGenerationError("");
    setGenerationSuccess("");

    try {
      const response = await fetch("/api/blog/generate-ai-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: currentKeyword,
          secondaryKeyword,
          category,
          postType,
          tone,
          length,
          includeFaq,
          includeCTA,
          includeInternalLinks,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
      } & Partial<BlogAiDraftResult> & { draft?: BlogAiDraftResult };

      if (!response.ok) {
        throw new Error(payload.error ?? "AI draft generation failed.");
      }

      const draft = normalizeDraftResponse(payload);

      if (!draft) {
        throw new Error("AI draft response format is invalid.");
      }

      setKeyword(currentKeyword);
      setTitle(draft.title);
      setSlug(draft.slug);
      setSummary(draft.excerpt);
      setMetaDescription(draft.metaDescription);
      setContent(draft.content);
      setAiFaq(draft.faq ?? []);
      setAiInternalLinks(draft.internalLinks ?? []);
      setAiImageAltText(draft.imageAltText ?? "");
      setAiChecklist(draft.checklist ?? []);
      setGenerationSuccess(
        "AI draft applied. Review checklist/SEO panel, then save draft or publish.",
      );
      setAiGenerated(true);
    } catch (generationFailure) {
      setGenerationError(
        generationFailure instanceof Error
          ? generationFailure.message
          : "Error while generating AI draft.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleGenerateTopics() {
    if (!topicKeyword.trim()) {
      setTopicError("Enter a keyword first.");
      return;
    }

    setIsGeneratingTopics(true);
    setTopicError("");

    try {
      const response = await fetch("/api/blog/generate-topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: topicKeyword,
        }),
      });

      const payload = (await response.json()) as { error?: string; topics?: string[] };

      if (!response.ok || !Array.isArray(payload.topics)) {
        throw new Error(payload.error ?? "Failed to generate topic suggestions.");
      }

      setTopicSuggestions(payload.topics);
    } catch (topicFailure) {
      setTopicError(
        topicFailure instanceof Error
          ? topicFailure.message
          : "Failed to generate topic suggestions.",
      );
    } finally {
      setIsGeneratingTopics(false);
    }
  }

  async function handleSelectTopic(topic: string) {
    setKeyword(topic);
    setGenerationError("");
    setGenerationSuccess("");

    await handleGenerateAiDraftWithKeyword(topic);
  }

  return (
    <form action={action} className="space-y-6">
      {initialValues?.originalSlug ? (
        <input type="hidden" name="originalSlug" value={initialValues.originalSlug} />
      ) : null}
      <input type="hidden" name="currentImageUrl" value={initialValues?.imageUrl ?? ""} />
      <input type="hidden" name="imageAltText" value={aiImageAltText} />
      <input type="hidden" name="aiGenerated" value={aiGenerated ? "true" : "false"} />

      <BlogAiAssistantPanel
        topicKeyword={topicKeyword}
        topicSuggestions={topicSuggestions}
        isGeneratingTopics={isGeneratingTopics}
        topicError={topicError}
        keyword={keyword}
        secondaryKeyword={secondaryKeyword}
        category={category}
        postType={postType}
        tone={tone}
        length={length}
        includeFaq={includeFaq}
        includeCTA={includeCTA}
        includeInternalLinks={includeInternalLinks}
        isGenerating={isGenerating}
        generationError={generationError}
        generationSuccess={generationSuccess}
        onKeywordChange={setKeyword}
        onSecondaryKeywordChange={setSecondaryKeyword}
        onCategoryChange={setCategory}
        onPostTypeChange={setPostType}
        onToneChange={setTone}
        onLengthChange={setLength}
        onIncludeFaqChange={setIncludeFaq}
        onIncludeCTAChange={setIncludeCTA}
        onIncludeInternalLinksChange={setIncludeInternalLinks}
        onGenerate={handleGenerateAiDraft}
        onTopicKeywordChange={setTopicKeyword}
        onGenerateTopics={handleGenerateTopics}
        onSelectTopic={handleSelectTopic}
        onReset={resetAssistantInputs}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <BlogSeoSummaryPanel
          titleLength={title.trim().length}
          metaDescriptionLength={metaDescription.trim().length}
          contentLength={contentLength}
          h2Count={h2Count}
          h3Count={h3Count}
          faqCount={faqCount}
          internalLinkCount={internalLinkCount}
          hasSlug={Boolean(slug.trim())}
          hasExcerpt={Boolean(summary.trim())}
        />
        <BlogPublishChecklist
          autoItems={autoChecklist}
          aiChecklist={aiChecklist}
          manualState={manualChecklist}
          onManualChange={handleManualChecklistChange}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BlogInternalLinksPanel internalLinks={aiInternalLinks} />
        <BlogImageAltPanel imageAltText={aiImageAltText} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">Title</span>
          <input
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="Enter the post title"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">Slug</span>
          <input
            name="slug"
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
            placeholder="e.g. healing-routine"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Category</span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value as BlogCategory)}
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
        <span className="text-sm text-[var(--foreground-soft)]">Excerpt</span>
        <textarea
          name="summary"
          rows={3}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          className="w-full rounded-[24px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
          placeholder="Short summary for cards and previews."
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Meta Description</span>
        <textarea
          name="metaDescription"
          rows={3}
          value={metaDescription}
          onChange={(event) => setMetaDescription(event.target.value)}
          className="w-full rounded-[24px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
          placeholder="Meta description for search results."
        />
      </label>

      {initialValues?.imageUrl ? (
        <div className="space-y-2">
          <span className="text-sm text-[var(--foreground-soft)]">Current image</span>
          <div className="overflow-hidden rounded-[24px] border border-white/10">
            <img
              src={initialValues.imageUrl}
              alt="Current post image"
              className="h-56 w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Upload image</span>
        <input
          name="imageFile"
          type="file"
          accept="image/*"
          className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-[var(--foreground-soft)]"
        />
        <p className="text-xs leading-6 text-[var(--foreground-muted)]">
          Leave empty to keep the current image.
        </p>
      </label>

      <label className="space-y-2">
        <span className="text-sm text-[var(--foreground-soft)]">Content</span>
        <textarea
          name="content"
          required
          rows={14}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full rounded-[28px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
          placeholder="Use markdown headings (##, ###) and blank lines between paragraphs."
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {errorMessageMap[error] ?? "An unexpected error occurred."}
          {message ? <p className="mt-2 break-words text-rose-50/90">{message}</p> : null}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-300/18 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          {successMessage}
        </div>
      ) : null}

      <SaveActionButtons
        submitLabel={submitLabel}
        publishWarnings={publishWarnings}
        canPublish={Boolean(title.trim() && content.trim())}
      />
    </form>
  );
}

function SaveActionButtons({
  submitLabel,
  publishWarnings,
  canPublish,
}: {
  submitLabel: string;
  publishWarnings: string[];
  canPublish: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-3">
      {publishWarnings.length > 0 ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <p className="font-medium">Before publishing, check a few more items:</p>
          <div className="mt-2 space-y-1 text-amber-100/90">
            {publishWarnings.map((warning) => (
              <p key={warning}>- {warning}</p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          name="status"
          value="draft"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[#fbf6f0] uppercase shadow-[0_20px_60px_rgba(88,69,173,0.36),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {pending ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="submit"
          name="status"
          value="published"
          disabled={pending || !canPublish}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] uppercase transition duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {pending ? "Processing..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
