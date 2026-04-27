import { getCategoryMeta } from "@/data/blogCategories";
import type { BlogCategory } from "@/types/blog";

export function getBlogExcerpt(content: string) {
  return content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

export function getBlogReadTime(content: string) {
  const readingMinutes = Math.max(
    1,
    Math.ceil(content.trim().split(/\s+/).length / 220),
  );

  return `${readingMinutes} min`;
}

export function getBlogHeroLabel(category: BlogCategory) {
  const meta = getCategoryMeta(category);

  return meta.label.toUpperCase();
}

export function getBlogParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => paragraph.replace(/^#{1,6}\s+/gm, "").trim());
}
