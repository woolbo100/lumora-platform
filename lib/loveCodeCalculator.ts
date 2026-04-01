import {
  type LoveCodeCurrentSituation,
  type LoveCodeInput,
  type LoveCodeRelationshipStatus,
  type LoveCodeResult,
  type ZodiacSign,
} from "@/types/loveCode";

type ZodiacMeta = {
  label: string;
  element: "fire" | "earth" | "air" | "water";
  partnerStyle: string;
};

const zodiacMeta: Record<ZodiacSign, ZodiacMeta> = {
  aries: {
    label: "양자리",
    element: "fire",
    partnerStyle: "빠르게 반응하고 감정의 온도를 즉각 확인하고 싶어하는 편입니다.",
  },
  taurus: {
    label: "황소자리",
    element: "earth",
    partnerStyle: "천천히 신뢰를 쌓으며 익숙함과 안정감을 중요하게 여기는 편입니다.",
  },
  gemini: {
    label: "쌍둥이자리",
    element: "air",
    partnerStyle: "대화의 흐름과 가벼운 신호에 민감하며, 감정 표현도 리듬감 있게 움직이는 편입니다.",
  },
  cancer: {
    label: "게자리",
    element: "water",
    partnerStyle: "겉보다 속정이 깊고, 마음이 안전하다고 느낄 때 더 다정해지는 편입니다.",
  },
  leo: {
    label: "사자자리",
    element: "fire",
    partnerStyle: "확신과 애정 표현에 반응이 크며, 관계 안에서도 존재감을 분명히 느끼고 싶어하는 편입니다.",
  },
  virgo: {
    label: "처녀자리",
    element: "earth",
    partnerStyle: "작은 태도와 디테일을 중요하게 보며, 조용하지만 꾸준한 신뢰를 선호하는 편입니다.",
  },
  libra: {
    label: "천칭자리",
    element: "air",
    partnerStyle: "분위기와 균형을 중요하게 여기며, 감정도 부드럽게 맞춰가려는 경향이 있습니다.",
  },
  scorpio: {
    label: "전갈자리",
    element: "water",
    partnerStyle: "한 번 마음이 움직이면 깊게 몰입하지만, 확신이 없을 때는 속내를 쉽게 드러내지 않는 편입니다.",
  },
  sagittarius: {
    label: "사수자리",
    element: "fire",
    partnerStyle: "답답한 흐름보다 솔직하고 가벼운 움직임에 더 잘 반응하는 편입니다.",
  },
  capricorn: {
    label: "염소자리",
    element: "earth",
    partnerStyle: "행동과 책임감을 통해 관계를 판단하며, 천천히 쌓이는 신뢰를 중요하게 여깁니다.",
  },
  aquarius: {
    label: "물병자리",
    element: "air",
    partnerStyle: "감정도 중요하지만 거리감과 자유를 함께 유지할 수 있을 때 더 편안해지는 편입니다.",
  },
  pisces: {
    label: "물고기자리",
    element: "water",
    partnerStyle: "분위기와 감정선에 민감하며, 작은 다정함에도 크게 반응하는 편입니다.",
  },
};

const relationshipLabels: Record<LoveCodeRelationshipStatus, string> = {
  some: "썸",
  crush: "짝사랑",
  dating: "연애중",
  reunion: "재회",
  "no-contact": "연락 끊김",
  ambiguous: "애매한 관계",
};

const situationLabels: Record<LoveCodeCurrentSituation, string> = {
  "no-contact-first": "상대가 먼저 연락 안 함",
  "i-like-more": "내가 더 좋아하는 느낌",
  "mutual-no-progress": "서로 호감은 있으나 진전 없음",
  "recent-fight": "최근 싸움",
  "want-reconnect": "다시 연락하고 싶음",
  "push-pull": "밀당 중",
  "hard-to-express": "감정 표현이 어려움",
};

function getZodiacSign(dateString: string): ZodiacSign {
  const [, monthText, dayText] = dateString.split("-");
  const month = Number(monthText);
  const day = Number(dayText);
  const value = month * 100 + day;

  if (value >= 321 && value <= 419) return "aries";
  if (value >= 420 && value <= 520) return "taurus";
  if (value >= 521 && value <= 620) return "gemini";
  if (value >= 621 && value <= 722) return "cancer";
  if (value >= 723 && value <= 822) return "leo";
  if (value >= 823 && value <= 922) return "virgo";
  if (value >= 923 && value <= 1022) return "libra";
  if (value >= 1023 && value <= 1121) return "scorpio";
  if (value >= 1122 && value <= 1221) return "sagittarius";
  if (value >= 1222 || value <= 119) return "capricorn";
  if (value >= 120 && value <= 218) return "aquarius";
  return "pisces";
}

function validateDate(value: string): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})$/.test(value);
}

export function validateLoveCodeInput(input: LoveCodeInput): {
  success: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!validateDate(input.myBirthDate)) {
    errors.push("내 생년월일은 YYYY-MM-DD 형식으로 입력해 주세요.");
  }

  if (!validateDate(input.partnerBirthDate)) {
    errors.push("상대 생년월일은 YYYY-MM-DD 형식으로 입력해 주세요.");
  }

  if (!input.relationshipStatus) {
    errors.push("관계 상태를 선택해 주세요.");
  }

  if (!input.currentSituation) {
    errors.push("현재 상황을 선택해 주세요.");
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

function getElementCompatibility(
  myElement: ZodiacMeta["element"],
  partnerElement: ZodiacMeta["element"],
): number {
  if (myElement === partnerElement) {
    return 16;
  }

  if (
    (myElement === "fire" && partnerElement === "air") ||
    (myElement === "air" && partnerElement === "fire") ||
    (myElement === "earth" && partnerElement === "water") ||
    (myElement === "water" && partnerElement === "earth")
  ) {
    return 12;
  }

  if (
    (myElement === "fire" && partnerElement === "water") ||
    (myElement === "water" && partnerElement === "fire") ||
    (myElement === "air" && partnerElement === "earth") ||
    (myElement === "earth" && partnerElement === "air")
  ) {
    return 6;
  }

  return 9;
}

const statusBonus: Record<LoveCodeRelationshipStatus, number> = {
  some: 8,
  crush: 2,
  dating: 12,
  reunion: 4,
  "no-contact": -2,
  ambiguous: 5,
};

const situationPenalty: Record<LoveCodeCurrentSituation, number> = {
  "no-contact-first": -6,
  "i-like-more": -4,
  "mutual-no-progress": -2,
  "recent-fight": -7,
  "want-reconnect": -3,
  "push-pull": -5,
  "hard-to-express": -4,
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function buildDiagnosis(
  score: number,
  relationshipStatus: LoveCodeRelationshipStatus,
  currentSituation: LoveCodeCurrentSituation,
): string {
  if (score >= 80) {
    return "지금은 감정보다 행동의 타이밍이 더 중요한 흐름입니다.";
  }

  if (relationshipStatus === "reunion" || currentSituation === "want-reconnect") {
    return "감정은 남아 있지만 접근 방식이 관계의 온도를 좌우하는 흐름입니다.";
  }

  if (score >= 60) {
    return "호감은 충분하지만 속도를 맞추는 방식이 핵심인 흐름입니다.";
  }

  return "마음의 크기보다 표현 방식과 리듬 조절이 더 중요한 흐름입니다.";
}

function buildCurrentRelationshipReading(
  relationshipStatus: LoveCodeRelationshipStatus,
  currentSituation: LoveCodeCurrentSituation,
): string {
  const statusText = relationshipLabels[relationshipStatus];
  const situationText = situationLabels[currentSituation];

  return `${statusText} 흐름 안에서 ${situationText}의 결이 함께 보입니다. 지금은 감정을 확인하려 애쓰기보다 관계의 온도를 너무 급하게 결론 내리지 않는 편이 더 자연스러워 보입니다.`;
}

function buildKeyIssue(currentSituation: LoveCodeCurrentSituation): string {
  const map: Record<LoveCodeCurrentSituation, string> = {
    "no-contact-first": "상대의 반응 부재를 마음의 거리로 단정해버리기 쉬운 점",
    "i-like-more": "감정의 크기 차이를 불안으로 해석하며 스스로 지치는 점",
    "mutual-no-progress": "분위기는 있지만 행동으로 옮길 신호가 부족한 점",
    "recent-fight": "서운함이 남은 상태에서 먼저 옳고 그름을 가리려는 점",
    "want-reconnect": "그리움이 커질수록 타이밍보다 감정이 앞서는 점",
    "push-pull": "관심 표현과 거리 두기가 반복되며 흐름이 흐려지는 점",
    "hard-to-express": "마음을 분명히 느끼면서도 표현 순간에 온도가 식는 점",
  };

  return map[currentSituation];
}

function buildTodayAction(
  relationshipStatus: LoveCodeRelationshipStatus,
  currentSituation: LoveCodeCurrentSituation,
  partnerSign: ZodiacSign,
): string {
  const partnerLabel = zodiacMeta[partnerSign].label;

  const map: Record<LoveCodeCurrentSituation, string> = {
    "no-contact-first": `${partnerLabel} 성향의 상대에게는 길고 무거운 확인보다, 부담 없는 한 줄 안부처럼 가벼운 신호를 먼저 보내는 편이 좋습니다.`,
    "i-like-more": "좋아하는 마음을 더 크게 증명하려 하기보다, 오늘은 내 일상을 안정적으로 보여주는 태도가 더 설득력 있게 작용합니다.",
    "mutual-no-progress": "애매한 여백을 오래 두기보다, 가볍고 구체적인 제안 하나로 흐름을 실제 장면으로 옮겨보는 것이 좋습니다.",
    "recent-fight": "감정을 바로 정리하려 하기보다, 분위기를 낮춘 뒤 짧고 또렷한 사과나 설명을 먼저 건네는 편이 좋습니다.",
    "want-reconnect": "그리움을 길게 풀어놓기보다, 지금 떠올랐다는 정도의 가벼운 접점을 만드는 방식이 더 자연스럽습니다.",
    "push-pull": "반응을 시험하기보다 한 번은 일관된 태도로 다가가 보는 것이 오늘의 흐름에 더 잘 맞습니다.",
    "hard-to-express": "긴 대화보다 한 문장의 진심을 정제해서 전하는 편이 훨씬 효과적으로 작동할 수 있습니다.",
  };

  return map[currentSituation];
}

function buildAvoidAction(currentSituation: LoveCodeCurrentSituation): string {
  const map: Record<LoveCodeCurrentSituation, string> = {
    "no-contact-first": "반응이 없다는 이유만으로 감정을 몰아붙이거나 답을 재촉하지 마세요.",
    "i-like-more": "마음의 크기를 증명하려 과한 배려나 장문의 메시지로 흐르지 않는 편이 좋습니다.",
    "mutual-no-progress": "의미만 크게 키우고 실제 행동을 미루는 방식은 피하는 편이 좋습니다.",
    "recent-fight": "감정이 남은 채로 다시 결론을 내리려는 대화는 잠시 늦추는 편이 좋습니다.",
    "want-reconnect": "그리움이 큰 날일수록 한 번에 관계를 되돌리려는 시도는 피하는 편이 좋습니다.",
    "push-pull": "상대 반응을 확인하기 위한 일부러의 거리두기는 오늘 흐름과 잘 맞지 않습니다.",
    "hard-to-express": "하고 싶은 말을 끝까지 미루다가 침묵으로 굳히는 패턴은 피하는 편이 좋습니다.",
  };

  return map[currentSituation];
}

function buildStrategy(
  relationshipStatus: LoveCodeRelationshipStatus,
  mySign: ZodiacSign,
  partnerSign: ZodiacSign,
): string {
  const myElement = zodiacMeta[mySign].element;
  const partnerElement = zodiacMeta[partnerSign].element;

  if (relationshipStatus === "dating") {
    return "확인보다 분위기 조율에 집중해보세요. 관계를 유지하는 힘은 감정의 진폭보다 안정적인 태도에서 나옵니다.";
  }

  if (relationshipStatus === "reunion" || relationshipStatus === "no-contact") {
    return "큰 감정의 복원보다 작은 접점의 회복이 먼저입니다. 서두르지 않는 재연결 전략이 더 유효합니다.";
  }

  if (myElement === partnerElement) {
    return "비슷한 결의 사람끼리는 공감은 빠르지만 진전이 느려질 수 있습니다. 작은 행동 하나로 흐름을 구체화해보세요.";
  }

  return "다름을 설득하려 하기보다 상대의 리듬을 먼저 읽고 맞추는 편이 관계를 더 부드럽게 움직일 수 있습니다.";
}

function buildConclusion(score: number): string {
  if (score >= 75) {
    return "오늘의 러브코드는 확신을 재촉하기보다, 자연스러운 행동 하나로 관계의 온도를 높여보라고 말하고 있습니다.";
  }

  if (score >= 55) {
    return "지금 관계는 가능성보다 방식이 더 중요한 구간입니다. 작은 태도 차이가 흐름을 바꿀 수 있습니다.";
  }

  return "지금은 감정보다 리듬을 먼저 정리할 때입니다. 조급함을 늦출수록 관계가 더 또렷하게 보일 수 있습니다.";
}

export function calculateLoveCodeResult(input: LoveCodeInput): LoveCodeResult {
  const mySign = getZodiacSign(input.myBirthDate);
  const partnerSign = getZodiacSign(input.partnerBirthDate);
  const myMeta = zodiacMeta[mySign];
  const partnerMeta = zodiacMeta[partnerSign];

  const baseScore =
    58 +
    getElementCompatibility(myMeta.element, partnerMeta.element) +
    statusBonus[input.relationshipStatus] +
    situationPenalty[input.currentSituation];

  const compatibilityScore = clampScore(baseScore);

  return {
    compatibilityScore,
    oneLineDiagnosis: buildDiagnosis(
      compatibilityScore,
      input.relationshipStatus,
      input.currentSituation,
    ),
    partnerStyle: partnerMeta.partnerStyle,
    currentRelationshipReading: buildCurrentRelationshipReading(
      input.relationshipStatus,
      input.currentSituation,
    ),
    keyIssue: buildKeyIssue(input.currentSituation),
    todayAction: buildTodayAction(
      input.relationshipStatus,
      input.currentSituation,
      partnerSign,
    ),
    avoidAction: buildAvoidAction(input.currentSituation),
    simpleStrategy: buildStrategy(input.relationshipStatus, mySign, partnerSign),
    oneLineConclusion: buildConclusion(compatibilityScore),
    mySignLabel: myMeta.label,
    partnerSignLabel: partnerMeta.label,
  };
}
