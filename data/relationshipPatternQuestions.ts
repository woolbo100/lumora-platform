import { type RelationshipPatternQuestion } from "@/types/relationshipPattern";

export const relationshipPatternQuestions: RelationshipPatternQuestion[] = [
  {
    id: 1,
    question: "연락이 조금 뜸해졌을 때, 내 마음은 보통 어디로 먼저 움직이나요?",
    options: [
      { text: "무슨 일 있나 싶어 계속 확인하고 싶어진다", type: "immersive", score: 1 },
      { text: "내가 더 다정했어야 했나 하고 스스로를 돌아본다", type: "sacrificial", score: 1 },
      { text: "오히려 나도 템포를 줄이며 거리를 둔다", type: "distant", score: 1 },
      { text: "괜찮다가도 서운함과 불안이 번갈아 올라온다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 2,
    question: "좋아하는 사람이 생기면 가장 먼저 드러나는 나의 태도는 무엇에 가까운가요?",
    options: [
      { text: "빠르게 가까워지고 싶어 마음을 크게 쏟는다", type: "immersive", score: 1 },
      { text: "상대가 편안하도록 나를 맞추며 배려한다", type: "sacrificial", score: 1 },
      { text: "좋아도 너무 빨라질까 봐 속도를 조절한다", type: "distant", score: 1 },
      { text: "설레지만 동시에 겁도 나서 마음이 흔들린다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 3,
    question: "연애에서 내가 가장 중요하게 여기는 가치는 무엇인가요?",
    options: [
      { text: "깊은 연결감과 서로에게 몰입하는 느낌", type: "immersive", score: 1 },
      { text: "상대가 나로 인해 더 편안하고 안정되는 것", type: "sacrificial", score: 1 },
      { text: "서로의 공간을 존중하는 적당한 거리감", type: "distant", score: 1 },
      { text: "감정이 크게 흔들리지 않는 안정감", type: "stable", score: 1 },
    ],
  },
  {
    id: 4,
    question: "다툼이 생겼을 때 가장 먼저 하는 반응은 무엇인가요?",
    options: [
      { text: "끝까지 붙잡고 지금 풀어야 마음이 놓인다", type: "immersive", score: 1 },
      { text: "내가 먼저 사과하며 분위기를 가라앉히려 한다", type: "sacrificial", score: 1 },
      { text: "일단 혼자 정리할 시간이 필요하다고 느낀다", type: "distant", score: 1 },
      { text: "감정이 커져서 말보다 기분이 먼저 터진다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 5,
    question: "상대가 힘들어 보일 때, 나는 보통 어떻게 움직이나요?",
    options: [
      { text: "내 일처럼 깊이 들어가 함께 해결하려 한다", type: "immersive", score: 1 },
      { text: "내 감정보다 상대를 먼저 챙기며 버텨준다", type: "sacrificial", score: 1 },
      { text: "도와주고 싶지만 너무 깊이 얽히지 않으려 한다", type: "distant", score: 1 },
      { text: "안쓰럽다가도 내가 감당 못 할까 불안해진다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 6,
    question: "상대가 애정을 표현할 때 가장 자연스러운 반응은 무엇인가요?",
    options: [
      { text: "나도 더 크게 표현하고 싶어진다", type: "immersive", score: 1 },
      { text: "고맙고 미안해서 더 잘해주고 싶어진다", type: "sacrificial", score: 1 },
      { text: "좋지만 너무 훅 들어오면 살짝 물러난다", type: "distant", score: 1 },
      { text: "기쁘면서도 이게 오래갈지 먼저 걱정된다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 7,
    question: "내가 서운함을 느꼈을 때 가장 자주 나오는 행동은 무엇인가요?",
    options: [
      { text: "바로 표현하고 상대 반응을 확인한다", type: "immersive", score: 1 },
      { text: "티 내기보다 참다가 혼자 소화한다", type: "sacrificial", score: 1 },
      { text: "말수부터 줄이고 마음의 문을 닫는다", type: "distant", score: 1 },
      { text: "괜찮은 척하다가 한 번에 크게 터진다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 8,
    question: "연애 초반, 상대의 반응이 기대보다 느릴 때 나는 어떻게 해석하나요?",
    options: [
      { text: "혹시 마음이 덜한가 싶어 더 신경 쓰인다", type: "immersive", score: 1 },
      { text: "내가 부담을 줬나 싶어 조심스러워진다", type: "sacrificial", score: 1 },
      { text: "그럴 수도 있지 하며 내 리듬을 지킨다", type: "stable", score: 1 },
      { text: "괜찮다고 생각하다가도 혼자 상상을 키운다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 9,
    question: "관계가 깊어질수록 내가 더 신경 쓰는 부분은 무엇인가요?",
    options: [
      { text: "서로가 같은 깊이로 연결되어 있는지", type: "immersive", score: 1 },
      { text: "상대가 나 때문에 불편하지는 않은지", type: "sacrificial", score: 1 },
      { text: "내 생활과 감정선이 침범받지 않는지", type: "distant", score: 1 },
      { text: "지금의 평온함이 깨지지 않을지", type: "stable", score: 1 },
    ],
  },
  {
    id: 10,
    question: "이별의 기미를 느끼면 가장 먼저 떠오르는 생각은 무엇인가요?",
    options: [
      { text: "어떻게든 붙잡아서 다시 이어가고 싶다", type: "immersive", score: 1 },
      { text: "내가 더 잘했으면 달라졌을까 생각한다", type: "sacrificial", score: 1 },
      { text: "상처받기 전에 먼저 마음을 정리한다", type: "distant", score: 1 },
      { text: "붙잡고 싶다가도 도망치고 싶어진다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 11,
    question: "상대의 일정이나 감정 기복이 바쁠 때 나는 어떻게 반응하나요?",
    options: [
      { text: "혹시 나를 덜 생각하나 예민해진다", type: "immersive", score: 1 },
      { text: "이럴 때일수록 더 맞춰줘야 한다고 생각한다", type: "sacrificial", score: 1 },
      { text: "나도 내 일상으로 물러나며 거리를 둔다", type: "distant", score: 1 },
      { text: "마음이 출렁이지만 애써 괜찮은 척한다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 12,
    question: "연애를 할수록 내가 자주 놓치게 되는 것은 무엇인가요?",
    options: [
      { text: "상대와 나를 분리해서 보는 시선", type: "immersive", score: 1 },
      { text: "내 감정과 욕구를 먼저 챙기는 일", type: "sacrificial", score: 1 },
      { text: "따뜻하게 표현하며 다가가는 용기", type: "distant", score: 1 },
      { text: "기분에 휩쓸리지 않는 균형감", type: "emotional", score: 1 },
    ],
  },
  {
    id: 13,
    question: "상대가 '네가 편해'라고 말할 때 가장 가까운 마음은 무엇인가요?",
    options: [
      { text: "더 특별한 존재가 되고 싶어 욕심이 난다", type: "immersive", score: 1 },
      { text: "다행이다 싶으면서도 더 잘해야 할 것 같다", type: "sacrificial", score: 1 },
      { text: "편하다는 말이 가장 좋은 칭찬처럼 느껴진다", type: "stable", score: 1 },
      { text: "기쁘지만 갑자기 멀어질까 봐 겁도 난다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 14,
    question: "혼자만의 시간이 필요할 때 나는 보통 어떻게 말하나요?",
    options: [
      { text: "말하면서도 상대 반응이 걱정돼 길게 설명한다", type: "immersive", score: 1 },
      { text: "상처 줄까 봐 내 필요를 미루는 편이다", type: "sacrificial", score: 1 },
      { text: "명확하게 선을 긋고 혼자 있는 시간을 확보한다", type: "distant", score: 1 },
      { text: "필요하다고 느끼지만 말하는 순간 죄책감이 든다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 15,
    question: "상대에게 기대고 싶을 때, 실제로 나는 어떻게 행동하나요?",
    options: [
      { text: "티를 강하게 내며 확실한 반응을 원한다", type: "immersive", score: 1 },
      { text: "기대고 싶어도 상대 상황을 먼저 살핀다", type: "sacrificial", score: 1 },
      { text: "스스로 해결하고 지나가는 편이 더 익숙하다", type: "distant", score: 1 },
      { text: "기대고 싶다가도 괜히 실망할까 멈춘다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 16,
    question: "관계가 편안하게 유지될 때 내 안에서 커지는 생각은 무엇인가요?",
    options: [
      { text: "이 평온함을 더 깊은 연결로 키우고 싶다", type: "immersive", score: 1 },
      { text: "계속 이 평온함을 지키기 위해 내가 더 노력해야 한다", type: "sacrificial", score: 1 },
      { text: "이 정도의 거리와 온도가 가장 좋다고 느낀다", type: "distant", score: 1 },
      { text: "이 편안함이 오래가길 바라며 안정을 누린다", type: "stable", score: 1 },
    ],
  },
  {
    id: 17,
    question: "상대가 내게 서운함을 표현했을 때 가장 먼저 드는 마음은 무엇인가요?",
    options: [
      { text: "우리 사이가 멀어질까 바로 붙잡고 싶어진다", type: "immersive", score: 1 },
      { text: "미안함이 커져서 내가 잘못한 부분만 보인다", type: "sacrificial", score: 1 },
      { text: "조금 숨이 막혀서 일단 거리를 두고 싶어진다", type: "distant", score: 1 },
      { text: "억울함과 죄책감이 동시에 올라와 복잡해진다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 18,
    question: "내가 생각하는 건강한 연애에 가장 가까운 장면은 무엇인가요?",
    options: [
      { text: "서로의 하루 안에 깊이 스며드는 관계", type: "immersive", score: 1 },
      { text: "한쪽이 힘들 때 다른 한쪽이 기꺼이 더 보듬는 관계", type: "sacrificial", score: 1 },
      { text: "함께해도 각자의 숨결과 리듬이 살아 있는 관계", type: "distant", score: 1 },
      { text: "예측 가능하고 편안해서 감정이 쉬어가는 관계", type: "stable", score: 1 },
    ],
  },
  {
    id: 19,
    question: "감정이 많이 흔들리는 날, 나는 관계를 어떻게 다루는 편인가요?",
    options: [
      { text: "상대에게 더 가까이 가며 안정감을 찾는다", type: "immersive", score: 1 },
      { text: "내 상태보다 상대 분위기를 먼저 맞춘다", type: "sacrificial", score: 1 },
      { text: "혼자 정리될 때까지 말을 아낀다", type: "distant", score: 1 },
      { text: "기분의 높낮이가 커져 관계도 출렁인다", type: "emotional", score: 1 },
    ],
  },
  {
    id: 20,
    question: "지금의 나는 사랑 안에서 어떤 방향으로 가장 자주 흘러가나요?",
    options: [
      { text: "마음을 깊이 쏟고, 상대와 하나가 되고 싶어진다", type: "immersive", score: 1 },
      { text: "사랑받기보다 잘해주려는 쪽으로 기운다", type: "sacrificial", score: 1 },
      { text: "좋아도 일정한 거리와 여백을 남겨둔다", type: "distant", score: 1 },
      { text: "감정의 파도가 커서 가까움과 멀어짐을 반복한다", type: "emotional", score: 1 },
    ],
  },
];
