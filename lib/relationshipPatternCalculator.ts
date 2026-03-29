import { relationshipPatternResults } from "@/data/relationshipPatternResults";
import {
  type RelationshipPatternAnswerMap,
  type RelationshipPatternOption,
  type RelationshipPatternResult,
  type RelationshipPatternScoreMap,
  type RelationshipPatternType,
} from "@/types/relationshipPattern";

export const createEmptyRelationshipPatternScores =
  (): RelationshipPatternScoreMap => ({
    immersive: 0,
    sacrificial: 0,
    distant: 0,
    emotional: 0,
    stable: 0,
  });

export function calculateRelationshipPatternScores(
  answers: RelationshipPatternAnswerMap,
): RelationshipPatternScoreMap {
  return Object.values(answers).reduce((scores, option) => {
    scores[option.type] += option.score;
    return scores;
  }, createEmptyRelationshipPatternScores());
}

export function determineRelationshipPatternType(
  scores: RelationshipPatternScoreMap,
): RelationshipPatternType {
  // Tie-breaker:
  // when scores are equal, surface the more emotionally intense pattern first.
  // This helps mixed responses resolve toward the pattern that needs clearer guidance.
  const priority: RelationshipPatternType[] = [
    "emotional",
    "immersive",
    "sacrificial",
    "distant",
    "stable",
  ];

  return (Object.entries(scores) as [RelationshipPatternType, number][])
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return priority.indexOf(a[0]) - priority.indexOf(b[0]);
    })[0][0];
}

export function getRelationshipPatternResultByType(
  type: RelationshipPatternType,
): RelationshipPatternResult {
  const result = relationshipPatternResults.find((item) => item.code === type);

  if (!result) {
    return relationshipPatternResults[0];
  }

  return result;
}

export function calculateRelationshipPatternResult(
  answers: RelationshipPatternAnswerMap,
): {
  scores: RelationshipPatternScoreMap;
  topType: RelationshipPatternType;
  result: RelationshipPatternResult;
} {
  const scores = calculateRelationshipPatternScores(answers);
  const topType = determineRelationshipPatternType(scores);

  return {
    scores,
    topType,
    result: getRelationshipPatternResultByType(topType),
  };
}

export function getSelectedRelationshipPatternOption(
  answers: RelationshipPatternAnswerMap,
  questionId: number,
): RelationshipPatternOption | undefined {
  return answers[questionId];
}
