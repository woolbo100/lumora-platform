alter table public.posts
add column if not exists summary text,
add column if not exists meta_description text;
