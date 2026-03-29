import { DREAM_SYMBOLS } from "@/lib/dream/symbol-dataset";
import {
  type DreamEmotion,
  type DreamInput,
  type DreamPurpose,
  type DreamResult,
  type DreamSymbolMeaning,
  type DreamValidationResult,
} from "@/types/dream";

const PURPOSE_LABELS: Record<DreamPurpose, string> = {
  wealth: "돈과 기회의 흐름",
  love: "관계와 감정의 흐름",
  career: "일과 방향성의 흐름",
  healing: "내면과 회복의 흐름",
};

const EMOTION_TONE: Record<DreamEmotion, { emotional: string; warning: string }> = {
  good: {
    emotional: "꿈에서 느낀 감정이 긍정적이었기 때문에, 무의식은 지금 다가오는 변화 자체를 비교적 받아들일 준비가 되어 있음을 보여줍니다.",
    warning: "좋은 신호라도 너무 낙관적으로만 해석해 현실적인 판단을 놓치지 않는 것이 중요합니다.",
  },
  neutral: {
    emotional: "감정이 중립적이었다는 것은 무의식이 현재 상황을 조용히 관찰하며 의미를 정리하고 있는 상태에 가깝습니다.",
    warning: "지금은 성급히 결론을 내리기보다, 반복되는 패턴을 한번 더 관찰하는 태도가 도움이 됩니다.",
  },
  bad: {
    emotional: "불편하거나 무거운 감정이 남았다면, 현재 삶에서 억눌린 불안이나 피하고 싶은 문제가 꿈 안에서 먼저 떠오른 것으로 볼 수 있습니다.",
    warning: "감정이 크게 흔들린 상태에서 충동적으로 결정을 내리면 실제 문제보다 더 크게 느껴질 수 있으니 주의가 필요합니다.",
  },
};

const PURPOSE_INTERPRETATION: Record<DreamPurpose, string> = {
  wealth: "재물과 기회, 흐름의 방향에서 변화를 읽어야 하는 시기일 수 있습니다.",
  love: "관계 안에서의 감정 이동과 친밀감, 거리 조절이 중요한 시기일 수 있습니다.",
  career: "일, 진로, 역할, 선택의 방향에서 다시 정렬이 필요한 흐름일 수 있습니다.",
  healing: "지금은 외부 성취보다 내면 회복과 정서적 균형이 더 중요한 메시지일 수 있습니다.",
};

const PURPOSE_ADVICE: Record<DreamPurpose, string> = {
  wealth: "돈의 흐름을 억지로 당기기보다, 기회가 들어오는 통로를 정리하고 판단 기준을 선명하게 세워 보세요.",
  love: "지금 중요한 건 감정을 밀어붙이는 것이 아니라, 내 마음이 무엇을 원하는지부터 정직하게 읽는 일입니다.",
  career: "일의 속도보다 방향의 정확성이 더 중요합니다. 불필요하게 붙잡고 있는 역할이 있는지 점검해 보세요.",
  healing: "해결보다 회복이 먼저입니다. 충분한 휴식과 감정 정리가 지금의 흐름을 훨씬 부드럽게 만듭니다.",
};

const PURPOSE_FLOW: Record<DreamPurpose, string> = {
  wealth: "재물 또는 기회 흐름에서 변화 가능성이 있습니다.",
  love: "관계 흐름이나 감정 소통 방식에서 새로운 변화가 열릴 수 있습니다.",
  career: "일과 방향성, 선택의 기준에서 재정렬이 일어날 수 있습니다.",
  healing: "내면 회복, 감정 정리, 삶의 리듬 회복과 관련된 흐름이 강화되고 있습니다.",
};

export function validateDreamInput(input: Partial<DreamInput>): DreamValidationResult {
  const errors: string[] = [];
  const dreamText = String(input.dream_text ?? "").trim();
  const emotion = input.emotion;
  const purpose = input.purpose;

  if (dreamText.length < 8) {
    errors.push("꿈 내용은 조금 더 구체적으로 입력해 주세요.");
  }

  if (!["good", "neutral", "bad"].includes(emotion ?? "")) {
    errors.push("꿈을 꾼 뒤의 느낌을 선택해 주세요.");
  }

  if (!["wealth", "love", "career", "healing"].includes(purpose ?? "")) {
    errors.push("해석 방향을 선택해 주세요.");
  }

  if (errors.length > 0 || emotion == null || purpose == null) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      dream_text: dreamText,
      emotion,
      purpose,
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

export function interpretDream(input: DreamInput): DreamResult {
  const matchedSymbols = extractMatchedSymbols(input.dream_text);
  const symbolText = matchedSymbols.map((symbol) => symbol.meaning).join(" ");
  const symbols = uniqueLabels(matchedSymbols).slice(0, 6);
  const emotionalAnalysis = `${EMOTION_TONE[input.emotion].emotional} ${symbolText}`;
  const relatedPurposeMatch = matchedSymbols.some((symbol) => symbol.relatedPurpose.includes(input.purpose));

  const coreMeaning = relatedPurposeMatch
    ? `이 꿈은 ${PURPOSE_LABELS[input.purpose]}과 연결된 변화 신호를 담고 있습니다.`
    : "이 꿈은 지금 내면에 쌓인 감정과 다가오는 변화의 조짐을 상징적으로 보여줍니다.";

  const lifeInterpretation = `${PURPOSE_INTERPRETATION[input.purpose]} 꿈에서 드러난 ${matchedSymbols
    .map((symbol) => symbol.keyword)
    .join(", ")} 상징은 현재 삶의 한가운데에서 중요한 선택의 순간에 가까워지고 있음을 시사합니다.`;

  return {
    core_meaning: coreMeaning,
    symbols,
    emotional_analysis: emotionalAnalysis,
    life_interpretation: lifeInterpretation,
    advice: PURPOSE_ADVICE[input.purpose],
    warning: EMOTION_TONE[input.emotion].warning,
    related_flow: PURPOSE_FLOW[input.purpose],
    premium_preview:
      "이 꿈이 실제 삶의 흐름과 어떤 변화로 이어지는지, 반복되는 패턴과 행동 방향까지 더 깊이 분석해드립니다.",
    matchedSymbols,
  };
}
