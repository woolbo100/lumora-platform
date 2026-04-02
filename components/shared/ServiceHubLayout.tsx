import type { ReactNode } from "react";

type ServiceHubLayoutProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  backgroundVariant?: "default" | "rose";
};

export function ServiceHubLayout({
  children,
  backgroundVariant = "default",
}: ServiceHubLayoutProps) {
  const backgroundClassName =
    backgroundVariant === "rose"
      ? "bg-[radial-gradient(circle_at_top,rgba(244,201,221,0.11),transparent_18%),radial-gradient(circle_at_20%_22%,rgba(122,104,217,0.24),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,182,212,0.14),transparent_25%),radial-gradient(circle_at_52%_62%,rgba(213,195,165,0.1),transparent_32%),linear-gradient(180deg,rgba(17,11,31,0.82)_0%,rgba(15,12,30,0.9)_48%,rgba(10,10,24,0.96)_100%)]"
      : "bg-[radial-gradient(circle_at_top,rgba(213,195,165,0.07),transparent_22%),radial-gradient(circle_at_22%_26%,rgba(122,104,217,0.22),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(120,162,255,0.12),transparent_24%),linear-gradient(180deg,rgba(12,10,25,0.82)_0%,rgba(10,11,24,0.9)_50%,rgba(7,8,18,0.96)_100%)]";

  return (
    <div className="relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 ${backgroundClassName}`} />
      <div className="pointer-events-none absolute left-[14%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(122,104,217,0.2),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(120,162,255,0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.08),transparent_68%)] blur-3xl" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
