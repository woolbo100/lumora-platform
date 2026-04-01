import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function LoveCodePage() {
  return (
    <>
      <ServiceHubHero
        title="러브코드"
        subtitle="오늘의 연애 행동 추천"
        description="생년월일 기반 별자리 분석으로 현재 관계 흐름과 행동 힌트를 제공하는 서비스입니다. 궁합을 단정하기보다 지금의 관계에서 어떤 움직임이 더 자연스럽고 효과적인지 Lumora의 톤으로 차분하게 정리해드립니다."
        primaryHref="/love-code/start"
        primaryLabel="시작하기"
      />
      <ServiceHubContent {...serviceHubContent.loveCode} />
    </>
  );
}
