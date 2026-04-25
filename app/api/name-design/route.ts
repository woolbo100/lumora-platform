import { NextResponse } from "next/server";

import { generateNamingResult, validateNamingInput } from "@/lib/naming/name-generator";
import { type SajuNamingInput } from "@/types/naming";

export async function POST(request: Request) {
  let payload: Partial<SajuNamingInput>;

  try {
    payload = (await request.json()) as Partial<SajuNamingInput>;
  } catch {
    return NextResponse.json(
      { error: "요청 형식을 다시 확인해주세요." },
      { status: 400 },
    );
  }

  const validated = validateNamingInput(payload);

  if (!validated.success) {
    return NextResponse.json(
      { error: "이름설계 입력값을 다시 확인해주세요.", errors: validated.errors },
      { status: 400 },
    );
  }

  try {
    const result = generateNamingResult(validated.data);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "사주 분석 데이터를 찾을 수 없습니다." },
      { status: 404 },
    );
  }
}
