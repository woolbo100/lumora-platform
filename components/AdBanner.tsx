"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdBannerProps = {
  className?: string;
  slot?: string;
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ?? "";
const isAdsenseEnabled = adsenseId !== "" && adsenseId !== "나중에_입력";

export function AdBanner({ className, slot = "0000000000" }: AdBannerProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isAdsenseEnabled || pushedRef.current) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ignore runtime ad script errors to keep page rendering stable.
    }
  }, []);

  if (!isAdsenseEnabled) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

