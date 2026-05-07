import { redirect, notFound } from "next/navigation";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";
import { upsertFreebieAction, deleteFreebieAction } from "../actions";

type FreebiePageProps = {
  params: Promise<{ id: string }>;
};

export default async function FreebieEditPage({ params }: FreebiePageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const isNew = id === "new";

  let initialData = {
    id: "new",
    title: "",
    slug: "",
    description: "",
    category: "",
    thumbnail_url: "",
    file_url: "",
    related_baekdohwa_url: "",
    is_active: true,
    sort_order: 0,
  };

  if (!isNew) {
    try {
      const response = await supabaseRestRequest(`freebies?id=eq.${id}`);
      const data = await response.json();
      if (!data || data.length === 0) notFound();
      initialData = data[0];
    } catch (e) {
      console.error(e);
      throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
          {isNew ? "신규 등록" : "정보 수정"}
        </p>
        <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
          {isNew ? "무료 PDF 등록" : "PDF 정보 수정"}
        </h1>
      </div>

      <GlassPanel className="p-8 sm:p-10">
        <form action={upsertFreebieAction} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">제목 (필수)</label>
              <input 
                name="title"
                type="text" 
                defaultValue={initialData.title}
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
                defaultValue={initialData.slug}
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
              defaultValue={initialData.description || ""}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              placeholder="자료에 대한 간단한 설명을 적어주세요"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">카테고리</label>
              <input 
                name="category"
                type="text" 
                defaultValue={initialData.category || ""}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
                placeholder="예: 재회, 사주, 연애"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">정렬 순서</label>
              <input 
                name="sort_order"
                type="number" 
                defaultValue={initialData.sort_order}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">썸네일 이미지 URL</label>
            <input 
              name="thumbnail_url"
              type="text" 
              defaultValue={initialData.thumbnail_url || ""}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">PDF 파일 URL (필수)</label>
            <input 
              name="file_url"
              type="text" 
              defaultValue={initialData.file_url}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              placeholder="https://... 또는 Supabase 스토리지 링크"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">관련 백도화 서비스 URL</label>
            <input 
              name="related_baekdohwa_url"
              type="text" 
              defaultValue={initialData.related_baekdohwa_url || ""}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--foreground)] focus:outline-none"
              placeholder="https://baekdohwa.com/..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              name="is_active"
              type="checkbox" 
              id="is_active"
              value="true"
              defaultChecked={initialData.is_active}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]"
            />
            <label htmlFor="is_active" className="text-sm text-[var(--foreground-soft)]">이 자료를 사용자에게 노출합니다.</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 rounded-xl bg-[#7c3aed] py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90 active:scale-95"
            >
              {isNew ? "자료 등록하기" : "수정 완료"}
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
          <form action={deleteFreebieAction} className="mt-8 border-t border-white/5 pt-8">
            <input type="hidden" name="id" value={id} />
            <button 
              type="submit"
              onClick={(e) => { if(!confirm("정말로 삭제하시겠습니까?")) e.preventDefault(); }}
              className="text-xs font-medium text-red-500/50 underline transition hover:text-red-500"
            >
              이 자료를 영구히 삭제합니다
            </button>
          </form>
        )}
      </GlassPanel>
    </main>
  );
}
