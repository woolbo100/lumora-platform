import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  // 1. 관리자 권한 확인 (세션 오류 시 안전하게 리턴)
  let session;
  try {
    session = await getAdminSession();
  } catch (e) {
    return NextResponse.json({ success: false, error: "세션 확인 중 오류가 발생했습니다." }, { status: 401 });
  }
  
  if (!session) {
    return NextResponse.json({ success: false, error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "freebies";

    if (!file) {
      return NextResponse.json({ success: false, error: "업로드할 파일이 선택되지 않았습니다." }, { status: 400 });
    }

    // 2. 환경 변수 체크 (Vercel 배포 시 누락 방지)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      return NextResponse.json({ success: false, error: "서버 설정 오류: NEXT_PUBLIC_SUPABASE_URL이 없습니다." }, { status: 500 });
    }
    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: "서버 설정 오류: API Key가 없습니다. Vercel 환경 변수를 확인해주세요." }, { status: 500 });
    }

    // 3. 파일 이름 안전하게 생성
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${timestamp}_${safeFileName}`;

    // 4. Supabase Storage 업로드 시도
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
      const errorData = await uploadResponse.json().catch(() => ({}));
      console.error("Supabase Storage Error:", errorData);
      
      let errorMessage = "창고(Bucket)가 없거나 권한이 부족합니다.";
      if (errorData.message === "Bucket not found") {
        errorMessage = `Supabase Storage에 '${bucket}' 버킷이 없습니다. 대시보드에서 생성해 주세요.`;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
      
      return NextResponse.json({ success: false, error: errorMessage }, { status: uploadResponse.status });
    }

    // 5. 성공 시 공개 URL 반환
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    });

  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
    }, { status: 500 });
  }
}
