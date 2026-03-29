export type DreamEmotion = "good" | "neutral" | "bad";

export type DreamPurpose = "wealth" | "love" | "career" | "healing";

export type DreamInput = {
  dream_text: string;
  emotion: DreamEmotion;
  purpose: DreamPurpose;
};

export type DreamSymbolMeaning = {
  keyword: string;
  labels: string[];
  meaning: string;
  relatedPurpose: DreamPurpose[];
};

export type DreamResult = {
  core_meaning: string;
  symbols: string[];
  emotional_analysis: string;
  life_interpretation: string;
  advice: string;
  warning: string;
  related_flow: string;
  premium_preview: string;
  matchedSymbols: DreamSymbolMeaning[];
};

export type DreamValidationResult =
  | { success: true; data: DreamInput }
  | { success: false; errors: string[] };
