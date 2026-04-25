import {
  type ElementType,
  type NameCodeComplement,
  type NameCodeInput,
  type NameCodeResult,
  type NameCodeStyleCard,
  type NameCodeValidationResult,
} from "@/types/naming";

const INITIAL_TO_ELEMENT: Record<string, ElementType> = {
  "ㄱ": "wood",
  "ㅋ": "wood",
  "ㄴ": "fire",
  "ㄷ": "fire",
  "ㄹ": "fire",
  "ㅌ": "fire",
  "ㅇ": "earth",
  "ㅎ": "earth",
  "ㅅ": "metal",
  "ㅈ": "metal",
  "ㅊ": "metal",
  "ㅁ": "water",
  "ㅂ": "water",
  "ㅍ": "water",
};

const INITIAL_ORDER = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

const ELEMENT_LABELS: Record<ElementType, string> = {
  wood: "목",
  fire: "화",
  earth: "토",
  metal: "금",
  water: "수",
};

const ELEMENT_KOREAN_ORDER: ElementType[] = ["wood", "fire", "earth", "metal", "water"];

const COMPLEMENT_GUIDES: Record<ElementType, NameCodeComplement> = {
  wood: {
    element: "wood",
    label: "목",
    initials: ["ㄱ", "ㅋ"],
    message: "ㄱ, ㅋ 계열의 발음은 생각의 결을 또렷하게 세우고 시작의 리듬을 더해줄 수 있습니다.",
  },
  fire: {
    element: "fire",
    label: "화",
    initials: ["ㄴ", "ㄷ", "ㄹ", "ㅌ"],
    message: "ㄴ, ㄷ, ㄹ, ㅌ 계열의 발음은 흐름과 표현을 한층 부드럽고 생기 있게 열어줄 수 있습니다.",
  },
  earth: {
    element: "earth",
    label: "토",
    initials: ["ㅇ", "ㅎ"],
    message: "ㅇ, ㅎ 계열의 발음은 중심을 가라앉히고 이름 전체에 포근한 안정감을 보태줄 수 있습니다.",
  },
  metal: {
    element: "metal",
    label: "금",
    initials: ["ㅅ", "ㅈ", "ㅊ"],
    message: "ㅅ, ㅈ, ㅊ 계열의 발음은 인상을 맑고 선명하게 만들며 표현의 결을 정돈해줄 수 있습니다.",
  },
  water: {
    element: "water",
    label: "수",
    initials: ["ㅁ", "ㅂ", "ㅍ"],
    message: "ㅁ, ㅂ, ㅍ 계열의 발음은 감정의 흐름을 더 유연하게 하고 부드러운 친화력을 더해줄 수 있습니다.",
  },
};

const STYLE_CARDS: NameCodeStyleCard[] = [
  {
    id: "soft",
    title: "부드러운 이름형",
    subtitle: "감정 흐름, 따뜻함",
    examples: ["민아", "서윤", "지안"],
    description:
      "결이 둥글고 다정한 울림을 주는 이름형입니다. 사람과 감정 사이의 온도를 편안하게 이어주고, 말의 분위기를 부드럽게 감싸는 느낌을 선호할 때 잘 어울립니다.",
  },
  {
    id: "steady",
    title: "안정형 이름",
    subtitle: "중심감, 균형",
    examples: ["정현", "도윤", "하준"],
    description:
      "과하지 않게 균형을 잡아주는 이름형입니다. 흐름이 한쪽으로 치우치지 않도록 정리해주고, 차분하면서도 믿음직한 인상을 남기고 싶을 때 편안한 방향이 됩니다.",
  },
  {
    id: "lively",
    title: "활발한 이름형",
    subtitle: "에너지, 추진력",
    examples: ["태준", "시우", "건우"],
    description:
      "리듬이 분명하고 앞으로 나아가는 힘이 느껴지는 이름형입니다. 조금 더 또렷한 존재감, 활기 있는 첫인상, 생동감 있는 에너지를 원할 때 자연스럽게 연결될 수 있습니다.",
  },
];

function isHangulSyllable(char: string) {
  const code = char.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

function normalizeInputName(name: string) {
  return name.replace(/\s+/g, "");
}

export function extractInitials(name: string) {
  return [...normalizeInputName(name)].flatMap((char) => {
    if (isHangulSyllable(char)) {
      const syllableIndex = char.charCodeAt(0) - 0xac00;
      const initialIndex = Math.floor(syllableIndex / 588);
      return [INITIAL_ORDER[initialIndex] ?? ""];
    }

    if (char in INITIAL_TO_ELEMENT) {
      return [char];
    }

    return [];
  });
}

function createEmptyCounts() {
  return {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  } as const;
}

function buildEnergyFlow(
  name: string,
  initials: string[],
  counts: Record<ElementType, number>,
  dominantElements: ElementType[],
  lackingElements: ElementType[],
) {
  const dominantText =
    dominantElements.length > 0
      ? dominantElements.map((element) => ELEMENT_LABELS[element]).join(", ")
      : "균형";
  const lackingText =
    lackingElements.length > 0
      ? lackingElements.map((element) => ELEMENT_LABELS[element]).join(", ")
      : "특별히 비어 보이는 기운 없이";
  const opening =
    initials.length > 0
      ? `${name}이라는 이름은 ${initials.join(", ")}의 첫 울림으로 시작합니다. 소리가 열리는 순서를 따라가 보면 이름 안의 리듬이 잔잔하게 드러나고, 그 흐름이 한 사람의 분위기와 기억되는 결을 만들어냅니다.`
      : `${name}이라는 이름은 조용하지만 분명한 소리의 결을 가지고 있습니다. 이름이 불릴 때마다 남는 여운을 따라가 보면, 단단함과 부드러움이 어떤 비율로 섞여 있는지 자연스럽게 느껴집니다.`;

  const dominantParagraph = `지금 이 이름에서는 ${dominantText}의 기운이 조금 더 선명하게 느껴집니다. 그래서 전체 인상이 한쪽으로 치우친다기보다, 먼저 닿는 감각과 오래 남는 인상이 비교적 또렷하게 이어지는 편입니다.`;

  const balanceParagraph =
    lackingElements.length > 0
      ? `반대로 ${lackingText}의 자리는 여백처럼 남아 있습니다. 이 여백은 부족함을 뜻하기보다, 이름의 흐름을 조금 더 부드럽게 보완해볼 수 있는 방향을 알려주는 신호에 가깝습니다.`
      : "전체 오행이 고르게 퍼져 있어 특정 기운이 비어 보이지 않습니다. 그래서 이름의 인상은 강하게 몰아치기보다 자연스럽게 이어지고, 상황에 따라 다양한 결을 보여줄 수 있습니다.";

  const closing =
    counts.water + counts.earth >= counts.wood + counts.fire + counts.metal
      ? "전반적으로 이 이름은 조용히 스며드는 힘이 있습니다. 서두르기보다 천천히 신뢰를 쌓고, 오래 곁에 남는 분위기를 만드는 쪽에 더 가까운 울림입니다."
      : "전반적으로 이 이름은 바깥으로 번지는 힘이 있습니다. 머물기보다 움직이며 장면을 바꾸고, 인상에 선명한 결을 남기는 쪽으로 흐르기 쉬운 울림입니다.";

  return [opening, dominantParagraph, balanceParagraph, closing];
}

export function validateNamingInput(input: Partial<NameCodeInput>): NameCodeValidationResult {
  const errors: string[] = [];
  const name = String(input.name ?? "").trim();
  const birthDate = String(input.birth_date ?? "").trim();

  if (!name) {
    errors.push("이름을 입력해주세요.");
  }

  if (name && extractInitials(name).length === 0) {
    errors.push("한글 이름 기준으로 다시 입력해주세요.");
  }

  if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    errors.push("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      birth_date: birthDate || undefined,
    },
  };
}

export function generateNameCodeResult(input: NameCodeInput): NameCodeResult {
  const initials = extractInitials(input.name);
  const counts = { ...createEmptyCounts() };

  for (const initial of initials) {
    const element = INITIAL_TO_ELEMENT[initial];
    if (element) {
      counts[element] += 1;
    }
  }

  const dominantValue = Math.max(...ELEMENT_KOREAN_ORDER.map((element) => counts[element]));
  const dominantElements = ELEMENT_KOREAN_ORDER.filter(
    (element) => counts[element] > 0 && counts[element] === dominantValue,
  );
  const lackingElements = ELEMENT_KOREAN_ORDER.filter((element) => counts[element] === 0).slice(0, 2);
  const complements =
    lackingElements.length > 0
      ? lackingElements.map((element) => COMPLEMENT_GUIDES[element])
      : dominantElements.length > 0
      ? dominantElements.map((element) => COMPLEMENT_GUIDES[element]).slice(0, 1)
      : [COMPLEMENT_GUIDES.earth];

  return {
    name: input.name,
    birthDate: input.birth_date,
    initials,
    elementCounts: counts,
    dominantElements,
    lackingElements,
    energyFlow: buildEnergyFlow(input.name, initials, counts, dominantElements, lackingElements),
    complements,
    styleCards: STYLE_CARDS,
    guidanceNote:
      "본 이름 분석은 전통 음양오행과 발음기관 이론을 바탕으로 현대적으로 재해석된 ‘이름 에너지 분석’입니다.",
  };
}

export function formatElementSummary(counts: Record<ElementType, number>) {
  return ELEMENT_KOREAN_ORDER.map((element) => `${ELEMENT_LABELS[element]} ${counts[element]}`).join(" / ");
}

export function getElementLabel(element: ElementType) {
  return ELEMENT_LABELS[element];
}
