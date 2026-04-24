"use client";

import { useRouter } from "next/navigation";
import { useLanguageStore, setLanguage } from "@/store/languageStore";

export function LanguageSwitcher() {
  const { language } = useLanguageStore();
  const router = useRouter();

  const handleSetLanguage = (lang: "ko" | "en") => {
    setLanguage(lang);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
      <button
        onClick={() => handleSetLanguage("ko")}
        className={`px-3 py-1 text-[11px] font-bold tracking-wider rounded-full transition-all duration-300 ${
          language === "ko"
            ? "bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        KR
      </button>
      <div className="w-[1px] h-3 bg-white/10" />
      <button
        onClick={() => handleSetLanguage("en")}
        className={`px-3 py-1 text-[11px] font-bold tracking-wider rounded-full transition-all duration-300 ${
          language === "en"
            ? "bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}
