import {
  type ElementType,
  type NamingCandidate,
  type NamingPurpose,
  type NamingStyle,
} from "@/types/naming";

interface ScoreInput {
  lackingElements: ElementType[];
  dominantElements: ElementType[];
  purpose: NamingPurpose;
  preferredStyle?: NamingStyle;
}

export function scoreNameCandidate(candidate: NamingCandidate, input: ScoreInput) {
  let score = 0;
  const reasonTags: string[] = [];

  for (const element of input.lackingElements) {
    if (candidate.elementTags.includes(element)) {
      score += 4;
      reasonTags.push(`${element} 보완`);
    }
  }

  if (candidate.purposeTags.includes(input.purpose)) {
    score += 3;
    reasonTags.push(`${input.purpose} 목적 적합`);
  }

  if (input.preferredStyle && candidate.styleTags.includes(input.preferredStyle)) {
    score += 2;
    reasonTags.push(`${input.preferredStyle} 스타일 적합`);
  }

  if (candidate.styleTags.includes("luxurious") && input.purpose === "brand") {
    score += 1;
    reasonTags.push("브랜드 고급감");
  }

  if (candidate.styleTags.includes("calm") && input.purpose === "healing") {
    score += 1;
    reasonTags.push("힐링 안정감");
  }

  for (const element of input.dominantElements) {
    if (candidate.elementTags.includes(element)) {
      score -= 1;
      reasonTags.push(`${element} 과다 보정`);
    }
  }

  return { score, reasonTags };
}
