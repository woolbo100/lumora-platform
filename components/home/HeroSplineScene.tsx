"use client";

import Spline from "@splinetool/react-spline/next";

type HeroSplineSceneProps = {
  scene: string;
};

export function HeroSplineScene({ scene }: HeroSplineSceneProps) {
  return (
    <div className="pointer-events-none relative h-full w-full">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_58%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,104,217,0.18),transparent_48%),radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="absolute inset-0 scale-[1.12] opacity-55 [mask-image:radial-gradient(circle_at_center,black_0,black_40%,transparent_78%)]">
        <Spline scene={scene} />
      </div>
    </div>
  );
}
