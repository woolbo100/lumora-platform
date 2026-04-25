"use client";

import Link from "next/link";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { ResultShareActions } from "@/components/shared/ResultShareActions";
import { type SajuElement, type SajuResult } from "@/types/saju";

const ELEMENT_LABELS: Record<SajuElement, string> = {
  wood: "목",
  fire: "화",
  earth: "토",
  metal: "금",
  water: "수",
};

const ELEMENT_STYLES: Record<SajuElement, string> = {
  wood: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  fire: "border-orange-300/25 bg-orange-300/10 text-orange-200",
  earth: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  metal: "border-slate-200/25 bg-slate-200/10 text-slate-100",
  water: "border-sky-300/25 bg-sky-300/10 text-sky-200",
};

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[var(--foreground-soft)]">
      <span className="mr-2 text-white/42">{label}</span>
      <span className="text-[var(--foreground)]">{value}</span>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <GlassPanel className="result-panel-glow p-6 sm:p-7">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
        {body}
      </p>
    </GlassPanel>
  );
}

function PillarCard({
  label,
  gan,
  zhi,
  ganElement,
  zhiElement,
}: {
  label: string;
  gan: string;
  zhi: string;
  ganElement: SajuElement;
  zhiElement: SajuElement;
}) {
  return (
    <div className="result-card-glow rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">{label}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className={`rounded-[20px] border px-4 py-5 text-center ${ELEMENT_STYLES[ganElement]}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">천간</p>
          <p className="mt-3 text-4xl font-bold">{gan}</p>
          <p className="mt-2 text-sm text-white/70">{ELEMENT_LABELS[ganElement]}</p>
        </div>
        <div className={`rounded-[20px] border px-4 py-5 text-center ${ELEMENT_STYLES[zhiElement]}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">지지</p>
          <p className="mt-3 text-4xl font-bold">{zhi}</p>
          <p className="mt-2 text-sm text-white/70">{ELEMENT_LABELS[zhiElement]}</p>
        </div>
      </div>
    </div>
  );
}

function OhaengGrid({ result }: { result: SajuResult }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {(Object.entries(result.interp.ohaeng_analysis.percentages) as [SajuElement, number][]).map(
        ([element, value]) => (
          <div
            key={element}
            className={`result-card-glow rounded-[24px] border p-5 ${ELEMENT_STYLES[element]}`}
          >
            <p className="text-sm tracking-[0.18em] text-white/60">{ELEMENT_LABELS[element]}</p>
            <p className="mt-3 text-3xl font-semibold">{value}%</p>
            <p className="mt-2 text-sm text-white/70">8글자 중 {result.ohaeng[element]}개</p>
          </div>
        ),
      )}
    </div>
  );
}

type SajuResultViewProps = {
  result: SajuResult;
  analysisId: string;
};

export function SajuResultView({ result, analysisId }: SajuResultViewProps) {
  const { profile, pillars, interp } = result;

  return (
    <div className="grid gap-6">
      <GlassPanel className="result-panel-glow border-[var(--color-secondary)]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(10,13,28,0.34))] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-secondary)]">
          Seoncheon Code
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--foreground)] sm:text-6xl">
          {profile.name}님의 사주 8글자
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {interp.core}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <InfoChip label="생년월일" value={profile.birth_date} />
          <InfoChip label="출생시간" value={profile.birth_time} />
          <InfoChip label="성별" value={profile.gender === "male" ? "남성" : "여성"} />
          <InfoChip label="기준" value="무료 참고용 선천코드" />
        </div>
      </GlassPanel>

      <div className="grid gap-5 xl:grid-cols-4">
        <PillarCard
          label="년주"
          gan={pillars.year.gan}
          zhi={pillars.year.zhi}
          ganElement={pillars.year.gan_element}
          zhiElement={pillars.year.zhi_element}
        />
        <PillarCard
          label="월주"
          gan={pillars.month.gan}
          zhi={pillars.month.zhi}
          ganElement={pillars.month.gan_element}
          zhiElement={pillars.month.zhi_element}
        />
        <PillarCard
          label="일주"
          gan={pillars.day.gan}
          zhi={pillars.day.zhi}
          ganElement={pillars.day.gan_element}
          zhiElement={pillars.day.zhi_element}
        />
        <PillarCard
          label="시주"
          gan={pillars.hour.gan}
          zhi={pillars.hour.zhi}
          ganElement={pillars.hour.gan_element}
          zhiElement={pillars.hour.zhi_element}
        />
      </div>

      <SectionCard eyebrow="Summary" title="가볍게 읽는 선천코드" body={interp.total_summary} />

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard eyebrow="Personality" title="타고난 결" body={interp.personality_deep} />
        <SectionCard eyebrow="Social" title="사람과 일에서의 흐름" body={interp.social_analysis} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard eyebrow="Love" title="감정의 리듬" body={interp.love_romance} />
        <SectionCard eyebrow="Wealth" title="일과 재물의 결" body={interp.wealth_strategy} />
      </div>

      <GlassPanel className="result-panel-glow p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Five Elements
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">오행 밸런스</h2>
        <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
          {interp.ohaeng_analysis.balance_text}
        </p>
        <div className="mt-6">
          <OhaengGrid result={result} />
        </div>
      </GlassPanel>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard eyebrow="Health" title="몸과 마음의 안내" body={interp.health_analysis} />
        <SectionCard eyebrow="Note" title="해석 범위" body={interp.daewoon_trend} />
      </div>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Reference Note
        </p>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
          본 결과는 입력하신 생년월일과 시간을 기준으로 산출한 참고용 선천코드입니다.출생 시간이 경계(23시 전후 또는 2시간 단위)에 가까운 경우
          결과가 달라질 수 있습니다.
          정밀한 상담 리포트는 별도 분석이 필요할 수 있습니다..
        </p>
      </GlassPanel>

      <GlassPanel className="result-panel-glow p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">
              Premium
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              백도화 유료 리포트로 더 깊게 보기
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--foreground-soft)]">
              무료 선천코드가 지금의 결을 가볍게 보여줬다면, 백도화 리포트에서는 관계와 감정의 맥락까지 더 깊고 섬세하게 이어서 읽어볼 수 있어요.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CTAButton href={`/naming/start?analysisId=${encodeURIComponent(analysisId)}`}>
              이 분석으로 이름설계 이어가기
            </CTAButton>
            <CTAButton href="/contact">백도화 유료 리포트 문의하기</CTAButton>
            <Link
              href="/saju/reading"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-[var(--foreground-soft)] transition hover:border-white/24 hover:text-[var(--foreground)]"
            >
              다시 입력하기
            </Link>
          </div>
        </div>
      </GlassPanel>

      <ResultShareActions
        testName="사주 리포트"
        resultTitle={`${profile.name}님의 사주 8글자`}
        resultSummary={interp.core}
        hubUrl="/saju"
        restartUrl="/saju/reading"
      />
    </div>
  );
}
