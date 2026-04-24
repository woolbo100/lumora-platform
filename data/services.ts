export type ServiceItemType = "service" | "blog";

export type ServiceItem = {
  href: string;
  title: string;
  enTitle?: string;
  eyebrow: string;
  enEyebrow?: string;
  description: string;
  enDescription?: string;
  badge: string;
  enBadge?: string;
  type: ServiceItemType;
};

export const services: ServiceItem[] = [
  {
    href: "/saju",
    title: "선천코드 사주",
    enTitle: "Birth Code Saju",
    eyebrow: "BIRTH CODE READING",
    enEyebrow: "BIRTH CODE READING",
    description:
      "태어난 순간의 에너지 구조를 바탕으로\n지금의 흐름과 앞으로의 방향을\n차분하고 정교하게 풀어드립니다.",
    enDescription: "Based on the energy structure at the moment of birth, we clarify the current flow and future direction calmly and precisely.",
    badge: "프리미엄 분석",
    enBadge: "Premium Analysis",
    type: "service",
  },
  {
    href: "/naming",
    title: "선천코드 이름설계",
    enTitle: "Energy Naming",
    eyebrow: "ENERGY NAMING",
    enEyebrow: "ENERGY NAMING",
    description:
      "사주 속 부족한 기운과 원하는 삶의 방향을 바탕으로\n당신에게 어울리는 이름의 에너지와\n이미지를 설계합니다.",
    enDescription: "We design the energy and image of a name that suits you based on the missing energy in your Saju and your desired life direction.",
    badge: "이름 설계",
    enBadge: "Name Design",
    type: "service",
  },
  {
    href: "/love-code",
    title: "러브코드",
    enTitle: "Love Code",
    eyebrow: "LOVE CODE",
    enEyebrow: "LOVE CODE",
    description:
      "생년월일 기반 별자리 흐름을 바탕으로\n현재 관계에서 필요한 행동 힌트와\n오늘의 연애 움직임을 제안합니다.",
    enDescription: "Based on your birth date and astrological flow, we suggest behavioral hints needed in your current relationship and today's love movements.",
    badge: "행동 추천",
    enBadge: "Action Guide",
    type: "service",
  },
  {
    href: "/egen-vs-teto",
    title: "에겐 vs 테토녀 테스트",
    enTitle: "Egen vs Teto Test",
    eyebrow: "RELATION TYPE TEST",
    enEyebrow: "RELATION TYPE TEST",
    description:
      "20문항으로 나의 연애 본능을 가볍게 점검하고\n에겐형, 테토녀형, 혼합형 중\n어느 결에 가까운지 직관적으로 확인해보세요.",
    enDescription: "Lightly check your dating instincts with 20 questions and intuitively see if you are closer to Egen, Teto, or a mix.",
    badge: "공유형 테스트",
    enBadge: "Shareable Test",
    type: "service",
  },
  {
    href: "/aura-code",
    title: "오라코드",
    enTitle: "Aura Code",
    eyebrow: "AURA READING",
    enEyebrow: "AURA READING",
    description:
      "감정 상태와 에너지 흐름을 바탕으로\n현재의 차크라 균형과 오라 색을 해석해드립니다.\n지금의 분위기, 내면 상태, 그리고 드러나는 에너지의 결을 읽어보세요.",
    enDescription: "We interpret your current chakra balance and aura color based on your emotional state and energy flow. Read your current vibe, inner state, and the energy you project.",
    badge: "무료 체험",
    enBadge: "Free Trial",
    type: "service",
  },
  {
    href: "/tarot",
    title: "타로 리딩",
    enTitle: "Tarot Reading",
    eyebrow: "MYSTIC INSIGHT",
    enEyebrow: "MYSTIC INSIGHT",
    description:
      "상징과 흐름을 읽어 지금의 감정, 관계, 선택 앞에 필요한 메시지를 조용히 해석해드립니다.",
    enDescription: "We quietly interpret the symbols and flows to provide messages needed for your current emotions, relationships, and choices.",
    badge: "인기 서비스",
    enBadge: "Popular",
    type: "service",
  },
  {
    href: "/attachment-code",
    title: "애착유형 코드",
    enTitle: "Attachment Code",
    eyebrow: "INNER ATTACHMENT",
    enEyebrow: "INNER ATTACHMENT",
    description:
      "관계 안에서 반복되는 감정 반응과 애착의 흐름을 살펴보고, 당신의 사랑 방식을 세밀하게 읽어드립니다.",
    enDescription: "We examine the emotional responses and attachment flows repeated in relationships and read your love style in detail.",
    badge: "기본 분석",
    enBadge: "Basic Analysis",
    type: "service",
  },
  {
    href: "/relationship-pattern",
    title: "연애패턴 코드",
    enTitle: "Relationship Pattern",
    eyebrow: "INNER PATTERN",
    enEyebrow: "INNER PATTERN",
    description:
      "반복되는 연애 감정과 선택의 구조를 분석해 당신의 관계 패턴을 더 깊이 해석해드립니다.",
    enDescription: "We analyze the structure of repeated dating emotions and choices to provide a deeper interpretation of your relationship patterns.",
    badge: "심층 분석",
    enBadge: "Deep Analysis",
    type: "service",
  },
  {
    href: "/reunion-test",
    title: "재회 가능성 테스트",
    enTitle: "Reunion Test",
    eyebrow: "RELATION OUTCOME",
    enEyebrow: "RELATION OUTCOME",
    description:
      "지금 관계의 흐름과 감정 상태를 바탕으로 재회 가능성과 앞으로의 방향을 입체적으로 분석합니다.",
    enDescription: "We analyze the possibility of reunion and future direction multidimensionally based on your current relationship flow and emotional state.",
    badge: "현실 진단",
    enBadge: "Reality Check",
    type: "service",
  },
  {
    href: "/attraction-code",
    title: "매력 코드",
    enTitle: "Attraction Code",
    eyebrow: "ATTRACTIVE CODE",
    enEyebrow: "ATTRACTIVE CODE",
    description:
      "당신이 가진 고유한 매력의 결을 분석하여 사람을 끌어당기는 포인트와 관계 안의 강점을 보여드립니다.",
    enDescription: "We analyze your unique charm to show you the points that attract people and your strengths in relationships.",
    badge: "매력 분석",
    enBadge: "Attraction Analysis",
    type: "service",
  },
  {
    href: "/dream",
    title: "꿈해몽",
    enTitle: "Dream Reading",
    eyebrow: "DREAM INTERPRETATION",
    enEyebrow: "DREAM INTERPRETATION",
    description:
      "꿈의 상징, 감정, 현재 흐름을 함께 읽어 무의식이 전하는 메시지와 방향을 해석합니다.",
    enDescription: "We read the symbols, emotions, and current flow of your dreams together to interpret the messages and directions from your unconscious.",
    badge: "무의식 해석",
    enBadge: "Unconscious Reading",
    type: "service",
  },
  {
    href: "/emotion",
    title: "감정코드 리딩",
    enTitle: "Emotion Code",
    eyebrow: "EMOTION CODE",
    enEyebrow: "EMOTION CODE",
    description:
      "지금의 감정 상태를 분석해 에너지 흐름, 방향성, 그리고 당신에게 필요한 확언을 제안합니다.",
    enDescription: "We analyze your current emotional state to suggest energy flow, direction, and affirmations you need.",
    badge: "감정 리딩",
    enBadge: "Emotion Reading",
    type: "service",
  },
  {
    href: "/blog",
    title: "블로그",
    enTitle: "Blog",
    eyebrow: "EDITORIAL ARCHIVE",
    enEyebrow: "EDITORIAL ARCHIVE",
    description:
      "마음, 관계, 감정, 흐름에 대한 인사이트를\n차분하게 모아 둔 아카이브입니다.",
    enDescription: "A calm archive of insights on mind, relationships, emotions, and flows.",
    badge: "콘텐츠 허브",
    enBadge: "Content Hub",
    type: "blog",
  },
];
