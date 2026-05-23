-- leads 테이블에 대해 모든 사용자(비로그인 방문자 포함)가 데이터를 입력(Insert)할 수 있도록 허용하는 보안 정책입니다.
-- 이 SQL 코드를 Supabase 대시보드의 [SQL Editor]에 붙여넣고 [Run] 버튼을 눌러 실행하시면 오류가 해결됩니다.

-- leads 테이블에 대한 INSERT(데이터 추가) 권한을 허용합니다.
CREATE POLICY "Allow public insert to leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
