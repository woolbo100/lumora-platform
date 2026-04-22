import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function LoveCodePage() {
  return (
    <>
      <ServiceHubHero
        title="러브코드"
        subtitle="오늘의 연애 행동 추천"
        description={`생년월일 기반 별자리 분석으로\n지금 당신의 연애 흐름과 타이밍을 읽어드립니다.\n\n궁합을 맞추는 대신,\n오늘 가장 자연스럽게 이어지는 행동을 제안합니다.`}
        primaryHref="/love-code/start"
        primaryLabel="시작하기"
      />
      <ServiceHubContent {...serviceHubContent.loveCode} />
    </>
  );
}
