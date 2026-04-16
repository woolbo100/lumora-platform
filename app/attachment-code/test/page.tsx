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
          애착유형 코드는 가까워질수록 반복되는 감정 반응과 거리감, 불안과 회피의
          패턴을 읽어내는 서비스입니다. 나의 관계 방식이 어떻게 형성되는지
          루모라의 톤으로 차분하게 분석해드립니다.
        </p>
      </section>


      <AttachmentCodeExperience />
    </main>
  );
}
