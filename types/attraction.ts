export type AttractionType =
  | "elegant"
  | "lovely"
  | "chic"
  | "warm"
  | "mystic";

export type AttractionOption = {
  text: string;
  type: AttractionType;
  score: number;
};

export type AttractionQuestion = {
  id: number;
  question: string;
  options: AttractionOption[];
};

export type AttractionScoreMap = Record<AttractionType, number>;

export type AttractionAnswerMap = Record<number, AttractionOption>;

export type AttractionResult = {
  code: AttractionType;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  attractionPoint: string;
  relationshipStyle: string;
  improvementTip: string;
  keywords: string[];
};
