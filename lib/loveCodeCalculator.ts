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
  personality: string;
  keyword: string;
  deepReading: string;
};

const zodiacMeta: Record<ZodiacSign, ZodiacMeta> = {
  aries: {
    label: "양자리",
    element: "fire",
    partnerStyle: "빠르게 반응하고 감정의 온도를 즉각 확인하고 싶어하는 편입니다.",
    personality: "솔직하고 열정적이며, 한 번 마음이 움직이면 주저 없이 다가가는 용기를 가진 타입입니다.",
    keyword: "용기 있는 개척자",
    deepReading: "양자리는 사랑에 있어 직진하는 불꽃과 같습니다. 밀당보다는 솔직한 감정 표현을 선호하며, 상대방의 반응이 뜨거울수록 더 큰 활력을 얻습니다. 때로는 서두르는 경향이 있지만, 그만큼 순수한 진심을 가진 별자리입니다.",
  },
  taurus: {
    label: "황소자리",
    element: "earth",
    partnerStyle: "천천히 신뢰를 쌓으며 익숙함과 안정감을 중요하게 여기는 편입니다.",
    personality: "신중하고 감각적이며, 변함없는 태도로 관계를 단단하게 가꾸어 나가는 안정적인 타입입니다.",
    keyword: "신중한 수호자",
    deepReading: "황소자리는 사랑의 감각을 천천히, 하지만 아주 깊게 음미하는 별자리입니다. 화려한 고백보다 변하지 않는 꾸준함에서 진정한 사랑을 느낍니다. 안정적인 기반 위에서 서로의 온기를 나누는 평온한 관계를 꿈꿉니다.",
  },
  gemini: {
    label: "쌍둥이자리",
    element: "air",
    partnerStyle: "대화의 흐름과 가벼운 신호에 민감하며, 감정 표현도 리듬감 있게 움직이는 편입니다.",
    personality: "호기심이 많고 유연하며, 대화를 통해 즐거움을 찾고 다양한 면모를 지닌 매력적인 타입입니다.",
    keyword: "재치 있는 관찰자",
    deepReading: "쌍둥이자리는 지적인 교감과 리드미컬한 대화 속에서 사랑의 싹을 틔웁니다. 한 가지 모습에 머물지 않고 끊임없이 변화하며 관계에 생기를 불어넣습니다. 친구 같은 편안함과 연인 같은 설렘을 동시에 즐기는 타입입니다.",
  },
  cancer: {
    label: "게자리",
    element: "water",
    partnerStyle: "겉보다 속정이 깊고, 마음이 안전하다고 느낄 때 더 다정해지는 편입니다.",
    personality: "섬세하고 보호 본능이 강하며, 가까운 사람에게 한없이 따뜻한 진심을 쏟는 서정적인 타입입니다.",
    keyword: "다정한 보금자리",
    deepReading: "게자리는 상대의 작은 감정 변화까지 세밀하게 살피는 따뜻한 마음의 소유자입니다. 상처받기 쉬운 여린 속내를 가지고 있지만, 사랑하는 사람을 지키기 위해서는 누구보다 강해지는 반전 매력을 지니고 있습니다.",
  },
  leo: {
    label: "사자자리",
    element: "fire",
    partnerStyle: "확신과 애정 표현에 반응이 크며, 관계 안에서도 존재감을 분명히 느끼고 싶어하는 편입니다.",
    personality: "화려하고 당당하며, 자신이 아끼는 사람을 누구보다 빛나게 해줄 줄 아는 낭만적인 타입입니다.",
    keyword: "빛나는 주인공",
    deepReading: "사자자리의 사랑은 한 편의 영화처럼 드라마틱하고 당당합니다. 자신이 사랑받고 있음을 확인받을 때 최고의 매력을 발산하며, 연인을 세상에서 가장 특별한 사람으로 만들어주는 헌신적인 로맨티스트입니다.",
  },
  virgo: {
    label: "처녀자리",
    element: "earth",
    partnerStyle: "작은 태도와 디테일을 중요하게 보며, 조용하지만 꾸준한 신뢰를 선호하는 편입니다.",
    personality: "세심하고 지적이며, 상대의 필요를 미리 헤아려 현실적인 사랑을 실천하는 정성스러운 타입입니다.",
    keyword: "정교한 조력자",
    deepReading: "처녀자리는 말보다 행동으로, 화려함보다 실속 있는 배려로 사랑을 증명합니다. 상대가 필요로 하는 것을 조용히 챙겨주는 세심함이 가장 큰 매력이며, 완벽한 관계를 위해 끝없이 노력하는 성실한 사랑을 합니다.",
  },
  libra: {
    label: "천칭자리",
    element: "air",
    partnerStyle: "분위기와 균형을 중요하게 여기며, 감정도 부드럽게 맞춰가려는 경향이 있습니다.",
    personality: "조화롭고 우아하며, 갈등보다 평화를 선택하고 상대의 마음을 편안하게 어루만지는 타입입니다.",
    keyword: "우아한 중재자",
    deepReading: "천칭자리는 관계의 균형과 아름다움을 무엇보다 소중하게 여깁니다. 상대의 입장을 먼저 고려하는 넓은 마음을 가졌으며, 세련된 매너와 다정함으로 갈등조차 부드럽게 녹여내는 평화주의적인 사랑을 지향합니다.",
  },
  scorpio: {
    label: "전갈자리",
    element: "water",
    partnerStyle: "한 번 마음이 움직이면 깊게 몰입하지만, 확신이 없을 때는 속내를 쉽게 드러내지 않는 편입니다.",
    personality: "강렬하고 통찰력 있으며, 가벼운 관계보다 영혼이 통하는 깊은 유대감을 갈구하는 몰입형 타입입니다.",
    keyword: "신비로운 탐도자",
    deepReading: "전갈자리의 사랑은 깊고 고요한 바다와 같습니다. 겉으로는 차분해 보일지 몰라도 속으로는 누구보다 뜨거운 열정과 집념을 간직하고 있습니다. 영혼까지 공유하는 깊은 일체감을 원하며, 한 번 맺은 인연은 절대 가볍게 여기지 않습니다.",
  },
  sagittarius: {
    label: "사수자리",
    element: "fire",
    partnerStyle: "답답한 흐름보다 솔직하고 가벼운 움직임에 더 잘 반응하는 편입니다.",
    personality: "자유롭고 낙천적이며, 관계 안에서도 성장을 꿈꾸고 새로운 영감을 주는 에너제틱한 타입입니다.",
    keyword: "자유로운 탐험가",
    deepReading: "사수자리는 사랑을 하나의 즐거운 모험이자 성장으로 생각합니다. 서로의 자유를 존중하면서도 함께 넓은 세상을 향해 나아갈 수 있는 관계를 원합니다. 솔직하고 시원시원한 표현법으로 상대방의 마음을 활짝 열어줍니다.",
  },
  capricorn: {
    label: "염소자리",
    element: "earth",
    partnerStyle: "행동과 책임감을 통해 관계를 판단하며, 천천히 쌓이는 신뢰를 중요하게 여깁니다.",
    personality: "성실하고 책임감이 강하며, 사랑을 행동으로 증명하고 오랜 시간 함께할 터전을 닦는 헌신적인 타입입니다.",
    keyword: "견고한 건축가",
    deepReading: "염소자리는 사랑의 미래를 설계하는 건축가와 같습니다. 눈앞의 설렘보다 시간이 흐를수록 더 단단해지는 신뢰에 무게를 둡니다. 표현은 조금 서툴 수 있지만, 그 어떤 별자리보다 묵묵히 자리를 지키는 든든한 동반자가 됩니다.",
  },
  aquarius: {
    label: "물병자리",
    element: "air",
    partnerStyle: "감정도 중요하지만 거리감과 자유를 함께 유지할 수 있을 때 더 편안해지는 편입니다.",
    personality: "독특하고 지적이며, 관습에 얽매이지 않는 수평적인 관계를 통해 특별한 우정을 사랑으로 키우는 타입입니다.",
    keyword: "지적인 자유주의자",
    deepReading: "물병자리는 상식의 틀을 깨는 독특한 시각과 지적인 매력으로 사랑을 그려냅니다. 구속보다는 영감이 통하는 친구 같은 관계를 선호하며, 서로의 개성을 있는 그대로 인정해줄 때 가장 깊은 애정을 느낍니다.",
  },
  pisces: {
    label: "물고기자리",
    element: "water",
    partnerStyle: "분위기와 감정선에 민감하며, 작은 다정함에도 크게 반응하는 편입니다.",
    personality: "몽환적이고 감성적이며, 상대의 아픔에 깊이 공감하고 무조건적인 사랑을 꿈꾸는 예술적인 타입입니다.",
    keyword: "섬세한 몽상가",
    deepReading: "물고기자리는 경계 없는 공감력과 풍부한 상상력으로 관계를 마법처럼 채워나갑니다. 상대의 슬픔을 자신의 것처럼 아파하며, 헌신적이고 낭만적인 태도로 사랑의 순수함을 일깨워주는 예술가적인 기질을 가지고 있습니다.",
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
  if (myElement === partnerElement) return 16;
  if (
    (myElement === "fire" && partnerElement === "air") ||
    (myElement === "air" && partnerElement === "fire") ||
    (myElement === "earth" && partnerElement === "water") ||
    (myElement === "water" && partnerElement === "earth")
  ) return 12;
  if (
    (myElement === "fire" && partnerElement === "water") ||
    (myElement === "water" && partnerElement === "fire") ||
    (myElement === "air" && partnerElement === "earth") ||
    (myElement === "earth" && partnerElement === "air")
  ) return 6;
  return 9;
}

const statusBonus: Record<LoveCodeRelationshipStatus, number> = {
  some: 8, crush: 2, dating: 12, reunion: 4, "no-contact": -2, ambiguous: 5,
};

const situationPenalty: Record<LoveCodeCurrentSituation, number> = {
  "no-contact-first": -6, "i-like-more": -4, "mutual-no-progress": -2, "recent-fight": -7, "want-reconnect": -3, "push-pull": -5, "hard-to-express": -4,
};

function buildDiagnosis(score: number, status: LoveCodeRelationshipStatus, situation: LoveCodeCurrentSituation): string {
  if (score >= 80) return "지금은 감정보다 행동의 타이밍이 더 중요한 흐름입니다.";
  if (status === "reunion" || situation === "want-reconnect") return "감정은 남아 있지만 접근 방식이 관계의 온도를 좌우하는 흐름입니다.";
  if (score >= 60) return "호감은 충분하지만 속도를 맞추는 방식이 핵심인 흐름입니다.";
  return "마음의 크기보다 표현 방식과 리듬 조절이 더 중요한 흐름입니다.";
}

function buildDetailedCompatibility(mySign: ZodiacSign, partnerSign: ZodiacSign): string {
  const myMeta = zodiacMeta[mySign];
  const partnerMeta = zodiacMeta[partnerSign];
  if (myMeta.element === partnerMeta.element) {
    return `같은 ${myMeta.element === "fire" ? "불" : myMeta.element === "earth" ? "흙" : myMeta.element === "air" ? "공기" : "물"}의 속성을 공유하는 두 사람은 서로의 언어를 이해하는 데 많은 설명이 필요하지 않습니다. 하지만 때로는 너무 닮아 있어 익숙함이 정체기로 이어질 수 있으니, 의도적으로 신선한 자극을 주는 노력이 필요합니다.`;
  }
  const synergy: Record<string, string> = {
    "fire-air": "불과 공기의 만남은 서로의 열정을 더 크게 확산시킵니다. 대화를 통해 아이디어를 얻고 활력을 나누는 생동감 넘치는 궁합입니다.",
    "air-fire": "공기와 불의 만남은 서로의 열정을 더 크게 확산시킵니다. 대화를 통해 아이디어를 얻고 활력을 나누는 생동감 넘치는 궁합입니다.",
    "earth-water": "흙과 물의 만남은 비옥한 땅을 만들어내듯 서로에게 안식과 안정을 선호합니다. 정서적인 유대감과 현실적인 지지가 완벽한 균형을 이루는 궁합입니다.",
    "water-earth": "물과 흙의 만남은 비옥한 땅을 만들어내듯 서로에게 안식과 안정을 선호합니다. 정서적인 유대감과 현실적인 지지가 완벽한 균형을 이루는 궁합입니다.",
  };
  return synergy[`${myMeta.element}-${partnerMeta.element}`] || synergy[`${partnerMeta.element}-${myMeta.element}`] || "서로 다른 리듬을 가졌기에 배울 점이 많은 관계입니다. 각자의 고유한 장점을 존중하면서 접점을 찾아가는 과정 그 자체가 관계의 큰 성장이 될 것입니다.";
}

function buildTodayActionList(situation: LoveCodeCurrentSituation): string[] {
  const map: Record<LoveCodeCurrentSituation, string[]> = {
    "no-contact-first": ["상대의 침묵을 부정적인 신호로만 읽지 않기", "부담을 덜어낸 아주 가벼운 인사 건네기", "상대의 관심사와 연결된 짧은 정보 공유하기"],
    "i-like-more": ["애정 확인을 위한 질문보다 나의 일상 공유하기", "상대의 속도에 맞춰 한 템포 늦춰 반응하기", "나만의 시간에 집중하는 모습을 은연중에 보여주기"],
    "mutual-no-progress": ["막연한 약속 대신 구체적인 시간과 장소 제안하기", "대화 중에 상대의 장점을 자연스럽게 칭찬하기", "단둘이 있을 수 있는 짧은 이벤트 만들기"],
    "recent-fight": ["시비를 가리기보다 나의 감정을 먼저 고백하기", "상대의 이야기를 중간에 끊지 않고 끝까지 듣기", "분위기 전환을 위한 가벼운 선물이나 간식 준비하기"],
    "want-reconnect": ["과거의 일을 들추기보다 현재의 안부 묻기", "짧고 간결하게 '생각났다'는 메시지 남기기", "상대방이 편하게 답할 수 있는 열린 질문 던지기"],
    "push-pull": ["계산된 행동이 아닌 솔직한 호감을 한 번 보여주기", "상대방이 안심할 수 있는 일관된 태도 유지하기", "일정 거리를 유지하며 상대의 반응 지켜보기"],
    "hard-to-express": ["긴 글보다 직관적인 이모티콘이나 사진 활용하기", "말하기 어려운 진심은 손글씨나 짧은 메시지 활용하기", "고맙다 혹은 수고했다는 작은 표현부터 시작하기"],
  };
  return map[situation];
}

function buildTodayActionExampleList(situation: LoveCodeCurrentSituation): string[] {
  const map: Record<LoveCodeCurrentSituation, string[]> = {
    "no-contact-first": ['"방금 길가다 너 생각나는 노래가 들려서."', '"별건 아닌데 이거 네가 좋아할 것 같아서 보내!"', '"요즘 바쁘지? 건강 잘 챙기고 있어."'],
    "i-like-more": ['"나 오늘 맛있는 거 먹었는데 진짜 행복하다."', '"오늘 하루는 어땠어? 나는 되게 보람찼거든."', '"천천히 답해줘도 돼! 그냥 내 소식 전하고 싶었어."'],
    "mutual-no-progress": ['"그때 말한 거기 이번 주 토요일 2시쯤 갈까?"', '"너 웃는 모습 보니까 나까지 기분이 좋아지네."', '"잠깐 얼굴 볼 수 있을까? 줄 게 있어서."'],
    "recent-fight": ['"아까는 내가 감정이 앞섰던 것 같아. 속상하게 해서 미안해."', '"네 마음이 어떨지 충분히 생각해보려고 노력 중이야."', '"화 풀리면 맛있는 거 먹으러 가자. 기다릴게."'],
    "want-reconnect": ['"오랜만에 연락하려니 떨리네. 잘 지내고 있니?"', '"가끔 우리 같이 갔던 거기 지나가면 네 생각 나더라."', '"부담 가지라고 연락한 건 아니야! 그냥 문득 궁금해서."'],
    "push-pull": ['"나 사실 오늘 너랑 정말 계속 같이 있고 싶었어."', '"밀당보다 나는 우리 사이가 더 편안해졌으면 좋겠어."', '"네가 어떤 마음인지 궁금해. 나는 너 진짜 좋거든."'],
    "hard-to-express": ['"말로는 다 표현 못 하지만, 항상 고맙게 생각해."', '"(사진과 함께) 이거 보는데 바로 네 얼굴 떠오르더라."', '"사실 나 너 많이 아끼는 거 알지?"'],
  };
  return map[situation];
}

function buildCoreMindset(situation: LoveCodeCurrentSituation): string {
  const map: Record<LoveCodeCurrentSituation, string> = {
    "no-contact-first": "조급함은 관계의 소음이 됩니다. 상대의 침묵을 성장의 시간으로 믿고 기다려주세요.",
    "i-like-more": "내 마음의 풍요로움이 상대를 끌어당깁니다. 결핍보다 만족에 집중하세요.",
    "mutual-no-progress": "당연한 것은 없습니다. 작은 호의를 용기로 바꾸어 표현해 보세요.",
    "recent-fight": "옳음보다 소중함을 먼저 생각하세요. 먼저 손 내미는 것은 강한 사람의 특권입니다.",
    "want-reconnect": "과거의 내가 아닌 지금의 내가 다가갑니다. 편안한 진심만이 통합니다.",
    "push-pull": "게임보다 진심이 더 강력한 무기입니다. 상대방이 안심할 수 있는 닻이 되어주세요.",
    "hard-to-express": "완벽한 표현보다 서툰 진심이 더 아름답습니다. 마음의 결을 그대로 전달하세요.",
  };
  return map[situation];
}

function buildFinalActionTip(situation: LoveCodeCurrentSituation): string {
  const map: Record<LoveCodeCurrentSituation, string> = {
    "no-contact-first": "지금 당장 답장을 기대하지 말고, 따뜻한 안부 메시지 하나만 남겨두세요.",
    "i-like-more": "오늘 저녁에는 상대를 생각하기보다 내가 좋아하는 취미에 몰입해 보세요.",
    "mutual-no-progress": "오늘 중으로 이번 주말의 약속을 구체적으로 결정해 보세요.",
    "recent-fight": "상대방이 좋아하는 음악이나 영상을 말없이 링크해 보내보세요.",
    "want-reconnect": "예전 사진첩을 보며 행복했던 순간 하나를 짧게 언급해 보세요.",
    "push-pull": "상대방의 SNS나 상태에 처음으로 솔직하고 다정한 댓글을 남겨보세요.",
    "hard-to-express": "말이 아닌 짧은 손편지 메시지를 캡처해서 보내보세요.",
  };
  return map[situation];
}

export function calculateLoveCodeResult(input: LoveCodeInput): LoveCodeResult {
  const mySign = getZodiacSign(input.myBirthDate);
  const partnerSign = getZodiacSign(input.partnerBirthDate);
  const myMeta = zodiacMeta[mySign];
  const partnerMeta = zodiacMeta[partnerSign];

  const compatibilityScore = Math.max(0, Math.min(100, 58 + getElementCompatibility(myMeta.element, partnerMeta.element) + statusBonus[input.relationshipStatus] + situationPenalty[input.currentSituation]));

  return {
    compatibilityScore,
    oneLineDiagnosis: buildDiagnosis(compatibilityScore, input.relationshipStatus, input.currentSituation),
    partnerStyle: partnerMeta.partnerStyle,
    currentRelationshipReading: `${relationshipLabels[input.relationshipStatus]} 흐름 안에서 ${situationLabels[input.currentSituation]}의 결이 보입니다.`,
    keyIssue: "관계의 온도를 조율하고 표현의 방식을 재정비하는 시점입니다.",
    todayAction: "상대방의 리듬을 존중하며 나만의 담백한 진심을 전해보세요.",
    todayActionExample: '"잘 지내? 문득 네 생각이 나서 연락했어."',
    avoidAction: "과도한 확인이나 서두르는 결론은 피하는 것이 좋습니다.",
    simpleStrategy: "조급함을 늦추고 작은 접점부터 천천히 회복해 보세요.",
    oneLineConclusion: "마음의 크기보다 표현의 결이 중요한 때입니다.",
    mySignLabel: myMeta.label,
    partnerSignLabel: partnerMeta.label,
    constellationSummary: `${myMeta.label}와 ${partnerMeta.label}의 조우`,
    mySignPersonality: myMeta.personality,
    mySignKeyword: myMeta.keyword,
    mySignDeepReading: myMeta.deepReading,
    partnerSignPersonality: partnerMeta.personality,
    partnerSignKeyword: partnerMeta.keyword,
    partnerSignDeepReading: partnerMeta.deepReading,
    detailedCompatibility: buildDetailedCompatibility(mySign, partnerSign),
    todayActionList: buildTodayActionList(input.currentSituation),
    todayActionExampleList: buildTodayActionExampleList(input.currentSituation),
    coreMindset: buildCoreMindset(input.currentSituation),
    finalActionTip: buildFinalActionTip(input.currentSituation),
  };
}
