import type { ComponentProps } from "react";

import { ServiceHubContent } from "@/components/shared/ServiceHubContent";

type ServiceHubContentConfig = Omit<ComponentProps<typeof ServiceHubContent>, "introTitle"> & {
  introTitle?: string;
};

const WIDE_STEPS = "md:grid-cols-4";
const GRID_FAQ = "space-y-0 grid gap-6 md:grid-cols-2";

export const serviceHubContent: Record<string, ServiceHubContentConfig> = {
  saju: {
    introText: [
      "사주 리딩은 단순한 운세가 아니라 타고난 에너지 구조와 흐름을 분석하는 서비스입니다.",
      "성향, 관계, 재물, 인생 방향까지 전체적인 흐름을 입체적으로 이해할 수 있습니다.",
    ],
    steps: ["생년월일 입력", "오행 및 구조 분석", "흐름 해석", "방향 제시"],
    example: ["현재는 변화를 정리하는 흐름이 강한 시기이며, 새로운 방향으로 전환하는 에너지가 작용하고 있습니다."],
    faqs: [
      { question: "사주로 미래를 맞히는 건가요?", answer: "구조와 흐름을 해석하는 도구입니다." },
      { question: "무료인가요?", answer: "기본 분석은 무료입니다." },
      { question: "어떤 내용을 볼 수 있나요?", answer: "성향, 관계, 재물 흐름 등을 확인할 수 있습니다." },
      { question: "방향 해석까지 볼 수 있나요?", answer: "지금의 흐름과 앞으로의 방향까지 함께 읽을 수 있습니다." },
    ],
    ctaLabel: "사주 리딩 시작하기",
    ctaHref: "/saju/reading",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  naming: {
    introText: [
      "이름은 단순한 호칭이 아니라 에너지 흐름을 보완하고 강화하는 요소입니다.",
      "사주 구조를 기반으로 가장 잘 맞는 이름 방향을 제안합니다.",
    ],
    steps: ["사주 분석", "부족한 기운 파악", "방향 설정", "이름 생성"],
    example: ["지혜로움과 안정감을 보완하고 부드러운 에너지를 강화하는 이름입니다."],
    faqs: [
      { question: "이름도 영향이 있나요?", answer: "이미지와 인식의 흐름에 영향을 줄 수 있습니다." },
      { question: "기준은 무엇인가요?", answer: "오행과 방향 흐름을 기준으로 분석합니다." },
      { question: "브랜드명도 가능한가요?", answer: "가능합니다." },
      { question: "이름 선택 기준도 같이 볼 수 있나요?", answer: "결과와 함께 이름 방향의 근거도 확인할 수 있습니다." },
    ],
    ctaLabel: "무료 이름 추천 받기",
    ctaHref: "/naming/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  tarot: {
    introText: [
      "타로는 현재 상황과 감정 흐름을 반영하여 지금 필요한 방향과 메시지를 보여줍니다.",
      "연애, 관계, 선택의 순간에서 조용한 힌트를 받을 수 있습니다.",
    ],
    steps: ["질문 선택", "카드 선택", "해석 제공", "방향 제시"],
    example: ["지금은 감정 정리가 필요한 시기이며, 성급한 선택은 피하는 것이 좋습니다."],
    faqs: [
      { question: "정확한가요?", answer: "흐름 기반 해석입니다." },
      { question: "어떤 질문이 가능한가요?", answer: "연애, 관계, 선택 모두 가능합니다." },
      { question: "무료인가요?", answer: "기본 리딩은 무료입니다." },
      { question: "카드는 직접 선택하나요?", answer: "질문을 고른 뒤 카드를 직접 선택하는 방식입니다." },
    ],
    ctaLabel: "무료 타로 시작하기",
    ctaHref: "/tarot/select",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  attachment: {
    introText: [
      "애착유형은 관계 안에서 반복되는 감정 반응과 행동 패턴을 설명합니다.",
      "나의 패턴을 이해하면 관계의 흐름도 달라질 수 있습니다.",
    ],
    steps: ["질문 응답", "패턴 분석", "유형 도출", "관계 해석"],
    example: ["가까워질수록 불안을 느끼며 확인을 반복하는 경향이 드러납니다."],
    faqs: [
      { question: "몇 가지 유형이 있나요?", answer: "대표적으로 4가지 유형입니다." },
      { question: "연애에도 적용되나요?", answer: "매우 밀접하게 연결됩니다." },
      { question: "바뀔 수 있나요?", answer: "경험에 따라 변화할 수 있습니다." },
      { question: "개선 방향도 볼 수 있나요?", answer: "결과를 통해 관계 방향과 필요한 포인트도 확인할 수 있습니다." },
    ],
    ctaLabel: "애착유형 분석 시작",
    ctaHref: "/attachment-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  loveCode: {
    introTitle: "러브코드 소개",
    introText: [
      "러브코드는 오늘의 연애 흐름과 행동 힌트를 보다 직관적으로 확인할 수 있도록 설계된 감성 리딩 서비스입니다.",
      "생년월일 기반 별자리 흐름 분석을 바탕으로 현재 관계의 분위기를 읽고, 지금 어떤 태도와 움직임이 어울리는지 차분하게 제안합니다.",
    ],
    steps: ["생년월일 입력", "별자리 흐름 분석", "현재 관계 상태 반영", "오늘의 행동 추천 확인"],
    example: [
      "오늘의 러브코드는 서두르는 고백보다 분위기를 편안하게 만드는 태도에 힘이 실리는 흐름입니다. 확신을 요구하기보다 가볍고 다정한 신호를 먼저 건네는 편이 관계의 온도를 부드럽게 높여줄 수 있습니다.",
    ],
    faqs: [
      {
        question: "궁합 서비스와는 무엇이 다른가요?",
        answer: "상대와의 고정된 궁합보다, 지금 관계에서 어떤 행동이 더 자연스럽게 어울리는지에 초점을 둡니다.",
      },
      {
        question: "별자리만으로 결과가 나오나요?",
        answer: "생년월일 기반 별자리 흐름을 중심으로 보되, 현재 관계의 분위기도 함께 반영합니다.",
      },
      {
        question: "결과는 조언인가요?",
        answer: "정답을 단정하기보다 오늘의 행동 방향을 부드럽게 제안하는 해석형 가이드입니다.",
      },
      {
        question: "시작 전에 준비할 것이 있나요?",
        answer: "생년월일과 현재 관계의 분위기만 정리하면 바로 진행할 수 있습니다.",
      },
    ],
    ctaLabel: "시작하기",
    ctaHref: "/love-code/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  egenTeto: {
    introTitle: "에겐 vs 테토녀 테스트 소개",
    introText: [
      "에겐 vs 테토녀 테스트는 연애 온도, 감정 표현, 거리감에 대한 반응처럼 일상적인 연애 선택을 바탕으로 지금의 연애 본능을 가볍게 읽어보는 테스트입니다.",
      "20문항을 통해 에겐형과 테토형 중 어느 결에 더 가까운지 직관적으로 확인할 수 있고, 결과 문구와 링크도 바로 공유할 수 있습니다.",
    ],
    steps: ["20문항 선택", "에겐 점수와 테토 점수 계산", "결과 유형 확인", "공유 문구와 링크 복사"],
    example: [
      "지금의 당신은 테토녀형에 조금 더 가까운 흐름입니다. 감정에 휘둘리기보다 중심을 지키는 편이지만 표현이 적으면 거리감으로 보일 수 있어 작은 표현 하나가 관계의 온도를 더 부드럽게 만들어 줄 수 있습니다.",
    ],
    faqs: [
      {
        question: "에겐형과 테토형은 무엇이 다른가요?",
        answer: "연애에서 감정 중심으로 움직이는지, 이성적이고 독립적으로 움직이는지의 결을 가볍게 구분해보는 테스트입니다.",
      },
      {
        question: "문항 수가 많아 복잡한가요?",
        answer: "아니요. A/B 선택형 20문항으로 빠르게 진행할 수 있도록 구성했습니다.",
      },
      {
        question: "결과를 공유할 수 있나요?",
        answer: "네. 결과 페이지에서 자동 생성된 문구와 함께 링크를 복사할 수 있습니다.",
      },
      {
        question: "테스트는 얼마나 걸리나요?",
        answer: "20문항 선택형이라 짧은 시간 안에 가볍게 끝낼 수 있습니다.",
      },
    ],
    ctaLabel: "테스트 시작하기",
    ctaHref: "/egen-vs-teto/test",
    ctaClassName:
      "border-white/12 bg-[linear-gradient(135deg,rgba(255,236,236,0.96),rgba(198,176,255,0.96)_48%,rgba(142,116,255,0.95))] text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.34)] hover:-translate-y-0.5 hover:border-white/12 hover:brightness-100",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  lovePattern: {
    introText: [
      "연애는 감정만이 아니라 패턴과 선택의 반복입니다.",
      "당신의 연애 흐름을 분석하여 문제의 원인을 파악합니다.",
    ],
    steps: ["관계 질문 입력", "패턴 분석", "흐름 해석", "개선 방향 제시"],
    example: ["비슷한 유형의 상대를 반복 선택하는 패턴이 드러나고 있습니다."],
    faqs: [
      { question: "왜 같은 문제가 반복되나요?", answer: "패턴이 고정되어 있기 때문입니다." },
      { question: "해결 방법도 나오나요?", answer: "방향성과 함께 제시됩니다." },
      { question: "연애 경험이 없어도 되나요?", answer: "가능합니다." },
      { question: "패턴은 바꿀 수 있나요?", answer: "반복되는 지점을 인식하면 방향을 바꿀 수 있습니다." },
    ],
    ctaLabel: "연애패턴 분석 시작",
    ctaHref: "/relationship-pattern/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  reunion: {
    introText: [
      "관계는 감정만이 아니라 흐름과 타이밍이 중요합니다.",
      "현재 상태를 분석하여 재회 가능성과 방향을 제시합니다.",
    ],
    steps: ["관계 상태 입력", "감정 분석", "흐름 분석", "가능성 해석"],
    example: ["감정은 남아 있지만 지금은 시간이 필요한 흐름입니다."],
    faqs: [
      { question: "재회 확률이 정확한가요?", answer: "흐름 기반 분석입니다." },
      { question: "연락해야 하나요?", answer: "상황에 따라 다릅니다." },
      { question: "언제 가능할까요?", answer: "타이밍에 따라 달라집니다." },
      { question: "감정 상태도 함께 반영되나요?", answer: "현재 관계 상태와 감정 흐름을 함께 읽어 결과를 제시합니다." },
    ],
    ctaLabel: "재회 가능성 확인하기",
    ctaHref: "/reunion-test/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  charm: {
    introText: [
      "매력은 외모가 아니라 분위기와 에너지의 조합입니다.",
      "자신의 매력을 이해하면 관계가 달라집니다.",
    ],
    steps: ["질문 응답", "패턴 분석", "매력 유형 도출", "관계 해석"],
    example: ["부드러우면서도 중심감 있는 인상으로 시간이 지날수록 더 강한 매력이 보입니다."],
    faqs: [
      { question: "매력은 바뀌나요?", answer: "표현 방식에 따라 달라집니다." },
      { question: "연애에도 영향 있나요?", answer: "매우 중요합니다." },
      { question: "첫인상도 알 수 있나요?", answer: "가능합니다." },
      { question: "나에게 어울리는 매력 표현도 알 수 있나요?", answer: "결과를 통해 더 자연스럽게 드러나는 분위기 방향을 확인할 수 있습니다." },
    ],
    ctaLabel: "나의 매력코드 보기",
    ctaHref: "/attraction-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  aura: {
    introText: [
      "오라코드는 감정과 차크라를 따로 떼어 보지 않고, 지금의 분위기와 존재감이 어떤 결로 흐르는지 함께 읽어보는 서비스입니다.",
      "21개의 질문을 통해 주요 차크라의 상태, 감정 흐름, 오라 색상을 상징적인 언어로 해석하고 자기이해에 가까운 리포트를 제공합니다.",
    ],
    steps: ["21문항 응답", "감정 흐름 분석", "차크라 중심 해석", "오라 색상 리포트 확인"],
    example: [
      "지금의 오라는 바이올렛과 블루 쪽으로 기울어 있으며, 하트 차크라와 쓰로트 차크라가 함께 열려 있습니다. 겉으로는 조용하지만 내면에서는 직감과 공감이 동시에 움직이며 사람과 공감대를 넓게 만드는 흐름이 강해집니다.",
    ],
    faqs: [
      {
        question: "심리 진단이나 의료 검사는 아닌가요?",
        answer: "아니요. 자기이해와 감정 흐름을 보는 감성 해석형 테스트입니다.",
      },
      {
        question: "차크라와 오라는 어떻게 보여주나요?",
        answer: "주요 차크라의 상태, 감정 흐름, 오라 색상을 함께 묶어 읽어드립니다.",
      },
      {
        question: "무료로 이용할 수 있나요?",
        answer: "네. 무료 체험형 서비스로 바로 확인하실 수 있습니다.",
      },
      {
        question: "오라 색상은 반복되는 감정과도 연결되나요?",
        answer: "반복되는 감정 흐름과 차크라의 반응이 함께 쌓여 색상으로 드러날 수 있습니다.",
      },
    ],
    ctaLabel: "오라코드 시작",
    ctaHref: "/aura-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  dream: {
    introText: [
      "꿈은 현재 감정과 상황을 반영하는 상징입니다. 같은 꿈이라도 해석은 달라질 수 있습니다.",
      "이 서비스는 상징과 흐름을 함께 분석합니다.",
    ],
    steps: ["꿈 입력", "키워드 분석", "상징 해석", "흐름 분석"],
    example: ["물이 넘치는 꿈은 감정의 변화와 흐름을 보여주는 경우가 많습니다."],
    faqs: [
      { question: "꿈은 왜 꾸나요?", answer: "무의식의 반영입니다." },
      { question: "의미가 항상 있나요?", answer: "대부분 감정과 연결됩니다." },
      { question: "반복되는 꿈은요?", answer: "해결되지 않은 신호일 수 있습니다." },
      { question: "기억이 흐린 꿈도 해석할 수 있나요?", answer: "남아 있는 장면과 감정만으로도 흐름을 읽을 수 있습니다." },
    ],
    ctaLabel: "무료 꿈해몽 시작",
    ctaHref: "/dream/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  emotion: {
    introText: [
      "감정은 현재 상태를 알려주는 중요한 신호입니다.",
      "지금의 감정을 이해하면 방향을 찾을 수 있습니다.",
    ],
    steps: ["감정 입력", "상태 분석", "흐름 해석", "확언 제안"],
    example: ["지금은 에너지가 분산된 상태이며 정리와 안정이 필요한 시기입니다."],
    faqs: [
      { question: "감정은 왜 중요한가요?", answer: "상태를 알려주는 신호입니다." },
      { question: "확언은 무엇인가요?", answer: "방향을 강화하는 문장입니다." },
      { question: "감정 기록은 어떻게 활용되나요?", answer: "반복되는 흐름을 읽고 나를 이해하는 데 도움이 됩니다." },
      { question: "매일 사용해도 되나요?", answer: "가능합니다." },
    ],
    ctaLabel: "감정 리딩 시작하기",
    ctaHref: "/emotion/start",
    ctaClassName:
      "border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] hover:brightness-100",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
};
