import { NextResponse } from "next/server";

import { generateNameCodeResult, validateNamingInput } from "@/lib/naming/name-generator";
import { type NameCodeInput, type NameCodeResult } from "@/types/naming";

export async function POST(request: Request) {
  let payload: Partial<NameCodeInput>;

  try {
    payload = (await request.json()) as Partial<NameCodeInput>;
  } catch {
    return NextResponse.json({ error: "요청 형식을 다시 확인해주세요." }, { status: 400 });
  }

  const validated = validateNamingInput(payload);
  if (!validated.success) {
    return NextResponse.json({ error: validated.errors[0] }, { status: 400 });
  }

  try {
    const result: NameCodeResult = generateNameCodeResult(validated.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "이름 분석 결과를 생성하지 못했습니다." }, { status: 500 });
  }
}
