import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/types/blog";

type BlogPostGridProps = {
  posts: BlogPost[];
};

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/14 bg-white/4 px-6 py-12 text-center text-[var(--foreground-soft)]">
        No posts match the current filter yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
