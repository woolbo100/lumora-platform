"use client";

import { type SharedSajuAnalysis } from "@/types/analysis";

const ANALYSIS_KEY_PREFIX = "lumora:saju-analysis:";

function getAnalysisKey(id: string) {
  return `${ANALYSIS_KEY_PREFIX}${id}`;
}

export function saveAnalysisToSessionStorage(analysis: SharedSajuAnalysis) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(getAnalysisKey(analysis.id), JSON.stringify(analysis));
}

export function getAnalysisFromSessionStorage(id: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(getAnalysisKey(id));
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SharedSajuAnalysis;
  } catch {
    window.sessionStorage.removeItem(getAnalysisKey(id));
    return null;
  }
}
