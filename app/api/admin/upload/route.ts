import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  // 1. 관리자 권한 확인
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "freebies";

    if (!file) {
      return NextResponse.json({ success: false, error: "파일이 없습니다." }, { status: 400 });
    }

    // 2. Supabase Storage API 호출을 위한 환경 변수 로드
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase 설정이 누락되었습니다.");
    }

    // 3. 파일 이름 고유화 (타임스탬프 추가)
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const filePath = `${fileName}`;

    // 4. Supabase Storage로 직접 업로드 (REST API 사용)
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${filePath}`;
    
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": file.type,
        "x-upsert": "true"
      },
      body: file
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.message || "업로드 실패");
    }

    // 5. 공개 URL 생성 (public 버킷 기준)
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "업로드 중 오류가 발생했습니다." 
    }, { status: 500 });
  }
}
