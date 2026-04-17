import Image from "next/image";

const heroAuroraImage = "/images/main/background.png";

export function PageBackground() {
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
        className="object-cover object-center opacity-[0.22] blur-[4px]"
      />

      {/* 비네팅 효과 (가장자리를 깊고 어둡게, 중앙으로 향할수록 투명하게) - 살짝 완화하여 이미지 노출 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_35%,rgba(8,5,16,0.65)_75%,rgba(4,2,8,0.92)_100%)]" />

      {/* 하단 시네마틱 페이드 오버레이 (bottom gradient) - 투명도 조절로 너무 까맣게 덮지 않음 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(12,6,28,0.25)] to-[rgba(4,2,10,0.85)]" />
      
      {/* 하단 가장자리 딥 글로우 섀도우 - 답답하지 않게 조절 */}
      <div className="absolute inset-0 shadow-[inset_0_-100px_100px_-30px_rgba(2,1,6,0.85)]" />

      {/* 빛 입자와 신비로운 분위기를 더해주는 미세 노이즈 오버레이 방어 레이어 */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px]" />
    </div>
  );
}
