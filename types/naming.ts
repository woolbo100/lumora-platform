import { type SajuElement } from "@/types/saju";

export type ElementType = SajuElement;

export type NameCodeInput = {
  name: string;
  birth_date?: string;
};

export type NameCodeValidationResult =
  | { success: true; data: NameCodeInput }
  | { success: false; errors: string[] };

export type NameCodeDistribution = Record<ElementType, number>;

export type NameCodeComplement = {
  element: ElementType;
  label: string;
  initials: string[];
  message: string;
};

export type NameCodeStyleCard = {
  id: "soft" | "steady" | "lively";
  title: string;
  subtitle: string;
  examples: string[];
  description: string;
};

export type NameCodeResult = {
  name: string;
  birthDate?: string;
  initials: string[];
  elementCounts: NameCodeDistribution;
  dominantElements: ElementType[];
  lackingElements: ElementType[];
  energyFlow: string[];
  complements: NameCodeComplement[];
  styleCards: NameCodeStyleCard[];
  guidanceNote: string;
};
