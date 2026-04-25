import { analyzeSaju, validateSajuInput } from "@/lib/saju-engine";
import { getSharedAnalysis, saveSharedAnalysis } from "@/lib/analysis/analysis-store";
import { type SharedSajuAnalysis } from "@/types/analysis";
import { type SajuElement, type SajuFormInput, type SajuResult } from "@/types/saju";

function uniqueElements(elements: SajuElement[]) {
  return [...new Set(elements)];
}

function extractLackingElements(result: SajuResult): SajuElement[] {
  const missing = result.interp.ohaeng_analysis.details
    .filter((detail) => detail.status === "missing")
    .map((detail) => detail.element);

  if (missing.length > 0) {
    return uniqueElements(missing);
  }

  const minCount = Math.min(...Object.values(result.ohaeng));
  return uniqueElements(
    (Object.entries(result.ohaeng) as [SajuElement, number][])
      .filter(([, count]) => count === minCount)
      .map(([element]) => element),
  );
}

function extractDominantElements(result: SajuResult): SajuElement[] {
  const excess = result.interp.ohaeng_analysis.details
    .filter((detail) => detail.status === "excess")
    .map((detail) => detail.element);

  if (excess.length > 0) {
    return uniqueElements(excess);
  }

  const maxCount = Math.max(...Object.values(result.ohaeng));
  return uniqueElements(
    (Object.entries(result.ohaeng) as [SajuElement, number][])
      .filter(([, count]) => count === maxCount)
      .map(([element]) => element),
  );
}

export function createSharedSajuAnalysis(input: Partial<SajuFormInput>) {
  const validated = validateSajuInput(input);
  if (!validated.success) {
    return validated;
  }

  const saju = analyzeSaju(validated.data);
  const analysis: SharedSajuAnalysis = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    saju,
    dominantElements: extractDominantElements(saju),
    lackingElements: extractLackingElements(saju),
  };

  return {
    success: true as const,
    data: saveSharedAnalysis(analysis),
  };
}

export function requireSharedSajuAnalysis(id: string) {
  return getSharedAnalysis(id);
}
