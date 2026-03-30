export type BlogCategory =
  | "romance-reunion"
  | "tarot-saju"
  | "psychology-code"
  | "mind-study";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  content: string;
  publishedAt: string;
  imageUrl?: string | null;
};

export type CreateBlogPostInput = {
  title: string;
  slug: string;
  category: BlogCategory;
  content: string;
  imageUrl?: string;
};
