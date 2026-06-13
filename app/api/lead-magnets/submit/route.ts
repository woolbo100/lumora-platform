import { NextResponse } from "next/server";
import { supabaseRestRequest } from "@/lib/supabase";

/**
 * 5. pdf_path 정규화 함수
 * Supabase Storage 전체 URL, API 경로, 버킷명 접두사, 앞뒤 공백 등을 완전히 제거하고
 * 순수 파일명(Object Path)만 추출합니다.
 */
function normalizePdfPath(rawPath: string): string {
  if (!rawPath) return "";
  let clean = rawPath.trim();
  
  // 1. 전체 URL 도메인 부분 제거 (http:// 또는 https:// 로 시작하는 부분 제거)
  clean = clean.replace(/^https?:\/\/[^\/]+/i, "");
  
  // 2. Supabase Storage API 경로 패턴 제거
  // 예: /storage/v1/object/sign/lead-magnets/ 또는 /storage/v1/object/public/lead-magnets/ 등
  clean = clean.replace(/^\/?storage\/v1\/object\/(sign|public|authenticated)\/lead-magnets\//i, "");
  
  // 3. 버킷 명칭 단독 제거
  // 예: /lead-magnets/ 또는 lead-magnets/
  clean = clean.replace(/^\/?lead-magnets\//i, "");
  
  // 4. 맨 앞 슬래시 제거
  clean = clean.replace(/^\//, "");
  
  return clean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, email, phone, privacyAgree, marketingAgree } = body;

    // 1. 필수 환경변수 검증 (요구사항 9번: 환경변수가 없을 때 명확한 오류 표시)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      const missingVars = [];
      if (!supabaseUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_URL");
      if (!supabaseKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY");

      return NextResponse.json(
        { success: false, error: `서버 설정 오류: 누락된 환경 변수 [ ${missingVars.join(", ")} ]` },
        { status: 500 }
      );
    }

    // 2. 입력 데이터 정합성 검증
    if (!slug) {
      return NextResponse.json({ success: false, error: "자료 식별자(slug)가 제공되지 않았습니다." }, { status: 400 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "이름을 입력해 주세요." }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: "이메일을 입력해 주세요." }, { status: 400 });
    }
    if (!privacyAgree) {
      return NextResponse.json({ success: false, error: "개인정보 수집 및 이용 동의가 필요합니다." }, { status: 400 });
    }

    // 3. lead_magnets 테이블에서 slug로 자료 검색
    let magnet;
    try {
      const magnetResponse = await supabaseRestRequest(
        `lead_magnets?slug=eq.${slug}&is_active=eq.true`
      );
      if (!magnetResponse.ok) {
        throw new Error("DB Query Failed");
      }
      const magnets = await magnetResponse.json();
      if (!magnets || magnets.length === 0) {
        return NextResponse.json({ success: false, error: "자료를 찾을 수 없습니다." }, { status: 404 });
      }
      magnet = magnets[0];
    } catch (e) {
      console.error("Lead magnet query error:", e);
      return NextResponse.json({ success: false, error: "자료를 찾을 수 없습니다." }, { status: 404 });
    }

    // 4. lead_submissions 테이블에 신청자 정보 저장
    try {
      const submissionResponse = await supabaseRestRequest("lead_submissions", {
        method: "POST",
        body: JSON.stringify({
          lead_magnet_slug: slug,
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : null,
          privacy_agree: !!privacyAgree,
          marketing_agree: !!marketingAgree,
        }),
      });

      if (!submissionResponse.ok) {
        throw new Error(`DB Insert Failed: ${submissionResponse.status}`);
      }
    } catch (e) {
      console.error("Lead submission saving error:", e);
      return NextResponse.json({ success: false, error: "신청 정보를 저장하지 못했습니다." }, { status: 500 });
    }

    // 5. 다운로드 수(download_count) 1 증가 (비동기 수행하여 다운로드 속도 보장)
    try {
      await supabaseRestRequest(`lead_magnets?id=eq.${magnet.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          download_count: (magnet.download_count || 0) + 1,
        }),
      });
    } catch (e) {
      console.error("Failed to update download count:", e);
    }

    // 6. Supabase Storage signed URL 생성 (lead-magnets private bucket 대상)
    if (!magnet.pdf_path) {
      return NextResponse.json({ 
        success: false, 
        error: "PDF 파일 경로가 올바르지 않습니다. 관리자에게 문의해주세요." 
      }, { status: 400 });
    }

    // 파일 경로 정제
    const normalizedPath = normalizePdfPath(magnet.pdf_path);

    // 6. 디버깅 로그 출력
    console.log("==============================================");
    console.log("=== Lead Magnet Download Debugging ===");
    console.log(`- lead_magnet_id: ${magnet.id}`);
    console.log(`- slug: ${slug}`);
    console.log(`- raw pdf_path: ${magnet.pdf_path}`);
    console.log(`- normalized pdf_path: ${normalizedPath}`);
    console.log(`- bucket name: lead-magnets`);

    if (!normalizedPath) {
      console.error("- Supabase error message: Normalized pdf_path is empty.");
      console.log("==============================================");
      return NextResponse.json({ 
        success: false, 
        error: "PDF 파일 경로가 올바르지 않습니다. 관리자에게 문의해주세요." 
      }, { status: 400 });
    }

    // 4. signed URL 생성 호출 ( lead-magnets 버킷 기준 10분 유효 링크 생성 )
    const cleanUrl = supabaseUrl.trim().replace(/\/$/, "");
    const signUrl = `${cleanUrl}/storage/v1/object/sign/lead-magnets/${normalizedPath}`;
    const signResponse = await fetch(signUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseKey.trim()}`,
        "apikey": supabaseKey.trim(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiresIn: 600, // 10분 (60 * 10)
      }),
    });

    const isSuccess = signResponse.ok;
    console.log(`- signed URL 생성 성공/실패 여부: ${isSuccess ? "성공" : "실패"}`);

    if (!isSuccess) {
      const signError = await signResponse.text();
      // 6. 7. 서버 로그에는 실제 Supabase error를 남김
      console.error(`- Supabase error message: ${signError}`);
      console.log("==============================================");
      
      // 7. 프론트에는 사용자 친화적인 에러 전달
      return NextResponse.json({ 
        success: false, 
        error: "PDF 파일 경로가 올바르지 않습니다. 관리자에게 문의해주세요." 
      }, { status: 400 });
    }

    const signResult = await signResponse.json();
    let signedUrl = signResult.signedURL || signResult.signedUrl;

    if (!signedUrl) {
      console.error("- Supabase error message: Signed URL is not in payload");
      console.log("==============================================");
      return NextResponse.json({ 
        success: false, 
        error: "PDF 파일 경로가 올바르지 않습니다. 관리자에게 문의해주세요." 
      }, { status: 400 });
    }

    // 만약 signedUrl이 완전한 URL이 아니라 경로만 반환되었을 경우 풀 URL 생성
    if (signedUrl.startsWith("/")) {
      if (!signedUrl.startsWith("/storage/v1/")) {
        signedUrl = `${cleanUrl}/storage/v1${signedUrl}`;
      } else {
        signedUrl = `${cleanUrl}${signedUrl}`;
      }
    } else if (!signedUrl.startsWith("http")) {
      if (!signedUrl.startsWith("storage/v1/")) {
        signedUrl = `${cleanUrl}/storage/v1/${signedUrl}`;
      } else {
        signedUrl = `${cleanUrl}/${signedUrl}`;
      }
    }

    console.log(`- signed URL 생성 결과 주소: ${signedUrl}`);
    console.log("==============================================");

    // 7. 성공 시 signedUrl 및 관련 백도화 주소(related_url) 반환
    return NextResponse.json({
      success: true,
      title: magnet.title,
      signedUrl,
      relatedUrl: magnet.related_url || null,
    });

  } catch (error) {
    console.error("Lead magnet submission error:", error);
    return NextResponse.json(
      { success: false, error: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
