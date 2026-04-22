"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
    isKakaoInitialized: boolean;
    kakaoInitError: string | null;
  }
}

export default function KakaoInit() {
  useEffect(() => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    
    if (!kakaoKey) {
      console.error("Kakao JS Key is missing! Please set NEXT_PUBLIC_KAKAO_JS_KEY in your environment variables.");
      window.kakaoInitError = "JS 키 누락";
      window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: "키 누락" }));
      return;
    }

    let retryCount = 0;
    const maxRetries = 30; // 30 * 500ms = 15 seconds

    const initKakao = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        try {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
          }
          console.log("Kakao SDK Status: Initialized successfully");
          window.isKakaoInitialized = true;
          window.dispatchEvent(new CustomEvent("kakao-init-complete"));
          return true;
        } catch (err) {
          console.error("Kakao initialization error:", err);
          window.kakaoInitError = (err as Error).message;
          window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: (err as Error).message }));
          return true; // Stop retrying on actual error
        }
      }
      return false;
    };

    // 즉시 시도
    if (!initKakao()) {
      const interval = setInterval(() => {
        retryCount++;
        if (initKakao() || retryCount >= maxRetries) {
          clearInterval(interval);
          if (retryCount >= maxRetries && !window.isKakaoInitialized) {
            console.error("Kakao SDK failed to load within 15s. Check for ad-blockers or network issues.");
            window.kakaoInitError = "로딩 시간 초과";
            window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: "시간 초과" }));
          }
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  return null;
}
