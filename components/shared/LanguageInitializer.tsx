"use client";

import { useEffect } from "react";
import { hydrateLanguageStore } from "@/store/languageStore";

export default function LanguageInitializer() {
  useEffect(() => {
    hydrateLanguageStore();
  }, []);

  return null;
}
