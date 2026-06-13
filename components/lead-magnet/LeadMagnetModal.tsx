"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type LeadMagnetModalProps = {
  slug: string;
};

type LeadMagnetData = {
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string | null;
};

export function LeadMagnetModal({ slug }: LeadMagnetModalProps) {
  // 모달 제어 상태
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [mounted, setMounted] = useState(false);
  
  // 데이터 로딩 및 오류 상태
  const [data, setData] = useState<LeadMagnetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 신청폼 입력 데이터 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  
  // API 응답 결과 보관 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [relatedUrl, setRelatedUrl] = useState<string | null>(null);

  // 컴포넌트 마운트 시, 포탈을 위한 mounted 설정 및 slug 정보 가져오기
  useEffect(() => {
    setMounted(true);

    async function fetchDetails() {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        
        const res = await fetch(`/api/lead-magnets/detail?slug=${slug}`);
        const result = await res.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setErrorMsg(result.error || "자료 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("자료 로딩 오류:", err);
        setErrorMsg("자료를 찾을 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchDetails();
    }

    return () => setMounted(false);
  }, [slug]);

  // 이스케이프 키 누를 시 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpenModal = () => {
    setIsOpen(true);
    setStep("form");
    setSubmitError(null);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return; // 제출 중에는 닫기 비활성화
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setSubmitError("이름을 입력해 주세요.");
    if (!email.trim()) return setSubmitError("이메일을 입력해 주세요.");
    if (!privacyAgree) return setSubmitError("개인정보 수집 및 이용 동의가 필요합니다.");

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const res = await fetch("/api/lead-magnets/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name,
          email,
          phone,
          privacyAgree,
          marketingAgree,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSignedUrl(result.signedUrl);
        setRelatedUrl(result.relatedUrl);
        setStep("success");
      } else {
        setSubmitError(result.error || "신청 정보를 저장하지 못했습니다.");
      }
    } catch (err) {
      console.error("신청 오류:", err);
      setSubmitError("신청 정보를 저장하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중일 때 스켈레톤 디자인
  if (isLoading) {
    return (
      <div className="my-8 w-full animate-pulse rounded-[24px] border border-white/10 bg-white/2 p-6">
        <div className="h-6 w-1/3 rounded bg-white/10 mb-4"></div>
        <div className="h-4 w-2/3 rounded bg-white/10 mb-2"></div>
        <div className="h-4 w-1/2 rounded bg-white/10 mb-6"></div>
        <div className="h-12 w-full rounded bg-white/10"></div>
      </div>
    );
  }

  // 자료 정보가 없거나 오류가 발생했을 경우 사용자에게 알림 표시 (요구사항 9번)
  if (errorMsg || !data) {
    return (
      <div className="my-8 w-full rounded-[24px] border border-red-500/20 bg-red-500/5 p-6 text-center text-red-400">
        <svg className="mx-auto h-8 w-8 text-red-400/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-sm font-semibold">{errorMsg || "자료를 찾을 수 없습니다."}</p>
        <p className="text-xs text-red-400/60 mt-1">관리자 설정 및 URL 슬러그를 다시 한 번 확인해 주세요.</p>
      </div>
    );
  }

  // 포탈에 주입될 모달 콘텐츠 JSX
  const modalContent = isOpen && (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* 뒷배경 딤드 (클릭 시 모달 닫힘) */}
      <div 
        onClick={handleCloseModal}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
      />

      {/* 모달 창 본체 (반응형: 모바일은 아래에서 올라오는 bottom sheet, PC는 중앙 팝업) */}
      <div className="relative z-10 w-full sm:max-w-lg bg-[#12121f] border border-white/10 rounded-t-[28px] sm:rounded-[28px] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl transition-transform duration-300 translate-y-0 flex flex-col p-6 sm:p-8 text-white">
        
        {/* 닫기 버튼 */}
        <button
          onClick={handleCloseModal}
          type="button"
          disabled={isSubmitting}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition disabled:opacity-40"
        >
          ✕
        </button>

        {/* STEP 1: 신청 정보 작성폼 */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display text-2xl text-[var(--foreground)] tracking-wide mb-1 pr-8">
                {data.title} 신청하기
              </h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                간단히 정보를 작성해주시면 다운로드 링크가 즉시 제공됩니다.
              </p>
            </div>

            {submitError && (
              <div className="p-3 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
                ⚠️ {submitError}
              </div>
            )}

            <div className="space-y-4">
              {/* 이름 입력 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                  이름 <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해 주세요"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition disabled:opacity-50"
                />
              </div>

              {/* 이메일 입력 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                  이메일 주소 <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition disabled:opacity-50"
                />
              </div>

              {/* 연락처 입력 (선택) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                  연락처 <span className="text-xs text-white/30 font-normal">(선택)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition disabled:opacity-50"
                />
              </div>
            </div>

            {/* 동의 사항 목록 */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              {/* 개인정보 수집 및 이용 동의 */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyAgree"
                  checked={privacyAgree}
                  onChange={(e) => setPrivacyAgree(e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500/30"
                />
                <label htmlFor="privacyAgree" className="text-xs text-[var(--foreground-soft)] leading-relaxed cursor-pointer">
                  <span className="font-semibold text-purple-300">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                  <span className="block text-[10px] text-white/40 mt-0.5">이름, 이메일, 연락처는 신청 확인 및 자료 전송 목적에만 사용됩니다.</span>
                </label>
              </div>

              {/* 마케팅 수신 동의 */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketingAgree"
                  checked={marketingAgree}
                  onChange={(e) => setMarketingAgree(e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500/30"
                />
                <label htmlFor="marketingAgree" className="text-xs text-[var(--foreground-soft)] leading-relaxed cursor-pointer">
                  <span className="font-semibold text-white/50">[선택]</span> 루모라의 이벤트 및 마케팅 정보 수신에 동의합니다.
                  <span className="block text-[10px] text-white/40 mt-0.5">다양한 연애/심리 정보와 혜택 소식을 가장 먼저 받아보실 수 있습니다.</span>
                </label>
              </div>
            </div>

            {/* 제출 버튼 (루모라톤 퍼플 그라데이션) */}
            <button
              type="submit"
              disabled={isSubmitting || !privacyAgree}
              className="w-full py-4 rounded-xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white text-sm font-bold tracking-wider transition hover:opacity-95 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/10"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  제출 중...
                </>
              ) : (
                "신청서 제출하고 다운로드하기"
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 신청 완료 화면 */}
        {step === "success" && (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl text-[var(--foreground)] tracking-wide">
                신청이 완료되었습니다!
              </h3>
              <p className="text-sm text-[var(--foreground-soft)] leading-relaxed">
                작성해 주신 이메일로 리드가 등록되었습니다.<br/>
                아래 버튼을 눌러 PDF 전자책을 바로 확인해 보세요.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* PDF 다운로드 버튼 (루모라톤 퍼플 그라데이션) */}
              {signedUrl && (
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white text-sm font-bold tracking-wider shadow-lg shadow-purple-600/15 transition active:scale-98 text-center"
                >
                  📄 PDF 다운로드하기
                </a>
              )}

              {/* 관련 백도화 서비스 링크 버튼 (선택 사항) */}
              {relatedUrl && (
                <a
                  href={relatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[var(--foreground-soft)] text-sm font-bold tracking-wider transition active:scale-98 text-center"
                >
                  ✨ 백도화에서 더 깊은 리포트 보기
                </a>
              )}

              {/* 닫기 버튼 */}
              <button
                onClick={handleCloseModal}
                type="button"
                className="block w-full py-3 text-xs text-[var(--foreground-muted)] hover:text-white transition"
              >
                닫기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );

  return (
    <>
      {/* CTA 박스 (기본 상태로 화면에 렌더링됨) */}
      <div className="relative my-8 overflow-hidden rounded-[24px] border border-purple-500/20 bg-[linear-gradient(135deg,rgba(26,20,44,0.9)_0%,rgba(15,15,26,0.95)_100%)] shadow-2xl backdrop-blur-md">
        {/* 미세한 오로라 백그라운드 효과 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,121,255,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(120,162,255,0.1),transparent_30%)]" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 sm:p-8">
          {/* 썸네일 영역 */}
          {data.thumbnail_url ? (
            <div className="w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-md flex-shrink-0">
              <img src={data.thumbnail_url} alt={data.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-32 md:w-28 md:h-36 rounded-xl border border-dashed border-white/20 bg-white/2 flex items-center justify-center text-[10px] text-white/30 text-center p-2 flex-shrink-0">
              📄<br/>{data.category || "자료"}
            </div>
          )}

          {/* 텍스트 내용 */}
          <div className="flex-1 text-center md:text-left space-y-2">
            {data.category && (
              <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-0.5 text-xs text-purple-300 font-medium">
                {data.category}
              </span>
            )}
            <h3 className="font-display text-xl sm:text-2xl text-[var(--foreground)] tracking-wide">
              {data.title}
            </h3>
            {data.description && (
              <p className="text-sm text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                {data.description}
              </p>
            )}
          </div>

          {/* CTA 신청 버튼 (루모라톤 퍼플 그라데이션) */}
          <div className="w-full md:w-auto flex-shrink-0">
            <button
              onClick={handleOpenModal}
              type="button"
              className="w-full md:w-auto px-6 py-4 rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] text-white text-sm font-bold tracking-wider shadow-lg shadow-purple-600/15 transition hover:opacity-95 active:scale-98 cursor-pointer text-center"
            >
              무료 전자책 신청하고 다운로드하기
            </button>
          </div>
        </div>
      </div>

      {/* 리액트 포탈을 통해 document.body 바로 하위로 렌더링함으로써 상위 transform 레이아웃 왜곡 현상 영구 해결 */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
