import Link from "next/link";

import { ServiceHubContent } from "@/components/shared/ServiceHubContent";
import { serviceHubContent } from "@/lib/service-hub-content";

export default function AttractionCodePage() {
  const resultTypes = ["은은한 존재감", "부드러운 카리스마", "시크한 매력", "공감형 분위기", "신뢰를 주는 인상"];

  return (
    <>
      <main className="relative left-1/2 right-1/2 min-h-[calc(100vh-9rem)] w-screen -translate-x-1/2 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,201,221,0.11),transparent_18%),radial-gradient(circle_at_20%_22%,rgba(122,104,217,0.24),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,182,212,0.14),transparent_25%),radial-gradient(circle_at_52%_62%,rgba(213,195,165,0.1),transparent_32%),linear-gradient(180deg,rgba(17,11,31,0.82)_0%,rgba(15,12,30,0.9)_48%,rgba(10,10,24,0.96)_100%)]" />
          <div className="absolute left-[12%] top-[16%] h-[19rem] w-[19rem] rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.24),transparent_68%)] blur-3xl" />
          <div className="absolute right-[12%] top-[18%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(255,182,212,0.18),transparent_72%)] blur-3xl" />
          <div className="absolute left-1/2 top-[58%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.09),transparent_70%)] blur-3xl" />
        </div>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
          <div className="mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-[#f4c9dd]/18 bg-[radial-gradient(circle,rgba(244,201,221,0.22),rgba(255,255,255,0.03))] text-5xl text-[#f4c9dd] shadow-[0_0_60px_rgba(197,132,174,0.18)]">
            ✦
          </div>

          <h1 className="font-display text-6xl leading-none text-[var(--foreground)] [text-shadow:0_0_30px_rgba(244,201,221,0.08)] sm:text-7xl md:text-8xl">
            매력코드
          </h1>
          <p className="mt-5 text-2xl text-[#f4c9dd] sm:text-3xl">당신의 매력은 이미 코드로 존재합니다</p>
          <p className="mt-4 text-base uppercase tracking-[0.32em] text-white/46">약 1~2분 소요</p>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--foreground-soft)] sm:text-xl">
            당신이 가진 고유한 매력의 결을 분석하여 사람들에게 비치는 인상과 관계 안에서 드러나는
            강점을 보여드립니다.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            첫인상보다 가까워질수록 더 강하게 느껴지는 분위기와 이미지, 감정 결을 함께 읽어보는
            리딩입니다.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/attraction-code/test"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(244,201,221,0.94),rgba(213,195,165,0.92)_48%,rgba(157,139,227,0.94))] px-10 py-4 text-lg font-semibold text-[#231a34] shadow-[0_22px_70px_rgba(151,101,166,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(151,101,166,0.34)]"
            >
              시작하기
              <span className="ml-3 text-xl" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] px-8 py-4 text-sm font-semibold tracking-[0.18em] text-[var(--foreground-soft)] transition duration-300 hover:-translate-y-1 hover:border-[#f4c9dd]/28 hover:text-[#f4c9dd]"
            >
              LUMORA로 돌아가기
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {resultTypes.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#f4c9dd]/18 bg-[#f4c9dd]/8 px-4 py-2 text-sm font-medium text-[#f4c9dd]"
              >
                {label}
              </span>
            ))}
          </div>
        </section>
      </main>
      <ServiceHubContent {...serviceHubContent.charm} />
    </>
  );
}
