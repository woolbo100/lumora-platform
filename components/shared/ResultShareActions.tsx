"use client";

import { useState } from "react";
import Link from "next/link";

interface ResultShareActionsProps {
  resultTitle: string;
  resultSummary: string;
  resultUrl: string;
  hubUrl: string;
  otherTestsUrl?: string; // default to /services
  testName: string;
}

export function ResultShareActions({
  resultTitle,
  resultSummary,
  resultUrl,
  hubUrl,
  otherTestsUrl = "/services",
  testName,
}: ResultShareActionsProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleShareResult = async () => {
    const title = `[루모라] ${testName} 결과 공유`;
    const text = `내 결과는 "${resultTitle}"이야.\n한 줄 해석: ${resultSummary}\n너도 한번 확인해봐.\n\n${resultUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: resultUrl,
        });
        showToast("내 결과를 공유했어요 ✨");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(text, "내 결과 링크를 복사했어요 🔗");
        }
      }
    } else {
      copyToClipboard(text, "내 결과 링크를 복사했어요 🔗");
    }
  };

  const handleRecommendTest = async () => {
    const title = `[루모라] ${testName} 추천`;
    const text = `이 테스트 재밌어. 너도 해봐.\n결과 해석도 꽤 잘 나와.\n\n${hubUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: hubUrl,
        });
        showToast("테스트를 추천했어요 💫");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(text, "테스트 링크를 복사했어요 🔗");
        }
      }
    } else {
      copyToClipboard(text, "테스트 링크를 복사했어요 🔗");
    }
  };

  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch (err) {
      console.error("복사 실패:", err);
      showToast("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative mt-8 flex flex-col items-center gap-4 w-full max-w-md mx-auto px-4">
      {/* 1순위: 내 결과 공유하기 */}
      <button
        onClick={handleShareResult}
        className="aurora-hover-surface aurora-hover-strong relative z-20 flex min-h-[56px] w-full items-center justify-center rounded-[24px] border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-bold tracking-[0.05em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.28),0_0_20px_rgba(214,194,255,0.12)] transition duration-300 hover:-translate-y-1 hover:brightness-105 active:scale-95"
      >
        내 결과 공유하기
      </button>

      {/* 2순위: 이 테스트 추천하기 */}
      <button
        onClick={handleRecommendTest}
        className="aurora-hover-surface aurora-hover-soft relative z-20 flex min-h-[52px] w-full items-center justify-center rounded-[24px] border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-semibold tracking-[0.05em] text-white/90 transition duration-300 hover:-translate-y-1 hover:bg-white/10 active:scale-95"
      >
        이 테스트 추천하기
      </button>

      {/* 3순위: 다른 테스트 보러가기 */}
      <Link
        href={otherTestsUrl}
        className="relative z-20 mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-white/50 transition-all hover:text-white/95 hover:scale-[1.02] active:scale-[0.98]"
      >
        다른 테스트 보러가기
      </Link>

      {/* 보조 문구 (필요시 활성화) */}
      <p className="mt-2 text-center text-xs leading-relaxed text-white/30">
        결과를 친구에게 공유하고 함께 이야기를 나눠보세요
      </p>

      {/* 토스트 메시지 */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 z-[100] animate-toast-in">
          <div className="flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-6 py-3 text-sm font-medium text-white shadow-2xl">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
