import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      error: "Missing env vars",
      urlExists: !!supabaseUrl,
      keyExists: !!supabaseKey
    });
  }

  const cleanUrl = supabaseUrl.trim().replace(/\/$/, "");
  const listUrl = `${cleanUrl}/storage/v1/object/list/lead-magnets`;

  try {
    const response = await fetch(listUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseKey.trim()}`,
        "apikey": supabaseKey.trim(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prefix: "",
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errText
      });
    }

    const files = await response.json();

    // 임시 테스트용 서명 URL 발급 (magnetic-woman-attraction-capital.pdf 대상)
    const testPath = "magnetic-woman-attraction-capital.pdf";
    const signUrl = `${cleanUrl}/storage/v1/object/sign/lead-magnets/${testPath}`;
    
    const signResponse = await fetch(signUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseKey.trim()}`,
        "apikey": supabaseKey.trim(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiresIn: 600,
      }),
    });

    let signResult = null;
    let finalSignedUrl = null;
    let rawSignUrlResponseStatus = signResponse.status;

    if (signResponse.ok) {
      signResult = await signResponse.json();
      let signedUrl = signResult.signedURL || signResult.signedUrl;
      
      if (signedUrl) {
        // 경로 조립 디버깅용
        finalSignedUrl = signedUrl;
        if (signedUrl.startsWith("/")) {
          finalSignedUrl = `${cleanUrl}${signedUrl}`;
        } else if (!signedUrl.startsWith("http")) {
          finalSignedUrl = `${cleanUrl}/storage/v1/${signedUrl}`; // 슬래시 보정 포함
        }
      }
    } else {
      signResult = await signResponse.text();
    }

    return NextResponse.json({
      success: true,
      files,
      debugSign: {
        status: rawSignUrlResponseStatus,
        rawResult: signResult,
        finalUrl: finalSignedUrl
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
