import {
  tarotCards,
  tarotCategoryMap,
  type TarotCard,
  type TarotCategoryKey,
} from "@/data/tarotCards";

const guidanceMap: Record<TarotCategoryKey, string> = {
  love: "관계의 속도를 맞추고 감정이 앞서기 전에 진심을 확인해 보세요. 서운함을 추측으로 키우기보다 말로 확인하는 태도가 중요합니다.",
  money:
    "안정감을 주는 선택인지, 순간의 불안 때문에 서두르는 결정인지 구분해 보세요. 숫자와 감정 사이의 균형을 함께 보는 것이 핵심입니다.",
  relationship:
    "상대의 반응만 읽지 말고 내가 어떤 경계를 원하는지도 함께 보아야 합니다. 편안함과 긴장감을 동시에 점검해 보세요.",
  career:
    "성과보다 방향을 먼저 점검하면 다음 움직임이 훨씬 선명해집니다. 지금은 속도보다 지속 가능한 방식이 더 중요합니다.",
  "inner-self":
    "지금 필요한 것은 더 많은 자극보다 회복할 수 있는 리듬입니다. 마음이 지치는 패턴을 줄이고 안정감을 주는 루틴을 먼저 세워 보세요.",
  "daily-message":
    "오늘은 결과를 밀어붙이기보다 흐름을 읽고 한 걸음만 정확히 움직이세요. 작은 선택 하나가 하루 전체의 결을 바꿀 수 있습니다.",
};

const focusMap: Record<TarotCategoryKey, string> = {
  love: "감정의 온도와 관계의 리듬",
  money: "현실 감각과 자원 운용",
  relationship: "관계의 거리감과 반복되는 패턴",
  career: "일의 방향성과 성과를 만드는 방식",
  "inner-self": "내면의 긴장과 회복의 흐름",
  "daily-message": "오늘 하루를 관통하는 정서적 메시지",
};

export function parseCardIds(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item));
}

export function isTarotCategoryKey(value?: string): value is TarotCategoryKey {
  return Boolean(value && value in tarotCategoryMap);
}

export function findTarotCardsByIds(ids: number[]) {
  return ids
    .map((id) => tarotCards.find((card) => card.id === id))
    .filter((card): card is TarotCard => Boolean(card));
}

function describeCardRole(role: string, card: TarotCard) {
  return `${role} 위치의 ${card.nameKr}(${card.name}) 카드는 ${card.meaningUpright} 핵심 키워드는 ${card.keywords.join(", ")}이며, 현재 흐름에서 이 카드는 특히 ${card.keywords[0]}의 의미를 강하게 드러냅니다.`;
}

export function generateSummary(
  selectedCards: TarotCard[],
  categoryKey: TarotCategoryKey,
) {
  const category = tarotCategoryMap[categoryKey];
  return `${category.label} 리딩에서는 ${selectedCards
    .map((card) => card.nameKr)
    .join(", ")}의 조합이 보입니다. 이 조합은 ${focusMap[categoryKey]}을 중심으로 지금의 상황을 다시 읽어야 한다는 메시지를 줍니다.`;
}

export function generateTarotReading(
  selectedCards: TarotCard[],
  categoryKey: TarotCategoryKey,
) {
  const category = tarotCategoryMap[categoryKey];
  const [first, second, third] = selectedCards;
  const summary = generateSummary(selectedCards, categoryKey);

  return [
    `### ${category.label} 리딩`,
    summary,
    `지금 이 리딩은 ${focusMap[categoryKey]}을 중심으로 해석하는 것이 가장 자연스럽습니다. 카드들은 단순히 한 가지 사건을 말하기보다, 지금의 마음과 선택이 어떤 리듬으로 연결되고 있는지를 보여줍니다.`,
    "",
    `### 첫 번째 카드가 보여주는 현재`,
    describeCardRole("현재", first),
    `${first.nameKr}의 역방향 의미까지 함께 보면 ${first.meaningReversed} 따라서 지금은 겉으로 드러난 상황보다 마음속 긴장과 망설임을 함께 읽는 것이 중요합니다.`,
    "",
    `### 두 번째 카드가 말하는 흐름의 핵심`,
    describeCardRole("중심", second),
    `${second.nameKr}는 지금 상황을 조금 다른 시선으로 보라고 말합니다. 눈앞의 반응만 따라가기보다 왜 이런 흐름이 반복되는지, 어떤 패턴이 감정을 움직이는지를 살펴봐야 합니다.`,
    "",
    `### 세 번째 카드가 제안하는 다음 방향`,
    describeCardRole("방향", third),
    `${third.nameKr}는 앞으로의 움직임을 정리해 주는 카드입니다. 특히 ${third.meaningReversed} 같은 그림자가 함께 있을 수 있으니, 좋은 가능성을 살리기 위해서는 무리해서 밀어붙이기보다 타이밍과 균형을 챙겨야 합니다.`,
    "",
    `### 세 장의 카드가 함께 말하는 이야기`,
    `${first.nameKr}가 지금의 출발점이라면 ${second.nameKr}는 그 안에 숨어 있는 핵심 주제를 드러내고, ${third.nameKr}는 그 흐름이 어디로 향해야 하는지를 보여줍니다.`,
    `이 조합은 문제를 한 번에 해결하기보다, 현재를 정확히 인식하고 패턴을 이해한 뒤 다음 행동을 고르는 방식이 더 잘 맞는다고 말합니다. 지금 중요한 것은 빠른 결론보다 해석의 정확도입니다.`,
    "",
    `### 지금 주의해서 볼 부분`,
    `${first.nameKr}, ${second.nameKr}, ${third.nameKr}의 조합에서는 감정이 앞서거나 상황을 단정 지어버릴 때 흐름이 흐려질 수 있습니다. 특히 ${third.meaningReversed}`,
    `따라서 지금은 결과를 서둘러 확정하기보다, 카드가 반복해서 말하는 ${[...first.keywords, ...second.keywords, ...third.keywords]
      .slice(0, 4)
      .join(", ")}의 키워드를 삶의 언어로 천천히 번역해 보는 것이 좋습니다.`,
    "",
    `### 핵심 키워드`,
    `**핵심 키워드** ${[...first.keywords, ...second.keywords, ...third.keywords]
      .slice(0, 6)
      .join(", ")}`,
    guidanceMap[categoryKey],
    "",
    `### 한 줄 조언`,
    `지금의 ${category.label} 흐름은 서두를수록 흐려지고, 천천히 읽을수록 선명해집니다. 오늘은 ${third.keywords[0]}의 감각으로 마무리해 보세요.`,
  ].join("\n");
}
