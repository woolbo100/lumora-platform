"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";

/**
 * 무료 자료 등록 및 수정 (lead_magnets 테이블 대상)
 */
export async function upsertFreebieAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("관리자 권한이 필요합니다.");

  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() || "";
  const slug = formData.get("slug")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const category = formData.get("category")?.toString() || "";
  const thumbnail_url = formData.get("thumbnail_url")?.toString() || "";
  const pdf_path = formData.get("pdf_path")?.toString() || "";
  const related_url = formData.get("related_url")?.toString() || "";
  const is_active = formData.get("is_active") === "true";
  const sort_order = parseInt(formData.get("sort_order")?.toString() || "0", 10);

  const body = {
    title,
    slug,
    description,
    category,
    thumbnail_url,
    pdf_path,
    related_url,
    is_active,
    sort_order
  };

  try {
    if (id && id !== "new") {
      // 수정 (PATCH)
      await supabaseRestRequest(`lead_magnets?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } else {
      // 신규 등록 (POST)
      await supabaseRestRequest("lead_magnets", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  } catch (error) {
    console.error("LeadMagnet Upsert Error:", error);
    throw new Error(
      `무료 자료 저장에 실패했습니다. 데이터베이스의 'lead_magnets' 테이블이 생성되지 않았거나 권한이 부족할 수 있습니다. Supabase 대시보드의 [SQL Editor]에서 테이블 생성 스크립트(lead_magnets_setup.sql)를 정상적으로 실행(Run)하셨는지 다시 한번 점검해 주세요. (상세 에러: ${error instanceof Error ? error.message : String(error)})`
    );
  }

  revalidatePath("/admin/freebies");
  revalidatePath("/freebies");
  redirect("/admin/freebies");
}

/**
 * 무료 자료 삭제 (lead_magnets 테이블 대상)
 */
export async function deleteFreebieAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("관리자 권한이 필요합니다.");

  const id = formData.get("id")?.toString();
  if (!id) return;

  try {
    await supabaseRestRequest(`lead_magnets?id=eq.${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("LeadMagnet Delete Error:", error);
    throw error;
  }

  revalidatePath("/admin/freebies");
  revalidatePath("/freebies");
  redirect("/admin/freebies");
}
