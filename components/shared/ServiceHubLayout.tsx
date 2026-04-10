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
      {/* ServiceHubLayout 고유 배경 레이어들을 제거하여 통배경과 일치시킴 */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
