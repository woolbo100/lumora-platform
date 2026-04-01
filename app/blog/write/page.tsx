import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { adminLogoutAction } from "@/app/admin/actions";
import { createBlogPostAction } from "@/app/blog/actions";
import { BlogComposerForm } from "@/components/blog/BlogComposerForm";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { hasSupabaseConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "블로그 글쓰기 | LUMORA",
  description:
    "AI 보조 초안을 생성하고 검토한 뒤, Supabase posts 테이블에 임시저장 또는 발행할 수 있습니다.",
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
      ? "초안이 저장되었습니다. 이 페이지에서 계속 수정할 수 있습니다."
      : undefined;
  const isConfigured = hasSupabaseConfig();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8">
      <GlassPanel className="p-8 sm:p-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            블로그 작성
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            블로그 글쓰기
          </h1>
          <p className="text-base leading-8 text-[var(--foreground-soft)]">
            키워드로 AI 초안을 만든 뒤 에디터에 채우거나, 직접 제목과 본문을 입력해
            저장할 수 있습니다. 자동 발행은 하지 않으며, 반드시 검토 후 저장/발행합니다.
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">
            로그인 계정: {session.email}
          </p>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--foreground-soft)] uppercase transition hover:bg-white/10"
            >
              로그아웃
            </button>
          </form>
        </div>
      </GlassPanel>

      {!isConfigured ? (
        <GlassPanel className="p-6">
          <p className="text-sm leading-7 text-[var(--foreground-soft)]">
            `.env.local`에 `SUPABASE_URL`과 Supabase 키가 설정되기 전까지는 저장이
            비활성화됩니다.
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
