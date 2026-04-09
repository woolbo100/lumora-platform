import { DREAM_SYMBOLS } from "@/lib/dream/symbol-dataset";
import {
  type DreamInput,
  type DreamResult,
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
  내면: "바깥 사건보다 마음의 상태를 먼저 살펴야 한다는 흐름",
  안정: "심리적 기반과 생활 리듬을 지키는 일이 중요하다는 안내",
  기반: "지금의 선택이 앞으로의 토대를 만들고 있다는 의미",
};

const LABEL_ADVICE: Partial<Record<string, string>> = {
  감정: "지금은 감정을 빨리 정리하려 하기보다 무엇이 흔들리고 있는지 이름 붙여 보는 것이 먼저입니다.",
  흐름: "한 번에 답을 내리기보다 반복되는 장면과 감정의 방향을 며칠 더 관찰해 보세요.",
  재물: "현실적인 기회와 손실을 동시에 따져 보고, 막연한 기대보다 기준을 먼저 세우는 것이 좋습니다.",
  변화: "변화를 밀어붙이기보다 무엇을 끝내고 무엇을 남길지 구분해 두면 흐름이 훨씬 선명해집니다.",
  관계: "상대 반응을 해석하기 전에 내 안의 서운함과 기대를 먼저 정리해 두는 것이 도움이 됩니다.",
  자신감: "말을 줄이기보다 지금 가장 위축되는 지점을 정확히 적어보면 자신감 회복에 도움이 됩니다.",
  정리: "붙잡고 있는 오래된 감정이나 일 하나를 정리하면 다음 흐름이 더 부드럽게 열릴 수 있습니다.",
  경고: "지금은 직감만 믿고 움직이기보다 현실 정보와 컨디션을 함께 점검해 보는 편이 좋습니다.",
  자유: "답답함을 무조건 끊어내기보다 지금 나를 묶는 조건이 무엇인지부터 분명히 해 보세요.",
  내면: "외부 성과보다 마음의 회복과 생활 리듬을 먼저 안정시키는 것이 지금은 더 중요합니다.",
  안정: "생활 패턴을 조금만 정돈해도 불안이 줄고 해석이 훨씬 선명해질 수 있습니다.",
};

const LABEL_WARNING: Partial<Record<string, string>> = {
  불안: "불안이 커진 상태에서는 작은 신호도 더 크게 느껴질 수 있으니 해석을 단정적으로 굳히지 않는 것이 좋습니다.",
  유혹: "좋아 보이는 선택일수록 이유를 차분히 검토해야 후회가 줄어듭니다.",
  "통제 상실": "모든 변수를 잡으려 할수록 오히려 피로가 커질 수 있으니 우선순위를 줄여 보세요.",
  경고: "반복되는 장면이 있다면 무시하지 말고 현재 삶의 어떤 상황과 닮아 있는지 연결해서 보세요.",
  관계: "상대의 의도만 추측하다 보면 내 감정의 핵심을 놓칠 수 있습니다.",
  재정: "기회처럼 보이는 제안도 타이밍과 조건을 확인하지 않으면 부담으로 바뀔 수 있습니다.",
};

const LABEL_FLOW: Partial<Record<string, string>> = {
  흐름: "멈춰 있던 일이 다시 움직일 준비를 하면서, 마음과 현실 사이의 리듬이 서서히 맞춰지고 있습니다.",
  변화: "익숙한 방식에서 벗어나 새로운 선택 기준을 세우는 전환 흐름이 시작되고 있습니다.",
  관계: "감정 표현과 거리 조절 방식이 바뀌면서 관계의 온도도 함께 달라질 수 있습니다.",
  정리: "정리와 마무리를 거친 뒤에야 다음 단계가 보이는 흐름이 강해지고 있습니다.",
  자유: "답답했던 구조를 벗어나 시야를 넓히려는 흐름이 점점 선명해지고 있습니다.",
  내면: "겉으로 보이는 결과보다 마음의 균형과 회복이 더 중요한 흐름이 강화되고 있습니다.",
  기반: "당장 큰 변화보다 생활의 기반을 다지는 쪽으로 에너지가 모이고 있습니다.",
};

export function validateDreamInput(input: Partial<DreamInput>): DreamValidationResult {
  const errors: string[] = [];
  const dreamText = String(input.dream_text ?? "").trim();

  if (dreamText.length < 8) {
    errors.push("꿈 내용은 조금 더 구체적으로 입력해 주세요.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      dream_text: dreamText,
    },
  };
}

function extractMatchedSymbols(text: string): DreamSymbolMeaning[] {
  const matches = DREAM_SYMBOLS.filter((symbol) => text.includes(symbol.keyword));
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

export function interpretDream(input: DreamInput): DreamResult {
  const matchedSymbols = extractMatchedSymbols(input.dream_text);
  const primarySymbol = matchedSymbols[0];
  const secondarySymbol = matchedSymbols[1];
  const labelFocus = dominantLabels(matchedSymbols);
  const symbols = uniqueLabels(matchedSymbols).slice(0, 6);
  const pairedKeywords = matchedSymbols.map((symbol) => symbol.keyword).join(", ");
  const labelMixText = describeLabelMix(labelFocus);

  const coreMeaning = secondarySymbol
    ? `${primarySymbol.keyword}와 ${secondarySymbol.keyword} 상징이 함께 나타난 것은 ${labelMixText}과 맞닿아 있는 변화가 지금 삶 안에서 동시에 움직이고 있음을 보여줍니다.`
    : `${primarySymbol.keyword} 상징은 ${labelMixText}을 드러내며, 지금 마음속에서 놓치지 말아야 할 흐름이 선명해지고 있음을 보여줍니다.`;

  const lifeInterpretation = `${pairedKeywords} 상징은 현재 삶의 표면적인 사건보다 그 아래에 깔린 패턴을 먼저 보라고 말하고 있습니다. 지금은 단순히 좋은 징조나 나쁜 징조로 나누기보다, 반복되는 상황 속에서 무엇이 바뀌어야 하는지 읽어내는 것이 더 중요합니다.`;

  const emotionalAnalysis = `${primarySymbol.meaning} ${
    secondarySymbol
      ? `여기에 ${secondarySymbol.keyword} 상징이 겹치면서 ${secondarySymbol.meaning.toLowerCase()}`
      : "이 장면은 지금 무의식이 가장 강하게 주목하고 있는 주제를 직접적으로 비추고 있습니다."
  } 꿈 전체로 보면 ${labelMixText}이 한 방향으로 연결되며, 형식적인 신호가 아니라 현재 삶의 핵심 주제를 압축해서 보여주는 장면에 가깝습니다.`;

  return {
    core_meaning: coreMeaning,
    symbols,
    emotional_analysis: emotionalAnalysis,
    life_interpretation: lifeInterpretation,
    advice: pickFirstMessage(
      labelFocus,
      LABEL_ADVICE,
      "지금은 꿈의 인상을 빨리 결론내리기보다, 가장 강하게 남는 장면이 현실의 어떤 문제와 닮아 있는지 연결해서 적어보는 것이 도움이 됩니다.",
    ),
    warning: pickFirstMessage(
      labelFocus,
      LABEL_WARNING,
      "꿈이 강하게 남을수록 의미를 과장해서 해석하기 쉬우니, 현재 상황과 닮은 부분을 차분히 구분해 보는 태도가 필요합니다.",
    ),
    related_flow: pickFirstMessage(
      labelFocus,
      LABEL_FLOW,
      "지금은 외부 사건 하나보다 내면의 반응과 생활 리듬을 함께 읽어야 흐름이 더 선명해지는 시기입니다.",
    ),
    premium_preview:
      "꿈은 우리의 무의식을 반영하며, 지금 마음 깊은 곳에서 어떤 메시지가 올라오고 있는지 보여주는 상징의 언어입니다.",
    matchedSymbols,
  };
}
