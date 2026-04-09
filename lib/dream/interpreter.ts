import { DREAM_SYMBOLS } from "@/lib/dream/symbol-dataset";
import {
  type DreamCompanion,
  type DreamEmotion,
  type DreamInput,
  type DreamResult,
  type DreamSituation,
  type DreamSymbolInsight,
  type DreamSymbolMeaning,
  type DreamValidationResult,
} from "@/types/dream";

const LABEL_READING: Partial<Record<string, string>> = {
  감정: "마음속에 눌려 있던 감정이 표면 가까이 올라오고 있다는 신호입니다.",
  흐름: "지금 삶의 리듬이 바뀌거나 방향을 다시 읽어야 할 시기가 가까워지고 있음을 비춥니다.",
  재물: "보상, 자원, 기회와 연결된 감각이 무의식에서 중요하게 다뤄지고 있습니다.",
  변화: "익숙한 방식에서 벗어나 새로운 국면으로 넘어가는 전환의 징후가 담겨 있습니다.",
  유혹: "겉으로 좋아 보여도 중심을 잃지 말아야 할 선택지가 가까이에 있다는 경고입니다.",
  기회: "준비한 만큼 붙잡을 수 있는 가능성이 주변에 열리고 있음을 보여줍니다.",
  불안: "놓치고 싶지 않은 것, 흔들리고 싶지 않은 것이 동시에 커지고 있다는 뜻입니다.",
  관계: "사람 사이의 거리감과 반응이 지금 해석의 핵심 주제가 되고 있습니다.",
  자신감: "자기표현과 자존감이 흔들리거나 다시 세워져야 하는 흐름이 드러납니다.",
  정리: "오래 붙잡은 감정이나 상황을 마무리해야 다음 흐름이 열릴 수 있다는 신호입니다.",
  전환: "지금의 선택이 이후의 방향을 바꾸는 분기점과 연결되어 있습니다.",
  불확실성: "예상하지 못한 변화에 대한 긴장이 아직 완전히 해소되지 않았습니다.",
  경고: "성급히 결론 내리기보다 한 번 더 살펴보라는 무의식의 브레이크입니다.",
  자유: "답답했던 조건이나 관계에서 벗어나려는 욕구가 선명해지고 있습니다.",
  확장: "시야와 가능성이 조금씩 넓어지고 있다는 조용한 신호입니다.",
  가능성: "당장 확신이 없더라도 열려 있는 길이 있다는 메시지입니다.",
  시야: "가까이만 보던 문제를 한 걸음 물러서서 봐야 할 필요가 있습니다.",
  직감: "논리보다 먼저 반응하는 감각이 깨어나고 있습니다.",
  보호: "불안할수록 스스로를 지키는 감각을 먼저 회복해야 한다는 뜻입니다.",
  에너지: "멈춰 있던 추진력이 다시 움직이기 시작하고 있음을 보여줍니다.",
  표현: "마음속 것을 밖으로 드러내야 흐름이 풀린다는 메시지입니다.",
  가치: "내게 정말 중요한 것이 무엇인지 다시 확인해야 하는 시기입니다.",
  안정: "바깥 변화보다 삶의 기반과 감정 리듬을 지키는 것이 우선입니다.",
  기반: "지금의 선택이 앞으로의 방향을 받치는 기초가 됩니다.",
};

const LABEL_ADVICE: Partial<Record<string, string>> = {
  감정: "지금 흔들리는 감정을 억지로 정리하기보다, 무엇이 가장 크게 마음을 건드리는지 먼저 이름 붙여 보세요.",
  흐름: "서둘러 답을 내리기보다 최근 반복되는 상황과 감정의 패턴을 며칠만 더 관찰해 보세요.",
  재물: "기회나 보상과 연결된 문제라면 막연한 기대보다 기준을 먼저 세우는 편이 좋습니다.",
  변화: "변화를 밀어붙이기보다 무엇을 떠나고 무엇을 지켜야 하는지 구분해 보세요.",
  관계: "상대 반응을 해석하기 전에 내 안의 서운함과 기대부터 먼저 정리해 두는 것이 도움이 됩니다.",
  자신감: "불안한 지점을 감추기보다 어떤 순간에 작아지는지 구체적으로 적어 보면 중심이 돌아옵니다.",
  정리: "오래 붙잡고 있던 감정이나 문제 하나를 오늘 안에 정리하면 흐름이 한결 부드러워집니다.",
  경고: "직감만 믿고 움직이기보다 실제 정보와 몸 상태를 함께 살펴보세요.",
  자유: "답답함을 풀기 위해 무조건 떠나기보다 무엇이 나를 묶고 있는지 먼저 확인해 보세요.",
  안정: "지금은 큰 성과보다 수면, 식사, 생활 리듬을 지키는 것이 해석보다 더 중요합니다.",
  기반: "생활의 작은 루틴 하나만 바로잡아도 마음이 훨씬 덜 흔들릴 수 있습니다.",
};

const LABEL_FLOW: Partial<Record<string, string>> = {
  흐름: "삶의 리듬을 다시 읽고 방향을 조정해야 하는 흐름이 강해지고 있습니다.",
  변화: "익숙한 패턴에서 벗어나 새로운 국면으로 넘어가려는 전환 에너지가 움직이고 있습니다.",
  재물: "작지만 현실적인 보상과 기회가 눈에 들어오기 시작하는 시기입니다.",
  관계: "감정 표현과 거리 조절 방식이 바뀌면 관계의 온도도 함께 달라질 수 있습니다.",
  정리: "정리와 마무리를 거친 뒤에야 다음 단계가 보이는 흐름입니다.",
  자유: "답답했던 구조를 벗어나 시야를 넓히려는 흐름이 조금씩 선명해지고 있습니다.",
  안정: "외부 변화보다 내면 균형과 생활 기반을 다지는 에너지가 더 강합니다.",
  기반: "당장 큰 변화보다 생활의 기초를 정비하는 쪽으로 에너지가 모이고 있습니다.",
};

const EMOTION_LABELS: Record<DreamEmotion, string> = {
  fear: "무서움",
  sadness: "슬픔",
  anger: "분노",
  calm: "평온",
  surprise: "놀람",
  joy: "기쁨",
};

const EMOTION_READING: Record<DreamEmotion, string> = {
  fear: "무서움이 남는 꿈은 무의식이 아직 정면으로 마주하지 못한 불안과 경계를 크게 비추고 있다는 뜻에 가깝습니다.",
  sadness: "슬픔이 남는 꿈은 잃어버린 감정, 회복이 필요한 관계, 오래 눌려 있던 마음을 천천히 들여다보라는 신호일 수 있습니다.",
  anger: "분노가 강한 꿈은 표현되지 못한 감정이나 무너진 경계가 무의식에서 다시 목소리를 내고 있음을 보여줍니다.",
  calm: "평온함이 남는 꿈은 상황 자체보다 그 안의 메시지를 차분히 받아들일 준비가 되어 있다는 뜻에 가깝습니다.",
  surprise: "놀람이 남는 꿈은 예상 밖 변화의 가능성 앞에서 감각이 예민하게 깨어나고 있음을 의미합니다.",
  joy: "기쁨이 남는 꿈은 무의식이 지금 삶 속의 가능성과 확장성을 긍정적으로 받아들이고 있음을 비춥니다.",
};

const EMOTION_ADVICE: Record<DreamEmotion, string> = {
  fear: "무서움을 줄이려 애쓰기보다, 무엇이 가장 위협처럼 느껴지는지 구체적인 문장으로 적어 보세요.",
  sadness: "슬픔을 밀어내기보다 무엇을 아직 보내지 못했는지, 혹은 무엇을 회복하고 싶은지 먼저 알아차려 보세요.",
  anger: "분노가 남았다면 참기보다 어떤 경계가 침범됐는지 분명히 하는 것이 우선입니다.",
  calm: "평온함이 남았다면 꿈의 상징을 서둘러 해석하기보다 지금 삶에 적용할 수 있는 메시지 하나만 붙잡아 보세요.",
  surprise: "놀람이 남았다면 충격 자체보다 어떤 변화 가능성이 드러났는지 차분히 정리해 보는 편이 좋습니다.",
  joy: "기쁨이 남았다면 그 감정을 흘려보내지 말고 지금 현실에서 무엇이 열리고 있는지 구체적으로 확인해 보세요.",
};

const EMOTION_SUMMARY: Record<DreamEmotion, string> = {
  fear: "불안을 피하기보다 정면으로 읽어야 할 시기입니다.",
  sadness: "회복되지 않은 감정과 관계의 흐름이 조용히 움직이고 있습니다.",
  anger: "경계와 자기표현이 다시 중요해지는 시기입니다.",
  calm: "무의식의 메시지를 차분히 받아들일 준비가 되어 있습니다.",
  surprise: "예상 밖 변화의 문턱에서 감각이 깨어나는 시기입니다.",
  joy: "좋은 흐름과 확장 가능성을 받아들일 준비가 된 시기입니다.",
};

const SITUATION_LABELS: Record<DreamSituation, string> = {
  chased: "쫓김",
  falling: "떨어짐",
  conflict: "싸움",
  discovery: "발견",
  movement: "이동",
  pause: "멈춤",
};

const SITUATION_READING: Record<DreamSituation, string> = {
  chased: "쫓기는 상황은 현실에서 피하고 있는 압박, 마주하기 어려운 감정, 빠르게 따라오는 책임감과 연결되기 쉽습니다.",
  falling: "떨어지는 상황은 통제력을 잃고 싶지 않은 마음, 기반이 흔들릴까 걱정하는 불안과 닿아 있습니다.",
  conflict: "싸우는 장면은 바깥으로 드러나지 못한 감정 충돌이나 관계 속 긴장이 직접적으로 비춰지는 경우가 많습니다.",
  discovery: "무언가를 발견하는 상황은 감춰져 있던 가능성이나 마음속 진실을 이제야 보게 되는 흐름과 자주 연결됩니다.",
  movement: "이동하는 상황은 방향 전환, 감정의 이동, 새로운 단계로 넘어가기 전의 준비 과정을 상징하기 쉽습니다.",
  pause: "멈춰 있는 상황은 억지로 앞으로 나가기보다, 지금의 정체가 무엇을 돌아보라고 하는지 살펴야 하는 시기와 연결되기 쉽습니다.",
};

const COMPANION_READING: Record<DreamCompanion, string> = {
  alone: "혼자 등장했다는 것은 지금의 문제와 감정이 관계보다 내면 상태와 더 직접적으로 연결되어 있음을 보여줍니다.",
  known: "아는 사람이 함께 나왔다면 현실 관계에서 반복되는 감정 패턴이나 미묘한 긴장이 함께 반영됐을 가능성이 큽니다.",
  unknown: "모르는 사람이 등장했다면 아직 이름 붙이지 못한 감정이나 낯선 가능성이 꿈속 인물로 형상화된 경우가 많습니다.",
  family: "가족이 등장했다면 오래된 정서적 기반, 안정감, 책임감, 보호 본능과 연결된 주제를 살펴볼 필요가 있습니다.",
};

const SITUATION_FLOW: Record<DreamSituation, string> = {
  chased: "피해 오던 문제를 마주하는 쪽으로 흐름이 움직이고 있습니다.",
  falling: "기반을 다시 붙잡고 중심을 회복하는 방향으로 에너지가 모이고 있습니다.",
  conflict: "감정 충돌을 억누르기보다 건강하게 표현하는 쪽으로 흐름이 전환되고 있습니다.",
  discovery: "숨겨진 기회와 진실을 인식하는 시기가 가까워지고 있습니다.",
  movement: "정체를 벗어나 새로운 단계로 이동하려는 흐름이 시작되고 있습니다.",
  pause: "지금은 속도를 내기보다 잠시 멈춰 서서 방향을 다시 읽는 흐름이 강해지고 있습니다.",
};

export function validateDreamInput(input: Partial<DreamInput>): DreamValidationResult {
  const errors: string[] = [];
  const dreamText = String(input.dream_text ?? "").trim();
  const emotion = input.emotion;
  const situation = input.situation;
  const companion = input.companion;

  if (dreamText.length < 8) {
    errors.push("꿈 내용은 조금 더 구체적으로 입력해 주세요.");
  }

  if (!["fear", "sadness", "anger", "calm", "surprise", "joy"].includes(emotion ?? "")) {
    errors.push("꿈에서 가장 크게 남은 감정을 선택해 주세요.");
  }

  if (
    situation != null &&
    !["chased", "falling", "conflict", "discovery", "movement", "pause"].includes(
      situation,
    )
  ) {
    errors.push("꿈의 핵심 상황 선택값을 다시 확인해 주세요.");
  }

  if (companion != null && !["alone", "known", "unknown", "family"].includes(companion)) {
    errors.push("등장 인물 선택값을 다시 확인해 주세요.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      dream_text: dreamText,
      emotion: emotion as DreamEmotion,
      ...(situation ? { situation: situation as DreamSituation } : {}),
      ...(companion ? { companion: companion as DreamCompanion } : {}),
    },
  };
}

function extractMatchedSymbols(text: string): DreamSymbolMeaning[] {
  const particles = "(이|가|은|는|을|를|과|와|만|도|에서|로|으로|처럼|같이|까지|부터)";

  const matches = DREAM_SYMBOLS.filter((symbol) => {
    const escapedKeyword = symbol.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^가-힣])${escapedKeyword}(?=$|[^가-힣]|${particles})`);
    return pattern.test(text);
  });

  return matches.length > 0 ? matches : [DREAM_SYMBOLS[0]];
}

function uniqueLabels(symbols: DreamSymbolMeaning[]) {
  return [...new Set(symbols.flatMap((symbol) => [symbol.keyword, ...symbol.labels]))];
}

function countLabels(symbols: DreamSymbolMeaning[]) {
  return symbols.reduce<Record<string, number>>((acc, symbol) => {
    for (const label of symbol.labels) {
      acc[label] = (acc[label] ?? 0) + 1;
    }
    return acc;
  }, {});
}

function dominantLabels(symbols: DreamSymbolMeaning[]) {
  return Object.entries(countLabels(symbols))
    .sort((a, b) => b[1] - a[1])
    .map(([label]) => label);
}

function describeLabelMix(labels: string[]) {
  return labels
    .slice(0, 3)
    .map((label) => LABEL_READING[label] ?? `${label}과 관련된 메시지가 커지고 있습니다.`)
    .join(" ");
}

function pickFirstMessage(
  labels: string[],
  dictionary: Partial<Record<string, string>>,
  fallback: string,
) {
  return labels.map((label) => dictionary[label]).find(Boolean) ?? fallback;
}

function buildSituationInsight(situation?: DreamSituation): DreamSymbolInsight[] {
  if (!situation) {
    return [];
  }

  return [
    {
      title: `${SITUATION_LABELS[situation]} 상황`,
      description: SITUATION_READING[situation],
    },
  ];
}

function buildCompanionInsight(companion?: DreamCompanion): DreamSymbolInsight[] {
  if (!companion) {
    return [];
  }

  return [
    {
      title:
        companion === "alone"
          ? "혼자 등장"
          : companion === "known"
            ? "아는 사람 등장"
            : companion === "unknown"
              ? "모르는 사람 등장"
              : "가족 등장",
      description: COMPANION_READING[companion],
    },
  ];
}

function buildSymbolInsights(
  matchedSymbols: DreamSymbolMeaning[],
  input: DreamInput,
): DreamSymbolInsight[] {
  const symbolItems = matchedSymbols.slice(0, 3).map((symbol) => ({
    title: `${symbol.keyword} 상징`,
    description: symbol.meaning,
  }));

  const emotionItem: DreamSymbolInsight = {
    title: `${EMOTION_LABELS[input.emotion]} 감정`,
    description: EMOTION_READING[input.emotion],
  };

  return [
    ...symbolItems,
    emotionItem,
    ...buildSituationInsight(input.situation),
    ...buildCompanionInsight(input.companion),
  ].slice(0, 5);
}

function buildSituationFocusText(situation?: DreamSituation) {
  if (!situation) {
    return "꿈속 상황이 또렷하게 특정되지 않았다는 점 자체가, 지금 무의식이 하나의 사건보다 전체 분위기와 내면 반응을 더 중요하게 다루고 있음을 보여줍니다.";
  }

  return SITUATION_READING[situation];
}

function buildSituationPrompt(situation?: DreamSituation) {
  if (situation === "chased") return "피하고 있는 문제";
  if (situation === "falling") return "기반이 흔들린다고 느끼는 지점";
  if (situation === "conflict") return "감정 충돌이 남아 있는 관계";
  if (situation === "discovery") return "최근 새롭게 보이기 시작한 가능성";
  if (situation === "movement") return "지금 이동하고 싶은 방향";
  if (situation === "pause") return "멈춰 서서 다시 봐야 할 문제";
  return "가장 강하게 남은 장면";
}

export function interpretDream(input: DreamInput): DreamResult {
  const matchedSymbols = extractMatchedSymbols(input.dream_text);
  const primarySymbol = matchedSymbols[0];
  const secondarySymbol = matchedSymbols[1];
  const labelFocus = dominantLabels(matchedSymbols);
  const symbols = uniqueLabels(matchedSymbols).slice(0, 6);
  const pairedKeywords = matchedSymbols.map((symbol) => symbol.keyword).join(", ");
  const labelMixText = describeLabelMix(labelFocus);
  const emotionText = EMOTION_READING[input.emotion];
  const situationText = buildSituationFocusText(input.situation);
  const companionText = input.companion ? COMPANION_READING[input.companion] : "";

  const summary = `${EMOTION_SUMMARY[input.emotion]} ${
    input.situation
      ? SITUATION_FLOW[input.situation]
      : "아직 이름 붙이지 못한 흐름까지 천천히 읽어야 할 시기입니다."
  }`;

  const narrative = `${primarySymbol.meaning} ${
    secondarySymbol
      ? `여기에 ${secondarySymbol.keyword} 상징까지 겹치면서, 이 꿈은 하나의 장면이 아니라 서로 다른 감정과 사건이 한 흐름으로 이어지고 있음을 보여줍니다.`
      : `이 꿈은 하나의 상징을 또렷하게 밀어 올리며 지금 가장 중요한 주제를 선명하게 가리키고 있습니다.`
  } ${situationText} ${emotionText} ${
    companionText
      ? `${companionText} 그래서 이 꿈은 겉으로 보이는 사건보다, 그 안에서 내가 어떻게 반응하고 무엇을 붙잡고 있는지를 천천히 들여다보라고 말하고 있습니다.`
      : `그래서 이 꿈은 겉으로 보이는 사건보다, 그 장면 앞에서 내 마음이 어떤 패턴으로 움직이는지를 보라고 말하고 있습니다.`
  }`;

  const psychology = `${pairedKeywords} 상징은 지금 내면에서 ${labelMixText} ${emotionText} ${
    input.companion
      ? companionText
      : "현재의 문제는 바깥 사람보다 내 안의 반응, 기대, 두려움과 더 직접적으로 연결돼 있을 가능성이 큽니다."
  } 지금은 꿈을 좋은 징조인지 나쁜 징조인지로만 나누기보다, 어떤 감정이 반복되고 무엇이 아직 정리되지 않았는지 읽어내는 태도가 중요합니다.`;

  const actionGuides = [
    pickFirstMessage(
      [input.emotion, ...labelFocus],
      { ...LABEL_ADVICE, ...EMOTION_ADVICE },
      "지금은 꿈의 인상을 빨리 결론 내리기보다, 가장 강하게 남은 감정이 현실의 어떤 문제와 닿아 있는지 적어 보는 편이 좋습니다.",
    ),
    `${buildSituationPrompt(input.situation)} 하나를 골라 지금 현실에서 어떤 의미인지 한 문장으로 적어 보세요.`,
    `${
      input.companion === "family"
        ? "가족과 연결된 오래된 감정 패턴"
        : input.companion === "known"
          ? "익숙한 관계 속에서 반복되는 반응"
          : input.companion === "unknown"
            ? "아직 설명되지 않는 낯선 감정"
            : "내 안에서 혼자 버티고 있는 감각"
    }을 오늘 하루 한 번만 의식적으로 돌아보세요.`,
  ];

  const energyFlow = `${pickFirstMessage(
    labelFocus,
    LABEL_FLOW,
    "지금은 눈앞의 사건 하나보다 내면 반응과 생활 리듬을 함께 읽어야 흐름이 선명해지는 시기입니다.",
  )} ${
    input.emotion === "calm"
      ? "에너지는 비교적 고요하지만 그 안에서 중요한 메시지가 또렷하게 떠오르고 있습니다."
      : input.emotion === "surprise"
        ? "정체돼 있던 감각이 흔들리며 새로운 방향을 받아들일 준비가 시작되고 있습니다."
        : input.emotion === "joy"
          ? "에너지는 밝고 확장적이며, 가능성을 실제 현실로 연결할 수 있는 움직임이 커지고 있습니다."
          : "지금의 흔들림 자체가 곧 변화의 방향을 알려 주는 신호가 되고 있습니다."
  }`;

  const closingMessage = input.companion
    ? `이 꿈이 비춘 관계와 감정의 장면은, 지금 당신에게 무엇을 더 솔직하게 바라보라고 말하고 있을까요?`
    : `이 꿈이 반복해서 비춘 장면은, 지금 당신 안에서 무엇을 먼저 알아차리라고 말하고 있을까요?`;

  return {
    summary,
    narrative,
    symbol_insights: buildSymbolInsights(matchedSymbols, input),
    psychology,
    action_guides: actionGuides,
    energy_flow: energyFlow,
    closing_message: closingMessage,
    symbols,
    premium_preview:
      "꿈은 우리의 무의식을 반영하며, 지금 마음 깊은 곳에서 어떤 메시지가 올라오고 있는지 보여주는 상징의 언어입니다.",
    matchedSymbols,
  };
}
