import type { BlogCategory } from "@/types/blog";

export const blogCategories: ReadonlyArray<{
  slug: BlogCategory;
  label: string;
  enLabel: string;
  description: string;
}> = [
  {
    slug: "romance-reunion",
    label: "연애/재회",
    enLabel: "Relationship",
    description: "Relationship flow and reunion insights.",
  },
  {
    slug: "tarot-saju",
    label: "타로/사주",
    enLabel: "Tarot/Saju",
    description: "Tarot and saju readings for your current season.",
  },
  {
    slug: "psychology-code",
    label: "심리코드",
    enLabel: "Psychology",
    description: "Patterns, attachment, and emotional habits.",
  },
  {
    slug: "attraction-self-esteem",
    label: "매력/자존감",
    enLabel: "Attraction",
    description: "Presence, confidence, and self-worth rituals.",
  },
  {
    slug: "level-up-self-development",
    label: "레벨업자기계발",
    enLabel: "Growth",
    description: "Growth systems for focus, habits, and momentum.",
  },
  {
    slug: "mind-study",
    label: "마음공부",
    enLabel: "Mindfulness",
    description: "Gentle practices for emotional grounding.",
  },
];

export function getCategoryMeta(category: BlogCategory) {
  return blogCategories.find((item) => item.slug === category) ?? blogCategories[0];
}

export function isBlogCategory(value: string): value is BlogCategory {
  return blogCategories.some((item) => item.slug === value);
}
