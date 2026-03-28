export type AttachmentType = "secure" | "anxious" | "avoidant" | "fearful";

export type AttachmentOption = {
  text: string;
  type: AttachmentType;
  score: number;
};

export type AttachmentQuestion = {
  id: number;
  question: string;
  options: AttachmentOption[];
};

export type AttachmentScoreMap = Record<AttachmentType, number>;

export type AttachmentAnswerMap = Record<number, AttachmentOption>;

export type AttachmentResult = {
  code: AttachmentType;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  relationshipPattern: string;
  emotionalHabit: string;
  fearPoint: string;
  healingGuide: string;
  recommendedMessage: string;
  keywords: string[];
};
