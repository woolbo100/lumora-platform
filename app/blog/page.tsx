import type { Metadata } from "next";

import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { isBlogCategory } from "@/data/blogCategories";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { listBlogPosts } from "@/lib/blog-posts";
import type { BlogCategory } from "@/types/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";

import { getServerLanguage } from "@/lib/language";

export const metadata: Metadata = {
  title: "Blog | LUMORA",
  description:
    "루모라의 블로그 글을 마크다운 기반으로 카테고리별 탐색할 수 있는 페이지입니다.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | LUMORA",
    description:
      "루모라의 블로그 글을 마크다운 기반으로 카테고리별 탐색할 수 있는 페이지입니다.",
    type: "website",
    url: "https://lumoracode.kr/blog",
  },
};

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
  const language = await getServerLanguage();
  const selectedCategory = getSelectedCategory(category);
  let posts = [] as Awaited<ReturnType<typeof listBlogPosts>>;
  let fetchError: string | null = null;

  try {
    posts = await listBlogPosts(selectedCategory, { language });
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while loading blog posts.";
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pt-28 pb-12 sm:px-8 sm:pt-32 lg:px-12">
      <BlogHeader />
      <div className="-mt-16"> {/* Adjust spacing after moving header to component */}
        <BlogCategoryFilter activeCategory={selectedCategory} />
      </div>

      {fetchError ? (
        <GlassPanel className="p-6">
          <p className="text-sm leading-7 text-[var(--foreground-soft)]">
            블로그 글을 불러오지 못했습니다. `content/blog` 폴더와 `md` 파일
            형식을 확인해 주세요.
          </p>
          <p className="mt-3 text-xs leading-6 text-[var(--foreground-muted)]">
            Debug: {fetchError}
          </p>
        </GlassPanel>
      ) : null}

      <BlogPostGrid posts={posts} />
    </main>
  );
}
