import Link from "next/link";

export default function ReunionTestPage() {
  const resultTypes = [
    "가능성 높음형",
    "조심스러운 회복형",
    "정리 필요형",
    "새로운 흐름 전환형",
  ];

  return (
    <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,195,165,0.07),transparent_22%),radial-gradient(circle_at_22%_26%,rgba(122,104,217,0.22),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(120,162,255,0.12),transparent_24%),linear-gradient(180deg,rgba(12,10,25,0.82)_0%,rgba(10,11,24,0.9)_50%,rgba(7,8,18,0.96)_100%)]" />
        <div className="absolute left-[14%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.2),transparent_68%)] blur-3xl" />
        <div className="absolute right-[10%] top-[20%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[55%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.08),transparent_68%)] blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
        <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(213,195,165,0.18),rgba(255,255,255,0.03))] text-5xl text-[var(--color-secondary)] shadow-[0_0_60px_rgba(122,104,217,0.16)]">
          ✦
        </div>

        <h1 className="font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_30px_rgba(213,195,165,0.08)] sm:text-7xl md:text-8xl">
          재회 가능성 테스트
        </h1>
        <p className="mt-5 text-2xl text-[var(--color-secondary)] sm:text-3xl">
          다시 이어질 가능성은 남아 있을까?
        </p>
        <p className="mt-4 text-base uppercase tracking-[0.32em] text-white/46">
          약 1~2분 소요
        </p>
        <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
          이별 이후에도 관계는 완전히 끝나지 않은 채 감정의 결만 달라진 채
          남아 있는 경우가 있습니다. 지금 흐르는 마음의 방향과 재회의 가능성을
          조용히 읽어보세요.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          이 테스트는 현재 관계의 흐름, 감정의 온도, 거리감, 미련, 소통
          가능성을 바탕으로 재회 가능성과 앞으로의 방향을 해석해주는 서비스입니다.
          단정적인 답보다 지금의 흐름과 현실적인 움직임을 함께 읽어드립니다.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/reunion-test/test"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(213,195,165,0.92),rgba(157,139,227,0.94)_55%,rgba(108,92,198,0.92))] px-10 py-4 text-lg font-semibold text-[#1c1830] shadow-[0_22px_70px_rgba(89,72,173,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(89,72,173,0.38)]"
          >
            시작하기
            <span className="ml-3 text-xl" aria-hidden="true">
              →
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
          >
            LUMORA 홈으로 돌아가기
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {resultTypes.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-4 py-2 text-sm font-medium text-[var(--color-secondary)]"
            >
              {label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
