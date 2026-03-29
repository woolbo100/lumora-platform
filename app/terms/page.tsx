import { PolicyPage } from "@/components/shared/PolicyPage";

const sections = [
  {
    title: "1. 서비스 안내",
    body: [
      "본 사이트의 모든 서비스는 참고용 정보와 콘텐츠를 제공하기 위한 목적이며,",
      "법률, 의료, 재무 등 전문적인 판단을 대신하지 않습니다.",
    ],
  },
  {
    title: "2. 이용자의 책임",
    body: [
      "서비스 결과는 사용자의 참고를 위한 자료이며,",
      "최종적인 판단과 선택은 이용자 본인의 책임입니다.",
    ],
  },
  {
    title: "3. 서비스 이용 제한",
    body: [
      "본 사이트의 서비스를 비정상적인 방식으로 이용하거나",
      "운영을 방해하는 행위는 제한될 수 있습니다.",
    ],
  },
  {
    title: "4. 저작권",
    body: [
      "본 사이트에 제공되는 텍스트, 이미지, 해석 결과 및 콘텐츠의 저작권은",
      "운영자 또는 정당한 권리자에게 있습니다.",
      "무단 복제, 배포, 재가공은 허용되지 않습니다.",
    ],
  },
  {
    title: "5. 서비스 변경",
    body: ["본 사이트는 운영상 필요에 따라 일부 서비스 내용이나 구성을 변경할 수 있습니다."],
  },
  {
    title: "6. 문의",
    body: ["서비스 이용 관련 문의는 아래 이메일을 통해 연락 가능합니다."],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      title="이용약관"
      intro={[
        "본 사이트는 사용자의 편의를 위해 다양한 해석 및 콘텐츠 서비스를 제공합니다.",
        "서비스 이용 전 아래 내용을 확인해 주세요.",
      ]}
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
