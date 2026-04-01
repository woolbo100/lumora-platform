export type EgenVsTetoAnswer = "A" | "B";

export type EgenVsTetoQuestion = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
};

export type EgenVsTetoResultType = "egen" | "teto" | "mixed";

export type EgenVsTetoResult = {
  type: EgenVsTetoResultType;
  egenScore: number;
  tetoScore: number;
  title: string;
  subtitle: string;
  strengths: string[];
  caution: string;
  tip: string;
  shareText: string;
};
