"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { submitFreebieDownload } from "@/app/freebies/actions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type ResultDownloadActionProps = {
  source: string;        // 테스트명 (예: 재회 가능성 테스트)
  interest: string;      // 카테고리 (예: 재회)
  testResult: string;    // 결과 유형명 (예: 가능성 높음형)
  targetId?: string;     // PDF로 저장할 DOM 영역의 ID
};

export function ResultDownloadAction({
  source,
  interest,
  testResult,
  targetId = "saju-result-pdf",
}: ResultDownloadActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      // 1. targetId로 먼저 찾고, 없으면 사주 결과 ID 또는 main 컨텐츠 영역을 찾습니다.
      let element = document.getElementById(targetId);

      if (!element) {
        element = document.getElementById("saju-result-pdf") || 
                  document.querySelector("main") || 
                  document.querySelector(".grid.gap-6");
      }

      if (!element) {
        alert("PDF로 저장할 결과 영역을 찾을 수 없습니다.");
        return;
      }

      setIsDownloading(true);

      // html2canvas 옵션 설정: 루모라 테마의 다크 배경(#0f0f1a) 유지 및 불필요한 요소 제거
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f1a",
        ignoreElements: (el) => {
          const tagName = el.tagName.toLowerCase();
          return (
            tagName === "nav" ||
            tagName === "footer" ||
            tagName === "button" ||
            el.classList.contains("no-print")
          );
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 파일명 예시: 사주_선천코드_결과지.pdf
      const fileName = `${source.replace(/\s+/g, "_")}_결과지.pdf`;
      pdf.save(fileName);

      // 성공 후 상태 초기화 및 모달 닫기
      setIsOpen(false);
      setIsSuccess(false);
    } catch (error) {
      console.error("PDF 다운로드 오류:", error);
      alert("PDF 다운로드 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const marketingAgree = formData.get("marketing_agree") === "on";

    const result = await submitFreebieDownload({
      email,
      name,
      freebieId: "dynamic_result_pdf",
      freebieTitle: "소장용 결과지",
      freebieCategory: interest,
      marketingAgree,
      testResult: testResult,
      customSource: source,
    });

    if (result.success) {
      setIsSuccess(true);
      setIsSubmitting(false);
      // 신청 성공 후, 0.5초 뒤에 자동으로 PDF 다운로드를 호출합니다.
      setTimeout(() => {
        handleDownloadPdf();
      }, 500);
    } else {
      alert("오류가 발생했습니다: " + result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-8 border-t border-white/5 pt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] px-8 py-5 text-lg font-bold text-[#1c1830] shadow-[0_20px_50px_rgba(115,88,232,0.25)] transition hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 -translate-x-full group-hover:translate-x-full" />
          <svg className="h-6 w-6 text-[#1c1830]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          내 결과지 PDF로 저장하기
        </button>
        <p className="mt-4 text-center text-xs text-[var(--foreground-muted)]">
          분석된 나의 특별한 결과를 소장용 PDF 파일로 간직해 보세요.
        </p>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">
          <GlassPanel className="w-full max-w-md p-8 sm:p-10">
            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl text-white">신청 완료!</h2>
                <p className="text-sm text-[var(--foreground-soft)] pb-4">
                  {isDownloading ? "결과지 PDF 파일을 생성하고 있습니다..." : "잠시 후 다운로드가 자동으로 시작됩니다."}
                </p>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="w-full rounded-xl bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] py-4 text-sm font-bold text-[#1c1830] transition hover:opacity-90 disabled:opacity-50"
                >
                  {isDownloading ? "PDF 생성 중..." : "PDF 직접 다운로드"}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-white">결과지 PDF 신청</h2>
                  <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">이름</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="성함을 입력해주세요 (생략 가능)"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">이메일 주소 (필수)</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="자료를 받으실 이메일"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        required
                        className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)]"
                      />
                      <span className="text-[10px] leading-relaxed text-white/50">
                        (필수) 개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        name="marketing_agree"
                        type="checkbox" 
                        className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)]"
                      />
                      <span className="text-[10px] leading-relaxed text-white/50">
                        (선택) 루모라의 이벤트 및 혜택 알림 소식을 받아봅니다.
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full rounded-xl bg-[linear-gradient(135deg,rgba(255,236,236,0.98)_0%,rgba(214,194,255,0.96)_44%,rgba(142,116,255,0.95)_100%)] py-4 text-sm font-bold text-[#1c1830] transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "처리 중..." : "PDF 저장하기"}
                  </button>
                </form>
              </div>
            )}
          </GlassPanel>
        </div>
      )}

      {/* 인쇄 시 불필요한 요소 숨김 처리 */}
      <style jsx global>{`
        @media print {
          nav, footer, button, .no-print { display: none !important; }
          main { width: 100% !important; padding: 0 !important; }
          .result-panel-glow { border: none !important; box-shadow: none !important; background: white !important; color: black !important; }
          h1, p, span { color: black !important; }
        }
      `}</style>
    </>
  );
}
