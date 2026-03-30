alter table public.posts
add column if not exists image_url text;

drop policy if exists "posts_delete_admin_only" on public.posts;
create policy "posts_delete_admin_only"
on public.posts
for delete
to authenticated
using (
  auth.jwt()->>'email' = 'woolbo100@gmail.com'
);

grant delete on table public.posts to authenticated;
