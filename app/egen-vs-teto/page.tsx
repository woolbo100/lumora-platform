import type { Metadata } from "next";

import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export const metadata: Metadata = {
  title: "에겐 vs 테토녀 테스트 | 20문항으로 알아보는 연애 본능 테스트",
  description:
    "20문항으로 나의 연애 성향을 알아보는 에겐 vs 테토녀 테스트. 간단한 선택형 질문과 직관적인 결과, 공유 기능까지 한 번에 확인해보세요.",
};

export default function EgenVsTetoPage() {
  return (
    <>
      <ServiceHubHero
        title="에겐 vs 테토녀 테스트"
        subtitle="20문항으로 나의 연애 성향을 알아보는 테스트"
        description="연락 스타일, 감정 표현, 거리감 같은 일상적인 연애 반응을 바탕으로 지금의 내가 더 에겐형에 가까운지, 테토녀형에 가까운지 가볍고 세련된 톤으로 읽어드립니다."
        primaryHref="/egen-vs-teto/test"
        primaryLabel="테스트 시작하기"
      />
      <ServiceHubContent {...serviceHubContent.egenTeto} />
    </>
  );
}
