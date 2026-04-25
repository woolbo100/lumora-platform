import { NamingStartForm } from "@/components/naming/NamingStartForm";

export default function NamingStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">Name Code</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          나의 이름 코드 알아보기
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          이름의 초성을 발음 기준 오행으로 풀어, 이름 안에 흐르는 에너지의 결을 가볍고 직관적으로 읽어드립니다.
        </p>
      </section>

      <NamingStartForm />
    </main>
  );
}
