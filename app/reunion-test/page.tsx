import Link from "next/link";

import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";
import { HOME_HREF } from "@/lib/site";

export default function ReunionTestPage() {
  const resultTypes = ["가능성 높음", "조금 더 시간이 필요함", "정리가 필요한 흐름", "새로운 전환의 가능성"];

  return (
    <>
      <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2">
        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
          <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[var(--color-secondary)]/18 bg-[radial-gradient(circle,rgba(213,195,165,0.18),rgba(255,255,255,0.03))] text-5xl text-[var(--color-secondary)] shadow-[0_0_60px_rgba(122,104,217,0.16)]">
            ✦
          </div>

          <h1 className="font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_30px_rgba(213,195,165,0.08)] sm:text-7xl md:text-8xl">
            재회 가능성 테스트
          </h1>
          <p className="mt-5 text-2xl text-[var(--color-secondary)] sm:text-3xl">
            다시 이어질 수 있을지 흐름으로 확인해보세요
          </p>
          <p className="mt-4 text-base uppercase tracking-[0.32em] text-white/46">약 1~2분 소요</p>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
            이별 이후에도 관계는 완전히 끝나지 않은 채 감정의 결만 남아 있을 수 있습니다. 지금의
            감정 방향과 재회 가능성을 차분하게 읽어보세요.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            현재 관계의 흐름과 감정의 농도, 거리감, 미련, 소통 가능성을 바탕으로 재회의 가능성과
            앞으로의 방향을 해석해드리는 서비스입니다.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/reunion-test/test"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-10 py-4 text-lg font-semibold text-[#1c1830] shadow-[0_22px_70px_rgba(115,88,232,0.32)] transition duration-300 hover:-translate-y-1"
            >
              시작하기
              <span className="ml-3 text-xl" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href={HOME_HREF}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              LUMORA로 돌아가기
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
      <ServiceHubContent {...serviceHubContent.reunion} />
    </>
  );
}
