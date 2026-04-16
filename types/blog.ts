export type BlogCategory =
  | "romance-reunion"
  | "tarot-saju"
  | "psychology-code"
  | "attraction-self-esteem"
  | "level-up-self-development"
  | "mind-study";

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  status: BlogPostStatus;
  summary?: string | null;
  metaDescription?: string | null;
  imageAltText?: string | null;
  aiGenerated?: boolean;
  content: string;
  publishedAt: string;
  updatedAt?: string | null;
  imageUrl?: string | null;
};

export type CreateBlogPostInput = {
  title: string;
  slug: string;
  category: BlogCategory;
  status?: BlogPostStatus;
  summary?: string;
  metaDescription?: string;
  imageAltText?: string;
  aiGenerated?: boolean;
  content: string;
  imageUrl?: string;
};

export type BlogAiArticleType =
  | "adsense-info"
  | "seo-info"
  | "service-bridge"
  | "compare-guide";

export type BlogAiTone =
  | "formal"
  | "gentle"
  | "brand-emotional";

export type BlogAiLength =
  | "1200"
  | "1500"
  | "1800";

export type BlogAiFaqItem = {
  question: string;
  answer: string;
};

export type BlogAiInternalLinkItem = {
  anchorText: string;
  targetPath: string;
  reason: string;
};

export type BlogAiDraftResult = {
  title: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  content: string;
  faq?: BlogAiFaqItem[];
  internalLinks?: BlogAiInternalLinkItem[];
  imageAltText?: string;
  checklist: string[];
};
