export type AuraChakraKey =
  | "root"
  | "sacral"
  | "solar"
  | "heart"
  | "throat"
  | "thirdEye"
  | "crown";

export type AuraStateKey = "blocked" | "overactive" | "balanced";

export type AuraOverallState =
  | "blocked-dominant"
  | "overactive-dominant"
  | "balanced-dominant"
  | "mixed";

export type AuraQuestion = {
  id: number;
  text: string;
  chakra: AuraChakraKey;
  state: AuraStateKey;
};

export type AuraAnswerValue = 0 | 1 | 2;

export type AuraAnswers = Record<number, AuraAnswerValue>;

export type ChakraStateScores = Record<AuraStateKey, number>;

export type AuraChakraResultState = "blocked" | "overactive" | "balanced" | "mixed";

export type AuraChakraResult = {
  chakra: AuraChakraKey;
  state: AuraChakraResultState;
  scores: ChakraStateScores;
};

export type AuraColorTone = "clear" | "condensed" | "intense" | "layered";

export type AuraColorProfile = {
  key: AuraChakraKey;
  name: string;
  hue: string;
};

export type AuraComputedResult = {
  overallState: AuraOverallState;
  overallScores: ChakraStateScores;
  chakras: AuraChakraResult[];
  primaryChakras: AuraChakraResult[];
  strengthChakra?: AuraChakraResult;
  mainAura: AuraColorProfile;
  subAura: AuraColorProfile;
  auraTone: AuraColorTone;
  stateBadge: string;
  summary: string;
  interpretation: string;
  flowMessage: string;
  closing: string;
};
