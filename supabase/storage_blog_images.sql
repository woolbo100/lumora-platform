insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "blog_images_public_select" on storage.objects;
create policy "blog_images_public_select"
on storage.objects
for select
to public
using (bucket_id = 'blog-images');

drop policy if exists "blog_images_admin_insert" on storage.objects;
create policy "blog_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'blog-images'
  and auth.jwt()->>'email' = 'woolbo100@gmail.com'
);

drop policy if exists "blog_images_admin_update" on storage.objects;
create policy "blog_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'blog-images'
  and auth.jwt()->>'email' = 'woolbo100@gmail.com'
)
with check (
  bucket_id = 'blog-images'
  and auth.jwt()->>'email' = 'woolbo100@gmail.com'
);

drop policy if exists "blog_images_admin_delete" on storage.objects;
create policy "blog_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'blog-images'
  and auth.jwt()->>'email' = 'woolbo100@gmail.com'
);
