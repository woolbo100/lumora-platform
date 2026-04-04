import type { Metadata } from "next";

import { blogCategories, isBlogCategory } from "@/data/blogCategories";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { listBlogPosts } from "@/lib/blog-posts";
import { hasSupabaseConfig } from "@/lib/supabase";
import type { BlogCategory } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog | LUMORA",
  description:
    "Browse blog posts from Supabase with category filters and slug-based detail pages.",
  openGraph: {
    title: "Blog | LUMORA",
    description:
      "Browse blog posts from Supabase with category filters and slug-based detail pages.",
    type: "website",
    url: "https://lumoracode.kr/blog",
  },
};

export const dynamic = "force-dynamic";

type BlogPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function getSelectedCategory(
  categoryParam: string | string[] | undefined,
): BlogCategory | undefined {
  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;

  if (category && isBlogCategory(category)) {
    return category;
  }

  return undefined;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const selectedCategory = getSelectedCategory(category);
  const isConfigured = hasSupabaseConfig();
  const adminSession = await getAdminSession();
  let posts = [] as Awaited<ReturnType<typeof listBlogPosts>>;
  let fetchError: string | null = null;

  if (isConfigured) {
    try {
      posts = await listBlogPosts(selectedCategory, {
        includeDrafts: Boolean(adminSession),
      });
    } catch (error) {
      fetchError =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while loading blog posts.";
    }
  }
  const selectedCategoryMeta = selectedCategory
    ? blogCategories.find((item) => item.slug === selectedCategory)
    : undefined;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="overflow-hidden">
        <section className="relative px-8 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,131,235,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,162,255,0.14),transparent_28%)]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                EDITORIAL ARCHIVE
              </p>
              <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
                Blog backed by Supabase
              </h1>
              <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                Posts are loaded from the `posts` table, filtered by category,
                and linked to slug-based detail pages in the App Router.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/10 px-5 py-4 text-sm text-[var(--foreground-soft)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                POSTS
              </p>
              <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
                {posts.length}
              </p>
              <p className="mt-1">
                {selectedCategoryMeta
                  ? `${selectedCategoryMeta.label} selected`
                  : "All categories"}
              </p>
            </div>
          </div>
        </section>
      </GlassPanel>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-2xl text-[var(--foreground)]">
              Filter by category
            </h2>
            <p className="text-sm leading-7 text-[var(--foreground-soft)]">
              Choose a category to narrow the list to matching posts only.
            </p>
            {adminSession ? (
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                Admin mode active
              </p>
            ) : null}
          </div>
          {adminSession ? (
            <CTAButton href="/blog/write" variant="secondary">
              Write a post
            </CTAButton>
          ) : null}
        </div>
        <BlogCategoryFilter activeCategory={selectedCategory} />
      </section>

      {!isConfigured ? (
        <GlassPanel className="p-6">
          <p className="text-sm leading-7 text-[var(--foreground-soft)]">
            Supabase is not configured yet. Add `SUPABASE_URL` and
            `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_PUBLISHABLE_KEY` to
            `.env.local` to load posts from the database.
          </p>
        </GlassPanel>
      ) : null}

      {fetchError ? (
        <GlassPanel className="p-6">
          <p className="text-sm leading-7 text-[var(--foreground-soft)]">
            Blog posts could not be loaded right now. Please try again shortly.
          </p>
          {adminSession ? (
            <p className="mt-3 text-xs leading-6 text-[var(--foreground-muted)]">
              Debug: {fetchError}
            </p>
          ) : null}
        </GlassPanel>
      ) : null}

      <BlogPostGrid posts={posts} />
    </main>
  );
}
