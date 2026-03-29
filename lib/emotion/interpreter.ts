import {
  type EmotionInput,
  type EmotionResult,
  type EmotionTag,
  type EmotionValidationResult,
} from "@/types/emotion";

const TAG_KEYWORDS: Record<EmotionTag, string[]> = {
  anxiety: ["불안", "초조", "흔들", "걱정", "긴장"],
  sad: ["슬프", "우울", "눈물", "무기력", "상실"],
  excited: ["설레", "기대", "두근", "신나", "들뜨"],
  tired: ["지쳐", "피곤", "버겁", "힘들", "탈진"],
  empty: ["공허", "허무", "텅", "의미 없", "멍하"],
  happy: ["행복", "편안", "좋아", "기쁘", "감사"],
};

const READING_MAP: Record<
  EmotionTag,
  {
    core: string;
    analysis: string;
    energy: string;
    direction: string;
    advice: string;
    warning: string;
  }
> = {
  anxiety: {
    core: "지금은 변화 직전의 불안정한 에너지 상태입니다.",
    analysis: "현재 감정은 통제되지 않는 상황과 다가오는 변화에 대한 민감한 반응으로 볼 수 있습니다.",
    energy: "에너지가 분산되고 중심이 잠시 흔들린 상태입니다.",
    direction: "지금은 멈추고 정리하며 흐름을 관찰하는 방향이 필요합니다.",
    advice: "지금은 무언가를 억지로 해결하려 하기보다, 마음이 반응하는 지점을 차분히 관찰하는 것이 중요합니다.",
    warning: "충동적으로 결론을 내리거나 관계와 일을 한 번에 정리하려는 선택은 피하는 것이 좋습니다.",
  },
  sad: {
    core: "지금은 감정 회복과 자기 보호가 우선인 에너지 상태입니다.",
    analysis: "현재 감정은 잃어버린 것, 채워지지 않은 기대, 혹은 내면 피로가 드러나는 반응에 가깝습니다.",
    energy: "에너지가 안쪽으로 내려가 있고 회복이 필요한 상태입니다.",
    direction: "지금은 생산성보다 회복, 인정, 감정 정리를 우선하는 흐름이 필요합니다.",
    advice: "억지로 괜찮아지려 하기보다 지금 느끼는 감정을 있는 그대로 인정해 주는 태도가 회복을 앞당깁니다.",
    warning: "혼자 견디는 시간이 길어질수록 감정이 더 굳을 수 있으니 도움을 요청하는 타이밍을 놓치지 마세요.",
  },
  excited: {
    core: "지금은 확장과 기회가 열리는 상승 에너지 상태입니다.",
    analysis: "현재 감정은 새로운 가능성을 향해 에너지가 움직이고 있다는 신호로 해석할 수 있습니다.",
    energy: "에너지가 바깥으로 확장되며 추진력이 살아나는 상태입니다.",
    direction: "지금은 기회를 붙잡되 흩어지지 않도록 방향을 선명하게 정하는 흐름이 중요합니다.",
    advice: "하고 싶은 것이 많아지는 시기일수록 한두 가지 핵심에 집중하면 설렘이 실제 결과로 이어지기 쉽습니다.",
    warning: "흥분감이 큰 시기에는 속도만 앞서기 쉬우니 현실적인 실행 계획을 함께 붙이는 것이 필요합니다.",
  },
  tired: {
    core: "지금은 멈춤과 회복이 필요한 저하된 에너지 상태입니다.",
    analysis: "현재 감정은 오래 누적된 피로와 역할 과부하가 몸과 마음에 함께 쌓였다는 신호일 수 있습니다.",
    energy: "에너지 저장량이 낮아지고 회복력이 떨어진 상태입니다.",
    direction: "지금은 더 밀어붙이는 것보다 우선순위를 줄이고 리듬을 회복하는 흐름이 필요합니다.",
    advice: "해야 할 일을 줄이는 것도 중요한 선택입니다. 몸이 보내는 피로 신호를 무시하지 않는 것이 우선입니다.",
    warning: "의욕이 없다고 자신을 탓하면 회복이 더 늦어질 수 있으니, 지금은 성과보다 복원이 먼저입니다.",
  },
  empty: {
    core: "지금은 의미와 연결감을 다시 찾아야 하는 공허의 에너지 상태입니다.",
    analysis: "현재 감정은 단순한 피로보다, 지금의 삶과 감정이 충분히 연결되지 못하고 있다는 신호일 수 있습니다.",
    energy: "에너지가 흐르지 못하고 안쪽에서 비어 있는 듯한 상태입니다.",
    direction: "지금은 무언가를 더 채우기보다, 무엇이 나를 다시 살아 있게 만드는지 천천히 찾아가는 흐름이 필요합니다.",
    advice: "의미를 크게 찾으려 하기보다 작지만 분명하게 마음이 반응하는 순간을 다시 모으는 것이 도움이 됩니다.",
    warning: "공허함을 즉각적인 자극이나 관계로 메우려 하면 오히려 더 큰 허무로 돌아올 수 있습니다.",
  },
  happy: {
    core: "지금은 안정감과 확장성이 함께 살아 있는 조화로운 에너지 상태입니다.",
    analysis: "현재 감정은 삶의 흐름이 내면과 비교적 잘 맞물리고 있다는 신호로 읽을 수 있습니다.",
    energy: "에너지가 부드럽게 순환하며 중심과 여유가 함께 살아 있는 상태입니다.",
    direction: "지금은 좋은 흐름을 유지하고 확장하되, 감사와 균형을 지키는 방향이 중요합니다.",
    advice: "현재의 안정감을 당연하게 넘기지 말고, 무엇이 나를 좋게 만드는지 분명히 기록해 두면 흐름을 오래 유지할 수 있습니다.",
    warning: "좋은 상태일수록 자신의 리듬을 과신해 무리하지 않도록 작은 균형 감각을 계속 챙겨 주세요.",
  },
};

function detectEmotionTag(text: string, fallback?: EmotionTag): EmotionTag {
  const lowerText = text.toLowerCase();
  let bestTag: EmotionTag | undefined;
  let bestScore = 0;

  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS) as [EmotionTag, string[]][]) {
    const score = keywords.reduce(
      (sum, keyword) => sum + (lowerText.includes(keyword.toLowerCase()) ? 1 : 0),
      0,
    );

    if (score > bestScore) {
      bestScore = score;
      bestTag = tag;
    }
  }

  return bestTag ?? fallback ?? "anxiety";
}

export function validateEmotionInput(input: Partial<EmotionInput>): EmotionValidationResult {
  const errors: string[] = [];
  const emotionText = String(input.emotion_text ?? "").trim();
  const emotionTag = input.emotion_tag;
  const intensityRaw = input.intensity;

  if (emotionText.length < 6) {
    errors.push("감정 상태를 조금 더 구체적으로 입력해 주세요.");
  }

  if (
    emotionTag &&
    !["anxiety", "sad", "excited", "tired", "empty", "happy"].includes(emotionTag)
  ) {
    errors.push("감정 태그 값이 올바르지 않습니다.");
  }

  if (intensityRaw != null && (!Number.isInteger(intensityRaw) || intensityRaw < 1 || intensityRaw > 5)) {
    errors.push("강도는 1에서 5 사이의 숫자여야 합니다.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      emotion_text: emotionText,
      emotion_tag: emotionTag,
      intensity: intensityRaw ?? 3,
    },
  };
}

function buildAffirmation(tag: EmotionTag, intensity: number) {
  const base = {
    anxiety: [
      "나는 지금의 흐름을 신뢰한다",
      "나는 흔들림 속에서도 중심을 지킨다",
      "나는 나에게 필요한 방향으로 나아간다",
    ],
    sad: [
      "나는 지금의 감정을 있는 그대로 받아들인다",
      "나는 천천히 회복될 수 있다",
      "나는 다시 나를 따뜻하게 돌본다",
    ],
    excited: [
      "나는 열리는 기회를 기쁘게 받아들인다",
      "나는 나의 에너지를 선명한 방향으로 모은다",
      "나는 확장되는 흐름 속에서 나답게 나아간다",
    ],
    tired: [
      "나는 쉬어도 괜찮다",
      "나는 나의 리듬을 회복한다",
      "나는 다시 충전되며 안정으로 돌아간다",
    ],
    empty: [
      "나는 다시 나를 채우는 감각을 찾는다",
      "나는 공허함 속에서도 나를 놓치지 않는다",
      "나는 나에게 의미 있는 방향으로 천천히 나아간다",
    ],
    happy: [
      "나는 지금의 좋은 흐름을 충분히 누린다",
      "나는 감사와 안정 속에서 더 넓게 확장된다",
      "나는 나의 리듬을 지키며 기쁜 방향으로 나아간다",
    ],
  }[tag];

  if (intensity >= 4) {
    return base.map((line, index) => (index === 0 ? `${line}` : line));
  }

  return base;
}

export function interpretEmotion(input: EmotionInput): EmotionResult {
  const intensity = input.intensity ?? 3;
  const detectedTag = detectEmotionTag(input.emotion_text, input.emotion_tag);
  const reading = READING_MAP[detectedTag];

  const intensityModifier =
    intensity >= 4
      ? " 감정 강도가 높은 편이라 지금의 상태를 더 세심하게 돌보는 것이 중요합니다."
      : intensity <= 2
        ? " 감정 강도는 높지 않지만, 미세한 신호를 무시하지 않는 태도가 도움이 됩니다."
        : " 현재 감정은 일시적이면서도 분명한 메시지를 담고 있습니다.";

  return {
    core_reading: reading.core,
    emotion_analysis: `${reading.analysis}${intensityModifier}`,
    energy_state: reading.energy,
    flow_direction: reading.direction,
    affirmation: buildAffirmation(detectedTag, intensity),
    advice: reading.advice,
    warning: reading.warning,
    premium_preview: "이 감정이 반복되는 이유와 인생 흐름까지 분석해드립니다.",
    detected_tag: detectedTag,
    intensity,
  };
}
