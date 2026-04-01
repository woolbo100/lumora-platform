import { chakraAuraMap, chakraFocus, chakraLabels, closingMessage, overallStateBadgeMap, overallSummaryMap } from "@/lib/auraMapping";
import {
  type AuraAnswers,
  type AuraChakraKey,
  type AuraChakraResult,
  type AuraChakraResultState,
  type AuraComputedResult,
  type AuraOverallState,
  type ChakraStateScores,
} from "@/types/auraCode";
import { auraQuestions } from "@/data/auraQuestions";

const chakraOrder: AuraChakraKey[] = ["root", "sacral", "solar", "heart", "throat", "thirdEye", "crown"];

function emptyScores(): ChakraStateScores {
  return {
    blocked: 0,
    overactive: 0,
    balanced: 0,
  };
}

function resolveChakraState(scores: ChakraStateScores): AuraChakraResultState {
  if (scores.blocked > scores.balanced && scores.overactive > scores.balanced) {
    return "mixed";
  }

  if (scores.blocked > scores.overactive && scores.blocked > scores.balanced) {
    return "blocked";
  }

  if (scores.overactive > scores.blocked && scores.overactive > scores.balanced) {
    return "overactive";
  }

  return "balanced";
}

function resolveOverallState(scores: ChakraStateScores): AuraOverallState {
  if (scores.blocked > scores.balanced && scores.overactive > scores.balanced) {
    return "mixed";
  }

  if (scores.blocked > scores.overactive && scores.blocked > scores.balanced) {
    return "blocked-dominant";
  }

  if (scores.overactive > scores.blocked && scores.overactive > scores.balanced) {
    return "overactive-dominant";
  }

  if (scores.balanced >= scores.blocked && scores.balanced >= scores.overactive) {
    return "balanced-dominant";
  }

  return "mixed";
}

function chakraIntensity(result: AuraChakraResult): number {
  return Math.max(result.scores.blocked, result.scores.overactive);
}

function compareByIntensity(a: AuraChakraResult, b: AuraChakraResult): number {
  const intensityDiff = chakraIntensity(b) - chakraIntensity(a);
  if (intensityDiff !== 0) {
    return intensityDiff;
  }

  return chakraOrder.indexOf(a.chakra) - chakraOrder.indexOf(b.chakra);
}

export function calculateAuraResult(answers: AuraAnswers): AuraComputedResult {
  const chakraScores = Object.fromEntries(
    chakraOrder.map((chakra) => [chakra, emptyScores()]),
  ) as Record<AuraChakraKey, ChakraStateScores>;

  for (const question of auraQuestions) {
    const value = answers[question.id] ?? 0;
    chakraScores[question.chakra][question.state] += value;
  }

  const chakras: AuraChakraResult[] = chakraOrder.map((chakra) => ({
    chakra,
    scores: chakraScores[chakra],
    state: resolveChakraState(chakraScores[chakra]),
  }));

  const overallScores = chakras.reduce(
    (acc, chakra) => ({
      blocked: acc.blocked + chakra.scores.blocked,
      overactive: acc.overactive + chakra.scores.overactive,
      balanced: acc.balanced + chakra.scores.balanced,
    }),
    emptyScores(),
  );

  const overallState = resolveOverallState(overallScores);

  const primaryChakras = [...chakras]
    .filter((chakra) => chakra.state !== "balanced")
    .sort(compareByIntensity)
    .slice(0, 2);

  const fallbackPrimaryChakras = [...chakras]
    .sort(compareByIntensity)
    .slice(0, 2);

  const resolvedPrimaryChakras =
    primaryChakras.length > 0 ? primaryChakras : fallbackPrimaryChakras;

  const strengthChakra = [...chakras]
    .sort((a, b) => {
      const diff = b.scores.balanced - a.scores.balanced;
      if (diff !== 0) {
        return diff;
      }

      return chakraOrder.indexOf(a.chakra) - chakraOrder.indexOf(b.chakra);
    })[0];

  const mainAura = chakraAuraMap[resolvedPrimaryChakras[0].chakra];
  const subAura = chakraAuraMap[(resolvedPrimaryChakras[1] ?? strengthChakra).chakra];

  const auraTone =
    overallState === "balanced-dominant"
      ? "clear"
      : overallState === "blocked-dominant"
        ? "condensed"
        : overallState === "overactive-dominant"
          ? "intense"
          : "layered";

  const interpretation = `지금의 오라는 ${mainAura.hue}을 중심으로, ${subAura.hue}의 결이 함께 스며드는 흐름에 가깝습니다. 특히 ${chakraLabels[resolvedPrimaryChakras[0].chakra]}와 ${chakraLabels[(resolvedPrimaryChakras[1] ?? strengthChakra).chakra]}에서 현재의 움직임이 비교적 선명하게 감지됩니다. 이 리딩은 좋고 나쁨의 판정이 아니라, 지금의 당신이 어떤 방식으로 에너지를 지키고 드러내는지를 섬세하게 비춰보는 해석에 가깝습니다.`;

  const flowMessage =
    strengthChakra.scores.balanced > 0
      ? `${chakraLabels[strengthChakra.chakra]}는 지금의 당신 안에서 비교적 안정적인 힘으로 작용하고 있습니다. ${chakraFocus[strengthChakra.chakra]} 쪽의 감각이 중심을 잡아주고 있어, 흔들림 속에서도 완전히 무너지지 않도록 결을 지지해주는 흐름이 남아 있습니다.`
      : "아직 뚜렷한 강점 차크라가 선명하게 드러난 상태는 아니지만, 이런 시기일수록 작은 안정감 하나가 전체 흐름을 다시 바꿔놓을 수 있습니다.";

  return {
    overallState,
    overallScores,
    chakras,
    primaryChakras: resolvedPrimaryChakras,
    strengthChakra: strengthChakra.scores.balanced > 0 ? strengthChakra : undefined,
    mainAura,
    subAura,
    auraTone,
    stateBadge: overallStateBadgeMap[overallState],
    summary: overallSummaryMap[overallState],
    interpretation,
    flowMessage,
    closing: closingMessage,
  };
}

export function createAuraFallbackResult(): AuraComputedResult {
  return calculateAuraResult({});
}
