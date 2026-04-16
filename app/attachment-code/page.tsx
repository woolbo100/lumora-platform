import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { ServiceHubHero } from "@/components/shared/ServiceHubHero";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function AttachmentCodePage() {
  return (
    <>
      <ServiceHubHero
        title="애착유형 코드"
        subtitle="관계 안에서 반복되는 애착의 흐름을 확인해보세요"
        description="애착유형 코드는 가까워질수록 반복되는 감정 반응과 거리감, 불안과 회피의 패턴을 읽어내는 서비스입니다. 나의 관계 방식이 어떻게 형성되는지 루모라의 톤으로 차분하게 분석해드립니다."
        primaryHref="/attachment-code/test"
        primaryLabel="애착유형 확인하기"
      />
      <ServiceHubContent {...serviceHubContent.attachment} />
    </>
  );
}
