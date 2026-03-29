import { reunionResults } from "@/data/reunionResults";
import {
  type ReunionAnswerMap,
  type ReunionOption,
  type ReunionResult,
  type ReunionScoreMap,
  type ReunionType,
} from "@/types/reunion";

export const createEmptyReunionScores = (): ReunionScoreMap => ({
  high: 0,
  cautious: 0,
  closure: 0,
  newflow: 0,
});

export function calculateReunionScores(
  answers: ReunionAnswerMap,
): ReunionScoreMap {
  return Object.values(answers).reduce((scores, option) => {
    scores[option.type] += option.score;
    return scores;
  }, createEmptyReunionScores());
}

export function determineReunionType(scores: ReunionScoreMap): ReunionType {
  // 동점일 때는 더 현실적이고 보수적인 해석을 우선합니다.
  // 재회 서비스 특성상 과도한 희망 해석을 피하기 위한 규칙입니다.
  const priority: ReunionType[] = ["closure", "cautious", "high", "newflow"];

  return (Object.entries(scores) as [ReunionType, number][])
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return priority.indexOf(a[0]) - priority.indexOf(b[0]);
    })[0][0];
}

export function getReunionResultByType(type: ReunionType): ReunionResult {
  const result = reunionResults.find((item) => item.code === type);

  if (!result) {
    return reunionResults[0];
  }

  return result;
}

export function calculateReunionResult(answers: ReunionAnswerMap): {
  scores: ReunionScoreMap;
  topType: ReunionType;
  result: ReunionResult;
} {
  const scores = calculateReunionScores(answers);
  const topType = determineReunionType(scores);

  return {
    scores,
    topType,
    result: getReunionResultByType(topType),
  };
}

export function getSelectedReunionOption(
  answers: ReunionAnswerMap,
  questionId: number,
): ReunionOption | undefined {
  return answers[questionId];
}
