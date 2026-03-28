import { AttachmentResultPanel } from "@/components/attachment-code/AttachmentResultPanel";
import { type AttachmentType } from "@/types/attachment";

type AttachmentCodeResultPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

const validTypes: AttachmentType[] = ["secure", "anxious", "avoidant", "fearful"];

export default async function AttachmentCodeResultPage({
  searchParams,
}: AttachmentCodeResultPageProps) {
  const params = await searchParams;
  const initialType = validTypes.includes(params.type as AttachmentType)
    ? (params.type as AttachmentType)
    : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Attachment Result
        </p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
          애착유형 코드 리포트
        </h1>
        <p className="mt-5 text-base leading-8 text-white/72 sm:text-lg">
          당신의 주요 애착 코드를 중심으로 관계 패턴과 감정 반응을 정리한 결과
          페이지입니다.
        </p>
      </section>

      <AttachmentResultPanel initialType={initialType} />
    </main>
  );
}
