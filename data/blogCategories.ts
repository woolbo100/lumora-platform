import type { BlogCategory } from "@/types/blog";

export const blogCategories: ReadonlyArray<{
  slug: BlogCategory;
  label: string;
  description: string;
}> = [
  {
    slug: "romance-reunion",
    label: "\uC5F0\uC560/\uC7AC\uD68C",
    description: "Relationship flow and reunion insights.",
  },
  {
    slug: "psychology-code",
    label: "\uC2EC\uB9AC\uCF54\uB4DC",
    description: "Patterns, attachment, and emotional habits.",
  },
  {
    slug: "attraction-self-esteem",
    label: "\uB9E4\uB825/\uC790\uC874\uAC10",
    description: "Presence, confidence, and self-worth rituals.",
  },
  {
    slug: "level-up-self-development",
    label: "\uB808\uBCA8\uC5C5\uC790\uAE30\uACC4\uBC1C",
    description: "Growth systems for focus, habits, and momentum.",
  },
  {
    slug: "mind-study",
    label: "\uB9C8\uC74C\uACF5\uBD80",
    description: "Gentle practices for emotional grounding.",
  },
];

export function getCategoryMeta(category: BlogCategory) {
  return blogCategories.find((item) => item.slug === category) ?? blogCategories[0];
}

export function isBlogCategory(value: string): value is BlogCategory {
  return blogCategories.some((item) => item.slug === value);
}
