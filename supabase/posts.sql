create table if not exists public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  category text not null check (
    category in (
      'romance-reunion',
      'psychology-code',
      'attraction-self-esteem',
      'level-up-self-development',
      'mind-study'
    )
  ),
  status text not null default 'draft' check (status in ('draft', 'published')),
  ai_generated boolean not null default false,
  summary text,
  meta_description text,
  image_alt_text text,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_status_idx on public.posts (status);
