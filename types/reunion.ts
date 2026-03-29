export type ReunionType = "high" | "cautious" | "closure" | "newflow";

export type ReunionOption = {
  text: string;
  type: ReunionType;
  score: number;
};

export type ReunionQuestion = {
  id: number;
  question: string;
  options: ReunionOption[];
};

export type ReunionScoreMap = Record<ReunionType, number>;

export type ReunionAnswerMap = Record<number, ReunionOption>;

export type ReunionResult = {
  code: ReunionType;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  emotionalFlow: string;
  warningPoint: string;
  actionGuide: string;
  recommendedMessage: string;
  keywords: string[];
};
