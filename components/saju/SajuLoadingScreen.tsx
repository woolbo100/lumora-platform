"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { GlassPanel } from "@/components/shared/GlassPanel";
import { type SajuProfile } from "@/types/saju";

const MESSAGES = [
  "출생정보의 결을 읽고 있어요...",
  "년주, 월주, 일주, 시주의 흐름을 정리하고 있어요...",
  "오행의 균형과 부족한 결을 함께 살펴보고 있어요...",
  "루모라만의 선천코드 문장으로 다듬고 있어요...",
];

type SajuLoadingScreenProps = {
  profile: SajuProfile;
};

export function SajuLoadingScreen({ profile }: SajuLoadingScreenProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fallbackQuery = useMemo(
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
    }, 1200);

    let cancelled = false;

    const createAnalysis = async () => {
      try {
        const response = await fetch("/api/saju", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        const payload = (await response.json()) as {
          id?: string;
          error?: string;
        };

        if (!response.ok || !payload.id) {
          throw new Error(payload.error ?? "출생정보를 다시 확인해주세요");
        }

        if (!cancelled) {
          router.replace(`/saju/result?id=${encodeURIComponent(payload.id)}`);
        }
      } catch (caughtError) {
        if (!cancelled) {
          setError(
            caughtError instanceof Error ? caughtError.message : "출생정보를 다시 확인해주세요",
          );
        }
      }
    };

    const redirectTimer = window.setTimeout(() => {
      void createAnalysis();
    }, 2200);

    return () => {
      cancelled = true;
      window.clearInterval(messageTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [profile, router]);

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
          Saju Analysis
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {profile.name}님의 선천코드를 정리하는 중
        </h1>
        <p className="mt-6 min-h-8 text-lg text-[var(--foreground-soft)] sm:text-xl">
          {error ?? MESSAGES[index]}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/46">
          {error
            ? "입력한 출생정보를 한 번 더 확인한 뒤 다시 시도해주세요."
            : "공통 분석 데이터를 한 번만 생성한 뒤, 사주 결과와 이름설계가 같은 기반을 공유할 수 있도록 정리하고 있어요."}
        </p>

        {error ? (
          <button
            type="button"
            onClick={() => router.replace(`/saju/reading?${fallbackQuery}`)}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition hover:border-white/24 hover:text-[var(--foreground)]"
          >
            다시 입력하기
          </button>
        ) : null}
      </GlassPanel>
    </section>
  );
}
