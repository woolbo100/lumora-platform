export type DreamPurpose = "wealth" | "love" | "career" | "healing";

export type DreamEmotion = "fear" | "sadness" | "anger" | "calm" | "surprise";

export type DreamSituation = "chased" | "falling" | "conflict" | "discovery" | "movement";

export type DreamCompanion = "alone" | "known" | "unknown" | "family";

export type DreamInput = {
  dream_text: string;
  emotion: DreamEmotion;
  situation: DreamSituation;
  companion?: DreamCompanion;
};

export type DreamSymbolMeaning = {
  keyword: string;
  labels: string[];
  meaning: string;
  relatedPurpose: DreamPurpose[];
};

export type DreamSymbolInsight = {
  title: string;
  description: string;
};

export type DreamResult = {
  summary: string;
  narrative: string;
  symbol_insights: DreamSymbolInsight[];
  psychology: string;
  action_guides: string[];
  energy_flow: string;
  closing_message: string;
  symbols: string[];
  premium_preview: string;
  matchedSymbols: DreamSymbolMeaning[];
};

export type DreamValidationResult =
  | { success: true; data: DreamInput }
  | { success: false; errors: string[] };
