-- Run this in Supabase SQL Editor before redeploying the updated CRM.

alter table public.customers
  add column if not exists expected_start_date date,
  add column if not exists expected_finish_date date,
  add column if not exists customer_signature text,
  add column if not exists customer_sign_date date,
  add column if not exists contractor_signature text,
  add column if not exists contractor_sign_date date;

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  service_agreement_fine_print text,
  completion_report_fine_print text
);

alter table public.app_settings enable row level security;

drop policy if exists "users can view own settings" on public.app_settings;
create policy "users can view own settings"
on public.app_settings
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own settings" on public.app_settings;
create policy "users can insert own settings"
on public.app_settings
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own settings" on public.app_settings;
create policy "users can update own settings"
on public.app_settings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users can delete own settings" on public.app_settings;
create policy "users can delete own settings"
on public.app_settings
for delete
to authenticated
using (auth.uid() = user_id);
