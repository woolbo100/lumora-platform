import {
  type EgenVsTetoAnswer,
  type EgenVsTetoResult,
  type EgenVsTetoResultType,
} from "@/types/egenVsTeto";

export function calculateEgenVsTetoScores(answers: EgenVsTetoAnswer[]) {
  const egenScore = answers.filter((answer) => answer === "A").length;
  const tetoScore = answers.filter((answer) => answer === "B").length;

  return { egenScore, tetoScore };
}

export function getEgenVsTetoType(
  egenScore: number,
  tetoScore: number,
): EgenVsTetoResultType {
  if (egenScore >= 14) {
    return "egen";
  }

  if (tetoScore >= 14) {
    return "teto";
  }

  return "mixed";
}

export function getEgenVsTetoResult(
  egenScore: number,
  tetoScore: number,
): EgenVsTetoResult {
  const type = getEgenVsTetoType(egenScore, tetoScore);

  if (type === "egen") {
    return {
      type,
      egenScore,
      tetoScore,
      title: "당신은 에겐형입니다",
      subtitle: "사랑을 깊이 느끼고 표현하는 타입입니다",
      strengths: ["감정 표현이 풍부하고 따뜻함", "상대에게 안정감을 줌"],
      caution: "상대에게 맞추다 지칠 수 있음",
      tip: "감정을 지키면서도 기준을 세우는 것이 중요합니다.",
      shareText: "나 에겐형 나왔는데 너무 맞아ㅋㅋ 너도 해봐",
    };
  }

  if (type === "teto") {
    return {
      type,
      egenScore,
      tetoScore,
      title: "당신은 테토녀형입니다",
      subtitle: "연애에서도 중심을 잃지 않는 타입입니다",
      strengths: ["독립적이고 쿨함", "감정에 휘둘리지 않음"],
      caution: "차갑게 보일 수 있음",
      tip: "조금 더 표현을 늘리면 관계가 더 깊어집니다.",
      shareText: "나 테토녀형 나왔는데 은근 소름이야ㅋㅋ 너도 해봐",
    };
  }

  return {
    type,
    egenScore,
    tetoScore,
    title: "당신은 혼합형입니다",
    subtitle: "상황에 따라 달라지는 유연한 타입입니다",
    strengths: ["균형감 있음", "상황 대응 능력 좋음"],
    caution: "일관성이 부족할 수 있음",
    tip: "자신의 기준을 명확히 하는 것이 중요합니다.",
    shareText: "나 혼합형 나왔는데 꽤 정확하다ㅋㅋ 너도 해봐",
  };
}

export function parseEgenVsTetoResultParams(params: {
  type?: string;
  egen?: string;
  teto?: string;
}) {
  const egenScore = Number(params.egen);
  const tetoScore = Number(params.teto);

  if (!Number.isInteger(egenScore) || !Number.isInteger(tetoScore)) {
    return null;
  }

  if (egenScore < 0 || tetoScore < 0 || egenScore + tetoScore !== 20) {
    return null;
  }

  const computedType = getEgenVsTetoType(egenScore, tetoScore);

  if (
    params.type !== "egen" &&
    params.type !== "teto" &&
    params.type !== "mixed"
  ) {
    return null;
  }

  if (params.type !== computedType) {
    return null;
  }

  return getEgenVsTetoResult(egenScore, tetoScore);
}
