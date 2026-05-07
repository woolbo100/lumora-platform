import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminPage() {
  const session = await getAdminSession();

  // 로그인 상태가 아니면 로그인 페이지로, 
  // 로그인 상태면 바로 리드 관리(leads) 페이지로 보냅니다.
  if (!session) {
    redirect("/admin/login");
  } else {
    redirect("/admin/leads");
  }
}
