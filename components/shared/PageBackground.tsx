"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function PageBackground() {
  const pathname = usePathname();
  
  // background2.png를 사용해야 하는 서비스 (오라, 감정, 꿈)
  const bg2Paths = ["/aura-code", "/emotion", "/dream"];
  const isBg2 = bg2Paths.some(path => pathname?.startsWith(path));

  // background3.png를 사용해야 하는 서비스 (러브, 애착, 연애패턴, 재회)
  const bg3Paths = [
    "/love-code",
    "/attachment-code",
    "/relationship-pattern",
    "/reunion-test",
  ];
  const isBg3 = bg3Paths.some(path => pathname?.startsWith(path));

  // background4.png를 사용해야 하는 서비스 (사주, 작명, 에겐테토)
  const bg4Paths = ["/saju", "/naming", "/egen-vs-teto"];
  const isBg4 = bg4Paths.some(path => pathname?.startsWith(path));

  // background5.png를 사용해야 하는 서비스 (매력코드, 블로그)
  const bg5Paths = ["/attraction-code", "/blog"];
  const isBg5 = bg5Paths.some(path => pathname?.startsWith(path));
  
  let heroAuroraImage = "/images/main/background.png";
  if (isBg2) heroAuroraImage = "/images/main/background2.png";
  else if (isBg3) heroAuroraImage = "/images/main/background3.png";
  else if (isBg4) heroAuroraImage = "/images/main/background4.png";
  else if (isBg5) heroAuroraImage = "/images/main/background5.png";
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 bg-[#0a0514]">
      {/* 베이스 오로라 & 글로우 (은은한 라일락/블루 글로우) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(146,88,244,0.18)_0%,rgba(102,52,188,0.12)_30%,rgba(55,24,106,0.06)_60%,transparent_90%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(184,132,255,0.12)_0%,transparent_50%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(214,164,255,0.1)_0%,transparent_50%)] blur-2xl" />

      {/* 오로라 이미지: 페이지 전체를 감싸도록 fixed 레이어에 꽉 채움 */}
      <Image
        src={heroAuroraImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.32] blur-[2px]"
      />

      {/* 비네팅 효과 (가장자리를 깊고 어둡게, 중앙으로 향할수록 투명하게) - 살짝 완화하여 이미지 노출 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_35%,rgba(8,5,16,0.65)_75%,rgba(4,2,8,0.92)_100%)]" />

      {/* 하단 시네마틱 페이드 오버레이 (bottom gradient) - 투명도 조절로 너무 까맣게 덮지 않음 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(12,6,28,0.25)] to-[rgba(4,2,10,0.85)]" />
      
      {/* 하단 가장자리 딥 글로우 섀도우 - 답답하지 않게 조절 */}
      <div className="absolute inset-0 shadow-[inset_0_-100px_100px_-30px_rgba(2,1,6,0.85)]" />

      {/* 빛 입자와 신비로운 분위기를 더해주는 미세 노이즈 오버레이 방어 레이어 */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px]" />

      {/* 메인 페이지 전용 히어로 입자 애니메이션 (PageBackground에 포함시켜 fixed 레이어로 고정) */}
      {pathname === "/" && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full">
            {/* --- Aurora Gold & White (Main) --- */}
            <div className="absolute left-[10%] top-[15%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.1)_45%,transparent_70%)] opacity-65 blur-[2.5px] [animation:lumoraTwinkle_3.8s_ease-in-out_infinite]" />
            <div className="absolute right-[12%] top-[18%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,250,220,0.85),rgba(255,250,220,0.1)_45%,transparent_70%)] opacity-60 blur-[2px] [animation:lumoraTwinkle_4.2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute left-[25%] top-[8%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)] opacity-80 blur-[0.5px] [animation:lumoraTwinkle_3.2s_ease-in-out_infinite_0.2s]" />
            <div className="absolute right-[28%] top-[12%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] opacity-70 blur-[1px] [animation:lumoraTwinkle_4.8s_ease-in-out_infinite_1.2s]" />

            {/* --- Aurora Rose & Pink --- */}
            <div className="absolute left-[15%] top-[35%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,190,230,0.85),rgba(255,190,230,0.1)_40%,transparent_70%)] opacity-55 blur-[1px] [animation:lumoraTwinkle_4.5s_ease-in-out_infinite_0.8s]" />
            <div className="absolute right-[18%] top-[42%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,210,240,0.8),rgba(255,210,240,0.1)_45%,transparent_70%)] opacity-50 blur-[2px] [animation:lumoraTwinkle_5.1s_ease-in-out_infinite_1.5s]" />
            <div className="absolute left-[42%] top-[15%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,200,220,0.8),transparent_65%)] opacity-45 blur-[1px] [animation:lumoraTwinkle_3.9s_ease-in-out_infinite_2.1s]" />

            {/* --- Aurora Mint & Teal --- */}
            <div className="absolute left-[32%] top-[25%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.82),rgba(167,243,208,0.1)_50%,transparent_75%)] opacity-52 blur-[1.5px] [animation:lumoraTwinkle_4.0s_ease-in-out_infinite_1.1s]" />
            <div className="absolute right-[35%] top-[22%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(165,243,252,0.8),rgba(165,243,252,0.1)_50%,transparent_75%)] opacity-58 blur-[1px] [animation:lumoraTwinkle_4.7s_ease-in-out_infinite_0.4s]" />
            <div className="absolute left-[55%] top-[12%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.7),transparent_65%)] opacity-40 blur-[0.5px] [animation:lumoraTwinkle_5.2s_ease-in-out_infinite_1.8s]" />

            {/* --- Aurora Indigo & Lavender --- */}
            <div className="absolute right-[22%] top-[65%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(214,194,255,0.84),rgba(214,194,255,0.1)_50%,transparent_76%)] opacity-52 blur-[1px] [animation:lumoraTwinkle_4.3s_ease-in-out_infinite_0.6s]" />
            <div className="absolute left-[38%] top-[72%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.82),rgba(196,181,253,0.1)_50%,transparent_76%)] opacity-48 blur-[2.5px] [animation:lumoraTwinkle_5.5s_ease-in-out_infinite_2.4s]" />
            <div className="absolute right-[45%] top-[78%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.8),transparent_65%)] opacity-44 blur-[1px] [animation:lumoraTwinkle_4.9s_ease-in-out_infinite_3.1s]" />

            {/* --- Distributed Small Twinkles (aurora noise) --- */}
            <div className="absolute left-[5%] top-[55%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_3.5s_ease-in-out_infinite_0.7s]" />
            <div className="absolute left-[8%] top-[85%] h-2 w-2 rounded-full bg-[radial-gradient(circle,rgba(165,243,252,0.7),transparent_70%)] opacity-55 blur-[0.5px] [animation:lumoraTwinkle_4.1s_ease-in-out_infinite_1.3s]" />
            <div className="absolute right-[8%] top-[58%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,230,240,0.7),transparent_70%)] opacity-50 blur-[1px] [animation:lumoraTwinkle_5.3s_ease-in-out_infinite_0.9s]" />
            <div className="absolute right-[25%] top-[88%] h-2 w-2 rounded-full bg-[radial-gradient(circle,white,transparent_70%)] opacity-65 blur-[0.5px] [animation:lumoraTwinkle_3.7s_ease-in-out_infinite_2.2s]" />
            <div className="absolute left-[45%] top-[92%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(252,211,77,0.7),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_4.6s_ease-in-out_infinite_1.7s]" />
            <div className="absolute right-[38%] top-[82%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(214,194,255,0.7),transparent_70%)] opacity-55 blur-[1px] [animation:lumoraTwinkle_5.7s_ease-in-out_infinite_3.0s]" />
            <div className="absolute left-[22%] top-[75%] h-2 w-2 rounded-full bg-[radial-gradient(circle,white,transparent_70%)] opacity-50 blur-[0.5px] [animation:lumoraTwinkle_4.4s_ease-in-out_infinite_2.5s]" />
            <div className="absolute right-[52%] top-[65%] h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.8),transparent_70%)] opacity-60 blur-[0.5px] [animation:lumoraTwinkle_3.3s_ease-in-out_infinite_1.9s]" />

            {/* --- Cross Stars (Glimmer) --- */}
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
