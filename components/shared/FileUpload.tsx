"use client";

import { useState } from "react";

type FileUploadProps = {
  name: string;
  label: string;
  accept: string;
  defaultValue?: string;
  onUploadComplete?: (url: string) => void;
};

export function FileUpload({ name, label, accept, defaultValue, onUploadComplete }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(defaultValue || "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "freebies");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setPreview(result.url);
        if (onUploadComplete) onUploadComplete(result.url);
        setUploadError(null);
      } else {
        setUploadError(result.error || "업로드에 실패했습니다.");
        // 실패 시 수동 입력창 제안
        setShowManualInput(true);
      }
    } catch (error) {
      console.error(error);
      setUploadError("서버와 통신 중 오류가 발생했습니다.");
      setShowManualInput(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">{label}</label>
        <button 
          type="button" 
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[10px] text-[var(--color-secondary)] underline opacity-60 hover:opacity-100"
        >
          {showManualInput ? "업로드 모드로 전환" : "직접 URL 입력하기"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* 미리보기 및 현재 파일 정보 */}
        {preview && !showManualInput && (
          <div className="relative group w-full max-w-[200px]">
            {accept.includes("image") ? (
              <img src={preview} alt="미리보기" className="h-24 w-full rounded-xl object-cover border border-white/10" />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/10">
                <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-white/60 truncate">업로드된 파일</span>
              </div>
            )}
            <button 
              type="button"
              onClick={() => { setPreview(""); if(onUploadComplete) onUploadComplete(""); }}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >✕</button>
          </div>
        )}
        
        {/* 파일 선택창 (기본) */}
        {!showManualInput ? (
          <div className="relative">
            <input 
              type="file" 
              accept={accept}
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 z-10 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className={`flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/2 py-4 text-sm text-[var(--foreground-muted)] transition hover:bg-white/5 ${isUploading ? 'opacity-50' : ''}`}>
              {isUploading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  업로드 중...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {preview ? "다른 파일로 변경" : "파일 선택하기"}
                </>
              )}
            </div>
          </div>
        ) : (
          /* 수동 URL 입력창 */
          <input 
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            placeholder="https://... 파일 주소를 직접 입력하세요"
          />
        )}

        {/* 에러 메시지 */}
        {uploadError && (
          <p className="text-[10px] font-medium text-red-400 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
            ⚠️ {uploadError} (직접 입력 모드를 이용해 보세요)
          </p>
        )}
      </div>

      {/* 폼 제출용 히든 필드 (수동 입력 시에도 이 값이 제출됨) */}
      <input type="hidden" name={name} value={preview} />
    </div>
  );
}
