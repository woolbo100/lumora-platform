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
    eyebrow: "Mystic Insight",
    description:
      "상징과 흐름을 읽어 지금의 감정, 관계, 선택 안에서 필요한 한 메시지를 해석합니다.",
    badge: "인기 서비스",
  },
  {
    href: "/attachment-code",
    title: "애착유형 코드",
    eyebrow: "Inner Pattern",
    description:
      "관계 안에서 반복되는 감정 패턴과 반응 방식을 질문 기반으로 섬세하게 살펴봅니다.",
    badge: "심층 분석",
  },
  {
    href: "/blog",
    title: "블로그",
    eyebrow: "Editorial Archive",
    description:
      "마음 코드, 관계 해석, 감정의 결에 대한 인사이트를 차분하게 모아 둔 아카이브입니다.",
    badge: "콘텐츠 허브",
  },
];
