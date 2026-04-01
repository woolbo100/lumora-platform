"use client";

type BlogImageAltPanelProps = {
  imageAltText: string;
};

export function BlogImageAltPanel({ imageAltText }: BlogImageAltPanelProps) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">Image Alt Suggestion</p>
      {imageAltText.trim() ? (
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{imageAltText}</p>
      ) : (
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
          No image alt suggestion yet.
        </p>
      )}
    </section>
  );
}
