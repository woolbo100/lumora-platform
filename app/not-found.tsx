import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 bg-white/5 text-5xl text-[var(--color-secondary)] shadow-2xl backdrop-blur-xl">
          ✦
        </div>
        <h1 className="font-display text-7xl text-white sm:text-8xl">404</h1>
        <p className="mt-6 text-xl font-medium tracking-widest text-[var(--color-secondary)] uppercase">
          길을 잃은 에너지
        </p>
        <p className="mt-4 max-w-md text-lg leading-8 text-white/50">
          요청하신 페이지를 찾을 수 없습니다.<br />
          존재하지 않거나 삭제된 페이지일 가능성이 높습니다.
        </p>
        
        <div className="mt-12">
          <CTAButton href="/" className="px-10 py-4 text-lg">
            루모라 홈으로 돌아가기
          </CTAButton>
        </div>
      </div>
      
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-secondary)]/5 blur-[120px]" />
    </main>
  );
}
