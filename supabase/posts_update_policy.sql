drop policy if exists "posts_update_admin_only" on public.posts;
create policy "posts_update_admin_only"
on public.posts
for update
to authenticated
using (
  auth.jwt()->>'email' = 'woolbo100@gmail.com'
)
with check (
  auth.jwt()->>'email' = 'woolbo100@gmail.com'
);

grant update on table public.posts to authenticated;
