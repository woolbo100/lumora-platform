import { cookies } from "next/headers";

import { readSupabasePublicConfig } from "@/lib/supabase";

const ADMIN_ACCESS_TOKEN_COOKIE = "lumora_admin_access_token";
const ADMIN_REFRESH_TOKEN_COOKIE = "lumora_admin_refresh_token";

type AdminSession = {
  email: string;
  accessToken: string;
};

function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? null;
}

export function hasAdminEmailConfig() {
  return Boolean(getAdminEmail());
}

async function fetchSupabaseAuthUser(accessToken: string) {
  const config = readSupabasePublicConfig();

  if (!config) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY for admin auth.",
    );
  }

  const response = await fetch(`${config.url}/auth/v1/user`, {
    method: "GET",
    cache: "no-store",
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as { email?: string } | null;
}

export async function getAdminSession() {
  const adminEmail = getAdminEmail();

  if (!adminEmail) {
    return null;
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return null;
  }

  const user = await fetchSupabaseAuthUser(accessToken);
  const email = user?.email?.toLowerCase();

  if (!email || email !== adminEmail) {
    return null;
  }

  return {
    email,
    accessToken,
  } satisfies AdminSession;
}

export async function createAdminSession(email: string, password: string) {
  const adminEmail = getAdminEmail();
  const config = readSupabasePublicConfig();

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL configuration.");
  }

  if (!config) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY for admin auth.",
    );
  }

  if (email.trim().toLowerCase() !== adminEmail) {
    throw new Error("This account is not allowed to manage the blog.");
  }

  const response = await fetch(
    `${config.url}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        apikey: config.publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error_description?: string;
    error?: string;
    user?: { email?: string };
  };

  if (!response.ok || !payload.access_token) {
    throw new Error(
      payload.error_description ?? payload.error ?? "Admin login failed.",
    );
  }

  if (payload.user?.email?.toLowerCase() !== adminEmail) {
    throw new Error("This account is not allowed to manage the blog.");
  }

  const cookieStore = await cookies();
  const maxAge = payload.expires_in ?? 60 * 60;
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, payload.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge,
  });

  if (payload.refresh_token) {
    cookieStore.set(ADMIN_REFRESH_TOKEN_COOKIE, payload.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_ACCESS_TOKEN_COOKIE);
  cookieStore.delete(ADMIN_REFRESH_TOKEN_COOKIE);
}
