import { ServiceHubHero } from "@/components/shared/ServiceHubHero";

export default function SajuPage() {
  return (
    <ServiceHubHero
      title="Lumora Saju"
      subtitle="기존 별하의 구조를 살린 프리미엄 사주 리포트"
      description="사주 원국, 오행, 십성, 근묘화실, 대운 흐름을 루모라의 공통 레이아웃과 카드 시스템 안에서 다시 읽어내는 통합 서비스입니다. 기존 결과 필드와 정보 순서를 최대한 유지하면서 모바일에서도 읽기 쉬운 리포트 경험으로 정리했습니다."
      primaryHref="/saju/reading"
      primaryLabel="사주 분석 시작"
    />
  );
}
