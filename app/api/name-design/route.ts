import { NextResponse } from "next/server";

import { generateNamingResultFromAnalysis } from "@/lib/naming/name-generator";
import { type SharedSajuAnalysis } from "@/types/analysis";
import { type SajuNamingInput } from "@/types/naming";

type NameDesignRequest = Partial<SajuNamingInput> & {
  analysis?: SharedSajuAnalysis;
};

function isNamingStyle(value: string | undefined) {
  return [
    "soft",
    "elegant",
    "bright",
    "strong",
    "luxurious",
    "modern",
    "neutral",
    "calm",
  ].includes(value ?? "");
}

export async function POST(request: Request) {
  let payload: NameDesignRequest;

  try {
    payload = (await request.json()) as NameDesignRequest;
  } catch {
    return NextResponse.json({ error: "요청 형식을 다시 확인해주세요." }, { status: 400 });
  }

  if (!payload.analysis) {
    return NextResponse.json(
      { error: "사주 분석 데이터가 필요합니다." },
      { status: 400 },
    );
  }

  const analysisId = String(payload.analysis_id ?? payload.analysis.id ?? "").trim();
  const purpose = payload.purpose;

  if (!analysisId || !["wealth", "love", "brand", "healing"].includes(purpose ?? "")) {
    return NextResponse.json(
      { error: "이름설계 입력값을 다시 확인해주세요." },
      { status: 400 },
    );
  }

  const validatedPurpose = purpose as SajuNamingInput["purpose"];

  try {
    const result = generateNamingResultFromAnalysis(payload.analysis, {
      analysis_id: analysisId,
      purpose: validatedPurpose,
      current_name: String(payload.current_name ?? "").trim() || undefined,
      preferred_style: isNamingStyle(payload.preferred_style)
        ? payload.preferred_style
        : undefined,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "이름설계 결과를 생성하지 못했습니다." },
      { status: 500 },
    );
  }
}
