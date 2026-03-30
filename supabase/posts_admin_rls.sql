alter table public.posts enable row level security;

drop policy if exists "posts_select_public" on public.posts;
create policy "posts_select_public"
on public.posts
for select
to anon, authenticated
using (true);

drop policy if exists "posts_insert_public" on public.posts;

drop policy if exists "posts_insert_admin_only" on public.posts;
create policy "posts_insert_admin_only"
on public.posts
for insert
to authenticated
with check (
  auth.jwt()->>'email' = 'woolbo100@gmail.com'
);

grant usage on schema public to anon, authenticated;
grant select, insert on table public.posts to anon, authenticated;
grant usage, select on sequence public.posts_id_seq to anon, authenticated;
