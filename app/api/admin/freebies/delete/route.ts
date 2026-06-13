import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "관리자 로그인이 필요합니다." }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "삭제할 자료 ID가 누락되었습니다." }, { status: 400 });
    }

    const res = await supabaseRestRequest(`lead_magnets?id=eq.${id}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      throw new Error(`DB 삭제 실패 (${res.status})`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Admin freebie delete API error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
