import { AttachmentCodeExperience } from "@/components/attachment-code/AttachmentCodeExperience";

export default function AttachmentCodePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Premium Attachment Analysis
        </p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
          애착유형 코드
        </h1>
        <p className="mt-5 text-base leading-8 text-white/72 sm:text-lg">
          관계 속에서 반복되는 감정의 흐름, 다가감과 거리 두기, 확신을 원하는
          마음을 정제된 질문으로 살펴봅니다. 타로보다 더 심리 분석적이고
          프리미엄한 톤으로 설계된 애착 코드 진단입니다.
        </p>
      </section>

      <AttachmentCodeExperience />
    </main>
  );
}
