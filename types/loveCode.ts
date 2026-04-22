export type LoveCodeRelationshipStatus =
  | "some"
  | "crush"
  | "dating"
  | "reunion"
  | "no-contact"
  | "ambiguous";

export type LoveCodeCurrentSituation =
  | "no-contact-first"
  | "i-like-more"
  | "mutual-no-progress"
  | "recent-fight"
  | "want-reconnect"
  | "push-pull"
  | "hard-to-express";

export type LoveCodeInput = {
  myBirthDate: string;
  partnerBirthDate: string;
  relationshipStatus: LoveCodeRelationshipStatus;
  currentSituation: LoveCodeCurrentSituation;
};

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type CompatibilityMetric = {
  label: string;
  score: number;
  description: string;
};

export type LoveCodeResult = {
  compatibilityScore: number;
  oneLineDiagnosis: string;
  partnerStyle: string;
  currentRelationshipReading: string;
  keyIssue: string;
  todayAction: string;
  todayActionExample: string;
  avoidAction: string;
  simpleStrategy: string;
  oneLineConclusion: string;
  mySignLabel: string;
  partnerSignLabel: string;
  constellationSummary: string;
  mySignPersonality: string;
  mySignKeyword: string;
  mySignDeepReading: string;
  partnerSignPersonality: string;
  partnerSignKeyword: string;
  partnerSignDeepReading: string;
  detailedCompatibility: string;
  compatibilityMetrics: CompatibilityMetric[];
  todayActionList: string[];
  todayActionExampleList: string[];
  coreMindset: string;
  finalActionTip: string;
};
