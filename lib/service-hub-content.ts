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
      "사주 리딩은 태어난 생년월일과 시간을 바탕으로 기본 오행의 흐름과 선천적인 결을 읽어보는 서비스입니다.",
      "무료 참고용 해석을 통해 지금의 에너지 균형과 나를 이해하는 힌트를 가볍게 확인할 수 있습니다.",
    ],
    steps: ["생년월일 입력", "8글자 계산", "오행 분석", "감성 해석 확인"],
    example: ["지금은 방향을 다시 정리하는 흐름이 강하고, 내면의 균형을 회복하는 시간이 중요하게 읽힙니다."],
    faqs: [
      { question: "사주로 미래를 단정하나요?", answer: "아니요. 무료 참고용 선천코드 해석으로 안내합니다." },
      { question: "출생 시간이 꼭 필요한가요?", answer: "시주까지 보려면 출생시간 입력이 필요합니다." },
      { question: "개인정보를 저장하나요?", answer: "입력값은 결과 생성에만 일시적으로 사용되며 별도 저장하지 않습니다." },
      { question: "정밀 상담도 가능한가요?", answer: "보다 깊은 분석은 별도 리포트나 상담 형태로 확장될 수 있습니다." },
    ],
    ctaLabel: "사주 리딩 시작하기",
    ctaHref: "/saju/reading",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  naming: {
    introText: [
      "이름코드는 이름의 초성을 발음기관 기준 오행으로 해석해, 이름 안에 흐르는 분위기와 리듬을 읽어보는 서비스입니다.",
      "좋은 이름과 나쁜 이름을 판정하지 않고, 이름의 결을 가볍고 직관적으로 이해하는 자기이해 콘텐츠로 구성했습니다.",
    ],
    steps: ["이름 입력", "초성 추출", "오행 분포 계산", "에너지 흐름 해석"],
    example: ["부드럽게 스며드는 발음이 중심을 이루고 있어, 전체 인상은 차분하지만 오래 남는 결로 이어집니다."],
    faqs: [
      { question: "생년월일도 꼭 넣어야 하나요?", answer: "아니요. 이름만으로도 분석할 수 있고, 생년월일은 선택 입력입니다." },
      { question: "개명을 추천하나요?", answer: "아니요. 이름의 흐름을 참고용으로 읽어드리는 서비스입니다." },
      { question: "부족한 기운은 무조건 안 좋은 건가요?", answer: "아니요. 상대적으로 비어 보이는 결을 알려주는 참고 정보입니다." },
      { question: "어떤 결과를 받을 수 있나요?", answer: "초성 리스트, 오행 분포, 에너지 해석, 부족한 기운, 보완 발음 방향을 확인할 수 있습니다." },
    ],
    ctaLabel: "무료 이름코드 시작하기",
    ctaHref: "/naming/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  tarot: {
    introText: [
      "타로는 현재 상황과 감정의 흐름을 상징적으로 비춰보며, 지금 필요한 메시지를 가볍게 읽어보는 서비스입니다.",
      "연애, 관계, 선택의 순간에서 마음을 정리하고 싶은 때 부드러운 힌트로 활용할 수 있습니다.",
    ],
    steps: ["질문 선택", "카드 선택", "상징 해석", "메시지 확인"],
    example: ["지금은 답을 급히 내리기보다 흐름을 관찰하는 쪽이 더 자연스럽게 맞닿는 시기로 읽힙니다."],
    faqs: [
      { question: "타로 결과가 정답인가요?", answer: "아니요. 현재 마음과 상황을 비춰보는 참고용 메시지입니다." },
      { question: "연애 질문도 가능한가요?", answer: "네. 관계, 감정, 선택과 관련된 질문에 모두 활용할 수 있습니다." },
      { question: "무료인가요?", answer: "기본 타로 리딩은 무료로 이용할 수 있습니다." },
      { question: "카드를 직접 고르나요?", answer: "질문에 맞춰 카드를 직접 선택하는 흐름으로 구성되어 있습니다." },
    ],
    ctaLabel: "무료 타로 시작하기",
    ctaHref: "/tarot/select",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  attachment: {
    introText: [
      "애착유형은 관계 안에서 반복되는 감정 반응과 거리감의 패턴을 이해하는 데 도움을 주는 콘텐츠입니다.",
      "내가 어떻게 가까워지고 멀어지는지를 읽어보면 관계의 흐름을 조금 더 선명하게 볼 수 있습니다.",
    ],
    steps: ["질문 응답", "패턴 분석", "유형 확인", "관계 해석"],
    example: ["가까워질수록 불안이 올라오는 반응이 반복된다면, 내면의 확인 욕구를 먼저 읽어보는 것이 도움이 됩니다."],
    faqs: [
      { question: "몇 가지 유형으로 보나요?", answer: "기본적인 애착 패턴을 중심으로 가볍게 안내합니다." },
      { question: "연애에만 적용되나요?", answer: "아니요. 친밀한 인간관계 전반에 참고할 수 있습니다." },
      { question: "유형은 변하지 않나요?", answer: "경험과 인식에 따라 충분히 달라질 수 있습니다." },
      { question: "개선 방향도 알려주나요?", answer: "결과를 통해 관계에서 살펴볼 포인트를 함께 제안합니다." },
    ],
    ctaLabel: "애착유형 분석 시작",
    ctaHref: "/attachment-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  loveCode: {
    introTitle: "러브코드 소개",
    introText: [
      "생년월일을 바탕으로 오늘의 관계 흐름과 분위기를 읽어보는 감성형 서비스입니다.",
      "정답을 주기보다 지금 더 자연스럽게 맞닿는 감정의 결을 부드럽게 안내합니다.",
    ],
    steps: ["생년월일 입력", "관계 흐름 분석", "오늘의 무드 확인", "행동 힌트 받기"],
    example: ["오늘은 마음을 확인받기보다 먼저 분위기를 편안하게 만드는 시도가 더 잘 어울리는 흐름입니다."],
    faqs: [
      { question: "궁합 서비스와 무엇이 다른가요?", answer: "고정된 궁합보다 오늘의 감정 흐름과 행동 방향에 초점을 둡니다." },
      { question: "혼자도 볼 수 있나요?", answer: "네. 현재 감정 상태를 참고하는 용도로도 이용할 수 있습니다." },
      { question: "조언이 강한 편인가요?", answer: "아니요. 감정의 흐름을 해치지 않는 부드러운 가이드 형식입니다." },
      { question: "준비할 정보가 많나요?", answer: "기본적인 생년월일 정보만으로 시작할 수 있습니다." },
    ],
    ctaLabel: "시작하기",
    ctaHref: "/love-code/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  egenTeto: {
    introTitle: "에겐 vs 테토 테스트 소개",
    introText: [
      "에겐 vs 테토 테스트는 감정 표현, 거리감, 관계 반응을 바탕으로 지금의 연애 결을 재미있게 읽어보는 콘텐츠입니다.",
      "짧은 문항을 통해 내 연애 무드가 어느 쪽에 더 가까운지 직관적으로 확인할 수 있습니다.",
    ],
    steps: ["문항 선택", "성향 계산", "결과 확인", "공유 문구 받기"],
    example: ["지금의 나는 감정을 곧바로 표현하기보다, 관계의 공기를 읽으며 천천히 다가가는 쪽에 더 가깝게 보입니다."],
    faqs: [
      { question: "에겐과 테토는 무엇인가요?", answer: "관계에서 드러나는 감정 표현 결을 재미있게 구분해보는 테스트형 지표입니다." },
      { question: "문항이 많은가요?", answer: "가볍게 참여할 수 있는 길이로 구성되어 있습니다." },
      { question: "결과를 공유할 수 있나요?", answer: "네. 결과 문구와 링크를 바로 공유할 수 있습니다." },
      { question: "정확한 심리검사인가요?", answer: "아니요. 자기이해와 재미 중심의 라이트 콘텐츠입니다." },
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
      "연애패턴은 반복되는 감정과 선택의 흐름을 읽어보며, 왜 비슷한 장면이 다시 오는지를 살펴보는 서비스입니다.",
      "관계를 단정하기보다 지금의 패턴을 알아차리는 데 초점을 둡니다.",
    ],
    steps: ["질문 입력", "패턴 분석", "흐름 해석", "관계 힌트 확인"],
    example: ["같은 감정에 자꾸 흔들린다면, 상대보다 먼저 내 반응의 패턴을 읽어보는 것이 도움이 됩니다."],
    faqs: [
      { question: "왜 비슷한 문제가 반복되나요?", answer: "무의식적으로 익숙한 반응을 선택하기 때문일 수 있습니다." },
      { question: "해결 방법도 알려주나요?", answer: "패턴을 이해하고 조절할 수 있는 방향을 함께 제안합니다." },
      { question: "연애 경험이 없어도 가능한가요?", answer: "네. 관계에 대한 현재 반응을 바탕으로도 진행할 수 있습니다." },
      { question: "패턴은 바뀔 수 있나요?", answer: "인식과 경험에 따라 충분히 달라질 수 있습니다." },
    ],
    ctaLabel: "연애패턴 분석 시작",
    ctaHref: "/relationship-pattern/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  reunion: {
    introText: [
      "재회 가능성 서비스는 현재 감정의 흐름과 관계의 거리감을 참고용으로 읽어보는 콘텐츠입니다.",
      "확정적인 답보다, 지금 어떤 태도가 더 자연스러운지에 초점을 맞춥니다.",
    ],
    steps: ["관계 상태 입력", "감정 분석", "재회 흐름 해석", "행동 방향 확인"],
    example: ["감정은 아직 남아 있지만, 지금은 성급한 확인보다 시간을 두고 흐름을 보는 편이 더 어울릴 수 있습니다."],
    faqs: [
      { question: "재회 여부를 단정하나요?", answer: "아니요. 감정과 관계 흐름을 참고용으로 읽어드립니다." },
      { question: "연락해야 할지도 알려주나요?", answer: "상황에 따라 더 자연스러운 방향을 부드럽게 제안합니다." },
      { question: "현재 감정 상태가 반영되나요?", answer: "네. 지금 느끼는 감정과 거리감을 함께 고려합니다." },
      { question: "정밀 상담과 같은가요?", answer: "아니요. 무료 자기이해형 리딩 콘텐츠입니다." },
    ],
    ctaLabel: "재회 가능성 확인하기",
    ctaHref: "/reunion-test/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  charm: {
    introText: [
      "매력코드는 겉모습보다 분위기와 에너지의 결을 읽어, 내가 어떤 인상으로 기억되는지 살펴보는 서비스입니다.",
      "내 매력을 단정하기보다, 자연스럽게 드러나는 무드를 확인하는 데 초점을 둡니다.",
    ],
    steps: ["질문 응답", "분위기 분석", "매력 코드 확인", "표현 방향 읽기"],
    example: ["강하게 밀어붙이기보다 차분한 여운으로 오래 남는 매력이 중심에 놓여 있는 흐름입니다."],
    faqs: [
      { question: "매력은 바뀔 수 있나요?", answer: "표현 방식과 상황에 따라 충분히 다르게 드러날 수 있습니다." },
      { question: "연애에도 도움이 되나요?", answer: "내가 어떤 인상으로 느껴지는지 참고하는 데 도움이 됩니다." },
      { question: "첫인상도 볼 수 있나요?", answer: "네. 분위기와 존재감의 결을 중심으로 읽어드립니다." },
      { question: "정답형 결과인가요?", answer: "아니요. 자기이해용 참고 해석입니다." },
    ],
    ctaLabel: "나의 매력코드 보기",
    ctaHref: "/attraction-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  aura: {
    introText: [
      "아우라코드는 지금의 감정과 분위기를 색과 이미지의 언어로 풀어보는 감성형 서비스입니다.",
      "현재 내 상태를 너무 딱딱하지 않게 읽고 싶을 때 편안하게 활용할 수 있습니다.",
    ],
    steps: ["질문 응답", "감정 흐름 분석", "아우라 해석", "색감 리포트 확인"],
    example: ["지금의 분위기는 잔잔하지만 깊게 번지는 색을 닮아 있어, 겉보다 내면의 울림이 더 크게 느껴집니다."],
    faqs: [
      { question: "심리 진단인가요?", answer: "아니요. 감정과 분위기를 감성적으로 읽어보는 참고용 콘텐츠입니다." },
      { question: "색으로만 보여주나요?", answer: "색감과 함께 감정의 흐름을 문장으로 풀어드립니다." },
      { question: "무료로 이용할 수 있나요?", answer: "기본 결과는 무료로 확인할 수 있습니다." },
      { question: "반복해서 해도 되나요?", answer: "네. 그날의 상태에 따라 다르게 느껴질 수 있습니다." },
    ],
    ctaLabel: "아우라코드 시작",
    ctaHref: "/aura-code/test",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  dream: {
    introText: [
      "꿈해몽은 기억에 남는 장면과 감정의 흐름을 바탕으로, 지금의 마음을 상징적으로 읽어보는 서비스입니다.",
      "꿈을 정답처럼 해석하기보다 현재의 상태를 돌아보는 참고용으로 안내합니다.",
    ],
    steps: ["꿈 입력", "상징 분석", "흐름 해석", "감정 메시지 확인"],
    example: ["물과 길이 함께 나온 꿈은 감정의 이동과 방향 전환에 대한 무의식의 신호로 읽힐 수 있습니다."],
    faqs: [
      { question: "꿈은 왜 기억에 남나요?", answer: "현재 감정이나 무의식의 흐름이 강하게 닿았기 때문일 수 있습니다." },
      { question: "반복되는 꿈도 볼 수 있나요?", answer: "네. 자주 나오는 상징일수록 더 의미 있게 참고할 수 있습니다." },
      { question: "장면이 흐릿해도 가능한가요?", answer: "기억나는 이미지와 감정만으로도 가볍게 읽어볼 수 있습니다." },
      { question: "무료인가요?", answer: "기본 꿈 해석은 무료로 제공됩니다." },
    ],
    ctaLabel: "무료 꿈해몽 시작",
    ctaHref: "/dream/start",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
  emotion: {
    introText: [
      "감정 리딩은 지금의 마음 상태를 문장으로 정리해보고, 감정의 흐름을 부드럽게 읽어보는 서비스입니다.",
      "복잡한 마음을 조금 천천히 들여다보고 싶을 때 가볍게 활용할 수 있습니다.",
    ],
    steps: ["감정 입력", "상태 분석", "흐름 해석", "정리 문장 확인"],
    example: ["감정이 흩어져 있는 날일수록, 먼저 마음의 속도를 늦추는 것이 가장 필요한 흐름일 수 있습니다."],
    faqs: [
      { question: "감정을 기록하면 어떤 도움이 있나요?", answer: "반복되는 흐름과 현재 상태를 알아차리는 데 도움이 됩니다." },
      { question: "조언이 강한가요?", answer: "아니요. 부담 없이 읽을 수 있는 정리형 문장 중심입니다." },
      { question: "매일 해도 되나요?", answer: "네. 그날그날의 감정을 가볍게 점검하는 용도로 사용할 수 있습니다." },
      { question: "전문 상담과 같은가요?", answer: "아니요. 무료 감정 자기이해 콘텐츠입니다." },
    ],
    ctaLabel: "감정 리딩 시작하기",
    ctaHref: "/emotion/start",
    ctaClassName:
      "border-[rgba(229,218,255,0.56)] bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] text-[#1c1830] shadow-[0_24px_70px_rgba(115,88,232,0.28)] hover:-translate-y-0.5 hover:border-[rgba(236,228,255,0.78)] hover:brightness-100",
    stepsClassName: WIDE_STEPS,
    faqClassName: GRID_FAQ,
  },
};
