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
      "상징과 흐름을 읽어 지금의 감정, 관계, 선택 앞에서 필요한 메시지를 해석합니다.",
    badge: "인기 서비스",
  },
  {
    href: "/attachment-code",
    title: "애착유형 코드",
    eyebrow: "Inner Pattern",
    description:
      "관계 속 반복되는 감정 패턴을 읽어보세요. 애착유형 코드는 사랑의 반응 방식을 더 섬세하게 보여줍니다.",
    badge: "프리미엄 분석",
  },
  {
    href: "/blog",
    title: "블로그",
    eyebrow: "Editorial Archive",
    description:
      "마음코드, 관계 해석, 상징 읽기에 대한 깊이 있는 아티클을 차분하게 탐험해 보세요.",
    badge: "콘텐츠 허브",
  },
];
