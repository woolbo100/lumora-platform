"use client";

import { useState } from "react";

type FileUploadProps = {
  name: string;
  label: string;
  accept: string;
  defaultValue?: string;
  onUploadComplete: (url: string) => void;
};

export function FileUpload({ name, label, accept, defaultValue, onUploadComplete }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(defaultValue || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. 서버 액션을 호출하거나 직접 Supabase API를 사용하여 업로드
      // 여기서는 범용성을 위해 /api/upload 형태의 API나 직접 구현을 사용합니다.
      // 일단 간단하게 FormData를 만들어 서버 액션으로 보낼 준비를 합니다.
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
        onUploadComplete(result.url);
      } else {
        alert("업로드 실패: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">{label}</label>
      <div className="flex flex-col gap-4">
        {preview && (
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
              onClick={() => { setPreview(""); onUploadComplete(""); }}
              className="absolute -top-2 -right-2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs"
            >✕</button>
          </div>
        )}
        
        <div className="relative">
          <input 
            type="file" 
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
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
                {preview ? "파일 변경하기" : "파일 선택하기"}
              </>
            )}
          </div>
        </div>
      </div>
      {/* 폼 제출용 히든 필드 */}
      <input type="hidden" name={name} value={preview} />
    </div>
  );
}
