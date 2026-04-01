export type ServiceItemType = "service" | "blog";

export type ServiceItem = {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  badge: string;
  type: ServiceItemType;
};

export const services: ServiceItem[] = [
  {
    href: "/saju",
    title: "선천코드 사주",
    eyebrow: "BIRTH CODE READING",
    description:
      "태어난 순간의 에너지 구조를 바탕으로\n지금의 흐름과 앞으로의 방향을\n차분하고 정교하게 풀어드립니다.",
    badge: "프리미엄 분석",
    type: "service",
  },
  {
    href: "/naming",
    title: "선천코드 이름설계",
    eyebrow: "ENERGY NAMING",
    description:
      "사주 속 부족한 기운과 원하는 삶의 방향을 바탕으로\n당신에게 어울리는 이름의 에너지와\n이미지를 설계합니다.",
    badge: "이름 설계",
    type: "service",
  },
  {
    href: "/aura-code",
    title: "오라코드 테스트",
    eyebrow: "AURA READING",
    description:
      "감정 상태와 에너지 흐름을 바탕으로\n현재의 차크라 균형과 오라 색을 해석해드립니다.\n지금의 분위기, 내면 상태, 그리고 드러나는 에너지의 결을 읽어보세요.",
    badge: "무료 체험",
    type: "service",
  },
  {
    href: "/tarot",
    title: "타로 리딩",
    eyebrow: "MYSTIC INSIGHT",
    description:
      "상징과 흐름을 읽어 지금의 감정, 관계, 선택 앞에 필요한 메시지를 조용히 해석해드립니다.",
    badge: "인기 서비스",
    type: "service",
  },
  {
    href: "/attachment-code",
    title: "애착유형 코드",
    eyebrow: "INNER ATTACHMENT",
    description:
      "관계 안에서 반복되는 감정 반응과 애착의 흐름을 살펴보고, 당신의 사랑 방식을 세밀하게 읽어드립니다.",
    badge: "기본 분석",
    type: "service",
  },
  {
    href: "/relationship-pattern",
    title: "연애패턴 코드",
    eyebrow: "INNER PATTERN",
    description:
      "반복되는 연애 감정과 선택의 구조를 분석해 당신의 관계 패턴을 더 깊이 해석해드립니다.",
    badge: "심층 분석",
    type: "service",
  },
  {
    href: "/reunion-test",
    title: "재회 가능성 테스트",
    eyebrow: "RELATION OUTCOME",
    description:
      "지금 관계의 흐름과 감정 상태를 바탕으로 재회 가능성과 앞으로의 방향을 입체적으로 분석합니다.",
    badge: "현실 진단",
    type: "service",
  },
  {
    href: "/attraction-code",
    title: "매력 코드",
    eyebrow: "ATTRACTIVE CODE",
    description:
      "당신이 가진 고유한 매력의 결을 분석하여 사람을 끌어당기는 포인트와 관계 안의 강점을 보여드립니다.",
    badge: "매력 분석",
    type: "service",
  },
  {
    href: "/dream",
    title: "꿈해몽",
    eyebrow: "DREAM INTERPRETATION",
    description:
      "꿈의 상징, 감정, 현재 흐름을 함께 읽어 무의식이 전하는 메시지와 방향을 해석합니다.",
    badge: "무의식 해석",
    type: "service",
  },
  {
    href: "/emotion",
    title: "감정코드 리딩",
    eyebrow: "EMOTION CODE",
    description:
      "지금의 감정 상태를 분석해 에너지 흐름, 방향성, 그리고 당신에게 필요한 확언을 제안합니다.",
    badge: "감정 리딩",
    type: "service",
  },
  {
    href: "/blog",
    title: "블로그",
    eyebrow: "EDITORIAL ARCHIVE",
    description:
      "마음, 관계, 감정, 흐름에 대한 인사이트를\n차분하게 모아 둔 아카이브입니다.",
    badge: "콘텐츠 허브",
    type: "blog",
  },
];
