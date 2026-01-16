-- ==============================================================================
-- REGARD WAITLIST SCHEMA (Future-Proof Design)
-- ==============================================================================

-- 1. Create the 'leads' table
-- We use a 'metadata' JSONB column to store flexible quiz answers.
-- This allows the frontend questions to change without requiring database migrations.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  
  -- Core Identity (Fixed Columns)
  name text not null,
  email text not null unique,
  whatsapp text,
  status text default 'pending', -- 'pending', 'approved', 'rejected', 'contacted'
  
  -- The "Brain" of the Lead (Flexible Data)
  metadata jsonb default '{}'::jsonb
);

-- 2. Secure the table with Row Level Security (RLS)
alter table public.leads enable row level security;

-- 3. Define Access Policies

-- Policy: Public Insert
-- Allow anyone (anonymous users) to submit the form.
-- Logic: We want to lower the barrier to entry. Anyone can apply.
create policy "Allow public inserts"
  on public.leads
  for insert
  to anon
  with check (true);

-- Policy: Admin Read Only
-- Restrict data visibility. ONLY the backend (service_role) or admins should read this.
-- Anonymous users (the public) should NEVER accept/read other people's data.
create policy "Allow admin read access"
  on public.leads
  for select
  to service_role
  using (true);

-- Optional: Create an index on email for faster lookups if the table grows huge
create index leads_email_idx on public.leads (email);
