create table if not exists public.drop_tokens (
  token text primary key,
  drop_key text not null,
  created_at timestamptz not null default now(),
  issued_at timestamptz,
  issued_email text,
  issued_by_first_name text,
  issued_by_last_name text,
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

alter table public.drop_tokens add column if not exists issued_at timestamptz;
alter table public.drop_tokens add column if not exists issued_email text;
alter table public.drop_tokens add column if not exists issued_by_first_name text;
alter table public.drop_tokens add column if not exists issued_by_last_name text;
