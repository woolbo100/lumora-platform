import Image from "next/image";
import Link from "next/link";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { tarotCategories } from "@/data/tarotCards";

export default function TarotPage() {
  return (
    <main className="flex flex-1 flex-col gap-10 pb-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0">
            <Image
              src="/images/tarot/tarotmain.png"
              alt="타로 메인 비주얼"
              fill
              priority
              className="object-cover opacity-20"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,20,51,0.82),rgba(36,29,73,0.9),rgba(18,15,44,0.95))]" />
          </div>

          <div className="relative max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
              Mystic Insight
            </p>
            <h2 className="mt-4 font-display text-5xl leading-tight text-white sm:text-6xl">
              지금의 흐름을
              <br />
              타로로 읽어보세요
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/74 sm:text-lg">
              상징과 직감을 통해 감정, 관계, 선택의 결을 살펴보는 LUMORA의 서브
              서비스입니다. 카테고리를 고르고 카드 세 장을 선택하면 현재 흐름과
              다음 메시지를 정리해 드립니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tarot/select?category=love"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#7f71dc]"
              >
                타로 시작하기
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white/82 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]"
              >
                블로그 보기
              </Link>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-col justify-between p-8 sm:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]/75">
              Service Flow
            </p>
            <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              LUMORA 안에서 이어지는 타로 경험
            </h3>
          </div>
          <div className="mt-8 space-y-5 text-sm leading-7 text-white/72">
            <p>1. 질문에 가장 가까운 카테고리를 선택합니다.</p>
            <p>2. 카드 세 장을 골라 지금의 흐름을 정리합니다.</p>
            <p>3. 결과 페이지에서 카드 조합이 전하는 메시지를 확인합니다.</p>
          </div>
        </GlassPanel>
      </section>

      <section className="pb-4">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Reading Categories
          </p>
          <h3 className="mt-3 font-display text-4xl text-white">
            지금 보고 싶은 주제를 골라 주세요
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tarotCategories.map((category) => (
            <Link
              key={category.key}
              href={`/tarot/select?category=${category.key}`}
              className="group"
            >
              <GlassPanel className="flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-secondary)]/75">
                  {category.eyebrow}
                </p>
                <h4 className="mt-4 font-display text-3xl text-white">
                  {category.label}
                </h4>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {category.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] transition group-hover:translate-x-1">
                  리딩 시작하기
                  <span aria-hidden="true">→</span>
                </span>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
