"use client";

import Spline from "@splinetool/react-spline/next";

type HeroSplineSceneProps = {
  scene: string;
};

export function HeroSplineScene({ scene }: HeroSplineSceneProps) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-[10%] top-[8%] h-[72%] rounded-full bg-[radial-gradient(circle,rgba(213,195,165,0.16),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_70%_65%,rgba(122,104,217,0.24),transparent_35%),linear-gradient(180deg,rgba(8,10,24,0.1),rgba(8,10,24,0.44))]" />
      <Spline scene={scene} />
    </div>
  );
}
