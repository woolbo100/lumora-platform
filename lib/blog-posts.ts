import { getCategoryMeta, isBlogCategory } from "@/data/blogCategories";
import { supabaseRestRequest } from "@/lib/supabase";
import type {
  BlogCategory,
  BlogPost,
  BlogPostStatus,
  CreateBlogPostInput,
} from "@/types/blog";

type SupabasePostRow = {
  title: string;
  slug: string;
  category: string;
  status?: string;
  summary?: string | null;
  meta_description?: string | null;
  image_alt_text?: string | null;
  ai_generated?: boolean | null;
  content: string;
  created_at: string;
  updated_at?: string | null;
  image_url?: string | null;
};

function isMissingColumnError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return (
    message.includes("column posts.status does not exist") ||
    message.includes("column posts.image_alt_text does not exist") ||
    message.includes("column posts.ai_generated does not exist") ||
    message.includes("column posts.updated_at does not exist")
  );
}

function resolvePostStatus(value: string | undefined): BlogPostStatus {
  return value === "published" ? "published" : "draft";
}

function mapPost(row: SupabasePostRow): BlogPost {
  if (!isBlogCategory(row.category)) {
    throw new Error(`Unsupported category value: ${row.category}`);
  }

  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    status: resolvePostStatus(row.status),
    summary: row.summary ?? null,
    metaDescription: row.meta_description ?? null,
    imageAltText: row.image_alt_text ?? null,
    aiGenerated: Boolean(row.ai_generated),
    content: row.content,
    publishedAt: row.created_at,
    updatedAt: row.updated_at ?? null,
    imageUrl: row.image_url ?? null,
  };
}

function buildPostsQuery(
  category?: BlogCategory,
  options?: { includeDrafts?: boolean },
) {
  const query = new URLSearchParams({
    select:
      "title,slug,category,status,summary,meta_description,image_alt_text,ai_generated,content,created_at,updated_at,image_url",
    order: "created_at.desc",
  });

  if (category) {
    query.set("category", `eq.${category}`);
  }

  if (!options?.includeDrafts) {
    query.set("status", "eq.published");
  }

  return `posts?${query.toString()}`;
}

function buildLegacyPostsQuery(category?: BlogCategory) {
  const query = new URLSearchParams({
    select: "title,slug,category,summary,meta_description,content,created_at,image_url",
    order: "created_at.desc",
  });

  if (category) {
    query.set("category", `eq.${category}`);
  }

  return `posts?${query.toString()}`;
}

export async function listBlogPosts(
  category?: BlogCategory,
  options?: { includeDrafts?: boolean },
) {
  try {
    const response = await supabaseRestRequest(buildPostsQuery(category, options));
    const rows = (await response.json()) as SupabasePostRow[];

    return rows.map(mapPost);
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }

    const fallbackResponse = await supabaseRestRequest(buildLegacyPostsQuery(category));
    const fallbackRows = (await fallbackResponse.json()) as SupabasePostRow[];

    return fallbackRows.map(mapPost);
  }
}

export async function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  try {
    const query = new URLSearchParams({
      select:
        "title,slug,category,status,summary,meta_description,image_alt_text,ai_generated,content,created_at,updated_at,image_url",
      slug: `eq.${slug}`,
      limit: "1",
    });

    if (!options?.includeDrafts) {
      query.set("status", "eq.published");
    }

    const response = await supabaseRestRequest(`posts?${query.toString()}`);
    const rows = (await response.json()) as SupabasePostRow[];

    return rows[0] ? mapPost(rows[0]) : undefined;
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }

    const fallbackQuery = new URLSearchParams({
      select: "title,slug,category,summary,meta_description,content,created_at,image_url",
      slug: `eq.${slug}`,
      limit: "1",
    });

    const fallbackResponse = await supabaseRestRequest(`posts?${fallbackQuery.toString()}`);
    const fallbackRows = (await fallbackResponse.json()) as SupabasePostRow[];

    return fallbackRows[0] ? mapPost(fallbackRows[0]) : undefined;
  }
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
  const now = new Date().toISOString();

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
        status: input.status ?? "draft",
        summary: input.summary?.trim() || null,
        meta_description: input.metaDescription?.trim() || null,
        image_alt_text: input.imageAltText?.trim() || null,
        ai_generated: Boolean(input.aiGenerated),
        content: input.content,
        updated_at: now,
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
  const now = new Date().toISOString();
  const query = new URLSearchParams({
    slug: `eq.${originalSlug}`,
    select:
      "title,slug,category,status,summary,meta_description,image_alt_text,ai_generated,content,created_at,updated_at,image_url",
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
        status: input.status ?? "draft",
        summary: input.summary?.trim() || null,
        meta_description: input.metaDescription?.trim() || null,
        image_alt_text: input.imageAltText?.trim() || null,
        ai_generated: Boolean(input.aiGenerated),
        content: input.content,
        updated_at: now,
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
