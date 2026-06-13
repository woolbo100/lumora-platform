-- 1. lead_magnets (무료 전자책 정보) 테이블 생성
CREATE TABLE IF NOT EXISTS public.lead_magnets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    thumbnail_url TEXT,
    pdf_path TEXT NOT NULL,
    related_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    download_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. lead_submissions (신청자 정보) 테이블 생성
CREATE TABLE IF NOT EXISTS public.lead_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_magnet_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    privacy_agree BOOLEAN NOT NULL DEFAULT false,
    marketing_agree BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. RLS (Row Level Security) 보안 정책 활성화
ALTER TABLE public.lead_magnets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- 4. lead_magnets 테이블 권한 정책 설정
-- 누구나(비회원 포함) 활성화된 리드 마그넷 정보를 조회(Select)할 수 있도록 허용합니다.
CREATE POLICY "Allow public select for active lead_magnets"
ON public.lead_magnets
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- 5. lead_submissions 테이블 권한 정책 설정
-- 누구나(비회원 포함) 신청서를 제출(Insert)할 수 있도록 허용합니다.
CREATE POLICY "Allow public insert for lead_submissions"
ON public.lead_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- (참고) 관리자 API(Server Actions)에서는 서비스 롤 키(service_role key)를 사용하여
-- RLS 정책을 우회하여 모든 데이터를 읽고 쓸 수 있으므로, 별도의 관리자용 RLS 정책을 추가하지 않아도 정상 작동합니다.

-- 6. 기존에 한글 파일명으로 등록되어 있던 PDF 파일 경로를 영어 파일명으로 강제 보정(업데이트)합니다.
-- 추가적으로 오타가 있던 'ove-pattern-attachment-self-check' 슬러그를 올바른 'love-pattern-attachment-self-check'로 교정합니다.
-- (Supabase Storage에 영어로 된 해당 실제 파일들이 업로드되어 있어야 다운로드가 가능합니다.)

-- 1) '매력자본 완전정복' 보정 (ID: cf659c39-0e65-4e07-a024-84213677fd84)
UPDATE public.lead_magnets 
SET pdf_path = 'magnetic-woman-attraction-capital.pdf' 
WHERE id = 'cf659c39-0e65-4e07-a024-84213677fd84';

-- 2) '재회를 위한 SNS·카톡 완전 전략' 보정 (ID: 7136e0c4-5de8-4963-a3c0-4ab344dc7faa)
UPDATE public.lead_magnets 
SET pdf_path = 'reunion-sns-kakao-strategy.pdf' 
WHERE id = '7136e0c4-5de8-4963-a3c0-4ab344dc7faa';

-- 3) '연애 패턴 & 애착유형 셀프 진단 노트' 보정 및 슬러그 오타 교정 (ID: 56077cd5-1dc0-41c2-9653-3de1c639ee84)
UPDATE public.lead_magnets 
SET pdf_path = 'love-pattern-attachment-self-check.pdf',
    slug = 'love-pattern-attachment-self-check' 
WHERE id = '56077cd5-1dc0-41c2-9653-3de1c639ee84';

