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
          <div className="absolute inset-x-0 top-[2%] h-full">
            {/* Existing top/mid particles */}
            <div className="absolute left-[9%] top-[12%] h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88),rgba(255,255,255,0.1)_46%,transparent_72%)] opacity-60 blur-[1px] [animation:lumoraTwinkle_8.6s_ease-in-out_infinite]" />
            <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(214,226,255,0.82),rgba(214,226,255,0.1)_50%,transparent_76%)] opacity-54 [animation:lumoraTwinkle_8s_ease-in-out_infinite_0.8s]" />
            <div className="absolute left-[30%] top-[18%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(210,188,255,0.82),rgba(210,188,255,0.08)_52%,transparent_78%)] opacity-44 [animation:lumoraTwinkle_9.2s_ease-in-out_infinite_1.3s]" />
            <div className="absolute right-[11%] top-[16%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88),rgba(255,255,255,0.1)_46%,transparent_74%)] opacity-58 blur-[1px] [animation:lumoraTwinkle_9s_ease-in-out_infinite_1.1s]" />
            <div className="absolute right-[18%] top-[34%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(188,220,255,0.84),rgba(188,220,255,0.1)_50%,transparent_76%)] opacity-52 [animation:lumoraTwinkle_7.8s_ease-in-out_infinite_0.6s]" />
            <div className="absolute right-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(205,190,255,0.82),rgba(205,190,255,0.08)_50%,transparent_76%)] opacity-42 [animation:lumoraTwinkle_8.3s_ease-in-out_infinite_1.7s]" />

            {/* New particles across the mid-bottom section */}
            <div className="absolute left-[38%] top-[65%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(255,240,250,0.85),rgba(255,240,250,0.1)_40%,transparent_70%)] opacity-40 blur-[1px] [animation:lumoraTwinkle_7.5s_ease-in-out_infinite_1.5s]" />
            <div className="absolute right-[33%] top-[68%] h-4 w-4 rounded-full bg-[radial-gradient(circle,rgba(190,210,255,0.8),rgba(190,210,255,0.1)_45%,transparent_70%)] opacity-50 blur-[1px] [animation:lumoraTwinkle_8.2s_ease-in-out_infinite_2.1s]" />
            <div className="absolute left-[20%] top-[82%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_60%)] opacity-45 [animation:lumoraTwinkle_9.5s_ease-in-out_infinite_0.4s]" />
            <div className="absolute right-[20%] top-[78%] h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle,rgba(220,195,255,0.7),transparent_60%)] opacity-35 [animation:lumoraTwinkle_8.8s_ease-in-out_infinite_3s]" />
            <div className="absolute left-[45%] top-[85%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(230,240,255,0.75),transparent_65%)] opacity-38 blur-[1px] [animation:lumoraTwinkle_7.2s_ease-in-out_infinite_0.9s]" />
            <div className="absolute right-[42%] top-[88%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,230,245,0.75),transparent_65%)] opacity-42 [animation:lumoraTwinkle_8.5s_ease-in-out_infinite_1.8s]" />
            <div className="absolute left-[28%] top-[55%] h-3 w-3 rounded-full bg-[radial-gradient(circle,rgba(214,194,255,0.8),transparent_60%)] opacity-48 [animation:lumoraTwinkle_7.9s_ease-in-out_infinite_2.4s]" />
            <div className="absolute right-[28%] top-[52%] h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.75),transparent_60%)] opacity-55 [animation:lumoraTwinkle_9.1s_ease-in-out_infinite_0.7s]" />

            <div className="absolute left-[14%] top-[24%] h-6 w-6 [animation:lumoraTwinkle_8.1s_ease-in-out_infinite]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            </div>
            <div className="absolute right-[29%] bottom-[24%] h-5 w-5 [animation:lumoraTwinkle_8.8s_ease-in-out_infinite_2s]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[rgba(132,196,255,0.68)] shadow-[0_0_8px_rgba(132,196,255,0.3)]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[rgba(132,196,255,0.68)] shadow-[0_0_8px_rgba(132,196,255,0.3)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
