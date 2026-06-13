"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { FileUpload } from "@/components/shared/FileUpload";

type FreebiePageProps = {
  params: Promise<{ id: string }>;
};

type LeadMagnetData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail_url: string;
  pdf_path: string;
  related_url: string;
  is_active: boolean;
  sort_order: number;
};

export default function FreebieEditPage({ params }: FreebiePageProps) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  // 상태 관리
  const [formData, setFormData] = useState<LeadMagnetData>({
    id: id,
    title: "",
    slug: "",
    description: "",
    category: "",
    thumbnail_url: "",
    pdf_path: "",
    related_url: "",
    is_active: true,
    sort_order: 0,
  });

  const [isLoading, setIsLoading] = useState(!isNew);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 8. id가 없는 경우 예외 처리
  if (!id) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 text-white">
        <GlassPanel className="border-red-500/50 bg-red-500/10 p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-2xl font-bold">!</div>
          <h2 className="text-xl font-bold text-red-400">자료 ID가 없습니다.</h2>
          <p className="text-sm text-red-300/80">올바르지 않은 접근입니다.</p>
          <div className="pt-4">
            <a href="/admin/freebies" className="rounded-lg bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white/20">목록으로 돌아가기</a>
          </div>
        </GlassPanel>
      </main>
    );
  }

  // 데이터 로딩 (상세 정보 조회)
  useEffect(() => {
    if (isNew) return;

    async function loadData() {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        const res = await fetch(`/api/admin/freebies/detail?id=${id}`);
        
        if (res.status === 401) {
          // 관리자 권한 상실 시 로그인 창으로 리다이렉트
          router.replace("/admin/login");
          return;
        }

        const result = await res.json();
        
        if (result.success) {
          setFormData(result.data);
        } else {
          // 8. 자료를 찾을 수 없는 경우
          setFetchError(result.error || "자료를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("자료 상세 정보 로딩 오류:", err);
        setFetchError(err instanceof Error ? err.message : "자료를 로딩하지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id, isNew, router]);

  // 입력값 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // 6. 파일 업로드 완료 시 폼 데이터 업데이트 (새로 올리지 않으면 이전 기본값 유지)
  const handleUploadComplete = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // 5. 저장 핸들러 (update 또는 insert)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("제목을 입력하세요.");
    if (!formData.slug.trim()) return alert("슬러그를 입력하세요.");
    if (!formData.pdf_path.trim()) return alert("PDF 원본 파일을 업로드하세요.");

    try {
      setIsSaving(true);
      
      const res = await fetch("/api/admin/freebies/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result = await res.json();

      if (result.success) {
        // 성공 시 목록으로 안전하게 이동
        window.location.href = "/admin/freebies";
      } else {
        alert(result.error || "자료 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("자료 저장 오류:", err);
      alert("서버와 통신 중 문제가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    try {
      setIsDeleting(true);
      
      const res = await fetch("/api/admin/freebies/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const result = await res.json();

      if (result.success) {
        window.location.href = "/admin/freebies";
      } else {
        alert(result.error || "자료 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("자료 삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-20 text-center text-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <svg className="animate-spin h-10 w-10 text-purple-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm text-[var(--foreground-muted)]">데이터를 불러오는 중입니다...</p>
        </div>
      </main>
    );
  }

  // 8. 자료 조회에 실패하거나 Supabase 오류가 있을 경우 화면에 표시
  if (fetchError) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 text-white">
        <GlassPanel className="border-red-500/50 bg-red-500/10 p-8 space-y-4">
          <div className="flex items-center gap-3 text-red-400 text-lg font-bold">
            <span>⚠️ 데이터를 조회하지 못했습니다</span>
          </div>
          <p className="text-sm text-red-300">오류 내용:</p>
          <pre className="p-4 bg-black/50 border border-white/10 rounded-xl text-xs overflow-auto text-white/90 leading-relaxed font-mono">
            {fetchError}
          </pre>
          <p className="text-xs text-white/40">* 테이블 `lead_magnets`가 생성되어 있는지와 Vercel 환경 변수를 확인해 주세요.</p>
          <div className="pt-4">
            <a href="/admin/freebies" className="rounded-lg bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white/20">목록으로 돌아가기</a>
          </div>
        </GlassPanel>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8 text-white">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            {isNew ? "신규 등록" : "정보 수정"}
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            {isNew ? "무료 PDF 등록" : "PDF 정보 수정"}
          </h1>
        </div>
        
        {/* 9. 목록으로 돌아가기 버튼 */}
        <a 
          href="/admin/freebies"
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold tracking-wider text-[var(--foreground-soft)] transition hover:bg-white/10 hover:text-white"
        >
          ← 목록으로 돌아가기
        </a>
      </div>

      <GlassPanel className="p-8 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">제목 (필수)</label>
              <input 
                name="title"
                type="text" 
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                placeholder="자료의 제목을 입력하세요"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">URL 슬러그 (필수)</label>
              <input 
                name="slug"
                type="text" 
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                placeholder="english-slug-only"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">설명</label>
            <textarea 
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              placeholder="자료에 대한 간단한 설명을 적어주세요"
            />
          </div>

          {/* 6. 기존 업로드가 없을 경우 기존 값을 유지하도록 defaultValue 설정 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FileUpload 
              name="thumbnail_url"
              label="썸네일 이미지 업로드"
              accept="image/*"
              bucket="thumbnails"
              defaultValue={formData.thumbnail_url}
              onUploadComplete={(val) => handleUploadComplete("thumbnail_url", val)}
            />

            <FileUpload 
              name="pdf_path"
              label="PDF 파일 업로드 (필수)"
              accept=".pdf,application/pdf"
              bucket="lead-magnets"
              defaultValue={formData.pdf_path}
              onUploadComplete={(val) => handleUploadComplete("pdf_path", val)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">카테고리</label>
              <input 
                name="category"
                type="text" 
                value={formData.category || ""}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
                placeholder="예: 재회, 사주, 연애"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">정렬 순서</label>
              <input 
                name="sort_order"
                type="number" 
                value={formData.sort_order ?? 0}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">관련 백도화 서비스 URL</label>
            <input 
              name="related_url"
              type="text" 
              value={formData.related_url || ""}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              placeholder="https://baekdohwa.com/..."
            />
          </div>

          {/* 4. is_active (또는 is_visible을 맵핑) 필드 체크박스 */}
          <div className="flex items-center gap-2">
            <input 
              name="is_active"
              type="checkbox" 
              id="is_active"
              checked={formData.is_active}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)] cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm text-[var(--foreground-soft)] cursor-pointer">이 자료를 사용자에게 노출합니다. (is_active)</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-95 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  저장 중...
                </>
              ) : (
                isNew ? "자료 등록하기" : "수정 완료"
              )}
            </button>
            <a 
              href="/admin/freebies"
              className="flex-1 rounded-xl bg-white/5 py-4 text-center text-sm font-bold text-[var(--foreground-soft)] transition hover:bg-white/10"
            >
              취소
            </a>
          </div>
        </form>

        {!isNew && (
          <div className="mt-8 border-t border-white/5 pt-8">
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs font-medium text-red-500/50 underline transition hover:text-red-500 disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? "삭제 중..." : "이 자료를 영구히 삭제합니다"}
            </button>
          </div>
        )}
      </GlassPanel>
    </main>
  );
}
