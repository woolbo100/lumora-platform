import { type AuraChakraKey, type AuraColorProfile, type AuraColorTone, type AuraOverallState } from "@/types/auraCode";

export const chakraLabels: Record<AuraChakraKey, string> = {
  root: "루트 차크라",
  sacral: "사크랄 차크라",
  solar: "솔라 플렉서스 차크라",
  heart: "하트 차크라",
  throat: "스로트 차크라",
  thirdEye: "써드아이 차크라",
  crown: "크라운 차크라",
};

export const chakraFocus: Record<AuraChakraKey, string> = {
  root: "안정감과 기반",
  sacral: "감정과 즐거움의 흐름",
  solar: "의지와 자기 신뢰",
  heart: "관계와 마음의 온도",
  throat: "표현과 진심의 전달",
  thirdEye: "직감과 통찰의 감각",
  crown: "의미와 방향에 대한 감각",
};

export const chakraAuraMap: Record<AuraChakraKey, AuraColorProfile> = {
  root: { key: "root", name: "Crimson Aura", hue: "깊은 크림슨 레드" },
  sacral: { key: "sacral", name: "Coral Aura", hue: "따뜻한 오렌지 코랄" },
  solar: { key: "solar", name: "Gold Aura", hue: "선명한 골드 옐로" },
  heart: { key: "heart", name: "Emerald Aura", hue: "맑은 에메랄드 그린" },
  throat: { key: "throat", name: "Sky Blue Aura", hue: "청명한 블루 스카이" },
  thirdEye: { key: "thirdEye", name: "Indigo Aura", hue: "깊은 인디고 바이올렛 블루" },
  crown: { key: "crown", name: "Violet Pearl Aura", hue: "바이올렛과 펄 화이트" },
};

export const auraToneLabels: Record<AuraColorTone, string> = {
  clear: "맑고 밝게 흐르는 결",
  condensed: "조용히 응축된 결",
  intense: "강하게 번지는 결",
  layered: "여러 층이 교차하는 결",
};

export const overallStateBadgeMap: Record<AuraOverallState, string> = {
  "blocked-dominant": "잠긴 흐름",
  "overactive-dominant": "강하게 번지는 흐름",
  "balanced-dominant": "맑고 안정적인 흐름",
  mixed: "전환의 흐름",
};

export const overallSummaryMap: Record<AuraOverallState, string> = {
  "blocked-dominant":
    "지금의 당신은 안으로 조용히 긴장과 감정을 붙잡고 있는 흐름에 가깝습니다. 겉으로는 차분해 보여도, 내면에서는 안정과 확신을 다시 세우려는 움직임이 느껴집니다.",
  "overactive-dominant":
    "지금의 당신은 에너지가 바깥으로 강하게 뻗어 나가는 흐름에 가깝습니다. 감정과 의지가 빠르게 움직이는 만큼, 내면의 균형을 다시 고르게 맞춰주는 시간이 필요할 수 있습니다.",
  "balanced-dominant":
    "지금의 당신은 감정과 에너지가 비교적 자연스럽게 흐르는 상태에 가깝습니다. 억누르지도 과하게 밀어붙이지도 않으면서, 자신만의 결을 안정적으로 유지하고 있습니다.",
  mixed:
    "지금의 당신은 몇 가지 에너지가 동시에 흔들리며 변화의 문턱에 서 있는 흐름에 가깝습니다. 막힘과 열림이 함께 느껴지는 시기인 만큼, 지금의 감정을 세밀하게 바라보는 것이 중요합니다.",
};

export const closingMessage =
  "오라는 고정된 것이 아니라, 감정과 삶의 흐름에 따라 달라지는 현재의 결입니다. 지금의 결과는 당신을 판단하는 답이 아니라, 지금 내면이 어떤 방향으로 움직이고 있는지를 비춰보는 작은 단서입니다.";
