import { SajuLoadingScreen } from "@/components/saju/SajuLoadingScreen";
import { validateSajuInput } from "@/lib/saju-engine";

type SajuLoadingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function GlassError({ errors }: { errors: string[] }) {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center">
      <div className="w-full rounded-[30px] border border-rose-400/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,100,120,0.08)_58%,rgba(12,14,28,0.24))] p-8 shadow-[var(--shadow-glow-soft)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Validation Error</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          입력값을 다시 확인해 주세요
        </h1>
        <div className="mt-6 grid gap-3 text-base leading-7 text-[var(--foreground-soft)]">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function SajuLoadingPage({ searchParams }: SajuLoadingPageProps) {
  const params = await searchParams;
  const validated = validateSajuInput({
    name: getSingleValue(params.name),
    gender: getSingleValue(params.gender) as "male" | "female" | undefined,
    birth_date: getSingleValue(params.birth_date),
    birth_time: getSingleValue(params.birth_time),
    mode: getSingleValue(params.mode) === "ai" ? "ai" : "no-ai",
  });

  if (!validated.success) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
        <GlassError errors={validated.errors} />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <SajuLoadingScreen profile={validated.data} />
    </main>
  );
}
