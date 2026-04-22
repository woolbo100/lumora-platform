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
    
    if (typeof window !== "undefined") {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          if (kakaoKey) {
            window.Kakao.init(kakaoKey);
            console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
          } else {
            console.warn("Kakao JS Key is missing in environment variables.");
          }
        }
      } else {
        console.warn("Kakao SDK not found on window object.");
      }
    }
  }, []);

  return null;
}
