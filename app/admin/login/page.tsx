import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { adminLoginAction } from "@/app/admin/actions";
import { GlassPanel } from "@/components/shared/GlassPanel";
import {
  getAdminSession,
  hasAdminEmailConfig,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | LUMORA",
  description: "Administrator access for the blog editor.",
};

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string | string[]; message?: string | string[] }>;
};

const errorMessages: Record<string, string> = {
  "missing-admin-email": "Set ADMIN_EMAIL in .env.local first.",
  "missing-credentials": "Enter both email and password.",
  "login-failed": "Admin login failed.",
  "login-required": "Sign in as the admin account to write posts.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/blog/write");
  }

  const query = await searchParams;
  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message)
    ? query.message[0]
    : query.message;
  const hasAdminConfig = hasAdminEmailConfig();

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-6 py-12 sm:px-8">
      <GlassPanel className="w-full p-8 sm:p-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            ADMIN ACCESS
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            Blog admin login
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--foreground-soft)]">
            Only the configured administrator account can access the blog write
            page and insert posts.
          </p>
        </div>

        {!hasAdminConfig ? (
          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            `ADMIN_EMAIL` is not configured yet.
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {errorMessages[error] ?? "Login failed."}
            {message ? <p className="mt-2 break-words text-rose-50/90">{message}</p> : null}
          </div>
        ) : null}

        <form action={adminLoginAction} className="mt-8 space-y-6">
          <label className="block space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[var(--foreground-soft)]">Password</span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--color-primary-strong)]"
              placeholder="Enter your Supabase Auth password"
            />
          </label>

          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(147,131,235,0.92),rgba(112,96,204,0.9)_52%,rgba(77,62,152,0.92))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[#fbf6f0] uppercase shadow-[0_20px_60px_rgba(88,69,173,0.36),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5"
          >
            Sign in
          </button>
        </form>
      </GlassPanel>
    </main>
  );
}
