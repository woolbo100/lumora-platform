import { type SajuElement, type SajuResult } from "@/types/saju";

export type SharedSajuAnalysis = {
  id: string;
  createdAt: string;
  saju: SajuResult;
  dominantElements: SajuElement[];
  lackingElements: SajuElement[];
};
