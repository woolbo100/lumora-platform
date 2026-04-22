"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ResultShareActionsProps {
  resultTitle: string;
  resultSummary: string;
  resultUrl?: string; // If not provided, will use current URL
  hubUrl: string;
  otherTestsUrl?: string; // default to /services
  testName: string;
}

export function ResultShareActions({
  resultTitle,
  resultSummary,
  resultUrl: initialResultUrl,
  hubUrl,
  otherTestsUrl = "/services",
  testName,
}: ResultShareActionsProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const effectiveResultUrl = initialResultUrl || currentUrl;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleShareResult = async () => {
    const title = `[루모라] ${testName} 결과 공유`;
    const text = `내 결과는 "${resultTitle}"이야.\n한 줄 해석: ${resultSummary}\n너도 한번 확인해봐.\n\n${effectiveResultUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: effectiveResultUrl,
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
    const absoluteHubUrl = hubUrl.startsWith("http") 
      ? hubUrl 
      : `${window.location.origin}${hubUrl}`;
      
    const title = `[루모라] ${testName} 추천`;
    const text = `이 테스트 재밌어. 너도 해봐.\n결과 해석도 꽤 잘 나와.\n\n${absoluteHubUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: absoluteHubUrl,
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

  const handleKakaoShare = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `[루모라] ${testName} 결과 공유`,
          description: `내 결과: ${resultTitle}\n${resultSummary}`,
          imageUrl: "https://www.lumoracode.kr/images/share/lovecode.jpg",
          link: {
            mobileWebUrl: effectiveResultUrl,
            webUrl: effectiveResultUrl,
          },
        },
        buttons: [
          {
            title: "결과 보러가기",
            link: {
              mobileWebUrl: effectiveResultUrl,
              webUrl: effectiveResultUrl,
            },
          },
        ],
      });
    } else {
      showToast("카카오톡 SDK를 로드 중입니다. 잠시 후 다시 시도해주세요.");
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
    <div className="relative mt-12 flex flex-col items-center gap-4 w-full max-w-md mx-auto px-4 pb-8">
      {/* 1순위: 카카오톡 공유하기 */}
      <button
        onClick={handleKakaoShare}
        className="aurora-hover-surface relative z-20 flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-[24px] border border-[#FEE500]/30 bg-[#FEE500] px-8 py-4 text-base font-bold tracking-[0.05em] text-[#191919] shadow-[0_12px_28px_rgba(254,229,0,0.2)] transition duration-300 hover:-translate-y-1 hover:brightness-105 active:scale-[0.98]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.029 3 3 6.128 3 9.986C3 12.482 4.603 14.68 7.032 15.932L6.012 19.673C5.928 19.981 6.282 20.218 6.541 20.046L11.002 17.075C11.33 17.108 11.662 17.126 12 17.126C16.971 17.126 21 13.998 21 10.14C21 6.282 16.971 3 12 3Z" fill="#191919"/>
        </svg>
        카카오톡 공유하기
      </button>

      {/* 2순위: 내 결과 공유하기 (시스템 공유 / 링크 복사) */}
      <button
        onClick={handleShareResult}
        className="aurora-hover-surface aurora-hover-strong relative z-20 flex min-h-[58px] w-full items-center justify-center rounded-[24px] border border-[rgba(229,218,255,0.6)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-4 text-base font-bold tracking-[0.05em] text-[#1c1830] shadow-[0_12px_28px_rgba(115,88,232,0.3),0_0_20px_rgba(214,194,255,0.15)] transition duration-300 hover:-translate-y-1 hover:brightness-110 active:scale-[0.98]"
      >
        링크로 공유하기
      </button>

      {/* 3순위: 이 테스트 추천하기 */}
      <button
        onClick={handleRecommendTest}
        className="aurora-hover-surface aurora-hover-soft relative z-20 flex min-h-[54px] w-full items-center justify-center rounded-[24px] border border-white/25 bg-white/10 backdrop-blur-md px-8 py-4 text-base font-semibold tracking-[0.05em] text-white/95 transition duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-[0.98]"
      >
        이 테스트 추천하기
      </button>

      {/* 3순위: 다른 테스트 보러가기 */}
      <Link
        href={otherTestsUrl}
        className="relative z-20 mt-2 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white/50 no-underline transition-all hover:text-white/90 hover:brightness-125"
      >
        다른 테스트 보러가기
      </Link>

      {/* 토스트 메시지 */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 z-[100] -translate-x-1/2 animate-toast-in">
          <div className="flex items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-2xl px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] whitespace-nowrap">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

