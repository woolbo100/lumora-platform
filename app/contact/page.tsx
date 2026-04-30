import Link from "next/link";

import { PolicyPage } from "@/components/shared/PolicyPage";

export default function ContactPage() {
  return (
    <PolicyPage
      title="문의하기"
      intro={[
        "서비스 이용 중 궁금한 점이 있으시거나 제휴 문의를 하시고 싶으실 때는",
        "아래 이메일로 연락해 주세요.",
        "가능한 빠르게 답변드리겠습니다.",
      ]}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">이메일</h2>
        <Link
          href="mailto:buzasun@naver.com"
          className="text-lg text-[var(--color-secondary)] transition hover:text-[var(--foreground)]"
        >
          buzasun@naver.com
        </Link>
      </section>
    </PolicyPage>
  );
}
