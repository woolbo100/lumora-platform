create table if not exists public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  category text not null check (
    category in (
      'romance-reunion',
      'tarot-saju',
      'psychology-code',
      'mind-study'
    )
  ),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_category_idx on public.posts (category);
