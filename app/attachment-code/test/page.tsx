import { AttachmentCodeExperience } from "@/components/attachment-code/AttachmentCodeExperience";

export default function AttachmentCodeTestPage() {
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
          관계 안에서 반복되는 감정의 흐름과 거리감, 불안과 회피의 패턴을
          질문 기반으로 섬세하게 살펴보는 분석 경험입니다. 사랑 앞의 나를 더
          정확하게 읽고 싶을 때 차분하게 시작해보세요.
        </p>
      </section>

      <AttachmentCodeExperience />
    </main>
  );
}
