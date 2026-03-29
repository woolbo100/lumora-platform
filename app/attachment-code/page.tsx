import { AttachmentCodeExperience } from "@/components/attachment-code/AttachmentCodeExperience";

export default function AttachmentCodePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Premium Attachment Analysis
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          애착유형 코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          관계 안에서 반복되는 감정의 흐름, 거리 두기, 불안과 회피의 패턴을
          질문 기반으로 살펴보는 프리미엄 분석 경험입니다. 타로와는 다른
          방식으로 마음의 구조를 읽어내지만, 같은 LUMORA 톤 안에서 이어지도록
          설계했습니다.
        </p>
      </section>

      <AttachmentCodeExperience />
    </main>
  );
}
