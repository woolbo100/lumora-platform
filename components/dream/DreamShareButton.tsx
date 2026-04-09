"use client";

import { useState } from "react";

const DREAM_SHARE_URL = "https://www.lumoracode.kr/dream";

export function DreamShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(DREAM_SHARE_URL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-6 py-3 text-sm font-semibold text-[#1c1830] transition hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)]"
    >
      {copied ? "복사 완료" : "공유하기"}
    </button>
  );
}
