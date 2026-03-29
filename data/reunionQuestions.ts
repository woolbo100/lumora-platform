import { type ReunionQuestion } from "@/types/reunion";

export const reunionQuestions: ReunionQuestion[] = [
  {
    id: 1,
    question: "이별 후 지금도 가장 자주 떠오르는 장면은 어떤 순간인가요?",
    options: [
      { text: "아직도 다시 대화가 이어질 것 같은 따뜻한 기억", type: "high", score: 1 },
      { text: "좋았던 기억과 서운했던 장면이 함께 떠오른다", type: "cautious", score: 1 },
      { text: "후회보다 끝났다는 실감이 더 크게 남아 있다", type: "closure", score: 1 },
      { text: "그 사람보다 이제 내 다음 흐름이 더 자주 생각난다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 2,
    question: "최근 상대와의 연락 흐름은 어떤 편에 가장 가까운가요?",
    options: [
      { text: "드물지만 끊기지 않고 이어지는 편이다", type: "high", score: 1 },
      { text: "가끔 연락은 오지만 온도 차가 느껴진다", type: "cautious", score: 1 },
      { text: "거의 없거나 실질적으로 끊긴 상태다", type: "closure", score: 1 },
      { text: "연락 여부보다 내가 먼저 덜 궁금해졌다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 3,
    question: "상대가 나를 아직 완전히 놓지 않았다고 느끼는 순간이 있나요?",
    options: [
      { text: "분명히 있다. 시선이나 반응에서 남은 감정이 느껴진다", type: "high", score: 1 },
      { text: "있긴 하지만 미련인지 습관인지 헷갈린다", type: "cautious", score: 1 },
      { text: "그런 신호를 찾기 어려워졌다", type: "closure", score: 1 },
      { text: "이제 그 신호 자체를 크게 보지 않게 됐다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 4,
    question: "이별의 가장 큰 원인은 지금 돌아보면 무엇에 가까웠나요?",
    options: [
      { text: "오해나 타이밍처럼 다시 조율 가능한 문제였다", type: "high", score: 1 },
      { text: "감정은 있었지만 상처와 피로가 많이 쌓여 있었다", type: "cautious", score: 1 },
      { text: "반복된 갈등이나 가치관 차이가 컸다", type: "closure", score: 1 },
      { text: "이별이 오히려 서로의 흐름을 바꾸는 계기가 됐다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 5,
    question: "지금 재회를 바라는 마음의 결은 어디에 더 가깝나요?",
    options: [
      { text: "다시 만나면 예전보다 더 잘해볼 수 있을 것 같다", type: "high", score: 1 },
      { text: "마음은 남았지만 다시 아플까 봐 조심스럽다", type: "cautious", score: 1 },
      { text: "미련보다 아쉬움 정리를 위해 궁금한 편이다", type: "closure", score: 1 },
      { text: "재회보다 앞으로의 새로운 인연이 더 궁금하다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 6,
    question: "만약 지금 상대에게 연락이 온다면 내 반응은 어떨 것 같나요?",
    options: [
      { text: "자연스럽게 다시 이어질 가능성을 열어둘 것 같다", type: "high", score: 1 },
      { text: "반갑지만 쉽게 마음을 열지는 못할 것 같다", type: "cautious", score: 1 },
      { text: "예의를 지키되 거리를 두고 싶다", type: "closure", score: 1 },
      { text: "이제는 담담하게 받아들이고 지나갈 수 있을 것 같다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 7,
    question: "상대의 현재 상태를 떠올렸을 때 가장 가까운 느낌은 무엇인가요?",
    options: [
      { text: "상대도 여전히 마음 정리를 완전히 못한 것 같다", type: "high", score: 1 },
      { text: "감정은 남았지만 먼저 다가오긴 어려워 보인다", type: "cautious", score: 1 },
      { text: "이미 많이 정리한 것처럼 느껴진다", type: "closure", score: 1 },
      { text: "상대도 나도 각자의 흐름으로 많이 이동한 것 같다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 8,
    question: "이별 이후 내 일상은 어느 정도 회복된 상태인가요?",
    options: [
      { text: "회복은 됐지만 아직 관계의 여운이 분명히 남아 있다", type: "high", score: 1 },
      { text: "겉으론 괜찮지만 마음속은 아직 흔들린다", type: "cautious", score: 1 },
      { text: "꽤 많이 정리되어 예전처럼 흔들리진 않는다", type: "closure", score: 1 },
      { text: "지금은 내 삶의 리듬이 더 중요하게 느껴진다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 9,
    question: "주변 사람들이 이 관계를 바라보는 반응은 어떤가요?",
    options: [
      { text: "다시 잘될 여지가 있다고 보는 편이다", type: "high", score: 1 },
      { text: "가능성은 있지만 신중해야 한다고 말한다", type: "cautious", score: 1 },
      { text: "이미 끝난 관계라고 보는 시선이 많다", type: "closure", score: 1 },
      { text: "이 관계보다 내 다음을 응원하는 분위기다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 10,
    question: "다시 만나게 된다면 가장 걱정되는 부분은 무엇인가요?",
    options: [
      { text: "다시 시작해도 서로 확신을 늦게 줄까 봐 걱정된다", type: "high", score: 1 },
      { text: "좋아도 상처가 남아 예전처럼은 어렵지 않을까 걱정된다", type: "cautious", score: 1 },
      { text: "같은 이유로 또 무너질 가능성이 더 크게 보인다", type: "closure", score: 1 },
      { text: "재회 자체보다 내가 다시 과거로 돌아갈까 걱정된다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 11,
    question: "상대의 SNS나 소식을 볼 때 가장 가까운 감정은 무엇인가요?",
    options: [
      { text: "여전히 내 마음이 움직이고 연결감이 느껴진다", type: "high", score: 1 },
      { text: "궁금하고 신경 쓰이지만 섣불리 다가가긴 어렵다", type: "cautious", score: 1 },
      { text: "보면 마음이 닫히거나 더 정리가 된다", type: "closure", score: 1 },
      { text: "예전만큼 큰 의미를 두지 않게 되었다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 12,
    question: "재회를 생각할 때 내 마음속 기준은 무엇인가요?",
    options: [
      { text: "서로의 감정이 남아 있다면 다시 이어질 수 있다고 본다", type: "high", score: 1 },
      { text: "감정보다 상처 회복과 대화 가능성이 더 중요하다", type: "cautious", score: 1 },
      { text: "감정이 남아도 현실이 안 맞으면 끝이라고 본다", type: "closure", score: 1 },
      { text: "재회보다 지금의 내가 더 좋은 방향으로 가는지가 중요하다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 13,
    question: "그 사람과의 재회가 내 삶에 주는 의미는 어떤가요?",
    options: [
      { text: "아직 끝나지 않은 감정을 완성할 기회처럼 느껴진다", type: "high", score: 1 },
      { text: "원하지만 신중하게 검증해봐야 하는 가능성처럼 느껴진다", type: "cautious", score: 1 },
      { text: "미련을 확인하고 정리하는 마지막 장면처럼 느껴진다", type: "closure", score: 1 },
      { text: "과거보다 앞으로의 방향을 점검하게 하는 계기다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 14,
    question: "지금 이 관계에 가장 필요한 것은 무엇이라고 느끼나요?",
    options: [
      { text: "솔직한 대화와 다시 연결될 작은 계기", type: "high", score: 1 },
      { text: "시간, 거리, 감정 회복을 위한 여유", type: "cautious", score: 1 },
      { text: "미련을 접고 관계를 마무리할 분명한 결론", type: "closure", score: 1 },
      { text: "새로운 시선과 다른 방향으로의 전환", type: "newflow", score: 1 },
    ],
  },
  {
    id: 15,
    question: "지금의 나는 재회 앞에서 어느 쪽에 더 가까운가요?",
    options: [
      { text: "가능성이 있다면 먼저라도 흐름을 만들어보고 싶다", type: "high", score: 1 },
      { text: "원하지만 마음을 지키는 선에서 천천히 보고 싶다", type: "cautious", score: 1 },
      { text: "이제는 현실적으로 정리하는 편이 맞다고 느낀다", type: "closure", score: 1 },
      { text: "재회보다 나의 다음 관계와 삶을 향해 가고 싶다", type: "newflow", score: 1 },
    ],
  },
  {
    id: 16,
    question: "마지막으로, 이 관계를 떠올릴 때 가장 먼저 드는 단어는 무엇인가요?",
    options: [
      { text: "여전히 가능성", type: "high", score: 1 },
      { text: "조심스러운 미련", type: "cautious", score: 1 },
      { text: "끝맺음", type: "closure", score: 1 },
      { text: "새로운 흐름", type: "newflow", score: 1 },
    ],
  },
];
