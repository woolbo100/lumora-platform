type PolicyPageProps = {
  title: string;
  intro?: string[];
  children: React.ReactNode;
};

export function PolicyPage({ title, intro = [], children }: PolicyPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_80px_rgba(6,10,24,0.24)] backdrop-blur-sm sm:px-8 sm:py-10">
        <div className="space-y-5">
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">{title}</h1>
          {intro.length > 0 ? (
            <div className="space-y-3 text-base leading-8 text-[var(--foreground-soft)]">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-10 space-y-8 text-base leading-8 text-[var(--foreground-soft)]">{children}</div>
      </div>
    </main>
  );
}
