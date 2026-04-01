import { NextResponse } from "next/server";

import { isBlogCategory } from "@/data/blogCategories";
import { getAdminSession } from "@/lib/admin-auth";
import { generateBlogDraft } from "@/lib/blog-ai";
import {
  type BlogAiArticleType,
  type BlogAiLength,
  type BlogAiTone,
} from "@/types/blog";

type BlogDraftRequest = {
  keyword?: string;
  secondaryKeyword?: string;
  serviceName?: string;
  category?: string;
  articleType?: string;
  tone?: string;
  length?: string;
  includeCta?: boolean;
  includeFaq?: boolean;
  includeInternalLinks?: boolean;
  notes?: string;
};

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인 후 사용할 수 있는 기능입니다." },
      { status: 401 },
    );
  }

  const payload = (await request.json()) as BlogDraftRequest;
  const keyword = payload.keyword?.trim() ?? "";
  const secondaryKeyword = payload.secondaryKeyword?.trim() ?? "";
  const serviceName = payload.serviceName?.trim() ?? "";
  const category = payload.category?.trim() ?? "";
  const articleType = payload.articleType?.trim() ?? "";
  const tone = payload.tone?.trim() ?? "";
  const length = payload.length?.trim() ?? "";
  const notes = payload.notes?.trim() ?? "";

  if (!keyword) {
    return NextResponse.json(
      { error: "키워드를 입력해주세요." },
      { status: 400 },
    );
  }

  if (!isBlogCategory(category)) {
    return NextResponse.json(
      { error: "유효한 카테고리를 선택해주세요." },
      { status: 400 },
    );
  }

  if (
    !["adsense-info", "seo-info", "service-bridge", "compare-guide"].includes(
      articleType,
    )
  ) {
    return NextResponse.json(
      { error: "유효한 글 유형을 선택해주세요." },
      { status: 400 },
    );
  }

  if (!["formal", "gentle", "brand-emotional"].includes(tone)) {
    return NextResponse.json(
      { error: "유효한 문체를 선택해주세요." },
      { status: 400 },
    );
  }

  if (!["1200", "1500", "1800"].includes(length)) {
    return NextResponse.json(
      { error: "유효한 분량을 선택해주세요." },
      { status: 400 },
    );
  }

  try {
    const draft = await generateBlogDraft({
      keyword,
      secondaryKeyword,
      serviceName,
      category,
      articleType: articleType as BlogAiArticleType,
      tone: tone as BlogAiTone,
      length: length as BlogAiLength,
      includeCta: payload.includeCta !== false,
      includeFaq: payload.includeFaq !== false,
      includeInternalLinks: payload.includeInternalLinks !== false,
      notes,
    });

    return NextResponse.json({ draft });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI 초안 생성 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
