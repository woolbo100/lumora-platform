"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";

/**
 * 무료 자료 등록 및 수정
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
  const file_url = formData.get("file_url")?.toString() || "";
  const related_baekdohwa_url = formData.get("related_baekdohwa_url")?.toString() || "";
  const is_active = formData.get("is_active") === "true";
  const sort_order = parseInt(formData.get("sort_order")?.toString() || "0", 10);

  const body = {
    title,
    slug,
    description,
    category,
    thumbnail_url,
    file_url,
    related_baekdohwa_url,
    is_active,
    sort_order
  };

  try {
    if (id && id !== "new") {
      // 수정 (PATCH)
      await supabaseRestRequest(`freebies?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } else {
      // 신규 등록 (POST)
      await supabaseRestRequest("freebies", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  } catch (error) {
    console.error("Freebie Upsert Error:", error);
    throw error;
  }

  revalidatePath("/admin/freebies");
  revalidatePath("/freebies");
  redirect("/admin/freebies");
}

/**
 * 무료 자료 삭제
 */
export async function deleteFreebieAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("관리자 권한이 필요합니다.");

  const id = formData.get("id")?.toString();
  if (!id) return;

  try {
    await supabaseRestRequest(`freebies?id=eq.${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Freebie Delete Error:", error);
    throw error;
  }

  revalidatePath("/admin/freebies");
  revalidatePath("/freebies");
  redirect("/admin/freebies");
}
