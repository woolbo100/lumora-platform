import Link from "next/link";

import { deleteBlogPostAction } from "@/app/blog/actions";
import { getCategoryMeta } from "@/data/blogCategories";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import {
  getBlogHeroLabel,
  getBlogParagraphs,
  getBlogReadTime,
} from "@/lib/blog-posts";
import type { BlogPost } from "@/types/blog";

type BlogPostDetailProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  canManage?: boolean;
  error?: string;
  message?: string;
};

export function BlogPostDetail({
  post,
  relatedPosts,
  canManage = false,
  error,
  message,
}: BlogPostDetailProps) {
  const category = getCategoryMeta(post.category);
  const paragraphs = getBlogParagraphs(post.content);
  const publishedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="overflow-hidden">
        <div className="relative p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,131,235,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(120,162,255,0.14),transparent_28%)]" />

          <div className="relative space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-[var(--foreground-muted)] transition hover:text-white"
            >
              Back to blog
            </Link>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                {getBlogHeroLabel(post.category)}
              </p>
              <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-sm text-[var(--foreground-soft)]">
                {category.label}
              </span>
              <h1 className="max-w-3xl font-display text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {paragraphs[0] ?? "No content available."}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--foreground-muted)]">
              <time dateTime={post.publishedAt}>{publishedDate}</time>
              <span className="text-white/20">•</span>
              <span>{getBlogReadTime(post.content)} read</span>
            </div>

            {canManage ? (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/blog/${post.slug}/edit`}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[var(--foreground-soft)] uppercase transition hover:bg-white/10"
                >
                  Edit post
                </Link>
                <form action={deleteBlogPostAction}>
                  <input type="hidden" name="slug" value={post.slug} />
                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-rose-100 uppercase transition hover:bg-rose-400/20"
                  >
                    Delete post
                  </button>
                </form>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {error}
                {message ? (
                  <p className="mt-2 break-words text-rose-50/90">{message}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <GlassPanel className="p-8 sm:p-10">
          <article className="space-y-6">
            {post.imageUrl ? (
              <div className="overflow-hidden rounded-[28px] border border-white/10">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="max-h-[28rem] w-full object-cover"
                />
              </div>
            ) : null}

            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-[var(--foreground-soft)]"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
                QUICK NOTES
              </p>
              <h2 className="font-display text-2xl text-[var(--foreground)]">
                About this post
              </h2>
              <div className="space-y-3 text-sm leading-7 text-[var(--foreground-soft)]">
                <p>Category: {category.label}</p>
                <p>Published: {publishedDate}</p>
                <p>Reading time: {getBlogReadTime(post.content)}</p>
              </div>
              <CTAButton href="/blog" variant="secondary" className="w-full">
                Browse more posts
              </CTAButton>
            </div>
          </GlassPanel>

          {relatedPosts.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2 px-1">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
                  RELATED POSTS
                </p>
                <h2 className="font-display text-2xl text-[var(--foreground)]">
                  More in this category
                </h2>
              </div>

              <div className="grid gap-4">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
