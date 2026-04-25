import { ServiceHubHero } from "@/components/shared/ServiceHubHero";

export function NamingHero() {
  return (
    <ServiceHubHero
      title="이름코드"
      subtitle="이름의 첫소리 안에 흐르는 에너지를 읽어보세요"
      description="이름코드는 초성 발음 기준 오행으로 이름 안의 에너지 흐름을 가볍고 직관적으로 읽어보는 서비스입니다. 좋은 이름과 나쁜 이름을 가르기보다, 내 이름이 어떤 결로 들리고 어떤 기운이 비어 보이는지 차분하게 이해할 수 있도록 안내합니다. 결과 화면에서는 이름 오행 분석, 에너지 해석, 부족한 기운, 보완 발음까지 한 흐름으로 확인할 수 있습니다."
      primaryHref="/naming/start"
      primaryLabel="이름 에너지 분석 시작"
    />
  );
}
