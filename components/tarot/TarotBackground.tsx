import Image from "next/image";

const tarotBackgroundImage = "/images/tarot/tarot_background.png";

export function TarotBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 bg-[#0a0514]">
      {/* 베이스 오로라 & 글로우 (은은한 보랏빛 글로우) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(122,104,217,0.22)_0%,rgba(76,64,157,0.15)_30%,rgba(35,28,76,0.08)_60%,transparent_90%)] blur-3xl" />
      
      {/* 타로 전용 통배경 이미지 */}
      <Image
        src={tarotBackgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.35] blur-[1px]"
      />

      {/* 비네팅 효과 (가장자리를 깊고 어둡게) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(8,5,16,0.6)_70%,rgba(4,2,8,0.9)_100%)]" />

      {/* 상하단 시네마틱 페이드 (다른 페이지들과 통일감 유지) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(10,5,20,0.8)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[rgba(10,5,20,0.9)] via-[rgba(10,5,20,0.4)] to-transparent" />
      
      {/* 미세 노이즈 오버레이 */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px]" />
    </div>
  );
}
