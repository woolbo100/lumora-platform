import { type AttachmentQuestion } from "@/types/attachment";

export const attachmentQuestions: AttachmentQuestion[] = [
  {
    id: 1,
    question: "연애를 시작할 때 나는 보통…",
    options: [
      { text: "자연스럽게 믿고 편안하게 관계를 이어간다", type: "secure", score: 1 },
      { text: "상대가 나를 얼마나 좋아하는지 계속 확인하고 싶다", type: "anxious", score: 1 },
      { text: "너무 가까워지는 것이 부담스럽다", type: "avoidant", score: 1 },
      { text: "가까워지고 싶지만 동시에 불안하다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 2,
    question: "연락이 늦어질 때 나는…",
    options: [
      { text: "바쁠 수도 있지 하고 넘긴다", type: "secure", score: 1 },
      { text: "혹시 마음이 식은 건 아닐까 불안해진다", type: "anxious", score: 1 },
      { text: "나도 굳이 먼저 연락하지 않는다", type: "avoidant", score: 1 },
      { text: "신경 쓰이지만 티를 내지 않으려 한다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 3,
    question: "상대가 나를 더 좋아하는 것 같을 때 나는…",
    options: [
      { text: "안정감을 느낀다", type: "secure", score: 1 },
      { text: "그 감정이 계속 유지될지 걱정된다", type: "anxious", score: 1 },
      { text: "갑자기 부담스럽고 거리를 두고 싶어진다", type: "avoidant", score: 1 },
      { text: "좋으면서도 어딘가 불편하다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 4,
    question: "갈등이 생겼을 때 나는…",
    options: [
      { text: "대화를 통해 해결하려 한다", type: "secure", score: 1 },
      { text: "상대가 나를 떠날까 봐 더 감정적으로 반응한다", type: "anxious", score: 1 },
      { text: "피하거나 혼자 생각하려 한다", type: "avoidant", score: 1 },
      { text: "말하고 싶지만 쉽게 꺼내지 못한다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 5,
    question: "사랑을 표현할 때 나는…",
    options: [
      { text: "자연스럽고 안정적으로 표현한다", type: "secure", score: 1 },
      { text: "더 많이 표현하고 확인받고 싶다", type: "anxious", score: 1 },
      { text: "표현이 서툴거나 부담스럽다", type: "avoidant", score: 1 },
      { text: "표현하고 싶지만 타이밍을 고민한다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 6,
    question: "상대가 나에게 의존할 때 나는…",
    options: [
      { text: "자연스럽게 받아준다", type: "secure", score: 1 },
      { text: "나도 더 의지하고 싶어진다", type: "anxious", score: 1 },
      { text: "부담스럽고 벗어나고 싶다", type: "avoidant", score: 1 },
      { text: "도와주고 싶지만 동시에 부담된다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 7,
    question: "연애에서 가장 중요한 것은…",
    options: [
      { text: "신뢰와 안정", type: "secure", score: 1 },
      { text: "애정 표현과 확신", type: "anxious", score: 1 },
      { text: "자유와 개인 공간", type: "avoidant", score: 1 },
      { text: "감정과 거리의 균형", type: "fearful", score: 1 },
    ],
  },
  {
    id: 8,
    question: "상대가 감정을 표현하지 않을 때 나는…",
    options: [
      { text: "기다릴 수 있다", type: "secure", score: 1 },
      { text: "불안하고 확인하고 싶어진다", type: "anxious", score: 1 },
      { text: "나도 감정을 닫는다", type: "avoidant", score: 1 },
      { text: "혼란스럽지만 참고 넘긴다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 9,
    question: "이별 후 나는…",
    options: [
      { text: "천천히 회복한다", type: "secure", score: 1 },
      { text: "쉽게 놓지 못하고 오래 생각한다", type: "anxious", score: 1 },
      { text: "빨리 정리하고 거리 둔다", type: "avoidant", score: 1 },
      { text: "잊으려 하지만 계속 떠오른다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 10,
    question: "연애를 하면서 나는…",
    options: [
      { text: "나 자신을 유지한다", type: "secure", score: 1 },
      { text: "상대에게 많이 맞춘다", type: "anxious", score: 1 },
      { text: "나를 지키려 한다", type: "avoidant", score: 1 },
      { text: "맞추다가도 갑자기 거리 둔다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 11,
    question: "상대의 감정 변화에 나는…",
    options: [
      { text: "크게 흔들리지 않는다", type: "secure", score: 1 },
      { text: "매우 민감하게 반응한다", type: "anxious", score: 1 },
      { text: "크게 신경 쓰지 않는다", type: "avoidant", score: 1 },
      { text: "신경 쓰이지만 숨긴다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 12,
    question: "연애 초기에 나는…",
    options: [
      { text: "자연스럽게 가까워진다", type: "secure", score: 1 },
      { text: "빠르게 깊어지고 싶다", type: "anxious", score: 1 },
      { text: "거리를 유지하려 한다", type: "avoidant", score: 1 },
      { text: "가까워지면서도 불안하다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 13,
    question: "상대가 나를 충분히 좋아한다고 느껴질 때…",
    options: [
      { text: "편안하다", type: "secure", score: 1 },
      { text: "계속 확인하고 싶다", type: "anxious", score: 1 },
      { text: "오히려 흥미가 줄어든다", type: "avoidant", score: 1 },
      { text: "기쁘지만 어색하다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 14,
    question: "혼자 있는 시간에 나는…",
    options: [
      { text: "잘 지낸다", type: "secure", score: 1 },
      { text: "외롭고 불안하다", type: "anxious", score: 1 },
      { text: "편하고 좋다", type: "avoidant", score: 1 },
      { text: "좋다가도 허전하다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 15,
    question: "상대와 거리감이 느껴질 때 나는…",
    options: [
      { text: "상황을 이해하려 한다", type: "secure", score: 1 },
      { text: "불안해하며 더 다가간다", type: "anxious", score: 1 },
      { text: "나도 거리를 둔다", type: "avoidant", score: 1 },
      { text: "고민만 하고 행동은 못한다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 16,
    question: "연애에서 나는 보통…",
    options: [
      { text: "균형 잡힌 관계를 만든다", type: "secure", score: 1 },
      { text: "감정이 크게 흔들린다", type: "anxious", score: 1 },
      { text: "감정을 숨기고 조절한다", type: "avoidant", score: 1 },
      { text: "가까워졌다 멀어졌다 한다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 17,
    question: "상대가 나를 필요로 할 때 나는…",
    options: [
      { text: "기꺼이 함께한다", type: "secure", score: 1 },
      { text: "더 인정받고 싶어진다", type: "anxious", score: 1 },
      { text: "부담스럽다", type: "avoidant", score: 1 },
      { text: "도와주지만 거리도 둔다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 18,
    question: "감정이 깊어질수록 나는…",
    options: [
      { text: "더 안정된다", type: "secure", score: 1 },
      { text: "더 불안해진다", type: "anxious", score: 1 },
      { text: "거리를 두고 싶어진다", type: "avoidant", score: 1 },
      { text: "혼란스러워진다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 19,
    question: "상대가 나를 떠날까 걱정될 때 나는…",
    options: [
      { text: "크게 걱정하지 않는다", type: "secure", score: 1 },
      { text: "집착하거나 확인하려 한다", type: "anxious", score: 1 },
      { text: "먼저 마음을 닫는다", type: "avoidant", score: 1 },
      { text: "불안하지만 표현하지 않는다", type: "fearful", score: 1 },
    ],
  },
  {
    id: 20,
    question: "이상적인 연애는…",
    options: [
      { text: "편안하고 안정적인 관계", type: "secure", score: 1 },
      { text: "서로 깊이 연결된 관계", type: "anxious", score: 1 },
      { text: "자유롭고 독립적인 관계", type: "avoidant", score: 1 },
      { text: "감정과 거리의 균형이 있는 관계", type: "fearful", score: 1 },
    ],
  },
];
