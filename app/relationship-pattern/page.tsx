import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function RelationshipPatternPage() {
  return (
    <>
      <ServiceHubHero
        title="Luna Pattern"
        subtitle="반복되는 연애의 구조를 읽어보세요"
        description="연애패턴 코드는 감정의 흐름보다 더 깊은 곳에서 반복되는 선택과 관계 구조를 분석하는 서비스입니다. 비슷한 문제를 반복하게 되는 이유와 다음 흐름을 루모라의 시선으로 정리해드립니다."
        primaryHref="/relationship-pattern/test"
        primaryLabel="연애패턴 분석하기"
      />
      <ServiceHubContent {...serviceHubContent.lovePattern} />
    </>
  );
}
