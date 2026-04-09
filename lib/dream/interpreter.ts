import { DREAM_SYMBOLS } from "@/lib/dream/symbol-dataset";
import {
  type DreamCompanion,
  type DreamEmotion,
  type DreamInput,
  type DreamResult,
  type DreamSymbolInsight,
  type DreamSituation,
  type DreamSymbolMeaning,
  type DreamValidationResult,
} from "@/types/dream";

const LABEL_READING: Partial<Record<string, string>> = {
  감정: "감정의 흐름이 안에서 천천히 움직이고 있다는 신호",
  흐름: "정체됐던 일이 다시 움직일 준비를 하고 있다는 암시",
  재물: "현실적 기회나 자원에 대한 감각이 예민해지고 있다는 표시",
  변화: "기존 패턴을 벗어나는 전환점이 다가오고 있다는 징후",
  유혹: "겉으로 좋아 보이지만 신중히 봐야 할 선택지가 있다는 경고",
  기회: "두려움과 함께 열리는 새로운 가능성",
  불안: "마음속 긴장이나 잃고 싶지 않은 부분이 커지고 있다는 반영",
  관계: "사람 사이 거리감과 반응이 중요한 주제가 되고 있다는 표시",
  자신감: "자기표현이나 자존감이 흔들리기 쉬운 시기라는 메시지",
  정리: "오래된 감정이나 상황을 마무리할 시점이 왔다는 신호",
  전환: "끝처럼 보여도 다음 단계로 넘어가는 문턱에 있다는 흐름",
  "새 출발": "새로운 리듬이나 역할로 옮겨갈 준비가 시작됐다는 암시",
  "통제 상실": "예상하지 못한 변수에 대한 불안이 무의식에 쌓여 있다는 반영",
  경고: "서두르기보다 상황을 한 번 더 점검하라는 안내",
  자유: "답답했던 틀에서 벗어나고 싶은 마음이 강해지고 있다는 흐름",
  확장: "시야와 가능성이 넓어지고 있다는 암시",
  가능성: "지금 선택이 앞으로의 폭을 넓힐 수 있다는 메시지",
  시야: "한걸음 물러서서 크게 볼 필요가 있다는 신호",
  영감: "감정보다 직관이 먼저 움직이고 있다는 흐름",
  회상: "정리되지 않은 기억이나 감정이 다시 떠오르고 있다는 반응",
  메시지: "지금 꼭 돌아봐야 할 마음의 주제가 있다는 의미",
  보호: "불안한 시기일수록 스스로를 지키는 감각이 필요하다는 신호",
  에너지: "억눌린 힘이나 의지가 다시 올라오고 있다는 흐름",
  표현: "마음속 것을 밖으로 드러낼 타이밍이 다가오고 있다는 뜻",
  가치: "내가 무엇을 중요하게 여기는지 다시 점검할 시기라는 의미",
  재정: "현실적인 기반과 선택 기준을 정리할 필요가 있다는 신호",
  풍요: "작지만 분명한 보상과 풍요의 흐름이 열리고 있다는 암시",
  내면: "바깥 사건보다 마음의 상태를 먼저 살펴야 한다는 흐름",
  안정: "심리적 기반과 생활 리듬을 지키는 일이 중요하다는 안내",
  기반: "지금의 선택이 앞으로의 토대를 만들고 있다는 의미",
};

const LABEL_ADVICE: Partial<Record<string, string>> = {
  감정: "지금은 감정을 빨리 정리하려 하기보다 무엇이 흔들리고 있는지 이름 붙여 보는 것이 먼저입니다.",
  흐름: "한 번에 답을 내리기보다 반복되는 장면과 감정의 방향을 며칠 더 관찰해 보세요.",
  재물: "현실적인 기회와 손실을 동시에 따져 보고, 막연한 기대보다 기준을 먼저 세우는 것이 좋습니다.",
  풍요: "들어오는 기회를 흘려보내지 않도록 작은 가능성도 구체적으로 붙잡아 두는 편이 좋습니다.",
  변화: "변화를 밀어붙이기보다 무엇을 끝내고 무엇을 남길지 구분해 두면 흐름이 훨씬 선명해집니다.",
  관계: "상대 반응을 해석하기 전에 내 안의 서운함과 기대를 먼저 정리해 두는 것이 도움이 됩니다.",
  자신감: "말을 줄이기보다 지금 가장 위축되는 지점을 정확히 적어보면 자신감 회복에 도움이 됩니다.",
  정리: "붙잡고 있는 오래된 감정이나 일 하나를 정리하면 다음 흐름이 더 부드럽게 열릴 수 있습니다.",
  경고: "지금은 직감만 믿고 움직이기보다 현실 정보와 컨디션을 함께 점검해 보는 편이 좋습니다.",
  자유: "답답함을 무조건 끊어내기보다 지금 나를 묶는 조건이 무엇인지부터 분명히 해 보세요.",
  내면: "외부 성과보다 마음의 회복과 생활 리듬을 먼저 안정시키는 것이 지금은 더 중요합니다.",
  안정: "생활 패턴을 조금만 정돈해도 불안이 줄고 해석이 훨씬 선명해질 수 있습니다.",
};

const LABEL_FLOW: Partial<Record<string, string>> = {
  흐름: "멈춰 있던 일이 다시 움직일 준비를 하면서, 마음과 현실 사이의 리듬이 서서히 맞춰지고 있습니다.",
  변화: "익숙한 방식에서 벗어나 새로운 선택 기준을 세우는 전환 흐름이 시작되고 있습니다.",
  재물: "현실적인 보상과 기회가 조금씩 눈에 보이기 시작하는 흐름이 강화되고 있습니다.",
  풍요: "작은 가능성이 쌓여 실제 성과로 이어질 수 있는 풍요의 흐름이 열리고 있습니다.",
  관계: "감정 표현과 거리 조절 방식이 바뀌면서 관계의 온도도 함께 달라질 수 있습니다.",
  정리: "정리와 마무리를 거친 뒤에야 다음 단계가 보이는 흐름이 강해지고 있습니다.",
  자유: "답답했던 구조를 벗어나 시야를 넓히려는 흐름이 점점 선명해지고 있습니다.",
  내면: "겉으로 보이는 결과보다 마음의 균형과 회복이 더 중요한 흐름이 강화되고 있습니다.",
  기반: "당장 큰 변화보다 생활의 기반을 다지는 쪽으로 에너지가 모이고 있습니다.",
};

const EMOTION_READING: Record<DreamEmotion, string> = {
  fear: "무서움이 동반된 꿈은 무의식이 이미 알고 있는 불안 요소를 더 이상 미루지 말라고 강하게 신호 보내는 경우가 많습니다.",
  sadness: "슬픔이 남는 꿈은 놓아야 할 감정, 회복이 필요한 관계, 오래 남은 여운을 정리해야 할 시기와 맞닿아 있는 경우가 많습니다.",
  anger: "분노가 올라오는 꿈은 억눌린 의사 표현이나 경계가 무너진 지점을 무의식이 대신 드러내고 있을 가능성이 큽니다.",
  calm: "평온한 감정이 남는 꿈은 상황 자체보다 그 안의 메시지를 담담하게 받아들일 준비가 되어 있다는 뜻에 가깝습니다.",
  surprise: "놀람이 강했던 꿈은 예상 밖의 변화, 갑작스럽게 드러날 진실, 새로운 가능성에 대한 감각이 깨어나고 있다는 신호일 수 있습니다.",
};

const EMOTION_ADVICE: Record<DreamEmotion, string> = {
  fear: "무서움이 남았다면 그 감정을 없애려 하기보다, 정확히 무엇이 위협처럼 느껴졌는지를 적어보는 것이 해석에 도움이 됩니다.",
  sadness: "슬픔이 컸다면 무언가를 되돌리려 하기보다, 무엇을 애도하고 무엇을 놓아줘야 하는지부터 분명히 해보세요.",
  anger: "분노가 남았다면 참아온 요구나 선을 침범당한 지점을 점검해 보는 것이 좋습니다.",
  calm: "평온함이 남았다면 꿈의 장면을 조용히 복기하면서 지금 삶에 적용할 수 있는 메시지를 하나만 골라보세요.",
  surprise: "놀람이 컸다면 당장의 충격보다 어떤 변화 가능성이 모습을 드러냈는지 차분히 정리해 보는 편이 좋습니다.",
};

const SITUATION_READING: Record<DreamSituation, string> = {
  chased: "쫓기는 상황은 현실에서 피하고 있는 압박, 마주하기 어려운 감정, 뒤늦게 따라오는 책임감과 연결되기 쉽습니다.",
  falling: "떨어지는 상황은 통제력을 잃고 싶지 않은 마음, 기반이 흔들릴까 걱정하는 불안과 자주 맞닿아 있습니다.",
  conflict: "싸우는 상황은 밖으로 드러내지 못한 감정 충돌이나 관계 안에서 쌓인 긴장을 직접적으로 비추는 경우가 많습니다.",
  discovery: "무언가를 발견하는 상황은 감춰져 있던 가능성, 몰랐던 마음, 현실에서 새롭게 보게 될 기회를 뜻할 수 있습니다.",
  movement: "이동하는 상황은 인생의 방향 전환, 감정의 이동, 새로운 단계로 넘어가기 전의 준비 과정을 상징하기 쉽습니다.",
};

const COMPANION_READING: Record<DreamCompanion, string> = {
  alone: "혼자 등장했다는 점은 지금 문제가 관계보다 내면의 상태와 더 직접적으로 연결되어 있음을 보여줍니다.",
  known: "아는 사람이 함께 있었다면 현실 관계 속 감정 패턴이나 익숙한 역할이 꿈 해석의 중요한 힌트가 됩니다.",
  unknown: "모르는 사람이 등장했다면 아직 이름 붙이지 못한 감정이나 낯선 가능성이 꿈 안에서 상징으로 나타난 것일 수 있습니다.",
  family: "가족이 등장했다면 오래된 정서적 습관, 안정감, 책임감, 보호 본능과 연결해 읽어볼 필요가 있습니다.",
};

const EMOTION_SUMMARY: Record<DreamEmotion, string> = {
  fear: "불안을 외면하기보다 정면으로 읽어야 하는 시기입니다.",
  sadness: "놓아야 할 감정과 회복의 흐름이 함께 움직이고 있습니다.",
  anger: "억눌린 경계와 표현 욕구가 강하게 올라오는 시기입니다.",
  calm: "무의식의 메시지를 차분히 받아들일 준비가 되어 있습니다.",
  surprise: "예상 밖 변화의 문턱에서 감각이 깨어나는 시기입니다.",
};

const SITUATION_FLOW: Record<DreamSituation, string> = {
  chased: "도망치던 문제를 마주하는 쪽으로 흐름이 움직이고 있습니다.",
  falling: "기반을 다시 점검하고 중심을 회복하는 방향으로 에너지가 모입니다.",
  conflict: "감정 충돌을 숨기기보다 건강하게 표현하는 쪽으로 흐름이 전환됩니다.",
  discovery: "숨겨진 기회나 진실을 인식하는 순간이 가까워지고 있습니다.",
  movement: "정체를 벗어나 새로운 단계로 이동하려는 흐름이 시작되고 있습니다.",
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

  if (!["fear", "sadness", "anger", "calm", "surprise"].includes(emotion ?? "")) {
    errors.push("꿈에서 가장 크게 남은 감정을 선택해 주세요.");
  }

  if (!["chased", "falling", "conflict", "discovery", "movement"].includes(situation ?? "")) {
    errors.push("꿈의 핵심 상황을 선택해 주세요.");
  }

  if (
    companion != null &&
    !["alone", "known", "unknown", "family"].includes(companion)
  ) {
    errors.push("등장 인물 선택값을 다시 확인해 주세요.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      dream_text: dreamText,
      emotion,
      situation,
      ...(companion ? { companion } : {}),
    },
  };
}

function extractMatchedSymbols(text: string): DreamSymbolMeaning[] {
  const particles = "(이|가|은|는|을|를|와|과|도|만|의|에|에서|로|으로|처럼|같은|까지|부터)?";
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
    .map((label) => LABEL_READING[label] ?? `${label}와 관련된 흐름`)
    .join(", ");
}

function pickFirstMessage(labels: string[], dictionary: Partial<Record<string, string>>, fallback: string) {
  return labels.map((label) => dictionary[label]).find(Boolean) ?? fallback;
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
    title: `${input.emotion === "fear" ? "무서움" : input.emotion === "sadness" ? "슬픔" : input.emotion === "anger" ? "분노" : input.emotion === "calm" ? "평온" : "놀람"} 감정`,
    description: EMOTION_READING[input.emotion],
  };

  const situationItem: DreamSymbolInsight = {
    title: `${input.situation === "chased" ? "쫓김" : input.situation === "falling" ? "떨어짐" : input.situation === "conflict" ? "싸움" : input.situation === "discovery" ? "발견" : "이동"} 상황`,
    description: SITUATION_READING[input.situation],
  };

  const companionItem =
    input.companion != null
      ? [
          {
            title:
              input.companion === "alone"
                ? "혼자 등장"
                : input.companion === "known"
                  ? "아는 사람 등장"
                  : input.companion === "unknown"
                    ? "모르는 사람 등장"
                    : "가족 등장",
            description: COMPANION_READING[input.companion],
          },
        ]
      : [];

  return [...symbolItems, emotionItem, situationItem, ...companionItem].slice(0, 5);
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
  const situationText = SITUATION_READING[input.situation];
  const companionText = input.companion ? COMPANION_READING[input.companion] : "";
  const summary = `${EMOTION_SUMMARY[input.emotion]} ${SITUATION_FLOW[input.situation]}`;

  const narrative = `${primarySymbol.meaning} ${
    secondarySymbol
      ? `여기에 ${secondarySymbol.keyword} 상징까지 겹치면서, 꿈은 단일 장면이 아니라 서로 다른 감정과 사건이 한 흐름으로 이어지고 있음을 보여줍니다.`
      : `꿈은 한 가지 상징을 또렷하게 밀어 올리며 지금 가장 중요한 주제를 분명하게 가리키고 있습니다.`
  } ${situationText} ${emotionText} ${
    companionText
      ? `${companionText} 그래서 이 꿈은 겉으로 보이는 사건보다, 그 안에서 내가 어떻게 반응하고 무엇을 붙잡고 있는지를 천천히 들여다보라고 말하고 있습니다.`
      : `그래서 이 꿈은 겉으로 보이는 사건보다, 그 장면이 내 안에서 어떤 패턴을 반복시키고 있는지를 보라고 말하고 있습니다.`
  }`;

  const psychology = `${pairedKeywords} 상징은 지금 내면에서 ${labelMixText}이 동시에 움직이고 있음을 보여줍니다. ${emotionText} ${
    input.companion
      ? companionText
      : "현재의 문제는 바깥 사람보다 내 안의 반응, 기대, 두려움과 더 직접적으로 연결되어 있을 가능성이 큽니다."
  } 지금은 단순히 길몽이나 흉몽으로 나누기보다, 어떤 감정이 반복되고 무엇이 아직 정리되지 않았는지 읽어내는 태도가 더 중요합니다.`;

  const actionGuides = [
    pickFirstMessage(
      [input.emotion, ...labelFocus],
      { ...LABEL_ADVICE, ...EMOTION_ADVICE },
      "지금은 꿈의 인상을 빨리 결론내리기보다, 가장 강하게 남는 장면이 현실의 어떤 문제와 닮아 있는지 연결해서 적어보는 것이 도움이 됩니다.",
    ),
    `${input.situation === "chased" ? "피하고 있는 일" : input.situation === "falling" ? "기반이 흔들린다고 느끼는 부분" : input.situation === "conflict" ? "마음속 충돌이 있는 관계" : input.situation === "discovery" ? "새롭게 보이기 시작한 가능성" : "움직이고 싶은 방향"}을 하나만 골라 현실에서 구체적인 문장으로 적어보세요.`,
    `${
      input.companion === "family"
        ? "가족과 연결된 오래된 감정 패턴"
        : input.companion === "known"
          ? "익숙한 관계 안에서 반복되는 반응"
          : input.companion === "unknown"
            ? "아직 이름 붙이지 못한 낯선 감정"
            : "내 안에서 혼자 키우고 있는 생각"
    }을 오늘 하루 한 번은 의식적으로 돌아보세요.`,
  ];

  const energyFlow = `${pickFirstMessage(
    labelFocus,
    LABEL_FLOW,
    "지금은 외부 사건 하나보다 내면의 반응과 생활 리듬을 함께 읽어야 흐름이 더 선명해지는 시기입니다.",
  )} ${
    input.emotion === "calm"
      ? "지금의 에너지는 비교적 잔잔하지만, 그 안에서 중요한 메시지가 또렷하게 떠오르는 쪽으로 흐르고 있습니다."
      : input.emotion === "surprise"
        ? "정체돼 있던 감각이 흔들리면서 새로운 방향을 받아들일 준비가 시작되고 있습니다."
        : "지금의 에너지는 다소 흔들리더라도, 그 흔들림 자체가 변화의 방향을 알려주는 신호가 되고 있습니다."
  }`;

  const closingMessage = input.companion
    ? `이 꿈이 보여준 관계와 감정의 장면은, 지금 당신에게 무엇을 더 정직하게 바라보라고 말하고 있을까요?`
    : `이 꿈이 반복해서 비춘 장면은, 지금 당신 안에서 무엇을 가장 먼저 알아차리라고 말하고 있을까요?`;

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
