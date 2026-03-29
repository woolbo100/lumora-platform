import { attractionResults } from "@/data/attractionResults";
import {
  type AttractionAnswerMap,
  type AttractionOption,
  type AttractionResult,
  type AttractionScoreMap,
  type AttractionType,
} from "@/types/attraction";

export const createEmptyAttractionScores = (): AttractionScoreMap => ({
  elegant: 0,
  lovely: 0,
  chic: 0,
  warm: 0,
  mystic: 0,
});

export function calculateAttractionScores(
  answers: AttractionAnswerMap,
): AttractionScoreMap {
  return Object.values(answers).reduce((scores, option) => {
    scores[option.type] += option.score;
    return scores;
  }, createEmptyAttractionScores());
}

export function determineAttractionType(
  scores: AttractionScoreMap,
): AttractionType {
  // 동점일 때는 더 또렷한 인상을 남기는 유형을 우선으로 보여줍니다.
  const priority: AttractionType[] = [
    "mystic",
    "chic",
    "elegant",
    "lovely",
    "warm",
  ];

  return (Object.entries(scores) as [AttractionType, number][])
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return priority.indexOf(a[0]) - priority.indexOf(b[0]);
    })[0][0];
}

export function getAttractionResultByType(
  type: AttractionType,
): AttractionResult {
  const result = attractionResults.find((item) => item.code === type);

  if (!result) {
    return attractionResults[0];
  }

  return result;
}

export function calculateAttractionResult(answers: AttractionAnswerMap): {
  scores: AttractionScoreMap;
  topType: AttractionType;
  result: AttractionResult;
} {
  const scores = calculateAttractionScores(answers);
  const topType = determineAttractionType(scores);

  return {
    scores,
    topType,
    result: getAttractionResultByType(topType),
  };
}

export function getSelectedAttractionOption(
  answers: AttractionAnswerMap,
  questionId: number,
): AttractionOption | undefined {
  return answers[questionId];
}
