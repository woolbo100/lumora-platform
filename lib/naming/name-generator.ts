import { analyzeSaju } from "@/lib/saju-engine";
import { buildNamingDirection } from "@/lib/naming/build-naming-direction";
import { NAME_DATASET } from "@/lib/naming/name-dataset";
import { scoreNameCandidate } from "@/lib/naming/name-scorer";
import {
  type ElementType,
  type NamingCandidate,
  type NamingResult,
  type NamingStyle,
  type NamingValidationResult,
  type SajuNamingInput,
} from "@/types/naming";

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
  const gender = input.gender;
  const birthDate = String(input.birth_date ?? "").trim();
  const birthTime = String(input.birth_time ?? "").trim();
  const purpose = input.purpose;
  const currentName = String(input.current_name ?? "").trim();
  const preferredStyleRaw = String(input.preferred_style ?? "").trim();

  if (gender !== "male" && gender !== "female") {
    errors.push("성별을 선택해 주세요.");
  }

  if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(birthDate)) {
    errors.push("생년월일 형식은 YYYY-MM-DD 이어야 합니다.");
  }

  if (!/^(\d{2}):(\d{2})$/.test(birthTime)) {
    errors.push("태어난 시간 형식은 HH:MM 이어야 합니다.");
  }

  if (!["wealth", "love", "brand", "healing"].includes(purpose ?? "")) {
    errors.push("목적을 선택해 주세요.");
  }

  if (preferredStyleRaw && !isNamingStyle(preferredStyleRaw)) {
    errors.push("선호 스타일 값이 올바르지 않습니다.");
  }

  if (errors.length > 0 || gender == null || purpose == null) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      gender,
      birth_date: birthDate,
      birth_time: birthTime,
      purpose,
      current_name: currentName || undefined,
      preferred_style: isNamingStyle(preferredStyleRaw) ? preferredStyleRaw : undefined,
    },
  };
}

function uniqueElements(elements: ElementType[]) {
  return [...new Set(elements)];
}

function extractLackingElements(result: ReturnType<typeof analyzeSaju>): ElementType[] {
  const missing = result.interp.ohaeng_analysis.details
    .filter((detail) => detail.status === "missing")
    .map((detail) => detail.element);

  if (missing.length > 0) {
    return uniqueElements(missing);
  }

  const minCount = Math.min(...Object.values(result.ohaeng));
  return uniqueElements(
    (Object.entries(result.ohaeng) as [ElementType, number][])
      .filter(([, count]) => count === minCount)
      .map(([element]) => element),
  );
}

function extractDominantElements(result: ReturnType<typeof analyzeSaju>): ElementType[] {
  const excess = result.interp.ohaeng_analysis.details
    .filter((detail) => detail.status === "excess")
    .map((detail) => detail.element);

  if (excess.length > 0) {
    return uniqueElements(excess);
  }

  const maxCount = Math.max(...Object.values(result.ohaeng));
  return uniqueElements(
    (Object.entries(result.ohaeng) as [ElementType, number][])
      .filter(([, count]) => count === maxCount)
      .map(([element]) => element),
  );
}

function filterDatasetByGender(dataset: NamingCandidate[], gender: SajuNamingInput["gender"]) {
  return dataset.filter((candidate) => candidate.gender === "neutral" || candidate.gender === gender);
}

function buildSajuSummary(
  sajuResult: ReturnType<typeof analyzeSaju>,
  lackingElements: ElementType[],
  purposeText: string,
) {
  const lackingText = lackingElements.length > 0 ? lackingElements.join(", ") : "균형 보완";

  return `${sajuResult.interp.core} ${sajuResult.interp.personality_deep} 현재 구조에서는 ${lackingText} 기운 보완이 중요하며, 이번 이름설계는 ${purposeText}에 맞는 방향으로 에너지를 정리하는 데 초점을 둡니다.`;
}

function buildPremiumPreview(result: ReturnType<typeof analyzeSaju>, purposeLabel: string) {
  return `프리미엄 리포트에서는 ${purposeLabel}을 기준으로 이름이 바꾸는 인생 방향, ${result.interp.wealth_strategy}, ${result.interp.love_romance}, ${result.interp.social_analysis}까지 더 깊게 연결해 보여드립니다.`;
}

export function generateNamingResult(input: SajuNamingInput): NamingResult {
  // Adapter boundary: naming rides on top of the existing saju engine without
  // changing the original result structure.
  const sajuResult = analyzeSaju({
    name: input.current_name?.trim() || "이름설계 사용자",
    gender: input.gender,
    birth_date: input.birth_date,
    birth_time: input.birth_time,
    mode: "no-ai",
  });

  const lackingElements = extractLackingElements(sajuResult);
  const dominantElements = extractDominantElements(sajuResult);
  const direction = buildNamingDirection(lackingElements, input.purpose);
  const purposeLabelMap = {
    wealth: "돈 / 사업 / 수익 흐름",
    love: "연애 / 매력 / 인간관계",
    brand: "브랜드 / SNS / 영향력",
    healing: "힐링 / 자기성장 / 안정",
  } as const;

  const candidates = filterDatasetByGender(NAME_DATASET, input.gender)
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

  const recommendations = candidates.length >= 3 ? candidates : filterDatasetByGender(NAME_DATASET, input.gender)
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
    sajuSummary: buildSajuSummary(sajuResult, lackingElements, purposeLabelMap[input.purpose]),
    dominantElements,
    lackingElements,
    purpose: input.purpose,
    namingDirection: direction.text,
    recommendations,
    premiumPreview: buildPremiumPreview(sajuResult, purposeLabelMap[input.purpose]),
    sajuResult,
  };
}
