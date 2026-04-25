import { buildNamingDirection } from "@/lib/naming/build-naming-direction";
import { NAME_DATASET } from "@/lib/naming/name-dataset";
import { scoreNameCandidate } from "@/lib/naming/name-scorer";
import { requireSharedSajuAnalysis } from "@/lib/analysis/shared-analysis";
import {
  type ElementType,
  type NamingCandidate,
  type NamingResult,
  type NamingStyle,
  type NamingValidationResult,
  type SajuNamingInput,
} from "@/types/naming";
import { type SharedSajuAnalysis } from "@/types/analysis";

function isNamingStyle(value: string | undefined): value is NamingStyle {
  return [
    "soft",
    "elegant",
    "bright",
    "strong",
    "luxurious",
    "modern",
    "neutral",
    "calm",
  ].includes(value ?? "");
}

export function validateNamingInput(input: Partial<SajuNamingInput>): NamingValidationResult {
  const errors: string[] = [];
  const analysisId = String(input.analysis_id ?? "").trim();
  const purpose = input.purpose;
  const currentName = String(input.current_name ?? "").trim();
  const preferredStyleRaw = String(input.preferred_style ?? "").trim();

  if (!analysisId) {
    errors.push("사주 분석 id가 필요합니다.");
  }

  if (!["wealth", "love", "brand", "healing"].includes(purpose ?? "")) {
    errors.push("이름설계 목적을 선택해주세요.");
  }

  if (preferredStyleRaw && !isNamingStyle(preferredStyleRaw)) {
    errors.push("선호 스타일 값을 다시 확인해주세요.");
  }

  if (errors.length > 0 || purpose == null) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      analysis_id: analysisId,
      purpose,
      current_name: currentName || undefined,
      preferred_style: isNamingStyle(preferredStyleRaw) ? preferredStyleRaw : undefined,
    },
  };
}

function filterDatasetByGender(dataset: NamingCandidate[], gender: SharedSajuAnalysis["saju"]["profile"]["gender"]) {
  return dataset.filter((candidate) => candidate.gender === "neutral" || candidate.gender === gender);
}

function buildSajuSummary(
  analysis: SharedSajuAnalysis,
  lackingElements: ElementType[],
  purposeText: string,
) {
  const lackingText = lackingElements.length > 0 ? lackingElements.join(", ") : "균형 보완";

  return `${analysis.saju.interp.core} ${analysis.saju.interp.personality_deep} 현재 구조에서는 ${lackingText} 기운 보완이 중요하며, 이번 이름설계는 ${purposeText}에 맞는 방향으로 에너지를 정리하는 데 초점을 둡니다.`;
}

function buildPremiumPreview(analysis: SharedSajuAnalysis, purposeLabel: string) {
  return `프리미엄 리포트에서는 ${purposeLabel}을 기준으로 이름이 인생 방향과 어떻게 맞물리는지, ${analysis.saju.interp.wealth_strategy}, ${analysis.saju.interp.love_romance}, ${analysis.saju.interp.social_analysis}까지 더 깊게 연결해 보여드립니다.`;
}

export function generateNamingResultFromAnalysis(
  analysis: SharedSajuAnalysis,
  input: SajuNamingInput,
): NamingResult {
  const lackingElements = analysis.lackingElements;
  const dominantElements = analysis.dominantElements;
  const direction = buildNamingDirection(lackingElements, input.purpose);
  const purposeLabelMap = {
    wealth: "재물과 일의 흐름",
    love: "관계와 매력의 방향",
    brand: "브랜드와 존재감의 결",
    healing: "회복과 자기성장의 흐름",
  } as const;

  const candidates = filterDatasetByGender(NAME_DATASET, analysis.saju.profile.gender)
    .map((candidate) => {
      const { score, reasonTags } = scoreNameCandidate(candidate, {
        lackingElements,
        dominantElements,
        purpose: input.purpose,
        preferredStyle: input.preferred_style,
      });

      return {
        ...candidate,
        score,
        reasonTags,
      };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "ko"))
    .slice(0, 5);

  const recommendations =
    candidates.length >= 3
      ? candidates
      : filterDatasetByGender(NAME_DATASET, analysis.saju.profile.gender)
          .map((candidate) => {
            const { score, reasonTags } = scoreNameCandidate(candidate, {
              lackingElements,
              dominantElements: [],
              purpose: input.purpose,
              preferredStyle: input.preferred_style,
            });

            return { ...candidate, score, reasonTags };
          })
          .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "ko"))
          .slice(0, 3);

  return {
    sajuSummary: buildSajuSummary(analysis, lackingElements, purposeLabelMap[input.purpose]),
    dominantElements,
    lackingElements,
    purpose: input.purpose,
    namingDirection: direction.text,
    recommendations,
    premiumPreview: buildPremiumPreview(analysis, purposeLabelMap[input.purpose]),
    analysisId: analysis.id,
    sajuAnalysis: analysis,
  };
}

export function generateNamingResult(input: SajuNamingInput): NamingResult {
  const analysis = requireSharedSajuAnalysis(input.analysis_id);

  if (!analysis) {
    throw new Error("사주 분석 데이터를 찾을 수 없습니다.");
  }

  return generateNamingResultFromAnalysis(analysis, input);
}
