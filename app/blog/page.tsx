import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";

export default function BlogPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 sm:px-8">
      <GlassPanel className="w-full p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Editorial Archive
        </p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
          블로그
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
          LUMORA의 인사이트 콘텐츠와 해석 아카이브를 위한 공간입니다. 이후
          카테고리, 목록, 상세 페이지를 같은 톤 안에서 자연스럽게 확장할 수
          있도록 구조를 열어두었습니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/">홈으로 돌아가기</CTAButton>
          <CTAButton href="/tarot" variant="secondary">
            타로 페이지 보기
          </CTAButton>
        </div>
      </GlassPanel>
    </main>
  );
}
