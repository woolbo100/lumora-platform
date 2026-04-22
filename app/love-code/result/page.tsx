import { LoveCodeResultPanel } from "@/components/love-code/LoveCodeResultPanel";
import { calculateLoveCodeResult, validateLoveCodeInput } from "@/lib/loveCodeCalculator";
import {
  type LoveCodeCurrentSituation,
  type LoveCodeInput,
  type LoveCodeRelationshipStatus,
} from "@/types/loveCode";

type LoveCodeResultPageProps = {
  searchParams: Promise<{
    myBirthDate?: string;
    partnerBirthDate?: string;
    relationshipStatus?: string;
    currentSituation?: string;
  }>;
};

export default async function LoveCodeResultPage({
  searchParams,
}: LoveCodeResultPageProps) {
  const params = await searchParams;
  const input: LoveCodeInput = {
    myBirthDate: params.myBirthDate ?? "",
    partnerBirthDate: params.partnerBirthDate ?? "",
    relationshipStatus: (params.relationshipStatus as LoveCodeRelationshipStatus) ?? "some",
    currentSituation: (params.currentSituation as LoveCodeCurrentSituation) ?? "mutual-no-progress",
  };

  const validated = validateLoveCodeInput(input);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 sm:px-8 lg:px-12">
      <section className="mb-10 w-full text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-secondary)]/60">
          Personal Analysis Report
        </p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          당신의 러브코드
        </h1>
      </section>

      {validated.success ? (
        <LoveCodeResultPanel result={calculateLoveCodeResult(input)} />
      ) : (
        <div className="rounded-[28px] border border-rose-400/24 bg-rose-300/8 p-6 text-base leading-8 text-rose-100">
          {validated.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </main>
  );
}
