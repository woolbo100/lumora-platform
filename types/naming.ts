import { type SharedSajuAnalysis } from "@/types/analysis";
import { type SajuElement, type SajuGender } from "@/types/saju";

export type ElementType = SajuElement;

export type NamingPurpose = "wealth" | "love" | "brand" | "healing";

export type NamingStyle =
  | "soft"
  | "elegant"
  | "bright"
  | "strong"
  | "luxurious"
  | "modern"
  | "neutral"
  | "calm";

export type NamingCandidate = {
  id: string;
  name: string;
  gender: SajuGender | "neutral";
  hanjaMeaning?: string;
  styleTags: NamingStyle[];
  elementTags: ElementType[];
  purposeTags: NamingPurpose[];
  summary: string;
  energyDescription: string;
  lifeImpact: string;
};

export type SajuNamingInput = {
  analysis_id: string;
  purpose: NamingPurpose;
  current_name?: string;
  preferred_style?: NamingStyle;
};

export type NamingDirection = {
  text: string;
  emphasisKeywords: string[];
  recommendedStyles: NamingStyle[];
};

export type ScoredNamingCandidate = NamingCandidate & {
  score: number;
  reasonTags: string[];
};

export type NamingResult = {
  sajuSummary: string;
  dominantElements: ElementType[];
  lackingElements: ElementType[];
  purpose: NamingPurpose;
  namingDirection: string;
  recommendations: ScoredNamingCandidate[];
  premiumPreview: string;
  analysisId: string;
  sajuAnalysis: SharedSajuAnalysis;
};

export type NamingValidationResult =
  | { success: true; data: SajuNamingInput }
  | { success: false; errors: string[] };
