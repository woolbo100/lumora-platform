"use client";

import { useState, useEffect } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost, BlogCategory } from "@/types/blog";

// 초기 노출 개수 및 추가 로드 개수 설정
const INITIAL_POST_COUNT = 9;
const LOAD_MORE_COUNT = 9;

type BlogPostGridProps = {
  posts: BlogPost[];
  activeCategory?: BlogCategory;
};

export function BlogPostGrid({ posts, activeCategory }: BlogPostGridProps) {
  // 현재 노출 중인 글의 개수 상태
  const [visibleCount, setVisibleCount] = useState(INITIAL_POST_COUNT);

  // 카테고리가 변경될 때 노출 개수를 초기값으로 리셋
  useEffect(() => {
    setVisibleCount(INITIAL_POST_COUNT);
  }, [activeCategory]);

  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/14 bg-white/4 px-6 py-12 text-center text-[var(--foreground-soft)]">
        선택한 카테고리에 아직 등록된 글이 없습니다.
      </div>
    );
  }

  // 현재 노출할 글 목록 필터링
  const visiblePosts = posts.slice(0, visibleCount);
  // 더 보여줄 글이 있는지 확인
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* 글 카드 그리드 */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* "더 많은 글보기" 버튼 (더 보여줄 글이 있을 때만 노출) */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            className="group relative flex min-h-[3.5rem] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-10 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(214,194,255,0.32)] hover:text-white hover:shadow-[0_0_40px_rgba(115,88,232,0.18)] active:scale-[0.98] sm:w-auto"
          >
            {/* 루모라 테마의 보라/오로라 계열 은은한 호버 효과 */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,rgba(115,88,232,0.12),rgba(186,155,255,0.12))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 -z-10 translate-y-full bg-[linear-gradient(to_top,rgba(214,194,255,0.08),transparent)] transition-transform duration-500 group-hover:translate-y-0" />
            
            더 많은 글보기
          </button>
        </div>
      )}
    </div>
  );
}
