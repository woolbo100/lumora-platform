"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { type SajuProfile } from "@/types/saju";

const MESSAGES = [
  "하늘의 결을 읽고 있습니다...",
  "사주 원국의 기둥을 정리하고 있습니다...",
  "오행의 균형과 십성 흐름을 계산 중입니다...",
  "근묘화실과 대운 서사를 다듬고 있습니다...",
  "루모라 리포트 형식으로 정리하고 있습니다...",
];

type SajuLoadingScreenProps = {
  profile: SajuProfile;
};

export function SajuLoadingScreen({ profile }: SajuLoadingScreenProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const query = useMemo(
    () =>
      new URLSearchParams({
        name: profile.name,
        gender: profile.gender,
        birth_date: profile.birth_date,
        birth_time: profile.birth_time,
        mode: profile.mode,
      }).toString(),
    [profile],
  );

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
    }, 1300);

    const redirectTimer = window.setTimeout(() => {
      router.replace(`/saju/result?${query}`);
    }, 2800);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [query, router]);

  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,195,165,0.08),transparent_18%),radial-gradient(circle_at_22%_26%,rgba(122,104,217,0.2),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(120,162,255,0.12),transparent_24%),linear-gradient(180deg,rgba(12,10,25,0.82),rgba(8,10,21,0.94))]" />
        <div className="absolute left-[14%] top-[16%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.24),transparent_68%)] blur-3xl" />
        <div className="absolute right-[10%] top-[20%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[56%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.08),transparent_70%)] blur-3xl" />
      </div>

      <GlassPanel className="relative z-10 w-full max-w-3xl p-10 text-center sm:p-14">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[var(--color-secondary)]/24 bg-[radial-gradient(circle,rgba(213,195,165,0.18),rgba(255,255,255,0.03))] shadow-[0_0_80px_rgba(122,104,217,0.18)]">
          <div className="h-18 w-18 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-secondary)] border-r-[var(--color-primary)]" />
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[var(--color-secondary)]">
          Mystic Processing
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {profile.name}님의 운명을 읽는 중
        </h1>
        <p className="mt-6 min-h-8 text-lg text-[var(--foreground-soft)] sm:text-xl">
          {MESSAGES[index]}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/46">
          입력값 검증, 사주 원국 계산, 오행 분석, 십성 매핑, 근묘화실/대운 생성 순서로
          리포트를 준비하고 있습니다.
        </p>
      </GlassPanel>
    </section>
  );
}
