import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "관리자 로그인이 필요합니다." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "자료 ID가 필요합니다." }, { status: 400 });
    }

    const response = await supabaseRestRequest(`lead_magnets?id=eq.${id}`);
    if (!response.ok) {
      return NextResponse.json({ success: false, error: `DB 조회 실패 (${response.status})` }, { status: 500 });
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: "자료를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error("Admin freebie detail API error:", error);
    return NextResponse.json({ success: false, error: "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
