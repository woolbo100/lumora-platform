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
    const { id, title, slug, description, category, thumbnail_url, pdf_path, related_url, is_active, sort_order } = body;

    if (!title || !slug || !pdf_path) {
      return NextResponse.json({ success: false, error: "필수 입력 필드(제목, 슬러그, PDF 파일)가 누락되었습니다." }, { status: 400 });
    }

    const requestBody = {
      title: title.trim(),
      slug: slug.trim(),
      description: description ? description.trim() : null,
      category: category ? category.trim() : null,
      thumbnail_url: thumbnail_url ? thumbnail_url.trim() : null,
      pdf_path: pdf_path.trim(),
      related_url: related_url ? related_url.trim() : null,
      is_active: !!is_active,
      sort_order: Number(sort_order) || 0
    };

    if (id && id !== "new") {
      // 수정 (PATCH)
      const res = await supabaseRestRequest(`lead_magnets?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error(`DB 수정 실패 (${res.status})`);
    } else {
      // 생성 (POST)
      const res = await supabaseRestRequest("lead_magnets", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error(`DB 생성 실패 (${res.status})`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Admin freebie upsert API error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
