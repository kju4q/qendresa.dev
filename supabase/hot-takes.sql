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

create or replace function public.update_hot_take_vote_count()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    update public.hot_takes
      set vote_count = vote_count + 1
      where id = new.hot_take_id;
    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.hot_takes
      set vote_count = greatest(vote_count - 1, 0)
      where id = old.hot_take_id;
    return old;
  end if;

  return null;
end;
$$;

drop trigger if exists hot_take_votes_after_insert on public.hot_take_votes;
create trigger hot_take_votes_after_insert
after insert on public.hot_take_votes
for each row
execute function public.update_hot_take_vote_count();

drop trigger if exists hot_take_votes_after_delete on public.hot_take_votes;
create trigger hot_take_votes_after_delete
after delete on public.hot_take_votes
for each row
execute function public.update_hot_take_vote_count();

alter table public.hot_takes enable row level security;
alter table public.hot_take_votes enable row level security;
