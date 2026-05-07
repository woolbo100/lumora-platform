"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { submitFreebieDownload } from "./actions";

type Freebie = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  file_url: string;
};

export function FreebieListClient({ freebies }: { freebies: Freebie[] }) {
  const [selectedFreebie, setSelectedFreebie] = useState<Freebie | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFreebie) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      email: formData.get("email")?.toString() || "",
      name: formData.get("name")?.toString() || "",
      freebieId: selectedFreebie.id,
      freebieTitle: selectedFreebie.title,
      freebieCategory: selectedFreebie.category || "General",
      marketingAgree: formData.get("marketing_agree") === "on",
    };

    const result = await submitFreebieDownload(data);

    if (result.success) {
      setIsSuccess(true);
      // 성공 시 새 창으로 PDF 열기
      window.open(selectedFreebie.file_url, "_blank");
      
      // 잠시 후 모달 닫기
      setTimeout(() => {
        setSelectedFreebie(null);
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 3000);
    } else {
      alert("오류가 발생했습니다: " + result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {freebies.map((freebie) => (
          <GlassPanel key={freebie.id} className="group flex flex-col h-full transition hover:scale-[1.02]">
            {/* 썸네일 영역 */}
            <div className="relative aspect-video overflow-hidden">
              {freebie.thumbnail_url ? (
                <img 
                  src={freebie.thumbnail_url} 
                  alt={freebie.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-white/5 flex items-center justify-center">
                  <span className="text-[var(--foreground-muted)] text-sm italic font-display">LUMORA Secret File</span>
                </div>
              )}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-[var(--color-secondary)]/90 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-sm">
                  {freebie.category || "Free PDF"}
                </span>
              </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl text-[var(--foreground)] sm:text-2xl">
                {freebie.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--foreground-soft)]">
                {freebie.description || "이 자료에 대한 특별한 설명이 준비 중입니다."}
              </p>
              
              <button 
                onClick={() => setSelectedFreebie(freebie)}
                className="mt-8 w-full rounded-xl bg-white/5 py-3 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--color-secondary)] hover:text-white"
              >
                무료 PDF 받기
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* 이메일 입력 모달 */}
      {selectedFreebie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
          <GlassPanel className="w-full max-w-lg p-8 sm:p-10">
            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl text-[var(--foreground)]">전송 완료!</h2>
                <p className="text-sm text-[var(--foreground-soft)]">
                  새 탭에서 자료가 열립니다. 만약 열리지 않는다면 팝업 차단을 확인해 주세요.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-secondary)]">Download PDF</p>
                    <button 
                      onClick={() => setSelectedFreebie(null)}
                      className="text-[var(--foreground-muted)] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <h2 className="font-display text-2xl text-[var(--foreground)]">{selectedFreebie.title}</h2>
                  <p className="text-xs text-[var(--foreground-soft)]">자료를 받으실 정보를 입력해 주세요.</p>
                </div>

                <form onSubmit={handleDownload} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--foreground-muted)] uppercase tracking-widest">이름 또는 닉네임</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="홍길동"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--foreground-muted)] uppercase tracking-widest">이메일 주소 (필수)</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        name="privacy_agree"
                        type="checkbox" 
                        required
                        className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]"
                      />
                      <span className="text-[11px] leading-relaxed text-[var(--foreground-soft)]">
                        (필수) 개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        name="marketing_agree"
                        type="checkbox" 
                        className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]"
                      />
                      <span className="text-[11px] leading-relaxed text-[var(--foreground-soft)]">
                        (선택) 루모라의 새로운 소식 및 마케팅 정보를 받아보는 것에 동의합니다.
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-xl bg-[var(--color-secondary)] py-4 text-sm font-bold text-white transition hover:opacity-80 disabled:opacity-50"
                  >
                    {isSubmitting ? "처리 중..." : "PDF 다운로드하기"}
                  </button>
                </form>
              </div>
            )}
          </GlassPanel>
        </div>
      )}
    </>
  );
}
