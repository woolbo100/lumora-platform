import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminLogoutAction } from "@/app/admin/actions";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";
import { CopySlugButton } from "@/components/admin/CopySlugButton";

export const metadata: Metadata = {
  title: "무료 자료 관리 | LUMORA Admin",
};

type LeadMagnet = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  pdf_path: string;
  related_url: string | null;
  download_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export default async function AdminFreebiesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  let leadMagnets: LeadMagnet[] = [];
  let fetchError: string | null = null;

  try {
    const response = await supabaseRestRequest("lead_magnets?order=sort_order.asc,created_at.desc");
    leadMagnets = await response.json();
  } catch (e) {
    console.error(e);
    fetchError = e instanceof Error ? e.message : "데이터를 불러오는 중 에러가 발생했습니다.";
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            Admin Dashboard
          </p>
          <h1 className="font-display text-4xl text-[var(--foreground)] sm:text-5xl">
            무료 자료 관리
          </h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            사용자에게 제공할 무료 PDF 자료를 등록하고 관리합니다. (테이블: `lead_magnets`)
          </p>
        </div>
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--foreground-soft)] uppercase transition hover:bg-white/10"
          >
            로그아웃
          </button>
        </form>
      </div>

      {/* 네비게이션 탭 */}
      <div className="flex border-b border-white/5">
        <a 
          href="/admin/leads" 
          className="px-6 py-3 text-sm font-medium text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
        >
          리드 관리
        </a>
        <a 
          href="/admin/freebies" 
          className="border-b-2 border-[var(--color-secondary)] px-6 py-3 text-sm font-bold text-[var(--foreground)]"
        >
          무료 자료 관리
        </a>
        <a 
          href="/blog/write" 
          className="px-6 py-3 text-sm font-medium text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
        >
          블로그 작성
        </a>
      </div>

      {/* 에러 메시지 표시 */}
      {fetchError && (
        <GlassPanel className="border-red-500/50 bg-red-500/10 p-6">
          <p className="text-sm font-bold text-red-400">⚠️ 에러 발생:</p>
          <p className="mt-1 text-xs text-red-300/80">{fetchError}</p>
          <p className="mt-2 text-xs text-white/50">
            * DB에 `lead_magnets` 테이블이 생성되어 있는지 확인해주세요.
          </p>
        </GlassPanel>
      )}

      {/* 등록 버튼 섹션 */}
      <div className="flex justify-end">
        <a 
          href="/admin/freebies/new"
          className="rounded-xl bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90 active:scale-95"
        >
          + 새 PDF 등록하기
        </a>
      </div>

      {/* 리스트 테이블 */}
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-xs font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
                <th className="px-6 py-4">순서</th>
                <th className="px-6 py-4">썸네일 / 제목 / 슬러그</th>
                <th className="px-6 py-4">카테고리</th>
                <th className="px-6 py-4">다운로드 수</th>
                <th className="px-6 py-4">상태</th>
                <th className="px-6 py-4">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leadMagnets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-[var(--foreground-muted)]">
                    등록된 자료가 없습니다. 새로운 자료를 등록해 보세요!
                  </td>
                </tr>
              ) : (
                leadMagnets.map((item) => (
                  <tr key={item.id} className="transition hover:bg-white/2">
                    <td className="px-6 py-4 text-[var(--foreground-muted)]">{item.sort_order}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.thumbnail_url ? (
                          <img src={item.thumbnail_url} alt="" className="h-12 w-12 rounded-lg object-cover border border-white/10" />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-[10px] text-white/20">No Image</div>
                        )}
                        <div className="space-y-1">
                          <div className="font-bold text-[var(--foreground)]">{item.title}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--foreground-muted)] font-mono">/{item.slug}</span>
                            <CopySlugButton slug={item.slug} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-white/5 px-2 py-0.5 text-xs text-[var(--foreground-soft)]">
                        {item.category || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display text-lg text-[var(--color-secondary)]">
                      {item.download_count.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_active ? (
                        <span className="text-green-400 text-xs font-bold">● 활성</span>
                      ) : (
                        <span className="text-white/20 text-xs font-bold">○ 비활성</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <a 
                          href={`/admin/freebies/${item.id}`}
                          className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--foreground-soft)] transition hover:bg-white/10"
                        >
                          수정
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </main>
  );
}
