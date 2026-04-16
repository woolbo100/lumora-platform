import type { Metadata } from "next";

import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { isBlogCategory } from "@/data/blogCategories";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { listBlogPosts } from "@/lib/blog-posts";
import type { BlogCategory } from "@/types/blog";

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
  const selectedCategory = getSelectedCategory(category);
  let posts = [] as Awaited<ReturnType<typeof listBlogPosts>>;
  let fetchError: string | null = null;

  try {
    posts = await listBlogPosts(selectedCategory);
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while loading blog posts.";
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pt-28 pb-12 sm:px-8 sm:pt-32 lg:px-12">
      <GlassPanel className="overflow-hidden">
        <section className="relative px-8 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,131,235,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,162,255,0.14),transparent_28%)]" />

          <div className="relative">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                LUMORA JOURNAL
              </p>
              <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
                루모라 블로그
              </h1>
              <p className="text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                루모라는 관계와 감정, 자기 이해에 관한 이야기를 더 선명하게
                정리해 나갑니다. 지금의 마음을 읽고 다음 선택을 돕는 글을
                카테고리별로 편하게 둘러보세요.
              </p>
            </div>
          </div>
        </section>
      </GlassPanel>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-2xl text-[var(--foreground)]">
              카테고리별 보기
            </h2>
            <p className="text-sm leading-7 text-[var(--foreground-soft)]">
              연애/재회, 타로/사주, 심리코드, 매력/자존감, 레벨업자기계발,
              마음공부 카테고리를 빠르게 둘러볼 수 있습니다.
            </p>
          </div>
        </div>
        <BlogCategoryFilter activeCategory={selectedCategory} />
      </section>

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
