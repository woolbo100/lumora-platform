export type BlogTopicPromptInput = {
  keyword: string;
};

export const BLOG_TOPIC_SYSTEM_PROMPT = [
  "You are a content strategist specialized in Korean relationship/psychology blog topics.",
  "Generate practical, searchable, click-worthy blog topic titles for Lumora.",
  "Keep topics specific and ready-to-write.",
  "Avoid abstract, vague, or repetitive titles.",
  "Output JSON only with the exact schema.",
].join(" ");

export const BLOG_TOPIC_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    topics: {
      type: "array",
      minItems: 15,
      items: {
        type: "string",
      },
    },
  },
  required: ["topics"],
} as const;

export function buildBlogTopicPrompt(input: BlogTopicPromptInput) {
  return [
    "Generate Korean blog topic ideas as JSON.",
    "",
    "[Input]",
    `- keyword: ${input.keyword}`,
    "",
    "[Goal]",
    "- Generate 15 blog topics.",
    "- Focus on relationship, dating, emotional psychology.",
    "- Each topic should be short, specific, and searchable.",
    "",
    "[Rules]",
    "- Use realistic search-intent phrasing (question or scenario style).",
    "- Keep curiosity without sensationalism.",
    "- Avoid vague abstract topics.",
    "- Do not repeat the same sentence pattern.",
    "- Mix topic styles: reason, method, scenario, psychology, comparison.",
    "- No ads, no shopping, no affiliate language.",
    "",
    "[Output format]",
    "{",
    '  "topics": [',
    '    "topic 1",',
    '    "topic 2"',
    "  ]",
    "}",
    "",
    "Return JSON only.",
  ].join("\n");
}

export function normalizeBlogTopicsResult(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("topics" in payload)) {
    return [];
  }

  const topics = (payload as { topics?: unknown }).topics;

  if (!Array.isArray(topics)) {
    return [];
  }

  return topics
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}
