import { DreamStartForm } from "@/components/dream/DreamStartForm";

export default function DreamStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Dream Start
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          무료 꿈해몽 시작
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          꿈 내용과 감정, 상황, 등장 인물을 단계별로 선택해 무의식의 메시지를 더 선명하게 읽어냅니다.
        </p>
      </section>

      <DreamStartForm />
    </main>
  );
}
