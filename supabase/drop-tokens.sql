create table if not exists public.drop_tokens (
  token text primary key,
  drop_key text not null,
  created_at timestamptz not null default now(),
  used_at timestamptz,
  used_by_email text,
  used_by_first_name text,
  used_by_last_name text
);

create index if not exists drop_tokens_drop_key_idx
  on public.drop_tokens (drop_key);

create index if not exists drop_tokens_used_at_idx
  on public.drop_tokens (used_at);

alter table public.drop_tokens enable row level security;
