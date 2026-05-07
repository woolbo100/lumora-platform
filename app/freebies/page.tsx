import type { Metadata } from "next";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { supabaseRestRequest } from "@/lib/supabase";
import { FreebieListClient } from "./FreebieListClient";

export const metadata: Metadata = {
  title: "무료 PDF 자료실 | LUMORA",
  description: "루모라에서 제공하는 특별한 무료 PDF 자료들을 만나보세요. 이메일만 입력하면 즉시 다운로드 가능합니다.",
};

type Freebie = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  file_url: string;
};

export default async function FreebiesPage() {
  let freebies: Freebie[] = [];

  try {
    // 활성화된(is_active = true) 자료만 가져옵니다.
    const response = await supabaseRestRequest("freebies?is_active=eq.true&order=sort_order.asc,created_at.desc");
    freebies = await response.json();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 sm:px-8">
      {/* 제목 섹션 */}
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-secondary)]">
          Free Resources
        </p>
        <h1 className="font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          무료 PDF 자료실
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
          여러분의 성장을 돕는 루모라의 특별한 비책들을 준비했습니다.<br className="hidden sm:block" />
          가입 없이 이메일만 입력하고 지금 바로 받아보세요.
        </p>
      </div>

      {/* 리스트 섹션 (클라이언트 컴포넌트 호출) */}
      {freebies.length === 0 ? (
        <div className="py-20 text-center text-[var(--foreground-muted)]">
          현재 준비된 자료가 없습니다. 곧 더 좋은 자료로 찾아올게요!
        </div>
      ) : (
        <FreebieListClient freebies={freebies} />
      )}
      
      {/* 하단 안내 */}
      <GlassPanel className="p-8 text-center">
        <p className="text-sm text-[var(--foreground-soft)]">
          찾으시는 자료가 없나요? 루모라 팀에게 <a href="/contact" className="text-[var(--color-secondary)] underline underline-offset-4">필요한 주제를 제안</a>해 주세요.
        </p>
      </GlassPanel>
    </main>
  );
}
