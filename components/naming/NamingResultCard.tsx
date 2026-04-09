import { GlassPanel } from "@/components/shared/GlassPanel";
import { type ScoredNamingCandidate } from "@/types/naming";

type NamingResultCardProps = {
  candidate: ScoredNamingCandidate;
  rank: number;
};

export function NamingResultCard({ candidate, rank }: NamingResultCardProps) {
  return (
    <GlassPanel className="result-panel-glow p-6 sm:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Recommendation {rank}
          </p>
          <h3 className="mt-3 font-display text-4xl text-[var(--foreground)]">{candidate.name}</h3>
          <p className="mt-4 text-lg leading-8 text-[var(--foreground-soft)]">{candidate.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {candidate.reasonTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-secondary)]/18 bg-[var(--color-secondary)]/8 px-3 py-1 text-xs font-medium text-[var(--color-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">에너지 설명</p>
          <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
            {candidate.energyDescription}
          </p>
        </div>
        <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">인생 방향 요약</p>
          <p className="mt-3 text-base leading-7 text-[var(--foreground-soft)]">
            {candidate.lifeImpact}
          </p>
        </div>
        <div className="result-card-glow rounded-[22px] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">태그</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.elementTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--foreground-soft)]"
              >
                {tag}
              </span>
            ))}
            {candidate.styleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--foreground-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
