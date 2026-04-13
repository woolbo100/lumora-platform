import type { ReactNode } from "react";
import Link from "next/link";

import { getCategoryMeta } from "@/data/blogCategories";
import { AdBanner } from "@/components/AdBanner";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { GlassPanel } from "@/components/shared/GlassPanel";
import {
  getBlogParagraphs,
  getBlogReadTime,
} from "@/lib/blog-posts";
import type { BlogPost } from "@/types/blog";

type BlogPostDetailProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  canManage?: boolean;
  error?: string;
  message?: string;
};

type MarkdownBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "image"; alt: string; src: string }
  | { type: "divider" };

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map<MarkdownBlock>((block) => {
      if (block === "---") {
        return { type: "divider" };
      }

      if (block.startsWith("## ")) {
        return { type: "h2", text: block.slice(3).trim() };
      }

      if (block.startsWith("### ")) {
        return { type: "h3", text: block.slice(4).trim() };
      }

      const imageMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);

      if (imageMatch) {
        return {
          type: "image",
          alt: imageMatch[1] || "블로그 이미지",
          src: imageMatch[2] || "",
        };
      }

      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

      if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
        return {
          type: "list",
          items: lines.map((line) => line.slice(2).trim()),
        };
      }

      return {
        type: "paragraph",
        lines,
      };
    });
}

function renderInlineMarkdown(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return segments.map((segment, index) => {
    const boldMatch = segment.match(/^\*\*(.+)\*\*$/);

    if (boldMatch) {
      return (
        <strong key={`${segment}-${index}`} className="font-semibold text-[#6f45a3]">
          {boldMatch[1]}
        </strong>
      );
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http://") || href.startsWith("https://");

      if (isExternal) {
        return (
          <a
            key={`${href}-${index}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-[#6e48a1] underline decoration-[#a88dcb] underline-offset-4 transition hover:text-[#56367f]"
          >
            {label}
          </a>
        );
      }

      return (
        <Link
          key={`${href}-${index}`}
          href={href}
          className="text-[#6e48a1] underline decoration-[#a88dcb] underline-offset-4 transition hover:text-[#56367f]"
        >
          {label}
        </Link>
      );
    }

    return segment;
  });
}

function renderParagraphLines(lines: string[]) {
  return lines.flatMap((line, index) => {
    const nodes: ReactNode[] = [<span key={`line-${index}`}>{renderInlineMarkdown(line)}</span>];

    if (index < lines.length - 1) {
      nodes.push(<br key={`br-${index}`} />);
    }

    return nodes;
  });
}

export function BlogPostDetail({
  post,
  relatedPosts,
  error,
  message,
}: BlogPostDetailProps) {
  const category = getCategoryMeta(post.category);
  const blocks = parseMarkdownBlocks(post.content);
  const paragraphs = getBlogParagraphs(post.content);
  const publishedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-12">
      <GlassPanel className="overflow-hidden">
        <div className="relative p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,121,255,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(120,162,255,0.12),transparent_28%)]" />

          <div className="relative space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-[var(--foreground-muted)] transition hover:text-white"
            >
              블로그로 돌아가기
            </Link>

            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#c69dff]/20 bg-[#b786ff]/10 px-3 py-1 text-sm text-[#eddcff]">
                {category.label}
              </span>
              <h1 className="max-w-4xl font-display text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
                {post.title}
              </h1>
              <p className="max-w-4xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {post.summary?.trim() || paragraphs[0] || "콘텐츠가 아직 준비되지 않았습니다."}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--foreground-muted)]">
              <time dateTime={post.publishedAt}>{publishedDate}</time>
              <span className="text-white/20">•</span>
              <span>{getBlogReadTime(post.content)} 읽기</span>
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {error}
                {message ? (
                  <p className="mt-2 break-words text-rose-50/90">{message}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </GlassPanel>

      <div className="relative overflow-hidden rounded-[28px] border border-white/22 bg-[linear-gradient(180deg,rgba(245,238,252,0.69),rgba(241,233,248,0.64))] shadow-[0_24px_70px_rgba(36,22,72,0.12)] backdrop-blur-[20px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(255,255,255,0.13),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(209,183,252,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,223,241,0.06),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <article className="relative space-y-8 p-8 sm:p-10 lg:p-12">
          {post.imageUrl ? (
            <div className="overflow-hidden rounded-[28px] border border-[#bda5dc]/45 bg-white/30">
              <img
                src={post.imageUrl}
                alt={post.imageAltText?.trim() || post.title}
                className="max-h-[34rem] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="space-y-7">
            {blocks.map((block, index) => {
              if (block.type === "divider") {
                return (
                  <div
                    key={`divider-${index}`}
                    className="h-px w-full bg-gradient-to-r from-transparent via-[#b786ff]/40 to-transparent"
                  />
                );
              }

              if (block.type === "h2") {
                return (
                  <section key={`h2-${block.text}-${index}`} className="space-y-4 pt-2">
                    <h2 className="font-display text-3xl leading-tight text-[#6c429f] sm:text-[2rem]">
                      {renderInlineMarkdown(block.text)}
                    </h2>
                  </section>
                );
              }

              if (block.type === "h3") {
                return (
                  <h3
                    key={`h3-${block.text}-${index}`}
                    className="font-display text-2xl leading-tight text-[#7a54ab]"
                  >
                    {renderInlineMarkdown(block.text)}
                  </h3>
                );
              }

              if (block.type === "image") {
                return (
                  <figure
                    key={`image-${block.src}-${index}`}
                    className="overflow-hidden rounded-[26px] border border-[#bda5dc]/45 bg-white/30"
                  >
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="max-h-[30rem] w-full object-cover"
                    />
                    <figcaption className="border-t border-[#c9b3e1]/45 px-5 py-3 text-sm text-[#64556f]">
                      {block.alt}
                    </figcaption>
                  </figure>
                );
              }

              if (block.type === "list") {
                return (
                  <ul
                    key={`list-${index}`}
                    className="space-y-3 rounded-[24px] border border-[#bea8df]/55 bg-white/34 px-5 py-5 text-base leading-8 text-[#4f465c]"
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={`item-${itemIndex}`} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#8f6aba] shadow-[0_0_16px_rgba(143,106,186,0.35)]" />
                        <span>{renderInlineMarkdown(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p
                  key={`paragraph-${index}`}
                  className="max-w-none text-[17px] leading-9 text-[#4b4357]"
                >
                  {renderParagraphLines(block.lines)}
                </p>
              );
            })}
          </div>

          <AdBanner className="pt-4" />
        </article>
      </div>

      {relatedPosts.length > 0 ? (
        <section className="space-y-5">
          <div className="space-y-2 px-1">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
              RELATED POSTS
            </p>
            <h2 className="font-display text-2xl text-[#6c429f]">
              같은 카테고리의 글
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
