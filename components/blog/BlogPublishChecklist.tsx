"use client";

type AutoChecklistItem = {
  label: string;
  passed: boolean;
  detail: string;
};

type ManualChecklistState = {
  personalVoiceAdded: boolean;
  naturalToneChecked: boolean;
  adToneChecked: boolean;
  typoChecked: boolean;
  brandToneChecked: boolean;
};

type BlogPublishChecklistProps = {
  autoItems: AutoChecklistItem[];
  aiChecklist: string[];
  manualState: ManualChecklistState;
  onManualChange: (key: keyof ManualChecklistState, value: boolean) => void;
};

function statusStyle(passed: boolean) {
  return passed
    ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
    : "border-amber-300/20 bg-amber-400/10 text-amber-100";
}

export function BlogPublishChecklist({
  autoItems,
  aiChecklist,
  manualState,
  onManualChange,
}: BlogPublishChecklistProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">Publish Checklist</p>
      <p className="mt-2 text-sm leading-7 text-[var(--foreground-muted)]">
        Check these before publishing. Draft save remains available at any time.
      </p>

      <div className="mt-4 space-y-2">
        {autoItems.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border px-3 py-2 text-sm ${statusStyle(item.passed)}`}
          >
            <p className="font-medium">{item.label}</p>
            <p className="text-xs opacity-90">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-[var(--foreground-soft)]">
          <input
            type="checkbox"
            checked={manualState.personalVoiceAdded}
            onChange={(event) => onManualChange("personalVoiceAdded", event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary-strong)]"
          />
          Personal experience/opinion added
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--foreground-soft)]">
          <input
            type="checkbox"
            checked={manualState.naturalToneChecked}
            onChange={(event) => onManualChange("naturalToneChecked", event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary-strong)]"
          />
          Natural formal tone checked
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--foreground-soft)]">
          <input
            type="checkbox"
            checked={manualState.adToneChecked}
            onChange={(event) => onManualChange("adToneChecked", event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary-strong)]"
          />
          No excessive ad-like phrases
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--foreground-soft)]">
          <input
            type="checkbox"
            checked={manualState.typoChecked}
            onChange={(event) => onManualChange("typoChecked", event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary-strong)]"
          />
          Typos/spelling reviewed
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--foreground-soft)] md:col-span-2">
          <input
            type="checkbox"
            checked={manualState.brandToneChecked}
            onChange={(event) => onManualChange("brandToneChecked", event.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary-strong)]"
          />
          Lumora brand tone reflected
        </label>
      </div>

      {aiChecklist.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">AI Suggested Checks</p>
          <div className="mt-2 space-y-1 text-sm leading-7 text-[var(--foreground-soft)]">
            {aiChecklist.map((item) => (
              <p key={item}>- {item}</p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
