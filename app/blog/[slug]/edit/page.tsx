import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { adminLogoutAction } from "@/app/admin/actions";
import { updateBlogPostAction } from "@/app/blog/actions";
import { BlogComposerForm } from "@/components/blog/BlogComposerForm";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { getBlogPostBySlug } from "@/lib/blog-posts";
import { hasSupabaseConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Edit Blog Post | LUMORA",
  description: "Review and update an existing blog post with optional AI-assisted drafting support.",
};

type BlogEditPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    error?: string | string[];
    message?: string | string[];
    saved?: string | string[];
  }>;
};

export default async function BlogEditPage({
  params,
  searchParams,
}: BlogEditPageProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (!hasSupabaseConfig()) {
    notFound();
  }

  const { slug } = await params;
  const query = await searchParams;
  const post = await getBlogPostBySlug(slug, { includeDrafts: true });

  if (!post) {
    notFound();
  }

  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message)
    ? query.message[0]
    : query.message;
  const saved = Array.isArray(query.saved) ? query.saved[0] : query.saved;
  const successMessage =
    saved === "draft"
      ? "초안이 저장되었습니다. 이 페이지에서 바로 계속 수정할 수 있습니다."
      : undefined;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8">
      <GlassPanel className="p-8 sm:p-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            BLOG EDITOR
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            Edit blog post
          </h1>
          <p className="text-base leading-8 text-[var(--foreground-soft)]">
            기존 글을 직접 수정하거나 AI 초안을 다시 생성해 에디터에 채운 뒤, 검토 후
            저장할 수 있습니다.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--foreground-muted)]">
            <span>Signed in as {session.email}</span>
            <span className="text-white/20">•</span>
            <Link
              href={`/blog/${post.slug}`}
              className="transition hover:text-white"
            >
              View post
            </Link>
          </div>
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

      <GlassPanel className="p-8 sm:p-10">
        <BlogComposerForm
          action={updateBlogPostAction}
          error={error}
          message={message}
          successMessage={successMessage}
          submitLabel="Update Post"
          initialValues={{
            originalSlug: post.slug,
            title: post.title,
            slug: post.slug,
            category: post.category,
            summary: post.summary ?? "",
            metaDescription: post.metaDescription ?? "",
            imageUrl: post.imageUrl ?? "",
            content: post.content,
          }}
        />
      </GlassPanel>
    </main>
  );
}
