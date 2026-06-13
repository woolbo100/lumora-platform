import { NextResponse } from "next/server";
import { supabaseRestRequest } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, error: "slug 파라미터가 필요합니다." }, { status: 400 });
    }

    const response = await supabaseRestRequest(`lead_magnets?slug=eq.${slug}&is_active=eq.true`);
    
    if (!response.ok) {
      return NextResponse.json({ success: false, error: "데이터베이스 조회에 실패했습니다." }, { status: 500 });
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: "자료를 찾을 수 없습니다." }, { status: 404 });
    }

    const { title, description, thumbnail_url, category } = data[0];

    return NextResponse.json({
      success: true,
      data: {
        title,
        description,
        thumbnail_url,
        category
      }
    });

  } catch (error) {
    console.error("Detail Fetch Error:", error);
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
