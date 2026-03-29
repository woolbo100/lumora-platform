export type RelationshipPatternType =
  | "immersive"
  | "sacrificial"
  | "distant"
  | "emotional"
  | "stable";

export type RelationshipPatternOption = {
  text: string;
  type: RelationshipPatternType;
  score: number;
};

export type RelationshipPatternQuestion = {
  id: number;
  question: string;
  options: RelationshipPatternOption[];
};

export type RelationshipPatternScoreMap = Record<RelationshipPatternType, number>;

export type RelationshipPatternAnswerMap = Record<number, RelationshipPatternOption>;

export type RelationshipPatternResult = {
  code: RelationshipPatternType;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  relationshipPattern: string;
  warningPoint: string;
  healingGuide: string;
  recommendedMessage: string;
  keywords: string[];
};
