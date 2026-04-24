"use client";

import { useSyncExternalStore } from "react";

export type Language = "ko" | "en";

type LanguageState = {
  language: Language;
};

const STORAGE_KEY = "lumora-language-store";

const initialState: LanguageState = {
  language: "ko",
};

let state: LanguageState = initialState;
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

export function setLanguage(language: Language) {
  state = { language };
  persistState();
  if (typeof document !== "undefined") {
    document.cookie = `lumora_lang=${language}; path=/; max-age=31536000`;
  }
  emitChange();
}

export function hydrateLanguageStore() {
  if (typeof window === "undefined") {
    return;
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);
  if (!savedState) {
    return;
  }

  try {
    state = JSON.parse(savedState) as LanguageState;
  } catch {
    state = initialState;
  }

  emitChange();
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

export function useLanguageStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
