"use client";

import { useSyncExternalStore } from "react";
import { calculateAttachmentResult, createEmptyAttachmentScores } from "@/lib/attachmentCalculator";
import {
  type AttachmentAnswerMap,
  type AttachmentOption,
  type AttachmentScoreMap,
  type AttachmentType,
} from "@/types/attachment";

type AttachmentCodeState = {
  currentIndex: number;
  answers: AttachmentAnswerMap;
  scores: AttachmentScoreMap;
  resultType: AttachmentType | null;
  completed: boolean;
};

const STORAGE_KEY = "lumora-attachment-code-store";

const initialState: AttachmentCodeState = {
  currentIndex: 0,
  answers: {},
  scores: createEmptyAttachmentScores(),
  resultType: null,
  completed: false,
};

let state: AttachmentCodeState = initialState;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function persistState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(nextState: AttachmentCodeState) {
  state = nextState;
  persistState();
  emitChange();
}

export function hydrateAttachmentCodeStore() {
  if (typeof window === "undefined") {
    return;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return;
  }

  try {
    state = JSON.parse(savedState) as AttachmentCodeState;
  } catch {
    state = initialState;
  }

  emitChange();
}

export function resetAttachmentCodeStore() {
  setState(initialState);
}

export function selectAttachmentOption(
  questionId: number,
  option: AttachmentOption,
  totalQuestions: number,
) {
  const nextAnswers = {
    ...state.answers,
    [questionId]: option,
  };
  const nextResult = calculateAttachmentResult(nextAnswers);
  const nextIndex = Math.min(state.currentIndex + 1, totalQuestions);
  const completed = Object.keys(nextAnswers).length >= totalQuestions;

  setState({
    currentIndex: nextIndex,
    answers: nextAnswers,
    scores: nextResult.scores,
    resultType: completed ? nextResult.topType : null,
    completed,
  });
}

export function moveToPreviousAttachmentQuestion() {
  setState({
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0),
  });
}

export function markAttachmentResultViewed(type: AttachmentType) {
  setState({
    ...state,
    resultType: type,
    completed: true,
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

export function useAttachmentCodeStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
