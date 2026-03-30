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
  description: "Update an existing blog post as an administrator.",
};

type BlogEditPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string | string[]; message?: string | string[] }>;
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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message)
    ? query.message[0]
    : query.message;

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
            Update the post and save changes back to the Supabase `posts`
            table.
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
          submitLabel="Update Post"
          initialValues={{
            originalSlug: post.slug,
            title: post.title,
            slug: post.slug,
            category: post.category,
            imageUrl: post.imageUrl ?? "",
            content: post.content,
          }}
        />
      </GlassPanel>
    </main>
  );
}
