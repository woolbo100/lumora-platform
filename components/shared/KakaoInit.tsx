"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoInit() {
  useEffect(() => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized() && kakaoKey) {
        window.Kakao.init(kakaoKey);
      }
    }
  }, []);

  return null;
}
