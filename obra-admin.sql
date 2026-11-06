-- Obra Majoralia website admin (obramajoralia.com/admin), batch 1:
-- admin access, the form inbox, and private storage for attachments.
-- Safe to re-run: every policy is dropped and recreated.
--
-- Access model: one shared admin login. Only users listed in site_admins can
-- read the inbox; there is no "first user becomes admin" fallback.

-- ---------------------------------------------------------------- helpers

create table if not exists public.site_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;
drop policy if exists "site_admins self read" on public.site_admins;
create policy "site_admins self read" on public.site_admins
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_site_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(exists (select 1 from public.site_admins where user_id = auth.uid()), false);
$$;
revoke execute on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

-- ---------------------------------------------------------------- inbox

-- Contact enquiries and job applications. Written only by the submit-form
-- edge function (service role); the admin reads and updates them.
create table if not exists public.form_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  form        text not null check (form in ('contact', 'careers')),
  first_name  text not null,
  last_name   text,
  email       text not null,
  phone       text,
  subject     text,                 -- contact form
  position    text,                 -- careers form
  message     text,
  file_path   text,                 -- object in the private 'form-files' bucket
  file_name   text,                 -- what the sender called it
  file_size   int,
  status      text not null default 'new' check (status in ('new', 'replied', 'archived')),
  email_sent  boolean not null default false
);

create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_email_idx on public.form_submissions (email, created_at desc);

alter table public.form_submissions enable row level security;
drop policy if exists "admin read" on public.form_submissions;
drop policy if exists "admin update" on public.form_submissions;
drop policy if exists "admin delete" on public.form_submissions;
create policy "admin read" on public.form_submissions
  for select to authenticated using (public.is_site_admin());
create policy "admin update" on public.form_submissions
  for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());
create policy "admin delete" on public.form_submissions
  for delete to authenticated using (public.is_site_admin());
revoke all on public.form_submissions from anon;
grant select, update, delete on public.form_submissions to authenticated;

-- ---------------------------------------------------------------- attachment storage

-- Private: résumés and project briefs. The edge function uploads; the admin
-- downloads through short-lived signed links.
insert into storage.buckets (id, name, public, file_size_limit)
values ('form-files', 'form-files', false, 10485760)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists "form files admin read" on storage.objects;
drop policy if exists "form files admin delete" on storage.objects;
create policy "form files admin read" on storage.objects
  for select to authenticated using (bucket_id = 'form-files' and public.is_site_admin());
create policy "form files admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'form-files' and public.is_site_admin());

-- ---------------------------------------------------------------- admin login
-- Run AFTER creating the shared login in Authentication → Users → Add user.
insert into public.site_admins (user_id)
select id from auth.users where email = 'obra.majoralia@gmail.com'
on conflict do nothing;
