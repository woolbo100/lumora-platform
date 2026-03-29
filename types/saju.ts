export type SajuElement = "wood" | "fire" | "earth" | "metal" | "water";

export type SajuGender = "male" | "female";

export type SajuMode = "no-ai" | "ai";

export type SajuPillarKey = "year" | "month" | "day" | "hour";

export type SajuPillar = {
  gan: string;
  zhi: string;
  gan_idx: number;
  zhi_idx: number;
  gan_element: SajuElement;
  zhi_element: SajuElement;
};

export type SajuPillars = Record<SajuPillarKey, SajuPillar>;

export type OhaengCounts = Record<SajuElement, number>;

export type OhaengPercentages = Record<SajuElement, number>;

export type OhaengDetail = {
  element: SajuElement;
  status: "balanced" | "excess" | "missing";
  msg: string;
};

export type OhaengAnalysis = {
  counts: OhaengCounts;
  distribution: OhaengCounts;
  percentages: OhaengPercentages;
  details: OhaengDetail[];
  balance_text: string;
};

export type TodayLuck = {
  date: string;
  pillar: string;
  title: string;
  desc: string;
};

export type GMHSItem = {
  period: string;
  desc: string;
  pillar: SajuPillar;
};

export type GMHSMap = Record<SajuPillarKey, GMHSItem>;

export type DaewoonItem = {
  age: number;
  gan: string;
  zhi: string;
  gan_element: SajuElement;
  zhi_element: SajuElement;
  text: string;
};

export type TenGodPosition = {
  gan: string;
  zhi: string;
};

export type TenGodItem = Record<SajuPillarKey, TenGodPosition>;

export type SajuInterpretation = {
  core: string;
  total_summary: string;
  personality_deep: string;
  social_analysis: string;
  health_analysis: string;
  daewoon_trend: string;
  love_romance: string;
  wealth_strategy: string;
  advice: string;
  gmhs: GMHSMap;
  today_luck: TodayLuck;
  ten_gods: TenGodItem;
  daewoon: DaewoonItem[];
  ohaeng_analysis: OhaengAnalysis;
  wealth: string;
  love: string;
  career: string;
};

export type SajuFormInput = {
  name: string;
  gender: SajuGender;
  birth_date: string;
  birth_time: string;
  mode?: SajuMode;
};

export type SajuProfile = SajuFormInput & {
  mode: SajuMode;
};

export type SajuResult = {
  profile: SajuProfile;
  pillars: SajuPillars;
  ohaeng: OhaengCounts;
  interp: SajuInterpretation;
};

export type SajuValidationResult =
  | { success: true; data: SajuProfile }
  | { success: false; errors: string[] };
