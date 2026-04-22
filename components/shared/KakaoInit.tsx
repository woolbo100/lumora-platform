"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
    isKakaoInitialized: boolean;
  }
}

export default function KakaoInit() {
  useEffect(() => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!kakaoKey) {
      console.warn("Kakao JS Key is missing in environment variables.");
      return;
    }

    let retryCount = 0;
    const maxRetries = 20; // 20 * 500ms = 10 seconds

    const initKakao = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
          console.log("Kakao SDK Initialized successfully");
        }
        window.isKakaoInitialized = true;
        // 알림 이벤트 발생 (다른 컴포넌트에서 감지 가능하도록)
        window.dispatchEvent(new CustomEvent("kakao-init-complete"));
        return true;
      }
      return false;
    };

    // 즉시 시도
    if (!initKakao()) {
      // 로드되지 않았으면 폴링 시작
      const interval = setInterval(() => {
        retryCount++;
        console.log(`Retrying Kakao SDK initialization... (${retryCount}/${maxRetries})`);
        
        if (initKakao() || retryCount >= maxRetries) {
          clearInterval(interval);
          if (retryCount >= maxRetries && !window.isKakaoInitialized) {
            console.error("Kakao SDK failed to load after maximum retries.");
          }
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  return null;
}
