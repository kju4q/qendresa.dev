create extension if not exists "pgcrypto";

create table if not exists public.hot_takes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  user_hash text not null,
  vote_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.hot_take_votes (
  id uuid primary key default gen_random_uuid(),
  hot_take_id uuid not null references public.hot_takes(id) on delete cascade,
  user_hash text not null,
  week_start date not null,
  created_at timestamptz not null default now(),
  unique (hot_take_id, user_hash, week_start)
);

create index if not exists hot_takes_vote_count_idx
  on public.hot_takes (vote_count desc);

create index if not exists hot_take_votes_user_week_idx
  on public.hot_take_votes (user_hash, week_start);

alter table public.hot_takes enable row level security;
alter table public.hot_take_votes enable row level security;
