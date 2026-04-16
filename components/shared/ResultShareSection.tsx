"use client";

import { useState } from "react";
import { CTAButton } from "./CTAButton";

type ResultShareSectionProps = {
  shareTitle: string;
  results: Record<string, string>;
  description?: string;
  testUrl: string;
  hubUrl: string;
  className?: string;
};

export function ResultShareSection({
  shareTitle,
  results,
  description,
  testUrl,
  hubUrl,
  className = "",
}: ResultShareSectionProps) {
  const [copiedStatus, setCopiedStatus] = useState<"none" | "main" | "sub">("none");

  const formatShareText = () => {
    const resultLines = Object.entries(results)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    return `${shareTitle}\n\n${resultLines}${description ? `\n\n${description}` : ""}\n\n👇 나도 해봤는데 꽤 정확함\n${testUrl}`;
  };

  const handleCopy = async (type: "main" | "sub") => {
    try {
      const textToCopy = type === "main" ? formatShareText() : hubUrl;
      await navigator.clipboard.writeText(textToCopy);
      
      setCopiedStatus(type);
      setTimeout(() => setCopiedStatus("none"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={`mt-12 flex flex-col items-center gap-3 ${className}`}>
      <button
        onClick={() => handleCopy("main")}
        className="aurora-hover-surface aurora-hover-strong relative z-20 inline-flex min-h-12 w-full max-w-[280px] items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold tracking-[0.16em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] hover:brightness-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/70"
      >
        {copiedStatus === "main" ? "결과가 복사되었습니다! ✨" : "내 결과 공유하기"}
      </button>

      <button
        onClick={() => handleCopy("sub")}
        className="relative z-20 inline-flex min-h-12 w-full max-w-[280px] items-center justify-center rounded-full border border-[var(--color-secondary)]/30 bg-transparent px-6 py-3 text-sm font-semibold tracking-[0.16em] text-[var(--color-secondary)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/50 hover:bg-[var(--color-secondary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/70"
      >
        {copiedStatus === "sub" ? "링크가 복사되었습니다! 🔗" : "이 테스트 추천하기"}
      </button>
      
      <p className="mt-2 text-xs text-[var(--foreground-soft)] opacity-50">
        결과를 복사해 친구들에게 공유해보세요
      </p>
    </div>
  );
}
