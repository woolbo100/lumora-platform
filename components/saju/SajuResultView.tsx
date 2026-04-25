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

function getUniqueElements(elements: SajuElement[]) {
  return [...new Set(elements)];
}

function extractDominantElements(result: SajuResult) {
  const details = result.interp.ohaeng_analysis.details;
  const excess = details
    .filter((detail) => detail.status === "excess")
    .map((detail) => detail.element);

  if (excess.length > 0) {
    return getUniqueElements(excess);
  }

  const max = Math.max(...Object.values(result.ohaeng));
  return getUniqueElements(
    (Object.entries(result.ohaeng) as [SajuElement, number][])
      .filter(([, count]) => count === max)
      .map(([element]) => element),
  );
}

function extractLackingElements(result: SajuResult) {
  const details = result.interp.ohaeng_analysis.details;
  const missing = details
    .filter((detail) => detail.status === "missing")
    .map((detail) => detail.element);

  if (missing.length > 0) {
    return getUniqueElements(missing);
  }

  const min = Math.min(...Object.values(result.ohaeng));
  return getUniqueElements(
    (Object.entries(result.ohaeng) as [SajuElement, number][])
      .filter(([, count]) => count === min)
      .map(([element]) => element),
  );
}

function formatElementList(elements: SajuElement[]) {
  return elements.map((element) => ELEMENT_LABELS[element]).join(", ");
}

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

function buildCareerDirection(result: SajuResult, dominant: SajuElement[], lacking: SajuElement[]) {
  const dominantText = formatElementList(dominant);
  const lackingText = formatElementList(lacking);

  const orientation =
    dominant.includes("earth") || dominant.includes("metal")
      ? "안정형"
      : dominant.includes("fire") || dominant.includes("wood")
      ? "활동형"
      : "관계형";

  const orientationDescription =
    orientation === "안정형"
      ? "기준을 세우고 구조를 정리하는 역할에서 편안함이 살아나기 쉽습니다. 루틴을 만들고 책임을 오래 지켜내는 흐름이 강해, 운영·기획·관리처럼 중심을 잡아주는 일과 자연스럽게 맞닿습니다."
      : orientation === "활동형"
      ? "움직임과 확장이 필요한 장면에서 에너지가 더 또렷하게 살아납니다. 변화에 반응하고 방향을 밀어가는 힘이 있어, 프로젝트형 업무나 표현력과 추진력이 필요한 역할에서 리듬이 붙기 쉽습니다."
      : "사람과 흐름 사이의 온도를 읽는 감각이 비교적 잘 살아납니다. 조율, 소통, 상담, 브랜드 경험처럼 관계를 다루는 장면에서 장점이 자연스럽게 드러날 수 있습니다.";

  const balanceLine =
    lacking.length > 0
      ? `지금 구조에서는 ${lackingText}의 결을 의식적으로 보완할수록 적성과 현실감이 더 부드럽게 맞물릴 수 있습니다.`
      : "오행의 결이 비교적 고르게 퍼져 있어, 한 방향으로만 몰리기보다 상황에 따라 유연하게 적응하는 힘도 함께 가지고 있습니다.";

  return `${dominantText}의 기운이 중심을 이루며 직업 흐름은 ${orientation}에 가깝게 읽힙니다. ${orientationDescription} ${balanceLine}`;
}

function buildGrowthPoint(result: SajuResult, lacking: SajuElement[]) {
  if (lacking.length === 0) {
    return "부족한 기운이 크게 비어 보이지 않아, 지금은 새로운 것을 더하기보다 이미 가진 리듬을 선명하게 다듬는 일이 더 중요합니다. 이름의 울림도 지금의 결을 정리하고 또렷하게 만드는 방향으로 이어질 수 있습니다.";
  }

  const messages: Record<SajuElement, string> = {
    wood: "시작하고 뻗어가는 힘",
    fire: "표현하고 드러내는 힘",
    earth: "중심을 잡고 머무는 힘",
    metal: "정리하고 기준을 세우는 힘",
    water: "감정을 적시고 흐르게 하는 힘",
  };

  const detail = lacking
    .map((element) => `${ELEMENT_LABELS[element]}의 결은 ${messages[element]}`)
    .join(", ");

  return `${detail}과 연결됩니다. 그래서 성장 포인트는 없는 것을 억지로 채우기보다, 일상 습관과 말의 리듬, 그리고 나를 부르는 이름의 울림 안에서 그 기운을 조금씩 불러오는 데 있습니다. 이런 지점은 이후 이름코드나 이름설계로 자연스럽게 이어서 살펴보기에도 좋은 결입니다.`;
}

function buildCurrentFlowSummary(result: SajuResult, dominant: SajuElement[], lacking: SajuElement[]) {
  const dominantText = formatElementList(dominant);
  const lackingText = lacking.length > 0 ? formatElementList(lacking) : "특별히 비어 보이는 기운 없이";

  return `전체적으로는 ${dominantText}의 흐름이 앞에 서 있고, ${lackingText}의 여백이 뒤에서 균형을 요청하는 구조입니다. 그래서 지금의 에너지는 이미 강한 결을 밀어붙이기보다, 남은 빈자리를 부드럽게 메우며 리듬을 고르게 만드는 쪽으로 읽힙니다.`;
}

function buildClosingInterpretation(result: SajuResult, dominant: SajuElement[], lacking: SajuElement[]) {
  const dominantText = formatElementList(dominant);

  if (lacking.length === 0) {
    return `${result.profile.name}님의 선천코드는 한쪽으로 크게 기울지 않으면서도 ${dominantText}의 결을 조용히 품고 있습니다. 이미 가진 흐름을 믿고 너무 서두르지 않을 때, 삶의 장면들은 조금 더 자연스럽고 단단한 방향으로 정리되기 쉽습니다.`;
  }

  return `${result.profile.name}님의 선천코드는 ${dominantText}의 결을 선명하게 가지고 있으면서도, 아직 조용히 불러와야 할 기운을 함께 품고 있습니다. 부족함은 결핍이라기보다 앞으로 더 깊어질 여백에 가깝습니다. 그 여백을 다정하게 돌보는 순간, 지금의 흐름은 훨씬 부드럽고 아름답게 이어질 수 있습니다.`;
}

type SajuResultViewProps = {
  result: SajuResult;
};

export function SajuResultView({ result }: SajuResultViewProps) {
  const { profile, pillars, interp } = result;
  const dominantElements = extractDominantElements(result);
  const lackingElements = extractLackingElements(result);

  const careerDirection = buildCareerDirection(result, dominantElements, lackingElements);
  const growthPoint = buildGrowthPoint(result, lackingElements);
  const currentFlowSummary = buildCurrentFlowSummary(result, dominantElements, lackingElements);
  const closingInterpretation = buildClosingInterpretation(result, dominantElements, lackingElements);

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
        <SectionCard eyebrow="Career" title="직업 및 적성 방향" body={careerDirection} />
        <SectionCard eyebrow="Growth" title="성장 포인트" body={growthPoint} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard eyebrow="Current Flow" title="현재 흐름 요약" body={currentFlowSummary} />
        <SectionCard eyebrow="Closing" title="종합 해석" body={closingInterpretation} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard eyebrow="Health" title="몸과 마음의 안내" body={interp.health_analysis} />
        <SectionCard eyebrow="Note" title="해석 범위" body={interp.daewoon_trend} />
      </div>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Reference Note
        </p>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
          본 결과는 입력하신 생년월일과 시간을 기준으로 산출한 참고용 선천코드입니다.
          출생 시간이 경계(23시 전후 또는 2시간 단위)에 가까운 경우 결과가 달라질 수 있습니다.
          정밀한 상담 리포트는 별도 분석이 필요할 수 있습니다.
        </p>
      </GlassPanel>

      <GlassPanel className="result-panel-glow p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Privacy Note
        </p>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-[var(--foreground-soft)]">
          입력하신 정보는 사주 분석 결과 생성에만 일시적으로 사용되며 별도의 데이터베이스에 저장되지 않습니다.
          ※ 입력 정보는 저장되지 않으니 안심하고 이용하셔도 됩니다.
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
              무료 선천코드가 지금의 결을 가볍게 보여준다면, 백도화 리포트에서는 관계와 감정의 맥락까지 더 깊고 세밀하게 읽어볼 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CTAButton href="/naming/start">이름코드로 이어서 보기</CTAButton>
            <CTAButton href="/contact">백도화 유료 리포트 문의</CTAButton>
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
