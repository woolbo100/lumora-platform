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
  const accentGlowClassName =
    backgroundVariant === "rose"
      ? "bg-[radial-gradient(circle_at_18%_20%,rgba(244,201,221,0.14),transparent_26%),radial-gradient(circle_at_78%_20%,rgba(203,132,255,0.12),transparent_28%),radial-gradient(circle_at_50%_52%,rgba(167,110,245,0.1),transparent_34%)]"
      : "bg-[radial-gradient(circle_at_18%_20%,rgba(214,156,255,0.12),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(169,126,255,0.1),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(132,96,224,0.08),transparent_34%)]";

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,12,39,0.03)_0%,rgba(24,11,37,0.06)_44%,rgba(17,7,27,0.12)_100%)]" />
      <div className={`pointer-events-none absolute inset-0 ${accentGlowClassName}`} />
      <div className="pointer-events-none absolute inset-x-[-8%] top-[-6%] h-[28rem] bg-[radial-gradient(ellipse_at_center,rgba(184,132,255,0.16)_0%,rgba(137,96,224,0.1)_34%,rgba(58,30,94,0.04)_58%,transparent_80%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[-12%] top-[32%] h-[24rem] bg-[radial-gradient(ellipse_at_center,rgba(142,104,228,0.08)_0%,rgba(91,50,155,0.04)_32%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(10,4,20,0.06)_48%,rgba(7,2,14,0.18)_74%,rgba(4,1,10,0.34)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
