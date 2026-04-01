import { NextResponse } from "next/server";

import { isBlogCategory } from "@/data/blogCategories";
import { getAdminSession } from "@/lib/admin-auth";
import { generateBlogDraft } from "@/lib/blog-ai";
import {
  type BlogAiArticleType,
  type BlogAiDraftResult,
  type BlogAiLength,
  type BlogAiTone,
} from "@/types/blog";

type GenerateAiDraftRequest = {
  keyword?: string;
  secondaryKeyword?: string;
  category?: string;
  postType?: string;
  tone?: string;
  length?: string;
  includeFaq?: boolean;
  includeCTA?: boolean;
  includeInternalLinks?: boolean;
};

const POST_TYPES = new Set<BlogAiArticleType>([
  "adsense-info",
  "seo-info",
  "service-bridge",
  "compare-guide",
]);

const TONES = new Set<BlogAiTone>(["formal", "gentle", "brand-emotional"]);
const LENGTHS = new Set<BlogAiLength>(["1200", "1500", "1800"]);

function toSafeDraftShape(
  draft: Partial<BlogAiDraftResult>,
): BlogAiDraftResult {
  return {
    title: draft.title?.trim() || "",
    slug: draft.slug?.trim() || "",
    excerpt: draft.excerpt?.trim() || "",
    metaDescription: draft.metaDescription?.trim() || "",
    content: draft.content?.trim() || "",
    faq: Array.isArray(draft.faq) ? draft.faq : [],
    internalLinks: Array.isArray(draft.internalLinks) ? draft.internalLinks : [],
    imageAltText: draft.imageAltText?.trim() || "",
    checklist: Array.isArray(draft.checklist) ? draft.checklist : [],
  };
}

function normalizeBoolean(value: unknown, defaultValue: boolean) {
  return typeof value === "boolean" ? value : defaultValue;
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인 후 이용할 수 있습니다." },
      { status: 401 },
    );
  }

  let payload: GenerateAiDraftRequest;

  try {
    payload = (await request.json()) as GenerateAiDraftRequest;
  } catch {
    return NextResponse.json(
      { error: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const keyword = payload.keyword?.trim() ?? "";
  const secondaryKeyword = payload.secondaryKeyword?.trim() ?? "";
  const category = payload.category?.trim() ?? "";
  const postType = payload.postType?.trim() ?? "seo-info";
  const tone = payload.tone?.trim() ?? "formal";
  const length = payload.length?.trim() ?? "1500";
  const includeFaq = normalizeBoolean(payload.includeFaq, true);
  const includeCta = normalizeBoolean(payload.includeCTA, true);
  const includeInternalLinks = normalizeBoolean(payload.includeInternalLinks, true);

  if (!keyword) {
    return NextResponse.json(
      { error: "메인 키워드를 입력해 주세요." },
      { status: 400 },
    );
  }

  if (!isBlogCategory(category)) {
    return NextResponse.json(
      { error: "카테고리를 올바르게 선택해 주세요." },
      { status: 400 },
    );
  }

  if (!POST_TYPES.has(postType as BlogAiArticleType)) {
    return NextResponse.json(
      { error: "글 유형 값을 확인해 주세요." },
      { status: 400 },
    );
  }

  if (!TONES.has(tone as BlogAiTone)) {
    return NextResponse.json(
      { error: "문체 값을 확인해 주세요." },
      { status: 400 },
    );
  }

  if (!LENGTHS.has(length as BlogAiLength)) {
    return NextResponse.json(
      { error: "분량 값을 확인해 주세요." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      { error: "AI 초안 기능이 아직 설정되지 않았습니다. 관리자에게 문의해 주세요." },
      { status: 500 },
    );
  }

  try {
    const generated = await generateBlogDraft({
      keyword,
      secondaryKeyword,
      category,
      articleType: postType as BlogAiArticleType,
      tone: tone as BlogAiTone,
      length: length as BlogAiLength,
      includeFaq,
      includeCta,
      includeInternalLinks,
    });

    return NextResponse.json(toSafeDraftShape(generated));
  } catch {
    return NextResponse.json(
      { error: "AI 초안 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
