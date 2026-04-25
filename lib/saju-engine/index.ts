import { calculateFourPillars, type FourPillarsDetail } from "manseryeok";

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

const PILLAR_LABELS: Record<SajuPillarKey, string> = {
  year: "년주",
  month: "월주",
  day: "일주",
  hour: "시주",
};

const DAY_MASTER_TRAITS = {
  갑: {
    image: "곧게 뻗는 나무",
    core: "스스로 길을 정하고 삶의 방향을 밀어가는 힘이 선명합니다.",
    depth: "마음속 기준이 분명해서 쉽게 흔들리지 않지만, 혼자 오래 버티려는 버릇이 생기기 쉬워요.",
  },
  을: {
    image: "바람을 읽는 풀잎",
    core: "섬세하게 흐름을 읽고 관계 속에서 조화를 만드는 감각이 좋습니다.",
    depth: "주변의 온도를 빠르게 읽는 만큼, 내 마음의 속도를 놓치지 않는 연습이 필요합니다.",
  },
  병: {
    image: "빛을 펼치는 태양",
    core: "존재감과 표현력이 살아 있어 사람들 사이에서 분위기를 밝히는 힘이 있습니다.",
    depth: "에너지가 높을수록 더 멀리 갈 수 있지만, 마음이 지칠 때는 쉬는 리듬도 꼭 필요합니다.",
  },
  정: {
    image: "잔잔히 오래 타는 불빛",
    core: "깊고 따뜻한 몰입으로 한 사람과 한 일을 오래 비추는 성향입니다.",
    depth: "배려가 깊은 만큼 감정을 안으로 쌓아두기 쉬워, 마음의 숨구멍을 자주 열어주는 편이 좋습니다.",
  },
  무: {
    image: "넓게 버티는 산",
    core: "묵직한 안정감과 책임감으로 주변을 지탱하는 힘이 큽니다.",
    depth: "든든함이 장점이지만, 너무 많은 짐을 혼자 지려 하지 않는 균형이 중요합니다.",
  },
  기: {
    image: "차분히 품는 들판",
    core: "현실을 다정하게 정리하고 필요한 것을 채워주는 감각이 좋습니다.",
    depth: "상대를 돌보는 데 익숙한 만큼, 나를 위한 경계와 휴식도 함께 세워야 더 편안해집니다.",
  },
  경: {
    image: "결을 세우는 금속",
    core: "판단이 빠르고 기준이 명확해 흐트러진 것을 정리하는 힘이 있습니다.",
    depth: "정확함이 큰 장점이지만, 나와 타인 모두에게 너무 엄격해지지 않도록 온기를 남겨두면 더 좋습니다.",
  },
  신: {
    image: "반짝임을 다듬는 보석",
    core: "디테일을 살리고 미묘한 차이를 감지하는 감각이 탁월합니다.",
    depth: "아름다움과 완성도를 중요하게 여기는 만큼, 완벽해야만 움직일 수 있다는 압박은 덜어내도 괜찮습니다.",
  },
  임: {
    image: "깊이를 품은 바다",
    core: "시야가 넓고 유연해서 다양한 가능성을 받아들이는 힘이 있습니다.",
    depth: "생각의 폭이 넓은 만큼 중심이 흐려질 수 있어, 중요한 순간일수록 선택을 선명하게 해두는 편이 좋습니다.",
  },
  계: {
    image: "조용히 스미는 비",
    core: "감정의 결을 섬세하게 읽고, 말보다 깊은 공감으로 관계를 적셔주는 힘이 있습니다.",
    depth: "상대의 마음을 잘 느끼는 만큼, 내 감정도 흘려보내지 않고 돌보는 시간이 필요합니다.",
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
    errors.push("이름을 입력해주세요.");
  }

  if (gender !== "male" && gender !== "female") {
    errors.push("성별을 선택해주세요.");
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!dateMatch) {
    errors.push("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
  }

  const timeMatch = /^(\d{2}):(\d{2})$/.exec(birthTime);
  if (!timeMatch) {
    errors.push("출생시간은 HH:MM 형식으로 입력해주세요.");
  }

  if (dateMatch) {
    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
      errors.push("유효한 생년월일을 입력해주세요.");
    }
  }

  if (timeMatch) {
    const hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2]);
    if (hour > 23 || minute > 59) {
      errors.push("유효한 출생시간을 입력해주세요.");
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

function mapElement(value: string): SajuElement {
  switch (value) {
    case "목":
      return "wood";
    case "화":
      return "fire";
    case "토":
      return "earth";
    case "금":
      return "metal";
    case "수":
      return "water";
    default:
      throw new Error("출생정보를 다시 확인해주세요");
  }
}

function buildPillar(
  heavenlyStem: string,
  earthlyBranch: string,
  stemElement: string,
  branchElement: string,
): SajuPillar {
  const ganIdx = CHEONGAN.indexOf(heavenlyStem as (typeof CHEONGAN)[number]);
  const zhiIdx = JIJI.indexOf(earthlyBranch as (typeof JIJI)[number]);

  if (ganIdx < 0 || zhiIdx < 0) {
    throw new Error("출생정보를 다시 확인해주세요");
  }

  return {
    gan: heavenlyStem,
    zhi: earthlyBranch,
    gan_idx: ganIdx,
    zhi_idx: zhiIdx,
    gan_element: mapElement(stemElement),
    zhi_element: mapElement(branchElement),
  };
}

function getFourPillars(profile: SajuProfile): FourPillarsDetail {
  const { year, month, day, hour, minute } = parseDateTime(profile);

  try {
    return calculateFourPillars({
      year,
      month,
      day,
      hour,
      minute,
    });
  } catch {
    throw new Error("출생정보를 다시 확인해주세요");
  }
}

export function getGanZhi(profile: SajuProfile): SajuPillars {
  const result = getFourPillars(profile);

  return {
    year: buildPillar(
      result.year.heavenlyStem,
      result.year.earthlyBranch,
      result.yearElement.stem,
      result.yearElement.branch,
    ),
    month: buildPillar(
      result.month.heavenlyStem,
      result.month.earthlyBranch,
      result.monthElement.stem,
      result.monthElement.branch,
    ),
    day: buildPillar(
      result.day.heavenlyStem,
      result.day.earthlyBranch,
      result.dayElement.stem,
      result.dayElement.branch,
    ),
    hour: buildPillar(
      result.hour.heavenlyStem,
      result.hour.earthlyBranch,
      result.hourElement.stem,
      result.hourElement.branch,
    ),
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
    dist[pillars[key].gan_element] += 1;
    dist[pillars[key].zhi_element] += 1;
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
        gan: "일간",
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
        msg: `${ELEMENT_LABELS[element]}의 결이 비교적 진하게 드러납니다. 장점으로 쓰면 큰 힘이 되지만, 너무 한쪽으로 기울지 않게 생활 리듬을 부드럽게 맞춰주세요.`,
      };
    }

    if (count <= 1) {
      return {
        element,
        status: "missing",
        msg: `${ELEMENT_LABELS[element]}의 기운은 의식적으로 보완해줄수록 더 편안합니다. 공간, 습관, 관계의 결에서 이 에너지를 천천히 채워보세요.`,
      };
    }

    return {
      element,
      status: "balanced",
      msg: `${ELEMENT_LABELS[element]}의 흐름은 비교적 안정적입니다. 지금의 균형을 잃지 않는 것이 이 요소의 가장 큰 힘입니다.`,
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
      ? "오행의 비중이 한쪽으로 크게 쏠리지 않아, 전체적으로 부드러운 균형감을 가진 편입니다."
      : `${ELEMENT_LABELS[strongest]}의 기운이 중심을 잡고 있고, ${ELEMENT_LABELS[weakest]}의 기운은 생활 속에서 조금 더 보완해줄수록 전체 리듬이 편안해집니다.`;

  return {
    counts,
    distribution: counts,
    percentages,
    details,
    balance_text: balanceText,
  };
}

function buildGmhsDescription(key: SajuPillarKey, pillar: SajuPillar, tenGods: TenGodItem) {
  return `${PILLAR_LABELS[key]}의 ${pillar.gan}${pillar.zhi}는 ${ELEMENT_LABELS[pillar.gan_element]}와 ${ELEMENT_LABELS[pillar.zhi_element]}의 분위기를 함께 품고 있습니다. ${tenGods[key].gan}과 ${tenGods[key].zhi}의 결이 겹치며, 이 영역에서는 타고난 성향이 비교적 자연스럽게 드러납니다.`;
}

export function getGeunMyoHwaSil(pillars: SajuPillars, tenGods: TenGodItem): GMHSMap {
  return {
    year: {
      period: "바깥으로 보이는 첫인상",
      desc: buildGmhsDescription("year", pillars.year, tenGods),
      pillar: pillars.year,
    },
    month: {
      period: "사회 속에서 드러나는 결",
      desc: buildGmhsDescription("month", pillars.month, tenGods),
      pillar: pillars.month,
    },
    day: {
      period: "가장 깊은 본래의 나",
      desc: buildGmhsDescription("day", pillars.day, tenGods),
      pillar: pillars.day,
    },
    hour: {
      period: "마음속 바람과 미래 감각",
      desc: buildGmhsDescription("hour", pillars.hour, tenGods),
      pillar: pillars.hour,
    },
  };
}

function getTodayFortune(pillars: SajuPillars): TodayLuck {
  const dominantElement = (Object.keys(pillars).reduce(
    (acc, key) => {
      const pillar = pillars[key as SajuPillarKey];
      acc[pillar.gan_element] += 1;
      acc[pillar.zhi_element] += 1;
      return acc;
    },
    { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 } as OhaengCounts,
  ) as OhaengCounts);

  const strongest = (Object.keys(dominantElement) as SajuElement[]).reduce((best, element) =>
    dominantElement[element] > dominantElement[best] ? element : best,
  );

  const moodMap: Record<SajuElement, { title: string; desc: string }> = {
    wood: {
      title: "흐름을 넓히는 날",
      desc: "새로운 계획을 너무 크게 벌리기보다, 이미 마음속에 있던 방향을 한 걸음 더 선명하게 적어보면 좋습니다.",
    },
    fire: {
      title: "마음을 밝혀보는 날",
      desc: "감정을 숨기기보다 따뜻하게 표현할수록 관계의 온도가 부드럽게 살아날 수 있습니다.",
    },
    earth: {
      title: "리듬을 고르는 날",
      desc: "기본을 정리하고 생활의 순서를 바로잡는 작은 행동이 하루 전체를 안정시켜줄 수 있습니다.",
    },
    metal: {
      title: "선명함이 필요한 날",
      desc: "해야 할 것과 내려놓을 것을 가볍게 구분해두면 마음이 훨씬 맑아질 수 있습니다.",
    },
    water: {
      title: "내면을 듣는 날",
      desc: "조용히 생각을 적거나 잠깐 쉬어가는 시간이 오히려 다음 움직임을 더 정확하게 만들어줄 수 있습니다.",
    },
  };

  return {
    date: new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Seoul",
    }).format(new Date()),
    pillar: `${pillars.day.gan}${pillars.day.zhi}`,
    title: moodMap[strongest].title,
    desc: moodMap[strongest].desc,
  };
}

function getElementLifestyleAdvice(element: SajuElement) {
  const messages: Record<SajuElement, string> = {
    wood: "가벼운 산책, 새로운 배움, 식물의 결 같은 성장의 리듬이 도움이 됩니다.",
    fire: "햇빛, 움직임, 대화처럼 에너지를 바깥으로 순환시키는 시간이 잘 맞습니다.",
    earth: "식사 시간, 수면 패턴, 공간 정리처럼 기본을 다지는 습관이 힘이 됩니다.",
    metal: "정리, 선택, 기준 세우기처럼 삶의 군더더기를 덜어내는 행동이 잘 맞습니다.",
    water: "기록, 휴식, 음악, 혼자만의 시간처럼 내면을 돌보는 흐름이 잘 맞습니다.",
  };

  return messages[element];
}

function getDominantTenGod(tenGods: TenGodItem) {
  const allGods = Object.values(tenGods).flatMap((item) => [item.gan, item.zhi]);
  const counter = new Map<string, number>();

  for (const god of allGods) {
    if (god === "일간") {
      continue;
    }
    counter.set(god, (counter.get(god) ?? 0) + 1);
  }

  return [...counter.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "비견";
}

export function getDaewoon(): DaewoonItem[] {
  return [];
}

function buildInterpretation(
  profile: SajuProfile,
  pillars: SajuPillars,
  ohaeng: OhaengCounts,
  ohaengAnalysis: OhaengAnalysis,
  tenGods: TenGodItem,
  gmhs: GMHSMap,
  todayLuck: TodayLuck,
) {
  const dayMaster = pillars.day.gan as keyof typeof DAY_MASTER_TRAITS;
  const dayMasterInfo = DAY_MASTER_TRAITS[dayMaster];
  const dominantElement = (Object.keys(ohaeng) as SajuElement[]).reduce((best, element) =>
    ohaeng[element] > ohaeng[best] ? element : best,
  );
  const weakElement = (Object.keys(ohaeng) as SajuElement[]).reduce((best, element) =>
    ohaeng[element] < ohaeng[best] ? element : best,
  );
  const dominantGod = getDominantTenGod(tenGods);

  const core = `${profile.name}님의 선천코드는 ${dayMasterInfo.image}의 결을 닮아 있습니다. ${dayMasterInfo.core}`;
  const totalSummary = `년주 ${pillars.year.gan}${pillars.year.zhi}, 월주 ${pillars.month.gan}${pillars.month.zhi}, 일주 ${pillars.day.gan}${pillars.day.zhi}, 시주 ${pillars.hour.gan}${pillars.hour.zhi}가 이루는 흐름 안에서 ${ELEMENT_LABELS[dominantElement]}의 결이 비교적 선명하고, ${ELEMENT_LABELS[weakElement]}의 결은 천천히 보완해줄수록 더 편안한 균형을 만듭니다.`;
  const personalityDeep = `${dayMasterInfo.depth} 일주 ${pillars.day.gan}${pillars.day.zhi}는 스스로의 마음을 지키는 방식이 꽤 뚜렷한 편이라, 익숙한 세계 안에서 자신의 감각을 오래 길러갈수록 진가가 살아납니다.`;
  const socialAnalysis = `${dominantGod}의 결이 비교적 또렷하게 드러나 관계와 일 속에서 자신만의 역할을 만들 가능성이 큽니다. 무리해서 크게 증명하기보다, 이미 가진 결을 안정적으로 보여줄수록 더 잘 맞습니다.`;
  const healthAnalysis = `${ohaengAnalysis.balance_text} 몸과 마음이 지칠 때는 특히 ${ELEMENT_LABELS[weakElement]}의 리듬을 보완해주는 생활 습관이 도움이 됩니다. ${getElementLifestyleAdvice(weakElement)}`;
  const daewoonTrend = "이 결과는 무료 참고용 선천코드에 집중한 간단 해석입니다. 태양시, 야자시, 대운과 세운의 정밀 분석은 포함하지 않았습니다.";
  const loveRomance = `감정에서는 진심이 깊게 움직이는 편입니다. 마음이 맞는 사람에게는 오래 정을 두는 타입이라, 속도를 맞춰주는 관계 안에서 더 편안한 사랑을 경험하기 쉽습니다.`;
  const wealthStrategy = `재물과 일의 흐름은 한 번에 크게 흔들기보다, 잘하는 것을 천천히 구조로 만드는 방식이 잘 맞습니다. 자신의 감각을 꾸준히 쌓아갈수록 결과도 더 안정적으로 따라오기 쉽습니다.`;
  const advice = `${ELEMENT_LABELS[dominantElement]}의 장점은 믿고 쓰되, ${ELEMENT_LABELS[weakElement]}의 부족함은 조급하게 채우려 하지 않아도 괜찮습니다. 삶의 속도를 조금만 다정하게 조율해도 전체 결은 훨씬 부드러워질 수 있어요.`;

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
    daewoon: [],
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

  const profile = validated.data;
  const pillars = getGanZhi(profile);
  const ohaeng = getOhaengDistribution(pillars);
  const tenGods = getTenGods(pillars);
  const ohaengAnalysis = buildOhaengAnalysis(ohaeng);
  const gmhs = getGeunMyoHwaSil(pillars, tenGods);
  const todayLuck = getTodayFortune(pillars);

  return {
    profile,
    pillars,
    ohaeng,
    interp: buildInterpretation(profile, pillars, ohaeng, ohaengAnalysis, tenGods, gmhs, todayLuck),
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
