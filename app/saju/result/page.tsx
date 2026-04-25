import { SajuResultView } from "@/components/saju/SajuResultView";
import { createSharedSajuAnalysis, requireSharedSajuAnalysis } from "@/lib/analysis/shared-analysis";
import { validateSajuInput } from "@/lib/saju-engine";

type SajuResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function ErrorPanel({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center">
        <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
          <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Analysis Error</p>
          <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">{title}</h1>
          <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function SajuResultPage({ searchParams }: SajuResultPageProps) {
  const params = await searchParams;
  const analysisId = getSingleValue(params.id);

  if (analysisId) {
    const analysis = requireSharedSajuAnalysis(analysisId);

    if (!analysis) {
      return (
        <ErrorPanel
          title="사주 분석 데이터를 찾을 수 없어요"
          lines={[
            "분석 데이터 보관 시간이 지나거나 새로 고침 흐름이 끊겼을 수 있어요.",
            "사주 입력 화면에서 다시 한 번 분석을 시작해주세요.",
          ]}
        />
      );
    }

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
        <SajuResultView result={analysis.saju} analysisId={analysis.id} />
      </main>
    );
  }

  const validated = validateSajuInput({
    name: getSingleValue(params.name),
    gender: getSingleValue(params.gender) as "male" | "female" | undefined,
    birth_date: getSingleValue(params.birth_date),
    birth_time: getSingleValue(params.birth_time),
    mode: getSingleValue(params.mode) === "ai" ? "ai" : "no-ai",
  });

  if (!validated.success) {
    return <ErrorPanel title="입력값을 다시 확인해주세요" lines={validated.errors} />;
  }

  const created = createSharedSajuAnalysis(validated.data);

  if (!created.success) {
    return (
      <ErrorPanel
        title="출생정보를 다시 확인해주세요"
        lines={["입력하신 생년월일과 시간이 경계값에 가까우면 결과가 달라질 수 있어요."]}
      />
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <SajuResultView result={created.data.saju} analysisId={created.data.id} />
    </main>
  );
}
