export type TarotCategoryKey =
  | "love"
  | "money"
  | "relationship"
  | "career"
  | "inner-self"
  | "daily-message";

export type TarotCategory = {
  key: TarotCategoryKey;
  label: string;
  eyebrow: string;
  description: string;
};

export type TarotSuit =
  | "major"
  | "wands"
  | "cups"
  | "swords"
  | "pentacles";

export type TarotCard = {
  id: number;
  name: string;
  nameKr: string;
  imageUrl: string;
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
  suit: TarotSuit;
};

export const tarotCategories: TarotCategory[] = [
  {
    key: "love",
    label: "연애",
    eyebrow: "Emotional Flow",
    description: "감정의 움직임과 관계 안의 신호를 읽어봅니다.",
  },
  {
    key: "money",
    label: "금전",
    eyebrow: "Material Rhythm",
    description: "재정 흐름과 현실적인 선택의 포인트를 확인합니다.",
  },
  {
    key: "relationship",
    label: "대인관계",
    eyebrow: "Connection Pattern",
    description: "사람 사이의 거리감과 반복되는 패턴을 살펴봅니다.",
  },
  {
    key: "career",
    label: "일과 진로",
    eyebrow: "Work Direction",
    description: "커리어의 방향성과 지금 집중할 지점을 짚어봅니다.",
  },
  {
    key: "inner-self",
    label: "내면",
    eyebrow: "Inner Reflection",
    description: "마음 깊은 곳의 상태와 회복의 메시지를 해석합니다.",
  },
  {
    key: "daily-message",
    label: "오늘의 메시지",
    eyebrow: "Daily Guidance",
    description: "오늘 하루에 필요한 한 줄의 방향을 카드에서 찾습니다.",
  },
];

export const tarotCategoryMap = Object.fromEntries(
  tarotCategories.map((category) => [category.key, category]),
) as Record<TarotCategoryKey, TarotCategory>;

function tarotImage(filename: string) {
  return `/images/tarot/${filename}`;
}

const majorCards: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    nameKr: "바보",
    imageUrl: tarotImage("00-major-fool.png"),
    keywords: ["새로운 시작", "자유", "도약"],
    meaningUpright: "익숙한 방식에서 벗어나 새로운 가능성을 향해 가볍게 출발하는 흐름입니다.",
    meaningReversed: "준비되지 않은 채 서두르거나 현실 감각을 놓치기 쉬운 국면입니다.",
    suit: "major",
  },
  {
    id: 1,
    name: "The Magician",
    nameKr: "마법사",
    imageUrl: tarotImage("01-major-magicia.png"),
    keywords: ["의지", "실행", "집중"],
    meaningUpright: "원하는 것을 현실로 끌어올릴 도구와 역량이 이미 손안에 들어와 있습니다.",
    meaningReversed: "집중력이 흩어지거나 자신이 가진 힘을 제대로 쓰지 못할 수 있습니다.",
    suit: "major",
  },
  {
    id: 2,
    name: "The High Priestess",
    nameKr: "여사제",
    imageUrl: tarotImage("02-major-high-priestes.png"),
    keywords: ["직관", "침묵", "내면"],
    meaningUpright: "보이지 않는 감정의 결을 읽어야 할 때이며 조용한 통찰이 답이 됩니다.",
    meaningReversed: "혼란한 감정에 휘말려 자신의 직감을 신뢰하지 못할 수 있습니다.",
    suit: "major",
  },
  {
    id: 3,
    name: "The Empress",
    nameKr: "여황제",
    imageUrl: tarotImage("03-major-empress.png"),
    keywords: ["풍요", "돌봄", "감각"],
    meaningUpright: "부드럽게 관계를 돌보고 무언가를 키워내는 풍요의 흐름입니다.",
    meaningReversed: "과한 배려나 감정 소모로 인해 나를 먼저 돌보지 못할 수 있습니다.",
    suit: "major",
  },
  {
    id: 4,
    name: "The Emperor",
    nameKr: "황제",
    imageUrl: tarotImage("04-major-emperor.png"),
    keywords: ["구조", "책임", "결단"],
    meaningUpright: "흔들리는 상황 안에서도 기준과 경계를 세우며 중심을 잡게 됩니다.",
    meaningReversed: "지나치게 통제하려 하거나 유연성을 잃어 관계가 경직될 수 있습니다.",
    suit: "major",
  },
  {
    id: 5,
    name: "The Hierophant",
    nameKr: "교황",
    imageUrl: tarotImage("05-major-hierophant.png"),
    keywords: ["배움", "가치", "전통"],
    meaningUpright: "검증된 조언과 기존의 가치 체계 안에서 해답을 찾게 되는 흐름입니다.",
    meaningReversed: "형식에만 매이거나 나에게 맞지 않는 규칙에 갇힐 수 있습니다.",
    suit: "major",
  },
  {
    id: 6,
    name: "The Lovers",
    nameKr: "연인",
    imageUrl: tarotImage("06-major-lovers.png"),
    keywords: ["선택", "조화", "관계"],
    meaningUpright: "마음이 끌리는 방향과 현실의 선택 사이에서 진심 어린 결정을 돕습니다.",
    meaningReversed: "엇갈림이나 미루어진 선택으로 인해 관계의 균형이 흔들릴 수 있습니다.",
    suit: "major",
  },
  {
    id: 7,
    name: "The Chariot",
    nameKr: "전차",
    imageUrl: tarotImage("07-major-chariot.png"),
    keywords: ["추진력", "통제", "전진"],
    meaningUpright: "방향을 고정하고 밀고 나가면 원하는 지점에 도달할 수 있습니다.",
    meaningReversed: "서두르다 균형을 잃거나 감정과 행동이 따로 놀 수 있습니다.",
    suit: "major",
  },
  {
    id: 8,
    name: "Strength",
    nameKr: "힘",
    imageUrl: tarotImage("08-major-strength.png"),
    keywords: ["인내", "회복력", "신뢰"],
    meaningUpright: "강하게 밀기보다 부드럽게 다루는 태도가 상황을 안정시킵니다.",
    meaningReversed: "자신감 저하나 감정의 폭발로 균형을 놓치기 쉬운 시기입니다.",
    suit: "major",
  },
  {
    id: 9,
    name: "The Hermit",
    nameKr: "은둔자",
    imageUrl: tarotImage("09-major-hermit.png"),
    keywords: ["성찰", "거리두기", "탐색"],
    meaningUpright: "잠시 멈추고 스스로의 목소리를 듣는 시간이 필요합니다.",
    meaningReversed: "고립감이 깊어지거나 필요한 대화까지 피할 수 있습니다.",
    suit: "major",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameKr: "운명의 수레바퀴",
    imageUrl: tarotImage("10-major-wheel-of-fortune.png"),
    keywords: ["전환점", "순환", "기회"],
    meaningUpright: "지금의 변화는 우연이 아니라 다음 단계로 넘어가는 신호입니다.",
    meaningReversed: "흐름이 꼬이거나 같은 패턴이 반복된다는 느낌을 받을 수 있습니다.",
    suit: "major",
  },
  {
    id: 11,
    name: "Justice",
    nameKr: "정의",
    imageUrl: tarotImage("11-major-justice.png"),
    keywords: ["균형", "판단", "정직"],
    meaningUpright: "감정보다 사실과 기준에 근거한 판단이 필요한 시기입니다.",
    meaningReversed: "감정 치우침이나 불공정한 해석으로 결론이 흔들릴 수 있습니다.",
    suit: "major",
  },
  {
    id: 12,
    name: "The Hanged Man",
    nameKr: "매달린 사람",
    imageUrl: tarotImage("12-major-hanged-man.png"),
    keywords: ["멈춤", "관점 전환", "유예"],
    meaningUpright: "서두르기보다 시선을 바꾸고 흐름을 다시 해석해야 합니다.",
    meaningReversed: "정체가 길어지며 무기력해지거나 결정을 미루기 쉬운 상태입니다.",
    suit: "major",
  },
  {
    id: 13,
    name: "Death",
    nameKr: "죽음",
    imageUrl: tarotImage("13-major-death.png"),
    keywords: ["종결", "정리", "재탄생"],
    meaningUpright: "끝내야 할 것을 정리할 때 다음 흐름이 열립니다.",
    meaningReversed: "붙들고 있던 것을 놓지 못해 변화가 더 어렵게 느껴질 수 있습니다.",
    suit: "major",
  },
  {
    id: 14,
    name: "Temperance",
    nameKr: "절제",
    imageUrl: tarotImage("14-major-temperance.png"),
    keywords: ["조율", "회복", "균형"],
    meaningUpright: "급하게 결론 내리기보다 천천히 섞고 맞추는 과정이 중요합니다.",
    meaningReversed: "균형이 깨지거나 감정과 현실의 속도가 맞지 않을 수 있습니다.",
    suit: "major",
  },
  {
    id: 15,
    name: "The Devil",
    nameKr: "악마",
    imageUrl: tarotImage("15-major-devil.png"),
    keywords: ["집착", "욕망", "얽힘"],
    meaningUpright: "익숙하지만 건강하지 않은 패턴을 인식해야 할 순간입니다.",
    meaningReversed: "얽힌 감정에서 빠져나오려는 움직임이 시작되지만 아직 흔들립니다.",
    suit: "major",
  },
  {
    id: 16,
    name: "The Tower",
    nameKr: "탑",
    imageUrl: tarotImage("16-major-tower.png"),
    keywords: ["붕괴", "각성", "진실"],
    meaningUpright: "불편한 진실이 드러나더라도 그것이 정직한 출발점이 됩니다.",
    meaningReversed: "변화를 미루며 불안만 키우거나 무너짐을 더 오래 끌 수 있습니다.",
    suit: "major",
  },
  {
    id: 17,
    name: "The Star",
    nameKr: "별",
    imageUrl: tarotImage("17-major-star.png"),
    keywords: ["희망", "치유", "영감"],
    meaningUpright: "조용하지만 분명한 희망이 다시 살아나는 흐름입니다.",
    meaningReversed: "회복을 믿기 어려워지거나 기대감이 잠시 흐려질 수 있습니다.",
    suit: "major",
  },
  {
    id: 18,
    name: "The Moon",
    nameKr: "달",
    imageUrl: tarotImage("18-major-moon.png"),
    keywords: ["불안", "무의식", "감정의 파도"],
    meaningUpright: "확실하지 않은 감정이 커질 수 있으니 관찰이 먼저입니다.",
    meaningReversed: "막연한 불안이 걷히기 시작하지만 아직 완전히 명료하지는 않습니다.",
    suit: "major",
  },
  {
    id: 19,
    name: "The Sun",
    nameKr: "태양",
    imageUrl: tarotImage("19-major-sun.png"),
    keywords: ["명료함", "기쁨", "회복"],
    meaningUpright: "숨겨졌던 진심과 가능성이 환하게 드러나는 카드입니다.",
    meaningReversed: "좋은 흐름이 있어도 스스로 축소 해석하거나 기쁨을 충분히 누리지 못할 수 있습니다.",
    suit: "major",
  },
  {
    id: 20,
    name: "Judgement",
    nameKr: "심판",
    imageUrl: tarotImage("20-major-judgement.png"),
    keywords: ["각성", "결정", "부름"],
    meaningUpright: "미뤄왔던 결정을 더 이상 피하지 말라는 신호입니다.",
    meaningReversed: "자기 의심이 강해져 필요한 결론을 계속 뒤로 미룰 수 있습니다.",
    suit: "major",
  },
  {
    id: 21,
    name: "The World",
    nameKr: "세계",
    imageUrl: tarotImage("21-major-world.png"),
    keywords: ["완성", "성취", "통합"],
    meaningUpright: "지금까지의 흐름이 하나로 묶이며 다음 챕터를 준비합니다.",
    meaningReversed: "마무리 단계에서 망설이거나 완성 직전의 피로감이 커질 수 있습니다.",
    suit: "major",
  },
];

const suitMeta = {
  wands: {
    label: "Wands",
    labelKr: "완드",
    baseKeywords: ["열정", "행동", "추진력"],
    upright: "의욕과 추진력이 강하게 작동하며 앞으로 나아갈 힘이 커집니다.",
    reversed: "서두름이나 소진으로 인해 에너지가 엇나갈 수 있습니다.",
  },
  cups: {
    label: "Cups",
    labelKr: "컵",
    baseKeywords: ["감정", "관계", "교감"],
    upright: "감정선과 관계의 흐름이 선명하게 드러나며 마음의 교류가 중요해집니다.",
    reversed: "감정 기복이 커지거나 관계의 온도가 맞지 않을 수 있습니다.",
  },
  swords: {
    label: "Swords",
    labelKr: "소드",
    baseKeywords: ["사고", "판단", "긴장"],
    upright: "사실을 직면하고 분명하게 결론을 내리는 힘이 강조됩니다.",
    reversed: "생각이 복잡해지고 날카로운 판단이 오히려 부담이 될 수 있습니다.",
  },
  pentacles: {
    label: "Pentacles",
    labelKr: "펜타클",
    baseKeywords: ["현실", "안정", "성장"],
    upright: "현실적인 기반을 다지고 성과를 차곡차곡 쌓아가는 흐름입니다.",
    reversed: "안정에 대한 불안이나 현실 문제로 집중력이 흔들릴 수 있습니다.",
  },
} as const;

const rankMeta = [
  {
    code: "ace",
    label: "Ace",
    labelKr: "에이스",
    keywords: ["시작", "가능성", "첫 신호"],
    upright: "작지만 선명한 시작의 기운이 들어옵니다.",
    reversed: "시작의 타이밍을 놓치거나 의욕이 약해질 수 있습니다.",
  },
  {
    code: "02",
    label: "Two",
    labelKr: "2",
    keywords: ["균형", "선택", "조율"],
    upright: "양쪽의 흐름을 맞추며 균형을 잡는 일이 중요합니다.",
    reversed: "우유부단함이나 균형 붕괴로 흐름이 흔들릴 수 있습니다.",
  },
  {
    code: "03",
    label: "Three",
    labelKr: "3",
    keywords: ["확장", "협업", "구체화"],
    upright: "연결과 확장을 통해 흐름이 눈에 보이기 시작합니다.",
    reversed: "호흡이 맞지 않거나 기대만큼 진전되지 않을 수 있습니다.",
  },
  {
    code: "04",
    label: "Four",
    labelKr: "4",
    keywords: ["안정", "기반", "유지"],
    upright: "기반을 다지고 안정감을 회복하는 데 초점이 맞춰집니다.",
    reversed: "정체감이나 답답함이 커질 수 있어 리듬 조정이 필요합니다.",
  },
  {
    code: "05",
    label: "Five",
    labelKr: "5",
    keywords: ["충돌", "불안정", "전환"],
    upright: "불편한 긴장 속에서 새로운 방향 전환이 시작됩니다.",
    reversed: "갈등을 피하려다 문제를 더 길게 끌 수 있습니다.",
  },
  {
    code: "06",
    label: "Six",
    labelKr: "6",
    keywords: ["회복", "조화", "재정렬"],
    upright: "흐름이 다시 맞춰지며 안정을 되찾기 시작합니다.",
    reversed: "과거 감정에 머물거나 기대한 회복 속도가 늦을 수 있습니다.",
  },
  {
    code: "07",
    label: "Seven",
    labelKr: "7",
    keywords: ["점검", "방어", "전략"],
    upright: "감정적 반응보다 전략적 판단이 필요한 시기입니다.",
    reversed: "과한 경계심이나 소극적인 태도가 기회를 줄일 수 있습니다.",
  },
  {
    code: "08",
    label: "Eight",
    labelKr: "8",
    keywords: ["속도", "움직임", "흐름"],
    upright: "정체되던 일이 갑자기 움직이며 속도가 붙습니다.",
    reversed: "타이밍이 어긋나거나 흐름이 잠시 멈출 수 있습니다.",
  },
  {
    code: "09",
    label: "Nine",
    labelKr: "9",
    keywords: ["인내", "지속", "마무리 직전"],
    upright: "끝까지 버티는 힘이 필요한 마무리 직전의 구간입니다.",
    reversed: "피로감과 불안이 커져 스스로를 압박할 수 있습니다.",
  },
  {
    code: "10",
    label: "Ten",
    labelKr: "10",
    keywords: ["완성", "정리", "결과"],
    upright: "한 흐름의 결과가 드러나며 다음 단계로 넘어갈 준비를 합니다.",
    reversed: "부담이 누적되거나 마무리 방식에 대한 조정이 필요합니다.",
  },
  {
    code: "page",
    label: "Page",
    labelKr: "페이지",
    keywords: ["호기심", "학습", "메시지"],
    upright: "가벼운 신호와 새로운 배움이 들어오는 시기입니다.",
    reversed: "미숙함이나 엇갈린 신호로 인해 혼선이 생길 수 있습니다.",
  },
  {
    code: "knight",
    label: "Knight",
    labelKr: "나이트",
    keywords: ["추진", "변화", "행동력"],
    upright: "상황을 움직이는 행동력이 강해지는 흐름입니다.",
    reversed: "과속하거나 방향성 없이 에너지만 쓰기 쉬운 구간입니다.",
  },
  {
    code: "queen",
    label: "Queen",
    labelKr: "퀸",
    keywords: ["수용", "성숙", "감각"],
    upright: "감정과 상황을 성숙하게 다루는 균형감이 강조됩니다.",
    reversed: "예민함이나 과한 방어로 관계의 흐름이 막힐 수 있습니다.",
  },
  {
    code: "king",
    label: "King",
    labelKr: "킹",
    keywords: ["통제", "권위", "완성도"],
    upright: "상황을 정리하고 안정적으로 이끄는 리더십이 드러납니다.",
    reversed: "통제 욕구가 강해지거나 완고함으로 연결될 수 있습니다.",
  },
] as const;

function createMinorCard(
  id: number,
  suit: Exclude<TarotSuit, "major">,
  rank: (typeof rankMeta)[number],
): TarotCard {
  const suitInfo = suitMeta[suit];

  return {
    id,
    name: `${rank.label} of ${suitInfo.label}`,
    nameKr: `${suitInfo.labelKr} ${rank.labelKr}`,
    imageUrl: tarotImage(`${String(id).padStart(2, "0")}-${suit}-${rank.code}.png`),
    keywords: [...suitInfo.baseKeywords, ...rank.keywords].slice(0, 3),
    meaningUpright: `${suitInfo.upright} ${rank.upright}`,
    meaningReversed: `${suitInfo.reversed} ${rank.reversed}`,
    suit,
  };
}

const suitOrder: Array<Exclude<TarotSuit, "major">> = [
  "wands",
  "cups",
  "swords",
  "pentacles",
];

const minorCards = suitOrder.flatMap((suit, suitIndex) =>
  rankMeta.map((rank, rankIndex) =>
    createMinorCard(22 + suitIndex * rankMeta.length + rankIndex, suit, rank),
  ),
);

export const tarotCards: TarotCard[] = [...majorCards, ...minorCards];
