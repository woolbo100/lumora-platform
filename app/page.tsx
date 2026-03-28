import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-secondary)]">
            Inner Symbolism Platform
          </p>
          <h1 className="font-display text-2xl text-white">LUMORA</h1>
        </div>
        <CTAButton href="/tarot" className="hidden sm:inline-flex">
          타로 시작하기
        </CTAButton>
      </header>

      <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              마음의 패턴과 상징을 읽는 공간
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
                LUMORA
              </h2>
              <p className="text-2xl font-medium text-[var(--color-secondary)] sm:text-3xl">
                마음코드 해석 플랫폼
              </p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              타로, 애착코드, 감정 아카이브를 하나의 감각적인 경험으로 연결해
              내면의 신호를 읽고 해석하는 플랫폼입니다. 앞으로 새로운 마음코드
              서비스가 추가되어도 같은 구조 안에서 자연스럽게 확장할 수 있도록
              설계했습니다.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <CTAButton href="/tarot">타로 시작하기</CTAButton>
            <CTAButton href="/blog" variant="secondary">
              인사이트 둘러보기
            </CTAButton>
          </div>
        </div>

        <GlassPanel className="relative overflow-hidden p-8">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Featured Flow
            </p>
            <div className="space-y-3">
              <h3 className="font-display text-4xl text-white">
                직관과 해석이 만나는
                <br />
                프리미엄 리추얼
              </h3>
              <p className="leading-7 text-white/70">
                각 서비스는 독립적인 페이지로 운영되며, 공통 컴포넌트와 디자인
                토큰을 공유해 새로운 서비스가 추가되어도 일관된 브랜드 경험을
                유지합니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Primary
                </p>
                <p className="mt-2 font-medium text-white">#6A5ACD</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Secondary
                </p>
                <p className="mt-2 font-medium text-white">#FFD700</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Mood
                </p>
                <p className="mt-2 font-medium text-white">Mystic Glass</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Core Services
            </p>
            <h2 className="font-display text-4xl text-white">
              지금 바로 시작할 수 있는 해석 여정
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
}
