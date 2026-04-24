"use client";

import Link from "next/link";
import { blogCategories } from "@/data/blogCategories";
import { useLanguageStore } from "@/store/languageStore";
import type { BlogCategory } from "@/types/blog";

type BlogCategoryFilterProps = {
  activeCategory?: BlogCategory;
};

export function BlogCategoryFilter({
  activeCategory,
}: BlogCategoryFilterProps) {
  const { language } = useLanguageStore();
  const isEn = language === "en";

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/blog"
        className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition ${
          activeCategory === undefined
            ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/14 text-[var(--color-secondary)]"
            : "border-white/10 bg-white/5 text-[var(--foreground-soft)] hover:border-white/20 hover:bg-white/8"
        }`}
      >
        {isEn ? "All" : "전체"}
      </Link>

      {blogCategories.map((category) => (
        <Link
          key={category.slug}
          href={{ pathname: "/blog", query: { category: category.slug } }}
          className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition ${
            activeCategory === category.slug
              ? "border-[var(--color-primary-strong)] bg-[var(--color-primary-strong)]/18 text-white"
              : "border-white/10 bg-white/5 text-[var(--foreground-soft)] hover:border-white/20 hover:bg-white/8"
          }`}
        >
          {isEn ? category.enLabel : category.label}
        </Link>
      ))}
    </div>
  );
}

