import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminLogoutAction } from "@/app/admin/actions";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseRestRequest } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "리드 관리 | LUMORA Admin",
};

type Lead = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  source: string;
  interest: string | null;
  test_result: string | null;
  downloaded_pdf: string | null;
  clicked_baekdohwa: boolean;
  marketing_agree: boolean;
  created_at: string;
};

type LeadsPageProps = {
  searchParams: Promise<{
    email?: string;
    source?: string;
    clicked?: string;
    marketing?: string;
    date_from?: string;
    date_to?: string;
  }>;
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const query = await searchParams;
  
  let leads: Lead[] = [];
  let totalLeads = 0;
  let todayLeads = 0;
  let weekLeads = 0;
  let totalClicks = 0;
  let fetchError: string | null = null;

  try {
    // 1. 데이터 가져오기 (필터 적용)
    let filterParams = "order=created_at.desc";
    
    if (query.email) filterParams += `&email=ilike.*${query.email}*`;
    if (query.source) filterParams += `&source=eq.${query.source}`;
    if (query.clicked) filterParams += `&clicked_baekdohwa=eq.${query.clicked}`;
    if (query.marketing) filterParams += `&marketing_agree=eq.${query.marketing}`;
    if (query.date_from) filterParams += `&created_at=gte.${query.date_from}T00:00:00`;
    if (query.date_to) filterParams += `&created_at=lte.${query.date_to}T23:59:59`;

    const response = await supabaseRestRequest(`leads?${filterParams}`);
    leads = await response.json();

    // 2. 통계 데이터 계산
    const statsResponse = await supabaseRestRequest("leads?select=id,created_at,clicked_baekdohwa");
    const allStats: { id: string, created_at: string, clicked_baekdohwa: boolean }[] = await statsResponse.json();

    totalLeads = allStats.length;
    const now = new Date();
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekStart = oneWeekAgo.toISOString();

    todayLeads = allStats.filter(l => l.created_at >= todayStart).length;
    weekLeads = allStats.filter(l => l.created_at >= weekStart).length;
    totalClicks = allStats.filter(l => l.clicked_baekdohwa).length;
  } catch (e) {
    console.error(e);
    fetchError = e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
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
            리드(Leads) 관리
          </h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            로그인 계정: {session.email}
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

      {/* 에러 메시지 표시 */}
      {fetchError && (
        <GlassPanel className="border-red-500/50 bg-red-500/10 p-6">
          <p className="text-sm font-bold text-red-400">⚠️ 데이터를 가져오는 중 에러가 발생했습니다:</p>
          <p className="mt-1 text-xs text-red-300/80">{fetchError}</p>
          <p className="mt-4 text-xs text-[var(--foreground-muted)]">
            주로 Supabase 테이블 설정 문제이거나 환경 변수 설정 문제일 수 있습니다.
          </p>
        </GlassPanel>
      )}

      {/* 네비게이션 탭 */}
      <div className="flex border-b border-white/5">
        <a 
          href="/admin/leads" 
          className="border-b-2 border-[var(--color-secondary)] px-6 py-3 text-sm font-bold text-[var(--foreground)]"
        >
          리드 관리
        </a>
        <a 
          href="/blog/write" 
          className="px-6 py-3 text-sm font-medium text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
        >
          블로그 작성
        </a>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="전체 이메일 수" value={totalLeads.toLocaleString()} unit="개" />
        <SummaryCard title="오늘 신규 리드" value={todayLeads.toLocaleString()} unit="명" color="text-green-400" />
        <SummaryCard title="이번주 신규 리드" value={weekLeads.toLocaleString()} unit="명" />
        <SummaryCard title="백도화 클릭 수" value={totalClicks.toLocaleString()} unit="회" color="text-amber-400" />
      </div>

      {/* 필터 섹션 */}
      <GlassPanel className="p-6">
        <form className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6 items-end">
          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-medium text-[var(--foreground-muted)]">이메일 검색</label>
            <input 
              name="email"
              type="text" 
              defaultValue={query.email}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--foreground-muted)]">수집 경로(Source)</label>
            <select 
              name="source"
              defaultValue={query.source}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none"
            >
              <option value="">전체</option>
              <option value="free_test">무료 테스트</option>
              <option value="pdf_download">PDF 다운로드</option>
              <option value="cta_click">CTA 클릭</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--foreground-muted)]">백도화 클릭</label>
            <select 
              name="clicked"
              defaultValue={query.clicked}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none"
            >
              <option value="">전체</option>
              <option value="true">클릭함</option>
              <option value="false">클릭안함</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--foreground-muted)]">마케팅 동의</label>
            <select 
              name="marketing"
              defaultValue={query.marketing}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none"
            >
              <option value="">전체</option>
              <option value="true">동의함(Y)</option>
              <option value="false">미동의(N)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--foreground-muted)]">날짜 (부터)</label>
            <input 
              name="date_from"
              type="date" 
              defaultValue={query.date_from}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 rounded-xl bg-[var(--color-secondary)] py-2 text-xs font-bold text-white transition hover:opacity-80">
              필터 적용
            </button>
            <a href="/admin/leads" className="flex-1 rounded-xl bg-white/10 py-2 text-center text-xs font-bold text-[var(--foreground-soft)] transition hover:bg-white/20">
              초기화
            </a>
          </div>
        </form>
      </GlassPanel>

      {/* 데이터 테이블 */}
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-xs font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
                <th className="px-6 py-4">수집일시</th>
                <th className="px-6 py-4">이메일 / 이름</th>
                <th className="px-6 py-4">경로(Source)</th>
                <th className="px-6 py-4">관심사 / 결과</th>
                <th className="px-6 py-4">PDF / 클릭</th>
                <th className="px-6 py-4">마케팅 동의</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-[var(--foreground-muted)]">
                    수집된 리드가 없습니다.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-white/2">
                    <td className="whitespace-nowrap px-6 py-4 text-[var(--foreground-soft)]">
                      {new Date(lead.created_at).toLocaleDateString()}<br/>
                      <span className="text-xs opacity-50">{new Date(lead.created_at).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--foreground)]">{lead.email}</div>
                      <div className="text-xs text-[var(--foreground-muted)]">{lead.name || "-"}</div>
                      <div className="text-xs text-[var(--foreground-muted)]">{lead.phone || ""}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getSourceBadgeColor(lead.source)}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[var(--foreground-soft)]">{lead.interest || "-"}</div>
                      <div className="text-xs opacity-50">{lead.test_result || ""}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">
                        {lead.downloaded_pdf ? (
                          <span className="text-blue-400">📄 {lead.downloaded_pdf}</span>
                        ) : (
                          <span className="opacity-30">No PDF</span>
                        )}
                      </div>
                      <div className="mt-1">
                        {lead.clicked_baekdohwa ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                             <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                             백도화 클릭
                          </span>
                        ) : (
                          <span className="text-[10px] text-[var(--foreground-muted)]">클릭 없음</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.marketing_agree ? (
                        <span className="text-green-400">Y</span>
                      ) : (
                        <span className="text-[var(--foreground-muted)]">N</span>
                      )}
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

function SummaryCard({ title, value, unit, color = "text-[var(--foreground)]" }: { title: string, value: string, unit: string, color?: string }) {
  return (
    <GlassPanel className="p-6">
      <p className="text-xs font-medium text-[var(--foreground-muted)]">{title}</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`font-display text-3xl font-bold ${color}`}>{value}</span>
        <span className="text-sm text-[var(--foreground-muted)]">{unit}</span>
      </div>
    </GlassPanel>
  );
}

function getSourceBadgeColor(source: string) {
  switch (source) {
    case "free_test": return "bg-purple-500/20 text-purple-400";
    case "pdf_download": return "bg-blue-500/20 text-blue-400";
    case "cta_click": return "bg-pink-500/20 text-pink-400";
    default: return "bg-white/10 text-white/50";
  }
}
