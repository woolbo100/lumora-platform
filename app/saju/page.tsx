import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function SajuPage() {
  return (
    <>
      <ServiceHubHero
        title="선천코드 사주"
        subtitle="태어난 순간의 에너지 구조를 바탕으로 흐름을 읽어보세요"
        subtitleClassName=""
        description="선천코드 사주는 타고난 성향과 오행의 균형, 관계와 재물의 흐름까지 함께 해석하는 루모라의 무료 참고용 사주 서비스입니다. 결과 화면에서는 구조와 방향을 차분하게 확인할 수 있도록 핵심 정보를 감성적인 문장으로 정리해드립니다."
        primaryHref="/saju/reading"
        primaryLabel="사주 분석 시작"
        footerText="일부 계산은 MIT 오픈소스 라이브러리를 활용합니다"
      />
      <ServiceHubContent {...serviceHubContent.saju} />
    </>
  );
}
