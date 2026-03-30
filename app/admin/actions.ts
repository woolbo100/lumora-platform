"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  hasAdminEmailConfig,
} from "@/lib/admin-auth";

export async function adminLoginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!hasAdminEmailConfig()) {
    redirect("/admin/login?error=missing-admin-email");
  }

  if (!email || !password) {
    redirect("/admin/login?error=missing-credentials");
  }

  try {
    await createAdminSession(email, password);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Admin login failed.";

    redirect(
      `/admin/login?error=login-failed&message=${encodeURIComponent(message.slice(0, 500))}`,
    );
  }

  redirect("/blog/write");
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
