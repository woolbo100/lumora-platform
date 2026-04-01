alter table public.posts
add column if not exists status text not null default 'draft',
add column if not exists ai_generated boolean not null default false,
add column if not exists image_alt_text text,
add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'posts_status_check'
      and conrelid = 'public.posts'::regclass
  ) then
    alter table public.posts
      add constraint posts_status_check check (status in ('draft', 'published'));
  end if;
end $$;

create index if not exists posts_status_idx on public.posts (status);
