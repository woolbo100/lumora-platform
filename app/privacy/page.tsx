import { PolicyPage } from "@/components/shared/PolicyPage";

const sections = [
  {
    title: "1. 수집하는 정보",
    body: [
      "본 사이트는 회원가입 없이 이용 가능하며,",
      "사용자가 입력한 정보는 서비스 결과 제공을 위한 목적으로만 사용됩니다.",
    ],
  },
  {
    title: "2. 정보 사용 목적",
    body: [
      "입력된 정보는 분석 결과 생성에만 사용되며,",
      "별도로 저장되거나 외부로 제공되지 않습니다.",
    ],
  },
  {
    title: "3. 쿠키 및 로그 데이터",
    body: [
      "본 사이트는 Google Analytics를 통해 방문자 데이터를 수집할 수 있으며,",
      "이는 서비스 개선을 위한 목적으로만 사용됩니다.",
    ],
  },
  {
    title: "4. 제3자 제공",
    body: ["본 사이트는 어떠한 개인정보도 제3자에게 제공하지 않습니다."],
  },
  {
    title: "5. 문의",
    body: ["개인정보 관련 문의는 아래 이메일을 통해 연락 가능합니다."],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="개인정보처리방침"
      intro={["본 사이트는 사용자 경험 향상을 위해 최소한의 정보만을 수집합니다."]}
    >
      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{section.title}</h2>
          <div className="space-y-2">
            {section.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <p className="text-base text-[var(--foreground)]">이메일: contact@lumora.site</p>
      </section>
    </PolicyPage>
  );
}
