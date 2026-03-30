import { getCategoryMeta, isBlogCategory } from "@/data/blogCategories";
import { supabaseRestRequest } from "@/lib/supabase";
import type { BlogCategory, BlogPost, CreateBlogPostInput } from "@/types/blog";

type SupabasePostRow = {
  title: string;
  slug: string;
  category: string;
  content: string;
  created_at: string;
  image_url?: string | null;
};

function mapPost(row: SupabasePostRow): BlogPost {
  if (!isBlogCategory(row.category)) {
    throw new Error(`Unsupported category value: ${row.category}`);
  }

  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    content: row.content,
    publishedAt: row.created_at,
    imageUrl: row.image_url ?? null,
  };
}

function buildPostsQuery(category?: BlogCategory) {
  const query = new URLSearchParams({
    select: "title,slug,category,content,created_at,image_url",
    order: "created_at.desc",
  });

  if (category) {
    query.set("category", `eq.${category}`);
  }

  return `posts?${query.toString()}`;
}

export async function listBlogPosts(category?: BlogCategory) {
  const response = await supabaseRestRequest(buildPostsQuery(category));
  const rows = (await response.json()) as SupabasePostRow[];

  return rows.map(mapPost);
}

export async function getBlogPostBySlug(slug: string) {
  const query = new URLSearchParams({
    select: "title,slug,category,content,created_at,image_url",
    slug: `eq.${slug}`,
    limit: "1",
  });

  const response = await supabaseRestRequest(`posts?${query.toString()}`);
  const rows = (await response.json()) as SupabasePostRow[];

  return rows[0] ? mapPost(rows[0]) : undefined;
}

export async function listRelatedBlogPosts(
  category: BlogCategory,
  slug: string,
  limit = 3,
) {
  const posts = await listBlogPosts(category);

  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}

export async function createBlogPost(
  input: CreateBlogPostInput,
  authToken: string,
) {
  const response = await supabaseRestRequest(
    "posts",
    {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: input.title,
        slug: input.slug,
        category: input.category,
        content: input.content,
        image_url: input.imageUrl?.trim() || null,
      }),
    },
    authToken,
  );

  const rows = (await response.json()) as SupabasePostRow[];

  if (!rows[0]) {
    throw new Error("Insert returned no rows.");
  }

  return mapPost(rows[0]);
}

export async function updateBlogPost(
  originalSlug: string,
  input: CreateBlogPostInput,
  authToken: string,
) {
  const query = new URLSearchParams({
    slug: `eq.${originalSlug}`,
    select: "title,slug,category,content,created_at,image_url",
  });

  const response = await supabaseRestRequest(
    `posts?${query.toString()}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: input.title,
        slug: input.slug,
        category: input.category,
        content: input.content,
        image_url: input.imageUrl?.trim() || null,
      }),
    },
    authToken,
  );

  const rows = (await response.json()) as SupabasePostRow[];

  if (!rows[0]) {
    throw new Error("Update returned no rows.");
  }

  return mapPost(rows[0]);
}

export async function deleteBlogPost(slug: string, authToken: string) {
  const query = new URLSearchParams({
    slug: `eq.${slug}`,
  });

  await supabaseRestRequest(
    `posts?${query.toString()}`,
    {
      method: "DELETE",
      headers: {
        Prefer: "return=minimal",
      },
    },
    authToken,
  );
}

export function getBlogExcerpt(content: string) {
  return content.replace(/\s+/g, " ").trim().slice(0, 140);
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
    .filter(Boolean);
}
