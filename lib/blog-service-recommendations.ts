import type { BlogCategory, BlogPost } from "@/types/blog";

type ServiceRecommendationItem = {
  title: string;
  href: string;
};

type ServiceRecommendationResult = {
  heading: string[];
  body?: string[];
  ctaLabel: string;
  items: ServiceRecommendationItem[];
};

type RecommendationConfig = {
  heading: string[];
  body?: string[];
  ctaLabel: string;
  items: ServiceRecommendationItem[];
};

const SERVICE_MAP = {
  reunionPossibility: {
    title: "재회 가능성 리딩",
    href: "/reunion-test",
  },
  relationshipFlow: {
    title: "관계 흐름 리딩",
    href: "/love-code",
  },
  trueFeelings: {
    title: "상대의 진짜 마음 읽기",
    href: "/emotion",
  },
  innerMind: {
    title: "상대 속마음 분석",
    href: "/emotion",
  },
  contactFlow: {
    title: "연락 흐름 리딩",
    href: "/love-code",
  },
  emotionCode: {
    title: "감정 코드 분석",
    href: "/attachment-code",
  },
  lovePattern: {
    title: "연애패턴 코드 분석",
    href: "/relationship-pattern",
  },
  repeatingRelationship: {
    title: "반복되는 관계 해석",
    href: "/relationship-pattern",
  },
  birthCodeReport: {
    title: "선천코드 리포트",
    href: "/saju",
  },
  relationPossibility: {
    title: "관계 가능성 분석",
    href: "/love-code",
  },
  flowReading: {
    title: "흐름 리딩",
    href: "/tarot",
  },
  partnerMind: {
    title: "상대 마음 분석",
    href: "/emotion",
  },
  emotionClearing: {
    title: "감정 정화 리딩",
    href: "/tarot",
  },
  unconsciousPattern: {
    title: "무의식 패턴 분석",
    href: "/attachment-code",
  },
} as const;

const CATEGORY_CONFIG: Record<BlogCategory, RecommendationConfig> = {
  "romance-reunion": {
    heading: ["이 글을 읽은 분들이 많이 찾는 서비스"],
    ctaLabel: "자세히 보기",
    items: [
      SERVICE_MAP.reunionPossibility,
      SERVICE_MAP.trueFeelings,
      SERVICE_MAP.relationshipFlow,
    ],
  },
  "psychology-code": {
    heading: ["혹시 지금의 관계가", "우연이 아니라 반복이라면"],
    body: ["당신의 연애 흐름을", "조금 더 깊이 들여다볼 수 있습니다."],
    ctaLabel: "분석하러 가기",
    items: [
      SERVICE_MAP.innerMind,
      SERVICE_MAP.contactFlow,
      SERVICE_MAP.emotionCode,
    ],
  },
  "attraction-self-esteem": {
    heading: ["반복되는 감정에는", "늘 이유가 있습니다"],
    body: ["당신의 감정 흐름을", "조금 더 깊이 이해해보세요."],
    ctaLabel: "해석 보러 가기",
    items: [
      SERVICE_MAP.emotionClearing,
      SERVICE_MAP.unconsciousPattern,
      SERVICE_MAP.birthCodeReport,
    ],
  },
  "level-up-self-development": {
    heading: ["이 글을 읽은 뒤", "조금 더 내 흐름을 알고 싶다면"],
    body: ["지금의 리듬과 감정선을", "차분하게 해석해볼 수 있습니다."],
    ctaLabel: "리딩 보러 가기",
    items: [
      SERVICE_MAP.birthCodeReport,
      SERVICE_MAP.emotionClearing,
      SERVICE_MAP.unconsciousPattern,
    ],
  },
  "mind-study": {
    heading: ["반복되는 감정에는", "늘 이유가 있습니다"],
    body: ["당신의 감정 흐름을", "조금 더 깊이 이해해보세요."],
    ctaLabel: "해석 보러 가기",
    items: [
      SERVICE_MAP.emotionClearing,
      SERVICE_MAP.unconsciousPattern,
      SERVICE_MAP.birthCodeReport,
    ],
  },
};

const SIGNAL_ITEM_OVERRIDES: Array<{
  match: string[];
  items: ServiceRecommendationItem[];
}> = [
  {
    match: ["재회", "이별", "다시 만남"],
    items: [
      SERVICE_MAP.reunionPossibility,
      SERVICE_MAP.trueFeelings,
      SERVICE_MAP.relationshipFlow,
    ],
  },
  {
    match: ["남자심리", "속마음", "심리", "연락"],
    items: [
      SERVICE_MAP.innerMind,
      SERVICE_MAP.contactFlow,
      SERVICE_MAP.emotionCode,
    ],
  },
  {
    match: ["연애패턴", "반복", "애착", "무의식", "심리패턴"],
    items: [
      SERVICE_MAP.lovePattern,
      SERVICE_MAP.repeatingRelationship,
      SERVICE_MAP.birthCodeReport,
    ],
  },
  {
    match: ["썸", "호감", "가능성"],
    items: [
      SERVICE_MAP.relationPossibility,
      SERVICE_MAP.flowReading,
      SERVICE_MAP.partnerMind,
    ],
  },
  {
    match: ["자존감", "감정", "불안", "회복", "애착불안", "사랑불안"],
    items: [
      SERVICE_MAP.emotionClearing,
      SERVICE_MAP.unconsciousPattern,
      SERVICE_MAP.birthCodeReport,
    ],
  },
];

const SIGNAL_COPY_OVERRIDES: Array<{
  match: string[];
  heading: string[];
  body?: string[];
  ctaLabel: string;
}> = [
  {
    match: ["연애패턴", "반복", "애착", "무의식", "심리패턴"],
    heading: ["이 글을 읽은 분들이 많이 찾는 서비스"],
    ctaLabel: "자세히 보기",
  },
  {
    match: ["썸", "호감", "가능성"],
    heading: ["지금 이 관계의 흐름이", "어디로 향하고 있는지 궁금하다면"],
    body: ["조금 더 깊은 해석이 도움이 될 수 있습니다."],
    ctaLabel: "분석하러 가기",
  },
  {
    match: ["자존감", "감정", "불안", "회복", "애착불안", "사랑불안"],
    heading: ["반복되는 감정에는", "늘 이유가 있습니다"],
    body: ["당신의 감정 흐름을", "조금 더 깊이 이해해보세요."],
    ctaLabel: "해석 보러 가기",
  },
];

function normalizeSignal(value: string) {
  return value.trim().toLowerCase();
}

function matchesAnyKeyword(targets: string[], keywords: string[]) {
  const normalizedTargets = targets.map(normalizeSignal);

  return keywords.some((keyword) =>
    normalizedTargets.some((target) => target.includes(normalizeSignal(keyword))),
  );
}

function collectPostSignals(post: BlogPost) {
  const title = post.title.trim();
  const summary = post.summary?.trim() ?? "";
  const content = post.content.trim();

  const contentChunks = [title, summary, content]
    .join("\n")
    .split(/[\s,.!?()[\]{}:;"'`~|/\\\n\r]+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return [...(post.tags ?? []), ...contentChunks];
}

export function getBlogServiceRecommendations(post: BlogPost): ServiceRecommendationResult {
  const baseConfig = CATEGORY_CONFIG[post.category];
  const signals = collectPostSignals(post);
  const itemOverride = SIGNAL_ITEM_OVERRIDES.find((entry) =>
    matchesAnyKeyword(signals, entry.match),
  );
  const copyOverride = SIGNAL_COPY_OVERRIDES.find((entry) =>
    matchesAnyKeyword(signals, entry.match),
  );

  return {
    heading: copyOverride?.heading ?? baseConfig.heading,
    body: copyOverride?.body ?? baseConfig.body,
    ctaLabel: copyOverride?.ctaLabel ?? baseConfig.ctaLabel,
    items: itemOverride?.items ?? baseConfig.items,
  };
}
