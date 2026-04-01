import Link from "next/link";

import { getCategoryMeta } from "@/data/blogCategories";
import { GlassPanel } from "@/components/shared/GlassPanel";
import {
  getBlogExcerpt,
  getBlogHeroLabel,
  getBlogReadTime,
} from "@/lib/blog-posts";
import type { BlogPost } from "@/types/blog";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const category = getCategoryMeta(post.category);
  const excerpt = post.summary?.trim() || getBlogExcerpt(post.content);
  const readTime = getBlogReadTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlassPanel className="flex h-full flex-col p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
        {post.imageUrl ? (
          <div className="mb-5 overflow-hidden rounded-[22px] border border-white/10">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}

        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs tracking-[0.18em] text-[var(--color-secondary)] uppercase">
            {category.label}
          </span>
          <span className="text-xs text-[var(--foreground-muted)]">
            {readTime}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--foreground-muted)]">
            {getBlogHeroLabel(post.category)}
          </p>
          <h2 className="font-display text-2xl leading-tight text-[var(--foreground)]">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-7 text-[var(--foreground-soft)]">
            {excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-sm text-[var(--foreground-muted)]">
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(post.publishedAt))}
          </time>
        </div>
      </GlassPanel>
    </Link>
  );
}
