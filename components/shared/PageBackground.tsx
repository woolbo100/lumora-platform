"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const BG_IMAGES = {
  main: "/images/main/main-background.png",
  bg2: "/images/main/background2.png",
  bg3: "/images/main/background3.png",
  bg4: "/images/main/background4.png",
  bg5: "/images/main/background5.png",
};

export function PageBackground() {
  const pathname = usePathname();
  
  // 현재 경로에 맞는 이미지 결정 로직
  const getTargetImage = (path: string | null) => {
    if (["/aura-code", "/emotion", "/dream"].some(p => path?.startsWith(p))) return BG_IMAGES.bg2;
    if (["/love-code", "/attachment-code", "/relationship-pattern", "/reunion-test"].some(p => path?.startsWith(p))) return BG_IMAGES.bg3;
    if (["/saju", "/naming", "/egen-vs-teto"].some(p => path?.startsWith(p))) return BG_IMAGES.bg4;
    if (["/attraction-code", "/blog"].some(p => path?.startsWith(p))) return BG_IMAGES.bg5;
    return BG_IMAGES.main; // 메인 페이지와 기타 페이지의 기본값으로 main-background 사용
  };

  const targetImage = getTargetImage(pathname);
  
  // 상태 관리: 현재 보이는 이미지와 이전 이미지를 추적
  const [currentImage, setCurrentImage] = useState(targetImage);
  const [prevImage, setPrevImage] = useState(targetImage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (targetImage !== currentImage) {
      setPrevImage(currentImage);
      setCurrentImage(targetImage);
      setIsTransitioning(true);
      
      // 애니메이션 지속 시간 후 트랜지션 상태 해제 (1초)
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [targetImage, currentImage]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 bg-[#0a0514]">
      {/* 1. 이미지 프리로딩 레이어 (숨김 처리) */}
      <div className="hidden">
        {Object.values(BG_IMAGES).map((src) => (
          <Image key={src} src={src} alt="" width={1} height={1} priority />
        ))}
      </div>

      {/* 2. 베이스 오로라 & 글로우 (공통 레이어) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(146,88,244,0.18)_0%,rgba(102,52,188,0.12)_30%,rgba(55,24,106,0.06)_60%,transparent_90%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(184,132,255,0.12)_0%,transparent_50%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(214,164,255,0.1)_0%,transparent_50%)] blur-2xl" />

      {/* 3. 이중 배경 레이어 (크로스페이드) */}
      {/* 이전 이미지 레이어 (서서히 사라짐) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-0"}`}>
        <Image
          src={prevImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.32] blur-[2px]"
        />
      </div>

      {/* 현재 이미지 레이어 (서서히 나타남) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? "opacity-100" : "opacity-100"}`}>
        <Image
          src={currentImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.32] blur-[2px]"
        />
      </div>

      {/* 4. 오벌레이 효과 (비네팅, 그라데이션 등) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_35%,rgba(8,5,16,0.65)_75%,rgba(4,2,8,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(12,6,28,0.25)] to-[rgba(4,2,10,0.85)]" />
      <div className="absolute inset-0 shadow-[inset_0_-100px_100px_-30px_rgba(2,1,6,0.85)]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px]" />

      {/* 5. 메인 페이지 전용 입자 애니메이션 */}
      {pathname === "/" && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full">
            <div className="absolute left-[10%] top-[15%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.1)_45%,transparent_70%)] opacity-65 blur-[2.5px] [animation:lumoraTwinkle_3.8s_ease-in-out_infinite]" />
            <div className="absolute right-[12%] top-[18%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,250,220,0.85),rgba(255,250,220,0.1)_45%,transparent_70%)] opacity-60 blur-[2px] [animation:lumoraTwinkle_4.2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute left-[25%] top-[8%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)] opacity-80 blur-[0.5px] [animation:lumoraTwinkle_3.2s_ease-in-out_infinite_0.2s]" />
            <div className="absolute right-[28%] top-[12%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] opacity-70 blur-[1px] [animation:lumoraTwinkle_4.8s_ease-in-out_infinite_1.2s]" />
            <div className="absolute left-[15%] top-[35%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,190,230,0.85),rgba(255,190,230,0.1)_40%,transparent_70%)] opacity-55 blur-[1px] [animation:lumoraTwinkle_4.5s_ease-in-out_infinite_0.8s]" />
            <div className="absolute right-[18%] top-[42%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,210,240,0.8),rgba(255,210,240,0.1)_45%,transparent_70%)] opacity-50 blur-[2px] [animation:lumoraTwinkle_5.1s_ease-in-out_infinite_1.5s]" />
            <div className="absolute left-[42%] top-[15%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,200,220,0.8),transparent_65%)] opacity-45 blur-[1px] [animation:lumoraTwinkle_3.9s_ease-in-out_infinite_2.1s]" />
            <div className="absolute left-[32%] top-[25%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.82),rgba(167,243,208,0.1)_50%,transparent_75%)] opacity-52 blur-[1.5px] [animation:lumoraTwinkle_4.0s_ease-in-out_infinite_1.1s]" />
            <div className="absolute right-[35%] top-[22%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(165,243,252,0.8),rgba(165,243,252,0.1)_50%,transparent_75%)] opacity-58 blur-[1px] [animation:lumoraTwinkle_4.7s_ease-in-out_infinite_0.4s]" />
            <div className="absolute left-[55%] top-[12%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.7),transparent_65%)] opacity-40 blur-[0.5px] [animation:lumoraTwinkle_5.2s_ease-in-out_infinite_1.8s]" />
            <div className="absolute right-[22%] top-[65%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(214,194,255,0.84),rgba(214,194,255,0.1)_50%,transparent_76%)] opacity-52 blur-[1px] [animation:lumoraTwinkle_4.3s_ease-in-out_infinite_0.6s]" />
            <div className="absolute left-[38%] top-[72%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.82),rgba(196,181,253,0.1)_50%,transparent_76%)] opacity-48 blur-[2.5px] [animation:lumoraTwinkle_5.5s_ease-in-out_infinite_2.4s]" />
            <div className="absolute right-[45%] top-[78%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.8),transparent_65%)] opacity-44 blur-[1px] [animation:lumoraTwinkle_4.9s_ease-in-out_infinite_3.1s]" />
            <div className="absolute left-[5%] top-[55%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_3.5s_ease-in-out_infinite_0.7s]" />
            <div className="absolute left-[8%] top-[85%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(165,243,252,0.7),transparent_70%)] opacity-55 blur-[0.5px] [animation:lumoraTwinkle_4.1s_ease-in-out_infinite_1.3s]" />
            <div className="absolute right-[8%] top-[58%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,230,240,0.7),transparent_70%)] opacity-50 blur-[1px] [animation:lumoraTwinkle_5.3s_ease-in-out_infinite_0.9s]" />
            <div className="absolute right-[25%] top-[88%] h-2 w-2 rounded-full bg-[radial-gradient(circle,white,transparent_70%)] opacity-65 blur-[0.5px] [animation:lumoraTwinkle_3.7s_ease-in-out_infinite_2.2s]" />
            <div className="absolute left-[45%] top-[92%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(252,211,77,0.7),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_4.6s_ease-in-out_infinite_1.7s]" />
            <div className="absolute right-[38%] top-[82%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(214,194,255,0.7),transparent_70%)] opacity-55 blur-[1px] [animation:lumoraTwinkle_5.7s_ease-in-out_infinite_3.0s]" />
            <div className="absolute left-[22%] top-[75%] h-2 w-2 rounded-full bg-[radial-gradient(circle,white,transparent_70%)] opacity-50 blur-[0.5px] [animation:lumoraTwinkle_4.4s_ease-in-out_infinite_2.5s]" />
            <div className="absolute right-[52%] top-[65%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.8),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_3.3s_ease-in-out_infinite_1.9s]" />

            <div className="absolute left-[14%] top-[24%] h-6 w-6 [animation:lumoraTwinkle_4.1s_ease-in-out_infinite]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.6)] blur-[0.5px]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.6)] blur-[0.5px]" />
            </div>
            <div className="absolute right-[29%] top-[34%] h-5 w-5 [animation:lumoraTwinkle_4.8s_ease-in-out_infinite_2s]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[rgba(167,243,208,0.65)] shadow-[0_0_12px_rgba(167,243,208,0.5)] blur-[1px]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[rgba(167,243,208,0.65)] shadow-[0_0_12px_rgba(167,243,208,0.5)] blur-[1px]" />
            </div>
            <div className="absolute left-[35%] bottom-[15%] h-6 w-6 [animation:lumoraTwinkle_5.2s_ease-in-out_infinite_1.2s]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[rgba(255,220,240,0.65)] shadow-[0_0_15px_rgba(255,220,240,0.5)] blur-[1px]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[rgba(255,220,240,0.65)] shadow-[0_0_15px_rgba(255,220,240,0.5)] blur-[1px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
