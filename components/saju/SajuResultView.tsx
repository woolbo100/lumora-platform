"use client";

import { useState } from "react";
import Link from "next/link";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { type SajuElement, type SajuResult } from "@/types/saju";

const HOME_URL = "https://www.lumoracode.kr";

const TABS = [
  { key: "basic", label: "기본 해석" },
  { key: "ohaeng", label: "오행 & 십성" },
  { key: "gmhs", label: "인생의 흐름" },
  { key: "daewoon", label: "대운" },
] as const;

const ELEMENT_STYLES: Record<SajuElement, string> = {
  wood: "text-emerald-300 border-emerald-300/20 bg-emerald-300/8",
  fire: "text-orange-300 border-orange-300/20 bg-orange-300/8",
  earth: "text-amber-200 border-amber-200/20 bg-amber-200/8",
  metal: "text-slate-200 border-slate-200/20 bg-slate-200/8",
  water: "text-sky-300 border-sky-300/20 bg-sky-300/8",
};

function ElementPill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[var(--foreground-soft)]">
      <span className="text-white/40">{label}</span> {value}
    </div>
  );
}

function SectionCard({
  title,
  body,
  eyebrow,
}: {
  title: string;
  body: string;
  eyebrow?: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))] p-6">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">{eyebrow}</p>
      ) : null}
      <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
        {body}
      </p>
    </div>
  );
}

function SajuPillarsTable({ result }: { result: SajuResult }) {
  const { pillars, interp } = result;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-3 text-center">
        <thead>
          <tr className="text-sm text-white/42">
            <th className="px-2 py-3">구분</th>
            <th className="px-4 py-3">시주</th>
            <th className="px-4 py-3">일주</th>
            <th className="px-4 py-3">월주</th>
            <th className="px-4 py-3">년주</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/58">
              천간
            </td>
            {(["hour", "day", "month", "year"] as const).map((key) => (
              <td
                key={`${key}-gan`}
                className={`rounded-[24px] border px-5 py-5 ${
                  key === "day"
                    ? "border-[var(--color-secondary)]/35 bg-[linear-gradient(135deg,rgba(213,195,165,0.16),rgba(122,104,217,0.12)_62%,rgba(255,255,255,0.04))]"
                    : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))]"
                }`}
              >
                <span className={`block text-4xl font-bold ${ELEMENT_STYLES[pillars[key].gan_element]}`}>
                  {pillars[key].gan}
                </span>
                <span className="mt-2 block text-sm text-white/55">{interp.ten_gods[key].gan}</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/58">
              지지
            </td>
            {(["hour", "day", "month", "year"] as const).map((key) => (
              <td
                key={`${key}-zhi`}
                className={`rounded-[24px] border px-5 py-5 ${
                  key === "day"
                    ? "border-[var(--color-secondary)]/35 bg-[linear-gradient(135deg,rgba(213,195,165,0.16),rgba(122,104,217,0.12)_62%,rgba(255,255,255,0.04))]"
                    : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.2))]"
                }`}
              >
                <span className={`block text-4xl font-bold ${ELEMENT_STYLES[pillars[key].zhi_element]}`}>
                  {pillars[key].zhi}
                </span>
                <span className="mt-2 block text-sm text-white/55">{interp.ten_gods[key].zhi}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BasicTab({ result }: { result: SajuResult }) {
  const { interp } = result;

  return (
    <div className="grid gap-5">
      <SectionCard title="핵심 총평" body={interp.total_summary} eyebrow="Total Summary" />
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard
          title={interp.today_luck.title}
          body={`${interp.today_luck.date} · ${interp.today_luck.pillar}\n\n${interp.today_luck.desc}`}
          eyebrow="Today Luck"
        />
        <SectionCard title="성향과 인성" body={interp.personality_deep} eyebrow="Personality" />
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <SectionCard title="재물운" body={interp.wealth_strategy} eyebrow="Wealth" />
        <SectionCard title="사회운 / 적성" body={interp.social_analysis} eyebrow="Social" />
        <SectionCard title="애정운" body={interp.love_romance} eyebrow="Love" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="건강 / 체질" body={interp.health_analysis} eyebrow="Health" />
        <SectionCard title="핵심 조언" body={interp.advice} eyebrow="Advice" />
      </div>
    </div>
  );
}

function OhaengTab({ result }: { result: SajuResult }) {
  const { ohaeng, interp } = result;

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Five Elements</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">오행 분포</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-5">
            {(Object.entries(interp.ohaeng_analysis.percentages) as [SajuElement, number][]).map(
              ([element, value]) => (
                <div
                  key={element}
                  className={`rounded-[24px] border p-4 text-center ${ELEMENT_STYLES[element]}`}
                >
                  <p className="text-sm text-white/55">{element.toUpperCase()}</p>
                  <p className="mt-3 text-3xl font-semibold">{value}%</p>
                  <p className="mt-2 text-sm text-white/55">count {ohaeng[element]}</p>
                </div>
              ),
            )}
          </div>
        </GlassPanel>

        <SectionCard
          title="오행 밸런스"
          body={`${interp.ohaeng_analysis.balance_text}\n\n${interp.advice}`}
          eyebrow="Balance"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Details</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">상세 분석</h3>
          <div className="mt-6 grid gap-4">
            {interp.ohaeng_analysis.details.map((detail) => (
              <div
                key={detail.element}
                className="rounded-[22px] border border-white/10 bg-white/6 p-5"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {detail.element.toUpperCase()} · {detail.status}
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">{detail.msg}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Ten Gods</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">십성 정보</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(Object.entries(interp.ten_gods) as [keyof typeof interp.ten_gods, (typeof interp.ten_gods)[keyof typeof interp.ten_gods]][]).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="rounded-[22px] border border-white/10 bg-white/6 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">{key}</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">천간 {value.gan}</p>
                  <p className="mt-2 text-base text-[var(--foreground-soft)]">지지 {value.zhi}</p>
                </div>
              ),
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

function GmhsTab({ result }: { result: SajuResult }) {
  return (
    <div className="grid gap-5">
      {(Object.entries(result.interp.gmhs) as [keyof typeof result.interp.gmhs, (typeof result.interp.gmhs)[keyof typeof result.interp.gmhs]][]).map(
        ([key, item]) => (
          <GlassPanel key={key} className="p-6 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                  {key}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                  {item.period}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
                  {item.desc}
                </p>
              </div>

              <div className="grid min-w-[15rem] gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">천간</p>
                  <p className={`mt-3 text-3xl font-bold ${ELEMENT_STYLES[item.pillar.gan_element]}`}>
                    {item.pillar.gan}
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">지지</p>
                  <p className={`mt-3 text-3xl font-bold ${ELEMENT_STYLES[item.pillar.zhi_element]}`}>
                    {item.pillar.zhi}
                  </p>
                </div>
              </div>
            </div>
          </GlassPanel>
        ),
      )}
    </div>
  );
}

function DaewoonTab({ result }: { result: SajuResult }) {
  return (
    <div className="grid gap-5">
      <SectionCard title="대운 흐름 총평" body={result.interp.daewoon_trend} eyebrow="Daewoon Trend" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {result.interp.daewoon.map((item) => (
          <GlassPanel key={`${item.age}-${item.gan}${item.zhi}`} className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">{item.age}세 시작</p>
            <div className="mt-4 flex items-center gap-3">
              <span className={`text-4xl font-bold ${ELEMENT_STYLES[item.gan_element]}`}>{item.gan}</span>
              <span className={`text-4xl font-bold ${ELEMENT_STYLES[item.zhi_element]}`}>{item.zhi}</span>
            </div>
            <p className="mt-4 text-base leading-7 text-[var(--foreground-soft)]">{item.text}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

type SajuResultViewProps = {
  result: SajuResult;
};

export function SajuResultView({ result }: SajuResultViewProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("basic");

  return (
    <div className="grid gap-6">
      <GlassPanel className="border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">Saju Report</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-5xl text-[var(--foreground)] sm:text-6xl">
              {result.profile.name}님의 심층 분석 결과
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              {result.interp.core}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ElementPill label="성별" value={result.profile.gender} />
            <ElementPill label="생년월일" value={result.profile.birth_date} />
            <ElementPill label="태어난 시간" value={result.profile.birth_time} />
            <ElementPill label="모드" value={result.profile.mode} />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">Pillars</p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">사주 원국표</h2>
        <div className="mt-6">
          <SajuPillarsTable result={result} />
        </div>
      </GlassPanel>

      <div className="flex flex-wrap gap-3">
        {TABS.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                active
                  ? "border-[var(--color-secondary)]/46 bg-[linear-gradient(135deg,rgba(213,195,165,0.16),rgba(122,104,217,0.12)_62%,rgba(255,255,255,0.04))] text-[var(--foreground)]"
                  : "border-white/10 bg-white/6 text-[var(--foreground-soft)] hover:border-white/20"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "basic" ? <BasicTab result={result} /> : null}
      {tab === "ohaeng" ? <OhaengTab result={result} /> : null}
      {tab === "gmhs" ? <GmhsTab result={result} /> : null}
      {tab === "daewoon" ? <DaewoonTab result={result} /> : null}

      <GlassPanel className="p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Continue</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">다른 리딩도 이어보기</h2>
            <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">
              루모라 안의 다른 서비스와도 같은 허브 구조로 연결됩니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CTAButton href="/saju/reading">다시 입력하기</CTAButton>
            <Link
              href="/tarot"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)]/10"
            >
              타로 보기
            </Link>
            <Link
              href={HOME_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition hover:border-[var(--color-secondary)]/28 hover:text-[var(--color-secondary)]"
            >
              홈으로
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
