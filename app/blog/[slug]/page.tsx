import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import {
  getBlogExcerpt,
  getBlogPostBySlug,
  listBlogPosts,
  listRelatedBlogPosts,
} from "@/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string | string[]; message?: string | string[] }>;
};

export async function generateStaticParams() {
  const posts = await listBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: Omit<BlogPostPageProps, "searchParams">,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | LUMORA",
      description: "The requested blog post could not be found.",
    };
  }

  const description =
    post.metaDescription?.trim() || post.summary?.trim() || getBlogExcerpt(post.content);

  return {
    title: `${post.title} | LUMORA`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | LUMORA`,
      description,
      type: "article",
      url: `https://lumoracode.kr/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LUMORA`,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await listRelatedBlogPosts(post.category, post.slug);
  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message)
    ? query.message[0]
    : query.message;

  return (
    <BlogPostDetail
      post={post}
      relatedPosts={relatedPosts}
      error={error === "delete-failed" ? "Delete failed." : undefined}
      message={error === "delete-failed" ? message : undefined}
    />
  );
}
