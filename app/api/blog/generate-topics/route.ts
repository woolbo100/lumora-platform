import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { generateBlogTopics } from "@/lib/blog-ai";

type GenerateTopicsRequest = {
  keyword?: string;
};

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인 후 이용할 수 있습니다." },
      { status: 401 },
    );
  }

  let payload: GenerateTopicsRequest;

  try {
    payload = (await request.json()) as GenerateTopicsRequest;
  } catch {
    return NextResponse.json(
      { error: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const keyword = payload.keyword?.trim() ?? "";

  if (!keyword) {
    return NextResponse.json(
      { error: "키워드를 입력해 주세요." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      { error: "AI 주제 추천 기능이 아직 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const topics = await generateBlogTopics({ keyword });
    return NextResponse.json({ topics });
  } catch {
    return NextResponse.json(
      { error: "주제 추천 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
