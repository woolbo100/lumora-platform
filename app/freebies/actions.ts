"use server";

import { supabaseRestRequest } from "@/lib/supabase";

/**
 * 무료 PDF 다운로드 신청 처리
 */
export async function submitFreebieDownload(data: {
  email: string;
  name: string;
  freebieId: string;
  freebieTitle: string;
  freebieCategory: string;
  marketingAgree: boolean;
  testResult?: string;
  customSource?: string;
}) {
  try {
    // 1. leads 테이블에 고객 정보 저장
    await supabaseRestRequest("leads", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        name: data.name || null,
        source: data.customSource || "무료 PDF 다운로드",
        interest: data.freebieCategory || null,
        test_result: data.testResult || null,
        downloaded_pdf: data.freebieTitle,
        marketing_agree: data.marketingAgree,
        clicked_baekdohwa: false
      })
    });

    // 2. 해당 자료의 다운로드 수 1 증가 (fetch-then-patch 방식)
    const res = await supabaseRestRequest(`freebies?id=eq.${data.freebieId}&select=download_count`);
    const freebie = await res.json();
    
    if (freebie && freebie.length > 0) {
      const newCount = (freebie[0].download_count || 0) + 1;
      await supabaseRestRequest(`freebies?id=eq.${data.freebieId}`, {
        method: "PATCH",
        body: JSON.stringify({ download_count: newCount })
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Freebie Download Submit Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다." };
  }
}
