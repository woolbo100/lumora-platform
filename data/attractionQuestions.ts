import { type AttractionQuestion } from "@/types/attraction";

export const attractionQuestions: AttractionQuestion[] = [
  {
    id: 1,
    question: "처음 만난 자리에서 사람들이 가장 먼저 느끼는 당신의 인상은 어떤 편인가요?",
    options: [
      { text: "차분하고 단정해서 자연스럽게 시선이 머문다", type: "elegant", score: 1 },
      { text: "편안하고 밝아서 금방 가까워지고 싶어진다", type: "lovely", score: 1 },
      { text: "조용한데도 묘하게 신경 쓰이는 분위기가 있다", type: "chic", score: 1 },
      { text: "부드럽고 다정해서 마음이 먼저 편해진다", type: "warm", score: 1 },
    ],
  },
  {
    id: 2,
    question: "누군가가 당신에게 끌리기 시작하는 순간은 주로 언제라고 느끼나요?",
    options: [
      { text: "말과 태도에서 정돈된 기준이 느껴질 때", type: "elegant", score: 1 },
      { text: "웃음과 리액션이 자연스럽게 오갈 때", type: "lovely", score: 1 },
      { text: "쉽게 다 읽히지 않는 면이 보일 때", type: "chic", score: 1 },
      { text: "상대 마음을 먼저 알아봐 줄 때", type: "warm", score: 1 },
    ],
  },
  {
    id: 3,
    question: "연애 초반의 당신은 어떤 에너지로 기억되는 편인가요?",
    options: [
      { text: "과하지 않지만 고급스럽고 안정적인 사람", type: "elegant", score: 1 },
      { text: "사랑스럽고 자꾸 더 보고 싶은 사람", type: "lovely", score: 1 },
      { text: "차갑지 않은데도 거리감이 매력적인 사람", type: "chic", score: 1 },
      { text: "마음을 놓게 만드는 따뜻한 사람", type: "warm", score: 1 },
    ],
  },
  {
    id: 4,
    question: "사람들과 있을 때 당신의 존재감은 어떤 방식으로 드러나나요?",
    options: [
      { text: "앞으로 나서지 않아도 분위기의 중심이 된다", type: "elegant", score: 1 },
      { text: "밝고 친근한 기운으로 공간을 부드럽게 만든다", type: "lovely", score: 1 },
      { text: "말수는 적어도 유독 시선이 머문다", type: "chic", score: 1 },
      { text: "누군가 옆에 있고 싶어지는 편안함이 있다", type: "warm", score: 1 },
    ],
  },
  {
    id: 5,
    question: "감정 표현을 할 때 당신에게 가장 자연스러운 방식은 무엇인가요?",
    options: [
      { text: "짙지 않아도 진심이 느껴지는 단정한 표현", type: "elegant", score: 1 },
      { text: "애정과 관심을 아낌없이 보여주는 표현", type: "lovely", score: 1 },
      { text: "직설적이지 않지만 여운을 남기는 표현", type: "chic", score: 1 },
      { text: "상대의 감정을 살피며 따뜻하게 건네는 표현", type: "warm", score: 1 },
    ],
  },
  {
    id: 6,
    question: "누군가가 당신을 오래 기억하는 이유는 어디에 가깝다고 생각하나요?",
    options: [
      { text: "시간이 갈수록 더 느껴지는 품위와 안정감", type: "elegant", score: 1 },
      { text: "함께 있으면 기분이 환해지는 사랑스러움", type: "lovely", score: 1 },
      { text: "쉽게 설명되지 않는 세련된 긴장감", type: "chic", score: 1 },
      { text: "마음을 편하게 해주는 정서적 온도", type: "warm", score: 1 },
    ],
  },
  {
    id: 7,
    question: "친해질수록 더 크게 느껴지는 당신의 장점은 무엇인가요?",
    options: [
      { text: "흔들리지 않는 균형감과 신뢰감", type: "elegant", score: 1 },
      { text: "사소한 순간까지 챙기는 다정함", type: "lovely", score: 1 },
      { text: "쉽게 닳지 않는 자기만의 무드", type: "chic", score: 1 },
      { text: "상대의 마음을 잘 읽는 공감력", type: "warm", score: 1 },
    ],
  },
  {
    id: 8,
    question: "누군가 고민을 털어놓을 때 당신은 어떤 반응을 보이나요?",
    options: [
      { text: "감정에 휘둘리지 않고 차분하게 정리해준다", type: "elegant", score: 1 },
      { text: "먼저 기분을 풀어주며 다정하게 들어준다", type: "lovely", score: 1 },
      { text: "핵심만 조용히 짚어주며 생각하게 만든다", type: "chic", score: 1 },
      { text: "상대 감정을 세심하게 받아주며 안심시킨다", type: "warm", score: 1 },
    ],
  },
  {
    id: 9,
    question: "당신의 스타일이나 분위기를 한 단어로 말하면 어디에 더 가까운가요?",
    options: [
      { text: "우아함", type: "elegant", score: 1 },
      { text: "사랑스러움", type: "lovely", score: 1 },
      { text: "매혹", type: "chic", score: 1 },
      { text: "따뜻함", type: "warm", score: 1 },
    ],
  },
  {
    id: 10,
    question: "연애에서 당신이 가장 빛나는 순간은 언제인가요?",
    options: [
      { text: "감정에 휩쓸리지 않고 관계의 중심을 잡아줄 때", type: "elegant", score: 1 },
      { text: "상대가 사랑받고 있다고 느끼게 해줄 때", type: "lovely", score: 1 },
      { text: "한 번 더 알고 싶게 만드는 여운을 남길 때", type: "chic", score: 1 },
      { text: "상대가 편하게 기대올 수 있게 만들어줄 때", type: "warm", score: 1 },
    ],
  },
  {
    id: 11,
    question: "당신이 호감을 표현할 때 주변이 가장 많이 느끼는 것은 무엇인가요?",
    options: [
      { text: "과하지 않아도 진중한 진심이 느껴진다", type: "elegant", score: 1 },
      { text: "사소한 표현까지 귀엽고 다정하게 전달된다", type: "lovely", score: 1 },
      { text: "가볍지 않아서 더 궁금해진다", type: "chic", score: 1 },
      { text: "이해받는 기분이 들어 금방 마음이 열린다", type: "warm", score: 1 },
    ],
  },
  {
    id: 12,
    question: "모임이나 대화 자리에서 사람들이 당신에게 기대는 이유는 무엇 같나요?",
    options: [
      { text: "말과 행동이 안정적이라 믿음이 간다", type: "elegant", score: 1 },
      { text: "함께 있으면 긴장이 풀리고 분위기가 좋아진다", type: "lovely", score: 1 },
      { text: "쉽게 흔들리지 않는 분위기가 멋있게 느껴진다", type: "chic", score: 1 },
      { text: "판단보다 이해를 먼저 해주는 사람처럼 느껴진다", type: "warm", score: 1 },
    ],
  },
  {
    id: 13,
    question: "사진이나 메시지처럼 비대면으로도 전해지는 당신의 매력은 무엇인가요?",
    options: [
      { text: "군더더기 없이 정리된 감각이 보인다", type: "elegant", score: 1 },
      { text: "작은 표현 하나에도 친근함이 담긴다", type: "lovely", score: 1 },
      { text: "짧아도 강한 인상을 남기는 결이 있다", type: "chic", score: 1 },
      { text: "문장만 봐도 마음이 따뜻해지는 편이다", type: "warm", score: 1 },
    ],
  },
  {
    id: 14,
    question: "누군가 당신을 '또 보고 싶다'고 느끼는 이유는 어떤 쪽에 더 가깝나요?",
    options: [
      { text: "곁에 있으면 자연스럽게 더 좋은 사람이 되고 싶어진다", type: "elegant", score: 1 },
      { text: "함께 있으면 기분이 부드럽고 사랑스럽게 변한다", type: "lovely", score: 1 },
      { text: "한 번에 다 보이지 않아 자꾸 생각나게 된다", type: "chic", score: 1 },
      { text: "마음이 편해져서 다시 찾게 되는 안정감이 있다", type: "warm", score: 1 },
    ],
  },
  {
    id: 15,
    question: "갈등이나 오해가 생겼을 때 당신의 기본 태도는 어떤 편인가요?",
    options: [
      { text: "감정선을 정리한 뒤 품위 있게 대화하려 한다", type: "elegant", score: 1 },
      { text: "서로의 마음이 상하지 않게 분위기를 풀려 한다", type: "lovely", score: 1 },
      { text: "쉽게 흔들리지 않고 필요한 말만 남긴다", type: "chic", score: 1 },
      { text: "상대가 왜 그렇게 느꼈는지부터 이해하려 한다", type: "warm", score: 1 },
    ],
  },
  {
    id: 16,
    question: "당신이 가장 자연스럽게 예뻐 보이는 순간은 언제인가요?",
    options: [
      { text: "정돈된 분위기 안에서 차분히 집중하고 있을 때", type: "elegant", score: 1 },
      { text: "웃고 공감하며 마음을 나누고 있을 때", type: "lovely", score: 1 },
      { text: "조용히 자기 페이스를 지키고 있을 때", type: "chic", score: 1 },
      { text: "누군가를 진심으로 배려하고 있을 때", type: "warm", score: 1 },
    ],
  },
  {
    id: 17,
    question: "누군가가 당신에게 더 깊이 빠지는 지점은 무엇이라고 생각하나요?",
    options: [
      { text: "겉보다 깊은 단단함과 기품을 발견할 때", type: "elegant", score: 1 },
      { text: "밝음 뒤에 있는 세심한 다정함을 느낄 때", type: "lovely", score: 1 },
      { text: "거리감 속에 숨은 진심을 알아챌 때", type: "chic", score: 1 },
      { text: "생각보다 더 깊은 공감과 이해를 받을 때", type: "warm", score: 1 },
    ],
  },
  {
    id: 18,
    question: "인간관계에서 당신이 가장 중요하게 여기는 매력의 결은 무엇인가요?",
    options: [
      { text: "예의와 품위가 느껴지는 안정된 태도", type: "elegant", score: 1 },
      { text: "가까운 온도와 사랑스러운 친근함", type: "lovely", score: 1 },
      { text: "자기만의 세계가 느껴지는 선명한 무드", type: "chic", score: 1 },
      { text: "상대가 편히 머물 수 있는 다정한 온기", type: "warm", score: 1 },
    ],
  },
  {
    id: 19,
    question: "당신이 무의식적으로 자주 주는 인상은 어떤 편인가요?",
    options: [
      { text: "말하지 않아도 단정하고 품격 있어 보인다", type: "elegant", score: 1 },
      { text: "귀엽고 사랑스러운 분위기가 묻어난다", type: "lovely", score: 1 },
      { text: "조용한데도 묘하게 도회적인 느낌이 있다", type: "chic", score: 1 },
      { text: "가까이 가면 포근할 것 같은 인상을 준다", type: "warm", score: 1 },
    ],
  },
  {
    id: 20,
    question: "시간이 지날수록 더 크게 느껴지는 당신의 진짜 매력은 무엇인가요?",
    options: [
      { text: "화려하지 않아도 오래 남는 우아한 존재감", type: "elegant", score: 1 },
      { text: "가까워질수록 더 깊어지는 사랑스러운 친밀감", type: "lovely", score: 1 },
      { text: "알수록 더 선명해지는 시크한 매혹", type: "chic", score: 1 },
      { text: "곁에 있을수록 빛나는 공감형 따뜻함", type: "warm", score: 1 },
    ],
  },
];
