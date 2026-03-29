"use client";

import { type NamingPurpose } from "@/types/naming";

const PURPOSE_OPTIONS: {
  value: NamingPurpose;
  label: string;
  description: string;
}[] = [
  {
    value: "wealth",
    label: "돈 / 사업 / 수익 흐름",
    description: "안정감, 확장성, 결단력, 재물 흐름 강화",
  },
  {
    value: "love",
    label: "연애 / 매력 / 인간관계",
    description: "부드러움, 친밀감, 감정 소통, 호감도 보완",
  },
  {
    value: "brand",
    label: "브랜드 / SNS / 영향력",
    description: "기억성, 존재감, 세련미, 퍼스널 브랜딩 적합성",
  },
  {
    value: "healing",
    label: "힐링 / 자기성장 / 안정",
    description: "정서적 안정, 균형, 자기 수용, 편안한 흐름",
  },
];

type NamingPurposeSelectorProps = {
  value: NamingPurpose;
  onChange: (value: NamingPurpose) => void;
};

export function NamingPurposeSelector({ value, onChange }: NamingPurposeSelectorProps) {
  return (
    <div className="grid gap-3">
      {PURPOSE_OPTIONS.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-[24px] border p-5 text-left transition ${
              selected
                ? "border-[var(--color-secondary)]/48 bg-[linear-gradient(135deg,rgba(213,195,165,0.18),rgba(122,104,217,0.14)_62%,rgba(255,255,255,0.04))]"
                : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_58%,rgba(12,14,28,0.22))] hover:border-white/18"
            }`}
          >
            <p className="text-base font-semibold text-[var(--foreground)]">{option.label}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{option.description}</p>
          </button>
        );
      })}
    </div>
  );
}
