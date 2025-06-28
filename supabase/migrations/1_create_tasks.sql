create table public.tasks (
  id           bigserial primary key,
  title        text        not null,
  done         boolean     default false,
  inserted_at  timestamptz default now()
);

alter table public.tasks enable row level security;

create policy "anyone can read" on public.tasks
  for select using ( true );
