export type EmotionTag = "anxiety" | "sad" | "excited" | "tired" | "empty" | "happy";

export type EmotionInput = {
  emotion_text: string;
  emotion_tag?: EmotionTag;
  intensity?: number;
};

export type EmotionResult = {
  core_reading: string;
  emotion_analysis: string;
  energy_state: string;
  flow_direction: string;
  affirmation: string[];
  advice: string;
  warning: string;
  premium_preview: string;
  detected_tag: EmotionTag;
  intensity: number;
};

export type EmotionValidationResult =
  | { success: true; data: Required<Pick<EmotionInput, "emotion_text">> & Omit<EmotionInput, "emotion_text"> }
  | { success: false; errors: string[] };
