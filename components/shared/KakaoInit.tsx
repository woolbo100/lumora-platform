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
      console.error("[Kakao] NEXT_PUBLIC_KAKAO_JS_KEY is missing");
      window.kakaoInitError = "키 누락";
      window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: "키 누락" }));
      return;
    }

    const tryInit = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        console.log("[Kakao] window.Kakao detected");
        try {
          if (!window.Kakao.isInitialized()) {
            console.log("[Kakao] init called");
            window.Kakao.init(kakaoKey);
          }
          if (window.Kakao.isInitialized()) {
            console.log("[Kakao] init success");
            console.log("[Kakao] sdkReady true");
            window.isKakaoInitialized = true;
            window.dispatchEvent(new CustomEvent("kakao-init-complete"));
            return true;
          }
        } catch (err) {
          console.error("[Kakao] init failed", err);
          window.kakaoInitError = "초기화 에러";
          window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: "초기화 에러" }));
          return true;
        }
      }
      return false;
    };

    // 1. 이미 로드되어 있는지 확인
    if (tryInit()) return;

    // 2. 스크립트 로드 이벤트 대기
    const handleScriptLoad = () => {
      console.log("[Kakao] script load event received in KakaoInit");
      tryInit();
    };
    window.addEventListener("kakao-script-loaded", handleScriptLoad);

    // 3. 폴링 (보조 수단)
    let retryCount = 0;
    const maxRetries = 10; // 10 * 500ms = 5 seconds
    const interval = setInterval(() => {
      retryCount++;
      if (tryInit() || retryCount >= maxRetries) {
        clearInterval(interval);
        if (retryCount >= maxRetries && !window.isKakaoInitialized) {
          console.error("[Kakao] sdkReady failed (timeout)");
          window.kakaoInitError = "시간 초과";
          window.dispatchEvent(new CustomEvent("kakao-init-failed", { detail: "시간 초과" }));
        }
      }
    }, 500);

    return () => {
      window.removeEventListener("kakao-script-loaded", handleScriptLoad);
      clearInterval(interval);
    };
  }, []);

  return null;
}
