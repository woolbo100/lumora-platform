import { AttractionCodeExperience } from "@/components/attraction-code/AttractionCodeExperience";

export default function AttractionCodeTestPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Attraction Code
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          매력코드
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          사람을 끌어당기는 당신만의 분위기, 친밀감, 존재감의 결을 따라가며
          관계에서 더 선명하게 빛나는 매력 포인트를 읽어보는 리딩입니다.
        </p>
      </section>

      <AttractionCodeExperience />
    </main>
  );
}
