import { type ElementType, type NamingDirection, type NamingPurpose } from "@/types/naming";

const elementLabelMap: Record<ElementType, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

const purposeTextMap: Record<NamingPurpose, string> = {
  wealth: "재물 흐름과 안정적인 확장",
  love: "관계의 매력과 감정 소통",
  brand: "브랜드 이미지와 존재감 강화",
  healing: "정서적 안정과 내면의 균형",
};

const purposeKeywordMap: Record<NamingPurpose, string[]> = {
  wealth: ["안정감", "확장성", "결단력", "신뢰감"],
  love: ["부드러움", "매력", "친밀감", "감정 소통"],
  brand: ["기억성", "세련미", "존재감", "상징성"],
  healing: ["안정", "균형", "자기 수용", "정서적 편안함"],
};

const purposeStyleMap: Record<NamingPurpose, NamingDirection["recommendedStyles"]> = {
  wealth: ["strong", "luxurious", "modern"],
  love: ["soft", "elegant", "bright"],
  brand: ["modern", "luxurious", "bright"],
  healing: ["soft", "calm", "neutral"],
};

export function buildNamingDirection(
  lackingElements: ElementType[],
  purpose: NamingPurpose,
): NamingDirection {
  const elementText =
    lackingElements.length > 0
      ? lackingElements.map((element) => elementLabelMap[element]).join(", ")
      : "전반적인 균형";

  return {
    text: `이름 설계 방향은 ${elementText} 기운을 보완하고, ${purposeTextMap[purpose]}에 도움이 되는 인상과 흐름을 강화하는 쪽으로 설정합니다.`,
    emphasisKeywords: purposeKeywordMap[purpose],
    recommendedStyles: purposeStyleMap[purpose],
  };
}
