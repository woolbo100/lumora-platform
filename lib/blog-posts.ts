import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { isBlogCategory } from "@/data/blogCategories";
import type {
  BlogCategory,
  BlogPost,
  BlogPostStatus,
  CreateBlogPostInput,
} from "@/types/blog";

const BLOG_CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

type BlogFileFrontmatter = {
  title?: string;
  slug?: string;
  category?: string;
  summary?: string;
  metaDescription?: string;
  imageUrl?: string;
  imageAltText?: string;
  publishedAt?: string;
  updatedAt?: string;
  status?: string;
  aiGenerated?: string;
};

function resolvePostStatus(value: string | undefined): BlogPostStatus {
  return value === "draft" ? "draft" : "published";
}

function resolvePostCategory(value: string | undefined, fallback: BlogCategory) {
  if (value && isBlogCategory(value)) {
    return value;
  }

  return fallback;
}

function normalizeFrontmatterValue(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---\n")) {
    return {
      frontmatter: {} as BlogFileFrontmatter,
      content: source.trim(),
    };
  }

  const endIndex = source.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    return {
      frontmatter: {} as BlogFileFrontmatter,
      content: source.trim(),
    };
  }

  const rawFrontmatter = source.slice(4, endIndex);
  const content = source.slice(endIndex + 5).trim();
  const frontmatter = rawFrontmatter
    .split("\n")
    .reduce<BlogFileFrontmatter>((result, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return result;
      }

      const key = line.slice(0, separatorIndex).trim() as keyof BlogFileFrontmatter;
      const value = normalizeFrontmatterValue(line.slice(separatorIndex + 1));

      result[key] = value;

      return result;
    }, {});

  return { frontmatter, content };
}

function parseBoolean(value: string | undefined) {
  return value?.toLowerCase() === "true";
}

async function readPostFile(filePath: string, fallbackCategory: BlogCategory) {
  const source = await fs.readFile(filePath, "utf8");
  const { frontmatter, content } = parseFrontmatter(source);
  const slug = frontmatter.slug?.trim() || path.basename(filePath, ".md");
  const title = frontmatter.title?.trim() || slug;
  const category = resolvePostCategory(frontmatter.category, fallbackCategory);
  const publishedAt = frontmatter.publishedAt?.trim() || new Date(0).toISOString();
  const updatedAt = frontmatter.updatedAt?.trim() || null;

  return {
    slug,
    title,
    category,
    status: resolvePostStatus(frontmatter.status),
    summary: frontmatter.summary?.trim() || null,
    metaDescription: frontmatter.metaDescription?.trim() || null,
    imageAltText: frontmatter.imageAltText?.trim() || null,
    aiGenerated: parseBoolean(frontmatter.aiGenerated),
    content,
    publishedAt,
    updatedAt,
    imageUrl: frontmatter.imageUrl?.trim() || null,
  } satisfies BlogPost;
}

async function readCategoryPosts(category: BlogCategory) {
  const categoryDirectory = path.join(BLOG_CONTENT_ROOT, category);

  try {
    const entries = await fs.readdir(categoryDirectory, { withFileTypes: true });
    const posts = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => readPostFile(path.join(categoryDirectory, entry.name), category)),
    );

    return posts;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

async function readAllPosts() {
  const posts = await Promise.all(
    ([
      "romance-reunion",
      "psychology-code",
      "attraction-self-esteem",
      "level-up-self-development",
      "mind-study",
    ] as const).map((category) => readCategoryPosts(category)),
  );

  return posts
    .flat()
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
}

export async function listBlogPosts(
  category?: BlogCategory,
  options?: { includeDrafts?: boolean },
) {
  const posts = category ? await readCategoryPosts(category) : await readAllPosts();

  return posts
    .filter((post) => options?.includeDrafts || post.status === "published")
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
}

export async function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  const posts = await readAllPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return undefined;
  }

  if (!options?.includeDrafts && post.status !== "published") {
    return undefined;
  }

  return post;
}

export async function listRelatedBlogPosts(
  category: BlogCategory,
  slug: string,
  limit = 3,
) {
  const posts = await listBlogPosts(category);

  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}

function throwMarkdownManagementError(): never {
  throw new Error(
    "Blog posts are now managed with local Markdown files in content/blog. Use the filesystem workflow instead of the admin editor.",
  );
}

export async function createBlogPost(
  input: CreateBlogPostInput,
  authToken: string,
): Promise<BlogPost> {
  void input;
  void authToken;
  return throwMarkdownManagementError();
}

export async function updateBlogPost(
  originalSlug: string,
  input: CreateBlogPostInput,
  authToken: string,
): Promise<BlogPost> {
  void originalSlug;
  void input;
  void authToken;
  return throwMarkdownManagementError();
}

export async function deleteBlogPost(
  slug: string,
  authToken: string,
): Promise<void> {
  void slug;
  void authToken;
  return throwMarkdownManagementError();
}

export {
  getBlogExcerpt,
  getBlogReadTime,
  getBlogHeroLabel,
  getBlogParagraphs,
} from "./blog-utils";
