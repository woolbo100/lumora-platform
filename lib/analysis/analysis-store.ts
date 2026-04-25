import { type SharedSajuAnalysis } from "@/types/analysis";

type AnalysisStore = Map<string, SharedSajuAnalysis>;

declare global {
  var __lumoraAnalysisStore__: AnalysisStore | undefined;
}

function getStore() {
  if (!globalThis.__lumoraAnalysisStore__) {
    globalThis.__lumoraAnalysisStore__ = new Map<string, SharedSajuAnalysis>();
  }

  return globalThis.__lumoraAnalysisStore__;
}

export function saveSharedAnalysis(analysis: SharedSajuAnalysis) {
  getStore().set(analysis.id, analysis);
  return analysis;
}

export function getSharedAnalysis(id: string) {
  return getStore().get(id) ?? null;
}
