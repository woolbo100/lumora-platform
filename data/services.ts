export type ServiceItem = {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  badge: string;
};

export const services: ServiceItem[] = [
  {
    href: "/tarot",
    title: "타로 리딩",
    eyebrow: "MYSTIC INSIGHT",
    description:
      "상징과 흐름을 읽어 지금의 감정, 관계, 선택 앞에 필요한 메시지를 조용히 해석합니다.",
    badge: "인기 서비스",
  },
  {
    href: "/attachment-code",
    title: "애착유형 코드",
    eyebrow: "INNER ATTACHMENT",
    description:
      "관계 안에서 반복되는 감정 반응과 애착의 습관을 살펴보며, 당신이 사랑을 받아들이는 방식과 불안의 결을 섬세하게 읽어드립니다.",
    badge: "기본 분석",
  },
  {
    href: "/relationship-pattern",
    title: "연애패턴 코드",
    eyebrow: "INNER PATTERN",
    description:
      "왜 나는 같은 연애를 반복할까?\n\n관계 안에서 반복되는 감정 흐름과 선택의 패턴을 분석하여 당신의 연애 코드와 행동 구조를 깊이 있게 해석합니다.",
    badge: "심층 분석",
  },
  {
    href: "/reunion-test",
    title: "재회 가능성 테스트",
    eyebrow: "RELATION OUTCOME",
    description:
      "다시 만날 수 있을까?\n\n지금 관계의 흐름과 감정 상태를 바탕으로 재회 가능성과 앞으로의 방향을 현실적으로 분석합니다.",
    badge: "현실 진단",
  },
  {
    href: "/attraction-code",
    title: "매력 코드",
    eyebrow: "ATTRACTIVE CODE",
    description:
      "나의 진짜 매력은 무엇일까?\n\n당신이 가진 고유한 매력의 결을 분석하여 사람을 끌어당기는 포인트와 관계에서의 강점을 알려드립니다.",
    badge: "매력 분석",
  },
  {
    href: "/blog",
    title: "블로그",
    eyebrow: "EDITORIAL ARCHIVE",
    description:
      "마음 코드, 관계 해석, 감정의 결에 대한 인사이트를 차분하게 모아 둔 아카이브 공간입니다.",
    badge: "콘텐츠 아카이브",
  },
];
