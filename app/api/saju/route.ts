import { NextResponse } from "next/server";

import { createSharedSajuAnalysis } from "@/lib/analysis/shared-analysis";
import { type SajuFormInput } from "@/types/saju";

export async function POST(request: Request) {
  let payload: Partial<SajuFormInput>;

  try {
    payload = (await request.json()) as Partial<SajuFormInput>;
  } catch {
    return NextResponse.json(
      { error: "요청 형식을 다시 확인해주세요." },
      { status: 400 },
    );
  }

  const result = createSharedSajuAnalysis(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: "입력값을 다시 확인해주세요.", errors: result.errors },
      { status: 400 },
    );
  }

  return NextResponse.json({
    id: result.data.id,
    createdAt: result.data.createdAt,
    analysis: {
      dominantElements: result.data.dominantElements,
      lackingElements: result.data.lackingElements,
    },
    saju: result.data.saju,
  });
}
