import {
  BLOG_AI_JSON_SCHEMA,
  BLOG_AI_SYSTEM_PROMPT,
  buildBlogAiUserPrompt,
  normalizeBlogAiDraftResult,
} from "@/lib/blog-ai-prompt";
import {
  BLOG_TOPIC_JSON_SCHEMA,
  BLOG_TOPIC_SYSTEM_PROMPT,
  buildBlogTopicPrompt,
  normalizeBlogTopicsResult,
} from "@/lib/blog-topic-prompt";
import { slugifyBlogValue } from "@/lib/blog-slug";
import {
  type BlogAiDraftResult,
  type BlogCategory,
  type BlogAiArticleType,
  type BlogAiTone,
  type BlogAiLength,
} from "@/types/blog";

export type GenerateBlogDraftInput = {
  keyword: string;
  secondaryKeyword?: string;
  serviceName?: string;
  category: BlogCategory;
  articleType: BlogAiArticleType;
  tone: BlogAiTone;
  length: BlogAiLength;
  includeCta: boolean;
  includeFaq: boolean;
  includeInternalLinks: boolean;
  notes?: string;
};

export type GenerateBlogTopicsInput = {
  keyword: string;
};

function getOpenAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_BLOG_MODEL?.trim() || "gpt-5";

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY.");
  }

  return { apiKey, model };
}

function extractOutputText(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "output" in payload &&
    Array.isArray(payload.output)
  ) {
    const texts = payload.output
      .flatMap((item) => {
        if (!item || typeof item !== "object" || !("content" in item)) {
          return [];
        }

        return Array.isArray(item.content) ? item.content : [];
      })
      .map((item) => {
        if (
          item &&
          typeof item === "object" &&
          "text" in item &&
          typeof item.text === "string"
        ) {
          return item.text;
        }

        return null;
      })
      .filter((item): item is string => Boolean(item));

    return texts.join("\n").trim();
  }

  return "";
}

export async function generateBlogDraft(
  input: GenerateBlogDraftInput,
): Promise<BlogAiDraftResult> {
  const { apiKey, model } = getOpenAiConfig();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: BLOG_AI_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildBlogAiUserPrompt(input) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "blog_draft",
          strict: true,
          schema: BLOG_AI_JSON_SCHEMA,
        },
      },
    }),
  });

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object" &&
      "message" in payload.error &&
      typeof payload.error.message === "string"
        ? payload.error.message
        : "Failed to generate AI draft.";

    throw new Error(message);
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("AI draft response was empty.");
  }

  const parsed = normalizeBlogAiDraftResult(
    JSON.parse(outputText) as Partial<BlogAiDraftResult>,
  );

  const slug = slugifyBlogValue(parsed.slug || parsed.title);

  if (
    !parsed.title ||
    !slug ||
    !parsed.excerpt ||
    !parsed.metaDescription ||
    !parsed.content ||
    parsed.checklist.length === 0
  ) {
    throw new Error("AI response was missing required structured fields.");
  }

  return {
    ...parsed,
    slug,
  };
}

export async function generateBlogTopics(
  input: GenerateBlogTopicsInput,
): Promise<string[]> {
  const { apiKey, model } = getOpenAiConfig();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: BLOG_TOPIC_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildBlogTopicPrompt(input) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "blog_topics",
          strict: true,
          schema: BLOG_TOPIC_JSON_SCHEMA,
        },
      },
    }),
  });

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object" &&
      "message" in payload.error &&
      typeof payload.error.message === "string"
        ? payload.error.message
        : "Failed to generate topic suggestions.";

    throw new Error(message);
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("Topic suggestion response was empty.");
  }

  const topics = normalizeBlogTopicsResult(JSON.parse(outputText) as unknown);

  if (topics.length < 10) {
    throw new Error("Topic suggestions were not sufficient.");
  }

  return topics;
}
