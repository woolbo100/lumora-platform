import {
  type DaewoonItem,
  type GMHSMap,
  type OhaengAnalysis,
  type OhaengCounts,
  type OhaengDetail,
  type OhaengPercentages,
  type SajuElement,
  type SajuFormInput,
  type SajuPillar,
  type SajuPillarKey,
  type SajuPillars,
  type SajuProfile,
  type SajuResult,
  type SajuValidationResult,
  type TenGodItem,
  type TodayLuck,
} from "@/types/saju";

const CHEONGAN = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"] as const;
const JIJI = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"] as const;
const STEM_OHAENG: SajuElement[] = [
  "wood",
  "wood",
  "fire",
  "fire",
  "earth",
  "earth",
  "metal",
  "metal",
  "water",
  "water",
];
const BRANCH_OHAENG: SajuElement[] = [
  "water",
  "earth",
  "wood",
  "wood",
  "earth",
  "fire",
  "fire",
  "earth",
  "metal",
  "metal",
  "earth",
  "water",
];
const ELEMENT_LABELS: Record<SajuElement, string> = {
  wood: "목",
  fire: "화",
  earth: "토",
  metal: "금",
  water: "수",
};
const ELEMENT_INDEX: Record<SajuElement, number> = {
  wood: 0,
  fire: 1,
  earth: 2,
  metal: 3,
  water: 4,
};
const BRANCH_POLARITIES = [1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0];
const PERIOD_LABELS: Record<SajuPillarKey, string> = {
  year: "초년기 (0~19세)",
  month: "청년기 (20~39세)",
  day: "중년기 (40~59세)",
  hour: "말년기 (60세~)",
};

const DAY_MASTER_TRAITS = {
  갑: {
    symbol: "곧게 뻗은 소나무",
    summary:
      "리더십과 추진력이 강하고, 스스로 길을 만들며 앞으로 나아가는 성향이 분명합니다.",
    detail:
      "갑목의 일간은 중심을 세우는 힘이 강합니다. 기준이 뚜렷하고 책임을 외면하지 않으며, 한 번 옳다고 느끼는 방향에는 쉽게 흔들리지 않습니다. 다만 자신이 짊어지는 무게가 큰 만큼 스스로를 몰아붙이는 경향도 있어, 때때로 속도를 늦추고 주변과 호흡을 맞추는 유연함이 중요합니다.",
  },
  을: {
    symbol: "유연한 넝쿨",
    summary:
      "적응력이 좋고 세밀한 감각이 뛰어나며, 관계 속에서 조화를 만드는 재능이 큽니다.",
    detail:
      "을목은 부드러워 보이지만 끈기가 강합니다. 환경 변화에 민감하게 반응하며, 사람의 분위기와 맥락을 빠르게 읽어냅니다. 섬세한 안목과 현실 감각이 장점이지만, 감정을 오래 품거나 결정을 미루지 않도록 기준을 분명히 세우는 연습이 필요합니다.",
  },
  병: {
    symbol: "세상을 비추는 태양",
    summary:
      "밝고 직선적이며 표현력이 좋아 존재감이 큰 편입니다.",
    detail:
      "병화는 자신이 품은 에너지를 밖으로 드러낼수록 빛나는 타입입니다. 사람을 북돋우고 분위기를 환기시키는 힘이 있으며, 목표가 선명할수록 추진력도 커집니다. 반면 감정이 뜨거워질 때 지나치게 단정하거나 조급해질 수 있으니, 열정과 지속 가능성을 함께 챙기는 균형이 중요합니다.",
  },
  정: {
    symbol: "은은하게 타오르는 촛불",
    summary:
      "따뜻하고 섬세하며, 한 사람과 한 일에 깊게 몰입하는 힘이 큽니다.",
    detail:
      "정화는 표면의 화려함보다 내면의 온도를 지키는 힘이 강합니다. 배려심이 깊고 작은 변화도 잘 감지하며, 누군가를 챙기고 정돈하는 일에서 진가를 발휘합니다. 다만 상처를 안으로 눌러 담는 경향이 있어, 감정을 적절히 말로 풀어내는 연습이 건강한 흐름을 만듭니다.",
  },
  무: {
    symbol: "묵직한 태산",
    summary:
      "신뢰감과 포용력이 크고, 쉽게 흔들리지 않는 안정감을 줍니다.",
    detail:
      "무토는 크게 보고 길게 가는 사람입니다. 사람을 감싸고 구조를 세우는 데 강하며, 한 번 책임진 영역은 끝까지 지키려는 의지가 강합니다. 다만 지나친 책임감이 완고함으로 보일 수 있으므로, 변화의 신호를 읽고 방식만큼은 유연하게 조정하는 자세가 필요합니다.",
  },
  기: {
    symbol: "비옥한 텃밭",
    summary:
      "현실 감각이 좋고 실속이 있으며, 주변을 안정적으로 돌보는 성향이 큽니다.",
    detail:
      "기토는 조용하지만 실제적인 힘을 지닙니다. 누군가가 놓치는 부분을 채우고, 자원을 알뜰하게 관리하며, 관계 안에서 꾸준함을 보여줍니다. 대신 타인의 기대를 너무 많이 떠안으면 쉽게 지칠 수 있으므로, 자신의 한계와 우선순위를 명확히 하는 것이 중요합니다.",
  },
  경: {
    symbol: "단단한 원석",
    summary:
      "결단력과 의리가 강하고, 명확한 기준 아래 움직이는 힘이 있습니다.",
    detail:
      "경금은 스스로를 단련하며 완성도를 높여가는 성향이 강합니다. 직설적이고 분명한 태도로 신뢰를 얻으며, 위기 상황일수록 중심을 잡는 데 능합니다. 반면 기준이 높아 자신과 타인을 동시에 कठ하게 대할 수 있으니, 완벽보다 지속 가능한 진전을 선택하는 유연함이 필요합니다.",
  },
  신: {
    symbol: "정교한 보석",
    summary:
      "섬세함과 안목이 뛰어나고, 디테일에서 차이를 만드는 감각이 좋습니다.",
    detail:
      "신금은 정제된 취향과 세밀한 판단력이 강점입니다. 품질, 분위기, 균형을 읽는 능력이 좋아 아름다움과 질서를 함께 추구합니다. 다만 예민함이 높아질 때 피로가 누적되기 쉬우므로, 스스로를 지나치게 검열하지 않는 여유가 필요합니다.",
  },
  임: {
    symbol: "드넓은 바다",
    summary:
      "확장성, 유연성, 창의성이 크고 넓은 시야로 흐름을 읽습니다.",
    detail:
      "임수는 한 방향보다 여러 가능성을 동시에 바라볼 수 있는 사람입니다. 호기심이 풍부하고 새로운 자극을 연결해 의미를 만드는 능력이 뛰어납니다. 다만 생각이 많아 방향성이 흐려질 수 있으니, 중요한 순간에는 우선순위를 정하고 선택을 좁히는 힘이 필요합니다.",
  },
  계: {
    symbol: "촉촉한 단비",
    summary:
      "부드럽고 친화력이 있으며, 미묘한 감정을 읽는 공감 능력이 좋습니다.",
    detail:
      "계수는 낮은 곳을 적시며 스며드는 힘을 가졌습니다. 사람의 감정선과 분위기를 예민하게 감지하고, 말과 배려로 관계를 다듬는 데 능합니다. 다만 마음이 흔들릴 때 쉽게 위축될 수 있으므로, 자신의 감각을 지키는 경계와 회복 루틴을 함께 갖추는 것이 좋습니다.",
  },
} as const;

const GOD_LABELS = {
  same: ["비견", "겁재"],
  produce: ["식신", "상관"],
  control: ["편재", "정재"],
  controlled: ["편관", "정관"],
  support: ["편인", "정인"],
} as const;

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
    month - 1
  ];
}

export function validateSajuInput(input: Partial<SajuFormInput>): SajuValidationResult {
  const errors: string[] = [];
  const name = String(input.name ?? "").trim();
  const gender = input.gender;
  const birthDate = String(input.birth_date ?? "").trim();
  const birthTime = String(input.birth_time ?? "").trim();
  const mode = input.mode === "ai" ? "ai" : "no-ai";

  if (!name) {
    errors.push("이름을 입력해 주세요.");
  }

  if (gender !== "male" && gender !== "female") {
    errors.push("성별은 male 또는 female 이어야 합니다.");
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!dateMatch) {
    errors.push("생년월일 형식은 YYYY-MM-DD 이어야 합니다.");
  }

  const timeMatch = /^(\d{2}):(\d{2})$/.exec(birthTime);
  if (!timeMatch) {
    errors.push("태어난 시간 형식은 HH:MM 이어야 합니다.");
  }

  if (dateMatch) {
    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
      errors.push("유효한 생년월일을 입력해 주세요.");
    }
  }

  if (timeMatch) {
    const hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2]);
    if (hour > 23 || minute > 59) {
      errors.push("유효한 시간을 입력해 주세요.");
    }
  }

  if (errors.length > 0 || gender == null) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      gender,
      birth_date: birthDate,
      birth_time: birthTime,
      mode,
    },
  };
}

function parseDateTime(profile: SajuProfile) {
  const [year, month, day] = profile.birth_date.split("-").map(Number);
  const [hour, minute] = profile.birth_time.split(":").map(Number);

  return { year, month, day, hour, minute };
}

function buildPillar(stemIdx: number, branchIdx: number): SajuPillar {
  return {
    gan: CHEONGAN[stemIdx],
    zhi: JIJI[branchIdx],
    gan_idx: stemIdx,
    zhi_idx: branchIdx,
    gan_element: STEM_OHAENG[stemIdx],
    zhi_element: BRANCH_OHAENG[branchIdx],
  };
}

export function getGanZhi(profile: SajuProfile): SajuPillars {
  const { year, month, day, hour } = parseDateTime(profile);

  const isBeforeLichun = month < 2 || (month === 2 && day < 4);
  const calcYear = isBeforeLichun ? year - 1 : year;
  const yearIdx = (calcYear - 4) % 60;
  const yearStemIdx = ((yearIdx % 10) + 10) % 10;
  const yearBranchIdx = ((yearIdx % 12) + 12) % 12;

  const monthStartStems = [2, 4, 6, 8, 0];
  const startStem = monthStartStems[yearStemIdx % 5];
  const targetMonth = day < 5 ? (month > 1 ? month - 1 : 12) : month;
  const monthBranchIdx = targetMonth % 12;
  const monthIdxFromFeb = ((targetMonth - 2) % 12 + 12) % 12;
  const monthStemIdx = (startStem + monthIdxFromFeb) % 10;

  const ref2000 = new Date(Date.UTC(2000, 0, 1));
  const current = new Date(Date.UTC(year, month - 1, day));
  const deltaDays = Math.floor((current.getTime() - ref2000.getTime()) / 86400000);
  const dayCycleIdx = ((54 + deltaDays) % 60 + 60) % 60;
  const dayStemIdx = dayCycleIdx % 10;
  const dayBranchIdx = dayCycleIdx % 12;

  const hourBranchIdx = Math.floor((hour + 1) / 2) % 12;
  const hourStartStems = [0, 2, 4, 6, 8];
  const hourStartStem = hourStartStems[dayStemIdx % 5];
  const hourStemIdx = (hourStartStem + hourBranchIdx) % 10;

  return {
    year: buildPillar(yearStemIdx, yearBranchIdx),
    month: buildPillar(monthStemIdx, monthBranchIdx),
    day: buildPillar(dayStemIdx, dayBranchIdx),
    hour: buildPillar(hourStemIdx, hourBranchIdx),
  };
}

export function getOhaengDistribution(pillars: SajuPillars): OhaengCounts {
  const dist: OhaengCounts = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  for (const key of ["year", "month", "day", "hour"] as const) {
    dist[STEM_OHAENG[pillars[key].gan_idx]] += 1;
    dist[BRANCH_OHAENG[pillars[key].zhi_idx]] += 1;
  }

  return dist;
}

function getStemPolarity(stemIdx: number) {
  return stemIdx % 2 === 0 ? 0 : 1;
}

function determineGod(
  myElement: SajuElement,
  targetElement: SajuElement,
  myPolarity: number,
  targetPolarity: number,
) {
  const diff = (ELEMENT_INDEX[targetElement] - ELEMENT_INDEX[myElement] + 5) % 5;
  const samePolarity = myPolarity === targetPolarity;

  if (diff === 0) {
    return samePolarity ? GOD_LABELS.same[0] : GOD_LABELS.same[1];
  }
  if (diff === 1) {
    return samePolarity ? GOD_LABELS.produce[0] : GOD_LABELS.produce[1];
  }
  if (diff === 2) {
    return samePolarity ? GOD_LABELS.control[0] : GOD_LABELS.control[1];
  }
  if (diff === 3) {
    return samePolarity ? GOD_LABELS.controlled[0] : GOD_LABELS.controlled[1];
  }

  return samePolarity ? GOD_LABELS.support[0] : GOD_LABELS.support[1];
}

export function getTenGods(pillars: SajuPillars): TenGodItem {
  const dayMasterElement = pillars.day.gan_element;
  const dayMasterPolarity = getStemPolarity(pillars.day.gan_idx);

  const result = {} as TenGodItem;

  for (const key of ["year", "month", "day", "hour"] as const) {
    if (key === "day") {
      result[key] = {
        gan: "나",
        zhi: determineGod(
          dayMasterElement,
          pillars[key].zhi_element,
          dayMasterPolarity,
          BRANCH_POLARITIES[pillars[key].zhi_idx],
        ),
      };
      continue;
    }

    result[key] = {
      gan: determineGod(
        dayMasterElement,
        pillars[key].gan_element,
        dayMasterPolarity,
        getStemPolarity(pillars[key].gan_idx),
      ),
      zhi: determineGod(
        dayMasterElement,
        pillars[key].zhi_element,
        dayMasterPolarity,
        BRANCH_POLARITIES[pillars[key].zhi_idx],
      ),
    };
  }

  return result;
}

function buildOhaengAnalysis(counts: OhaengCounts): OhaengAnalysis {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const percentages = Object.fromEntries(
    Object.entries(counts).map(([key, value]) => [key, Number(((value / total) * 100).toFixed(1))]),
  ) as OhaengPercentages;

  const details: OhaengDetail[] = (Object.keys(counts) as SajuElement[]).map((element) => {
    const count = counts[element];
    if (count >= 3) {
      return {
        element,
        status: "excess",
        msg: `${ELEMENT_LABELS[element]} 기운이 강하게 드러납니다. 장점은 크게 쓰되 한쪽 성향으로 치우치지 않도록 생활 리듬을 조절하는 것이 좋습니다.`,
      };
    }
    if (count <= 1) {
      return {
        element,
        status: "missing",
        msg: `${ELEMENT_LABELS[element]} 기운이 약한 편입니다. 해당 기운을 보완하는 환경, 습관, 인간관계를 의식적으로 더해 주면 전체 밸런스가 좋아집니다.`,
      };
    }
    return {
      element,
      status: "balanced",
      msg: `${ELEMENT_LABELS[element]} 기운은 비교적 안정적입니다. 이미 가진 장점을 꾸준히 유지하는 방식이 잘 맞습니다.`,
    };
  });

  const strongest = (Object.keys(counts) as SajuElement[]).reduce((best, element) =>
    counts[element] > counts[best] ? element : best,
  );
  const weakest = (Object.keys(counts) as SajuElement[]).reduce((best, element) =>
    counts[element] < counts[best] ? element : best,
  );

  const balanceText =
    strongest === weakest
      ? "오행 흐름이 전반적으로 고르게 퍼져 있어 특정 기운에 과하게 끌리지 않는 편입니다."
      : `${ELEMENT_LABELS[strongest]} 기운이 중심을 잡고 있고 ${ELEMENT_LABELS[weakest]} 기운은 보완이 필요한 편입니다. 강점을 살리되 약한 기운을 생활 속에서 채우면 훨씬 안정적인 흐름을 만들 수 있습니다.`;

  return {
    counts,
    distribution: counts,
    percentages,
    details,
    balance_text: balanceText,
  };
}

function getDaewoonAdvice(dayMasterElement: SajuElement, currentGanIdx: number) {
  const targetElement = STEM_OHAENG[currentGanIdx];
  const god = determineGod(dayMasterElement, targetElement, 0, currentGanIdx % 2);

  const messages: Record<string, string> = {
    비견: "나와 결이 비슷한 사람과 협업하거나 경쟁하는 흐름이 강해집니다. 주도권을 지키되 고집으로 굳지 않도록 조율력이 중요합니다.",
    겁재: "경쟁 심리와 속도전이 강해지는 시기입니다. 무리한 승부보다 손실을 줄이는 전략이 장기적으로 유리합니다.",
    식신: "재능과 기술을 차분히 갈고닦을수록 성과가 쌓입니다. 몸을 움직이고 결과물을 남기는 일이 특히 중요해집니다.",
    상관: "표현력과 변화 욕구가 커집니다. 매력적인 시기지만 말과 결정의 강도를 조절해야 기회를 오래 이어갈 수 있습니다.",
    편재: "사업 감각과 실전 감각이 살아납니다. 외부 기회가 많아지는 만큼 분산보다 선택과 집중이 필요합니다.",
    정재: "안정적인 수입 구조와 자산 관리가 핵심이 됩니다. 작더라도 꾸준한 시스템을 만들면 흐름이 크게 흔들리지 않습니다.",
    편관: "책임과 압박이 함께 커질 수 있습니다. 기준과 원칙을 세우면 리더십으로 전환되지만, 과로는 반드시 경계해야 합니다.",
    정관: "명예, 평판, 역할이 중요해지는 흐름입니다. 사회적 자리에서 인정받기 쉬운 만큼 기본기와 신뢰 관리가 핵심입니다.",
    편인: "배움, 통찰, 새로운 관점이 삶의 방향을 바꾸는 시기입니다. 혼자만의 시간과 깊이 있는 탐구가 큰 자산이 됩니다.",
    정인: "문서, 공부, 보호받는 운이 강해집니다. 정리와 축적이 잘 되는 시기이므로 기반을 다지는 선택이 유리합니다.",
  };

  return `[${god}] ${messages[god]}`;
}

export function getDaewoon(profile: SajuProfile, pillars: SajuPillars): DaewoonItem[] {
  const { day } = parseDateTime(profile);
  const isYangYear = pillars.year.gan_idx % 2 === 0;
  const isMale = profile.gender === "male";
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);
  const step = isForward ? 1 : -1;
  const startAge = day % 10 === 0 ? 10 : day % 10;

  return Array.from({ length: 8 }, (_, index) => {
    const ganIdx = (pillars.month.gan_idx + step * (index + 1) + 100) % 10;
    const zhiIdx = (pillars.month.zhi_idx + step * (index + 1) + 120) % 12;

    return {
      age: startAge + index * 10,
      gan: CHEONGAN[ganIdx],
      zhi: JIJI[zhiIdx],
      gan_element: STEM_OHAENG[ganIdx],
      zhi_element: BRANCH_OHAENG[zhiIdx],
      text: getDaewoonAdvice(pillars.day.gan_element, ganIdx),
    };
  });
}

function buildGmhsDescription(
  key: SajuPillarKey,
  pillar: SajuPillar,
  tenGods: TenGodItem,
) {
  const period = PERIOD_LABELS[key];
  const elementSummary = `${ELEMENT_LABELS[pillar.gan_element]}와 ${ELEMENT_LABELS[pillar.zhi_element]}의 결`;

  return `${period}는 ${elementSummary}이 두드러지는 시기입니다. 천간의 ${tenGods[key].gan} 기질과 지지의 ${tenGods[key].zhi} 흐름이 함께 작동해, 이 시기에는 자신의 역할과 주변 관계가 삶의 무게를 크게 좌우합니다. 강한 기운은 장점으로 키우고, 약한 부분은 생활 습관과 인간관계로 보완할수록 더 안정적인 흐름을 만들 수 있습니다.`;
}

export function getGeunMyoHwaSil(pillars: SajuPillars, tenGods: TenGodItem): GMHSMap {
  return {
    year: {
      period: PERIOD_LABELS.year,
      desc: buildGmhsDescription("year", pillars.year, tenGods),
      pillar: pillars.year,
    },
    month: {
      period: PERIOD_LABELS.month,
      desc: buildGmhsDescription("month", pillars.month, tenGods),
      pillar: pillars.month,
    },
    day: {
      period: PERIOD_LABELS.day,
      desc: buildGmhsDescription("day", pillars.day, tenGods),
      pillar: pillars.day,
    },
    hour: {
      period: PERIOD_LABELS.hour,
      desc: buildGmhsDescription("hour", pillars.hour, tenGods),
      pillar: pillars.hour,
    },
  };
}

function getTodayFortune(profile: SajuProfile, pillars: SajuPillars): TodayLuck {
  const today = new Date();
  const ref2000 = new Date(Date.UTC(2000, 0, 1));
  const todayUtc = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const deltaDays = Math.floor((todayUtc.getTime() - ref2000.getTime()) / 86400000);
  const cycleIdx = ((54 + deltaDays) % 60 + 60) % 60;
  const todayGanIdx = cycleIdx % 10;
  const todayZhiIdx = cycleIdx % 12;
  const diff =
    (ELEMENT_INDEX[STEM_OHAENG[todayGanIdx]] - ELEMENT_INDEX[pillars.day.gan_element] + 5) % 5;

  const fortunes = {
    0: {
      title: "🤝 어깨를 나란히 하는 날",
      desc: "비슷한 결의 사람과 손을 맞잡을수록 힘이 커집니다. 혼자 버티기보다 좋은 협업을 선택해 보세요.",
    },
    1: {
      title: "🎨 재능이 꽃피는 날",
      desc: "표현력과 아이디어가 살아나는 흐름입니다. 말, 글, 작업물로 남길수록 운이 더 잘 붙습니다.",
    },
    2: {
      title: "💰 결실을 맺는 날",
      desc: "현실적인 판단과 실행이 빛을 보는 날입니다. 작은 성과도 구체적으로 챙겨 두는 것이 좋습니다.",
    },
    3: {
      title: "👑 책임이 또렷해지는 날",
      desc: "역할과 기준이 분명해질수록 신뢰가 생깁니다. 중요한 일은 미루지 말고 깔끔하게 정리해 두세요.",
    },
    4: {
      title: "📚 도움을 배우는 날",
      desc: "혼자 해결하려 하기보다 조언과 배움을 받아들이면 훨씬 수월해집니다. 몸과 마음을 정리하는 시간도 좋습니다.",
    },
  } as const;

  const fortune = fortunes[diff as keyof typeof fortunes];

  return {
    date: new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Seoul",
    }).format(today),
    pillar: `${CHEONGAN[todayGanIdx]}${JIJI[todayZhiIdx]}일`,
    title: fortune.title,
    desc: `${fortune.desc} ${profile.gender === "female" ? "감정의 리듬을 세심하게 살피는 태도" : "중심을 단단히 지키는 태도"}가 오늘의 운을 더 좋게 만듭니다.`,
  };
}

function getDominantTenGod(tenGods: TenGodItem) {
  const allGods = Object.values(tenGods).flatMap((item) => [item.gan, item.zhi]);
  const counter = new Map<string, number>();
  for (const god of allGods) {
    if (god === "나") {
      continue;
    }
    counter.set(god, (counter.get(god) ?? 0) + 1);
  }

  return [...counter.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "비견";
}

function getElementLifestyleAdvice(element: SajuElement) {
  const messages: Record<SajuElement, string> = {
    wood: "새로운 배움, 산책, 기획 정리처럼 확장성과 성장감을 주는 활동이 개운 포인트가 됩니다.",
    fire: "햇빛, 운동, 발표, 사람을 만나는 일정처럼 에너지를 바깥으로 순환시키는 활동이 도움이 됩니다.",
    earth: "생활 루틴, 식사 시간, 공간 정리처럼 기본을 안정시키는 습관이 전체 운의 균형을 잡아 줍니다.",
    metal: "정리, 선택, 기준 세우기처럼 군더더기를 덜어내는 행동이 운의 흐름을 선명하게 만듭니다.",
    water: "휴식, 수면, 기록, 사색처럼 내면을 회복시키는 시간이 장기적으로 가장 큰 힘이 됩니다.",
  };

  return messages[element];
}

function buildInterpretation(
  profile: SajuProfile,
  pillars: SajuPillars,
  ohaeng: OhaengCounts,
  ohaengAnalysis: OhaengAnalysis,
  tenGods: TenGodItem,
  gmhs: GMHSMap,
  daewoon: DaewoonItem[],
  todayLuck: TodayLuck,
) {
  // Keep the legacy Flask/Byeolha response keys intact so the UI can evolve
  // without breaking the original result payload contract.
  const dayMaster = pillars.day.gan as keyof typeof DAY_MASTER_TRAITS;
  const dayMasterInfo = DAY_MASTER_TRAITS[dayMaster];
  const dominantElement = (Object.keys(ohaeng) as SajuElement[]).reduce((best, element) =>
    ohaeng[element] > ohaeng[best] ? element : best,
  );
  const weakElement = (Object.keys(ohaeng) as SajuElement[]).reduce((best, element) =>
    ohaeng[element] < ohaeng[best] ? element : best,
  );
  const dominantGod = getDominantTenGod(tenGods);
  const currentDaewoon = daewoon[0];

  const core = `${dayMasterInfo.symbol}의 기운을 타고난 분입니다. ${dayMasterInfo.summary}`;
  const totalSummary = `${profile.name}님의 사주는 ${dayMasterInfo.summary} ${dayMasterInfo.detail} 현재 원국에서는 ${ELEMENT_LABELS[dominantElement]} 기운이 중심을 잡고 있어 삶의 방향을 밀어주는 힘이 분명하며, ${ELEMENT_LABELS[weakElement]} 기운은 의식적으로 보완할수록 훨씬 안정적인 성장 곡선을 만들 수 있습니다.`;
  const personalityDeep = `${dayMasterInfo.detail} 특히 월주의 ${tenGods.month.gan} 기질이 삶의 무대에서 자주 드러나기 때문에, 타인 앞에서는 책임감과 역할 의식이 뚜렷하게 보일 가능성이 큽니다.`;
  const socialAnalysis = `사회적 적성에서는 ${dominantGod} 성향이 강하게 드러납니다. 이는 ${tenGods.month.gan}과 ${tenGods.year.gan} 흐름이 함께 작동하기 때문이며, 역할이 분명한 구조 속에서 신뢰를 얻거나 자신의 강점을 전문성으로 전환할수록 좋은 평가를 받기 쉽습니다.`;
  const healthAnalysis = `건강과 체질 면에서는 ${ELEMENT_LABELS[weakElement]} 기운 보완이 핵심입니다. ${ohaengAnalysis.balance_text} 과로하거나 생활 리듬이 무너지면 약한 기운에서 먼저 피로 신호가 올라올 수 있으니, ${getElementLifestyleAdvice(weakElement)}`;
  const daewoonTrend = `현재 대운의 시작점은 ${currentDaewoon.age}세 전후로 보이며 ${currentDaewoon.gan}${currentDaewoon.zhi} 흐름이 먼저 들어옵니다. ${currentDaewoon.text} 큰 방향을 억지로 뒤집기보다 이미 가진 장점을 제도화하고, 약한 부분은 보완하는 방식이 장기적으로 유리합니다.`;
  const loveRomance = `애정 흐름에서는 감정의 깊이와 현실 감각이 함께 중요하게 작동합니다. ${tenGods.day.zhi}와 ${tenGods.hour.gan} 기질이 섞이기 때문에, 마음이 움직이면 진지하게 관계를 바라보는 편이지만 기준이 높아 쉽게 타협하지는 않습니다. 속도를 맞출 수 있는 사람과의 관계에서 안정감이 커집니다.`;
  const wealthStrategy = `재물운은 한 번에 크게 흔들기보다 구조를 쌓는 방식이 맞습니다. ${dominantGod} 흐름이 강한 사주는 자신의 강점을 가치로 바꾸는 과정에서 돈이 붙는 편이라, 익숙한 재능을 수익 구조로 연결하고 지출 기준을 분명히 할수록 안정적으로 성장합니다.`;
  const advice = `${ELEMENT_LABELS[dominantElement]}의 강점을 충분히 살리되 ${ELEMENT_LABELS[weakElement]}의 빈틈을 생활 습관으로 채우는 것이 핵심 조언입니다. 무리한 변화보다 지속 가능한 루틴, 잘 맞는 사람, 오래 가져갈 수 있는 일의 방식을 선택해 보세요.`;

  return {
    core,
    total_summary: totalSummary,
    personality_deep: personalityDeep,
    social_analysis: socialAnalysis,
    health_analysis: healthAnalysis,
    daewoon_trend: daewoonTrend,
    love_romance: loveRomance,
    wealth_strategy: wealthStrategy,
    advice,
    gmhs,
    today_luck: todayLuck,
    ten_gods: tenGods,
    daewoon,
    ohaeng_analysis: ohaengAnalysis,
    wealth: wealthStrategy,
    love: loveRomance,
    career: socialAnalysis,
  };
}

export function analyzeSaju(input: Partial<SajuFormInput>): SajuResult {
  const validated = validateSajuInput(input);
  if (!validated.success) {
    throw new Error(validated.errors.join(" "));
  }

  // This is the adapter boundary: raw form input becomes the legacy-compatible
  // `pillars` + `ohaeng` + `interp` structure documented in the original specs.
  const profile = validated.data;
  const pillars = getGanZhi(profile);
  const ohaeng = getOhaengDistribution(pillars);
  const tenGods = getTenGods(pillars);
  const ohaengAnalysis = buildOhaengAnalysis(ohaeng);
  const gmhs = getGeunMyoHwaSil(pillars, tenGods);
  const daewoon = getDaewoon(profile, pillars);
  const todayLuck = getTodayFortune(profile, pillars);

  return {
    profile,
    pillars,
    ohaeng,
    interp: buildInterpretation(
      profile,
      pillars,
      ohaeng,
      ohaengAnalysis,
      tenGods,
      gmhs,
      daewoon,
      todayLuck,
    ),
  };
}

export function getSajuQueryString(profile: SajuProfile) {
  return new URLSearchParams({
    name: profile.name,
    gender: profile.gender,
    birth_date: profile.birth_date,
    birth_time: profile.birth_time,
    mode: profile.mode,
  }).toString();
}
