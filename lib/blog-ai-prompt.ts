import { getCategoryMeta } from "@/data/blogCategories";
import {
  type BlogAiArticleType,
  type BlogAiDraftResult,
  type BlogAiLength,
  type BlogAiTone,
  type BlogCategory,
} from "@/types/blog";

type PromptPostType = BlogAiArticleType;

export type BlogDraftPromptInput = {
  keyword: string;
  secondaryKeyword?: string;
  category: BlogCategory;
  postType?: PromptPostType;
  articleType?: BlogAiArticleType;
  tone: BlogAiTone;
  length: BlogAiLength;
  includeFaq: boolean;
  includeCTA?: boolean;
  includeCta?: boolean;
  includeInternalLinks: boolean;
};

const postTypeLabelMap: Record<PromptPostType, string> = {
  "adsense-info": "AdSense approval informational post",
  "seo-info": "SEO traffic informational post",
  "service-bridge": "Service bridge post",
  "compare-guide": "Comparison/guide post",
};

const toneLabelMap: Record<BlogAiTone, string> = {
  formal: "formal Korean prose",
  gentle: "gentle explanatory Korean prose",
  "brand-emotional": "warm brand-toned Korean prose",
};

const lengthLabelMap: Record<BlogAiLength, string> = {
  "1200": "around 1200 Korean characters",
  "1500": "around 1500 Korean characters",
  "1800": "around 1800 Korean characters",
};

export const BLOG_AI_SYSTEM_PROMPT = [
  "You are a professional Korean blog drafting assistant for Lumora.",
  "Your goal is to generate structured drafts that are readable, SEO-friendly, and AdSense-approval-friendly.",
  "Write in Korean only for all content fields.",
  "Use formal but natural prose (not robotic).",
  "Output must be JSON only and follow the required schema exactly.",
  "No explanations outside JSON.",
  "Do not include external sales links, affiliate links, product promotion lines, or aggressive ad copy.",
  "Avoid clickbait, superstition hype, repetitive filler, and low-value generic text.",
  "Never assume auto-publishing.",
].join(" ");

function resolvePostType(input: BlogDraftPromptInput): PromptPostType {
  return input.postType ?? input.articleType ?? "seo-info";
}

function resolveIncludeCTA(input: BlogDraftPromptInput) {
  if (typeof input.includeCTA === "boolean") {
    return input.includeCTA;
  }

  if (typeof input.includeCta === "boolean") {
    return input.includeCta;
  }

  return true;
}

export function buildBlogDraftPrompt(input: BlogDraftPromptInput) {
  const categoryMeta = getCategoryMeta(input.category);
  const postType = resolvePostType(input);
  const includeCTA = resolveIncludeCTA(input);
  const secondaryKeyword = input.secondaryKeyword?.trim() || "none";

  return [
    "Create one Lumora blog draft as JSON.",
    "",
    "[Inputs]",
    `- keyword: ${input.keyword}`,
    `- secondaryKeyword: ${secondaryKeyword}`,
    `- category: ${categoryMeta.label} (${categoryMeta.description})`,
    `- postType: ${postTypeLabelMap[postType]}`,
    `- tone: ${toneLabelMap[input.tone]}`,
    `- targetLength: ${lengthLabelMap[input.length]}`,
    `- includeFaq: ${input.includeFaq ? "true" : "false"}`,
    `- includeCTA: ${includeCTA ? "true" : "false"}`,
    `- includeInternalLinks: ${input.includeInternalLinks ? "true" : "false"}`,
    "",
    "[Required output schema]",
    "{",
    '  "title": "",',
    '  "slug": "",',
    '  "excerpt": "",',
    '  "metaDescription": "",',
    '  "content": "",',
    '  "faq": [],',
    '  "internalLinks": [],',
    '  "imageAltText": "",',
    '  "checklist": []',
    "}",
    "",
    "[Flow design]",
    "- Build a narrative flow: introduction -> problem framing -> explanation -> solution/action -> closing summary.",
    "- The introduction should open with a relatable user situation, not a dictionary-style definition.",
    "- Reflect search intent behind the keyword, not keyword stuffing.",
    "",
    "[Heading and structure rules]",
    "- One H1 is implied by title; do not duplicate H1 in content.",
    "- Content structure must follow: intro (empathy + problem framing) -> body -> conclusion.",
    "- Include at least 3 H2 headings in markdown (##).",
    "- H2 topics should cover: concept explanation, cause analysis, and practical solution.",
    "- Use H3 (###) only when needed.",
    "- H2s should be strategic and include search-friendly phrasing related to the keyword.",
    "- Keep logical progression across sections.",
    "",
    "[Style quality rules]",
    "- Korean formal sentence ending should be maintained.",
    "- Keep it readable and natural, not textbook-like.",
    "- Avoid repeated phrases and repeated sentence patterns.",
    "- Prefer concrete explanation over abstract filler.",
    "- Keep conclusion open enough for human editor to add personal insights.",
    "- Minimum body length should be 1000 Korean characters.",
    "",
    "[SEO rules]",
    "- title: search-friendly, clickable but not sensational.",
    "- slug: lowercase English and hyphens only.",
    "- excerpt: short and clear.",
    "- metaDescription: around 110-140 Korean characters with concise summary + soft click intent.",
    "- content should naturally include keyword in title, metaDescription, and body.",
    "",
    "[Option rules]",
    "- includeFaq=true: generate exactly 3 FAQ items with practical search-style questions; otherwise return empty array.",
    "- includeInternalLinks=true: generate internalLinks array with Lumora service/blog style paths; otherwise return empty array.",
    "- includeCTA=true: include a gentle CTA paragraph near the end; avoid hard-selling language.",
    "",
    "[Checklist rules]",
    "- checklist should include publication checks such as:",
    "  personal experience addition, internal link insertion, image alt text, typo review, meta description confirmation.",
    "- Ensure content can naturally include a short personal experience/opinion paragraph later.",
    "",
    "[Forbidden]",
    "- external shopping links, affiliate links, sales-heavy copy",
    "- clickbait or provocative fortune-telling style",
    "- repeated identical sentence structures",
    "- meaningless length padding",
    "",
    "Return JSON object only.",
  ].join("\n");
}

export function buildBlogAiUserPrompt(input: BlogDraftPromptInput) {
  return buildBlogDraftPrompt(input);
}

export const BLOG_AI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    excerpt: { type: "string" },
    metaDescription: { type: "string" },
    content: { type: "string" },
    faq: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
      },
    },
    internalLinks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          anchorText: { type: "string" },
          targetPath: { type: "string" },
          reason: { type: "string" },
        },
        required: ["anchorText", "targetPath", "reason"],
      },
    },
    imageAltText: { type: "string" },
    checklist: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "title",
    "slug",
    "excerpt",
    "metaDescription",
    "content",
    "faq",
    "internalLinks",
    "imageAltText",
    "checklist",
  ],
} as const;

export function normalizeBlogAiDraftResult(
  parsed: Partial<BlogAiDraftResult>,
): BlogAiDraftResult {
  const faq = Array.isArray(parsed.faq)
    ? parsed.faq.filter(
        (item): item is { question: string; answer: string } =>
          Boolean(item?.question?.trim()) && Boolean(item?.answer?.trim()),
      )
    : [];

  const internalLinks = Array.isArray(parsed.internalLinks)
    ? parsed.internalLinks.filter(
        (item): item is { anchorText: string; targetPath: string; reason: string } =>
          Boolean(item?.anchorText?.trim()) &&
          Boolean(item?.targetPath?.trim()) &&
          Boolean(item?.reason?.trim()),
      )
    : [];

  const checklist = Array.isArray(parsed.checklist)
    ? parsed.checklist.filter(
        (item): item is string => typeof item === "string" && Boolean(item.trim()),
      )
    : [];

  return {
    title: parsed.title?.trim() || "",
    slug: parsed.slug?.trim() || "",
    excerpt: parsed.excerpt?.trim() || "",
    metaDescription: parsed.metaDescription?.trim() || "",
    content: parsed.content?.trim() || "",
    faq,
    internalLinks,
    imageAltText: parsed.imageAltText?.trim() || "",
    checklist,
  };
}
