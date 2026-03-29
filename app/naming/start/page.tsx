import { NamingStartForm } from "@/components/naming/NamingStartForm";

export default function NamingStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Naming Start
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          선천코드 이름설계 시작
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          기존 사주 엔진으로 선천코드를 읽고, 부족한 오행과 목적에 맞는 이름 후보를 3~5개
          추천합니다.
        </p>
      </section>

      <NamingStartForm />
    </main>
  );
}
