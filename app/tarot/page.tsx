import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";

export default function TarotPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 sm:px-8">
      <GlassPanel className="w-full p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Tarot Reading
        </p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
          타로 리딩
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
          타로 리딩 서비스의 진입 페이지입니다. 이후 스프레드 선택, 질문 입력,
          카드 결과, 해석 리포트 같은 흐름을 이 폴더 안에서 단계별로 확장하면
          됩니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/">홈으로 돌아가기</CTAButton>
          <CTAButton href="/blog" variant="secondary">
            관련 글 보기
          </CTAButton>
        </div>
      </GlassPanel>
    </main>
  );
}
