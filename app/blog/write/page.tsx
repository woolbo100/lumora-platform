import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { adminLogoutAction } from "@/app/admin/actions";
import { createBlogPostAction } from "@/app/blog/actions";
import { BlogComposerForm } from "@/components/blog/BlogComposerForm";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { hasSupabaseConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Write Blog Post | LUMORA",
  description: "Create, review, and save AI-assisted blog drafts in the Supabase posts table.",
};

type BlogWritePageProps = {
  searchParams: Promise<{
    error?: string | string[];
    message?: string | string[];
    saved?: string | string[];
  }>;
};

export default async function BlogWritePage({
  searchParams,
}: BlogWritePageProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const query = await searchParams;
  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message)
    ? query.message[0]
    : query.message;
  const saved = Array.isArray(query.saved) ? query.saved[0] : query.saved;
  const successMessage =
    saved === "draft"
      ? "초안이 저장되었습니다. 계속 수정할 수 있습니다."
      : undefined;
  const isConfigured = hasSupabaseConfig();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8">
      <GlassPanel className="p-8 sm:p-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            BLOG COMPOSER
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            Write a blog post
          </h1>
          <p className="text-base leading-8 text-[var(--foreground-soft)]">
            키워드로 AI 초안을 먼저 생성해 에디터에 채우거나, 직접 제목과 본문을 작성해
            저장할 수 있습니다. 자동 발행은 하지 않으며 검토 후 직접 저장하는 흐름입니다.
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">
            Signed in as {session.email}
          </p>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--foreground-soft)] uppercase transition hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </div>
      </GlassPanel>

      {!isConfigured ? (
        <GlassPanel className="p-6">
          <p className="text-sm leading-7 text-[var(--foreground-soft)]">
            Saving is disabled until `SUPABASE_URL` and a Supabase key are set
            in `.env.local`.
          </p>
        </GlassPanel>
      ) : null}

      <GlassPanel className="p-8 sm:p-10">
        <BlogComposerForm
          action={createBlogPostAction}
          error={error}
          message={message}
          successMessage={successMessage}
        />
      </GlassPanel>
    </main>
  );
}
