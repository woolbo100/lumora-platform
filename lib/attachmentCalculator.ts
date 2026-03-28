import { attachmentResults } from "@/data/attachmentResults";
import {
  type AttachmentAnswerMap,
  type AttachmentOption,
  type AttachmentResult,
  type AttachmentScoreMap,
  type AttachmentType,
} from "@/types/attachment";

export const createEmptyAttachmentScores = (): AttachmentScoreMap => ({
  secure: 0,
  anxious: 0,
  avoidant: 0,
  fearful: 0,
});

export function calculateAttachmentScores(
  answers: AttachmentAnswerMap,
): AttachmentScoreMap {
  return Object.values(answers).reduce((scores, option) => {
    scores[option.type] += option.score;
    return scores;
  }, createEmptyAttachmentScores());
}

export function determineAttachmentType(scores: AttachmentScoreMap): AttachmentType {
  // Tie-breaker: when scores are equal, prefer the less stable pattern first
  // so mixed/high-conflict signals are surfaced before more regulated patterns.
  const priority: AttachmentType[] = ["fearful", "anxious", "avoidant", "secure"];

  return (Object.entries(scores) as [AttachmentType, number][])
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return priority.indexOf(a[0]) - priority.indexOf(b[0]);
    })[0][0];
}

export function getAttachmentResultByType(type: AttachmentType): AttachmentResult {
  const result = attachmentResults.find((item) => item.code === type);

  if (!result) {
    return attachmentResults[0];
  }

  return result;
}

export function calculateAttachmentResult(answers: AttachmentAnswerMap): {
  scores: AttachmentScoreMap;
  topType: AttachmentType;
  result: AttachmentResult;
} {
  const scores = calculateAttachmentScores(answers);
  const topType = determineAttachmentType(scores);

  return {
    scores,
    topType,
    result: getAttachmentResultByType(topType),
  };
}

export function isAttachmentQuestionAnswered(
  answers: AttachmentAnswerMap,
  questionId: number,
): boolean {
  return Boolean(answers[questionId]);
}

export function getSelectedAttachmentOption(
  answers: AttachmentAnswerMap,
  questionId: number,
): AttachmentOption | undefined {
  return answers[questionId];
}
