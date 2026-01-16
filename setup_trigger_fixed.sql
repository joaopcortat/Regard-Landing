-- COMPLETE SETUP FOR EMAIL NOTIFICATIONS ON NEW LEADS
-- Run this entire script in the Supabase SQL Editor

-- Step 1: Enable the pg_net extension (required for HTTP requests)
create extension if not exists pg_net with schema extensions;

-- Step 2: Drop existing trigger and function to start fresh
drop trigger if exists on_new_lead_created on public.leads;
drop function if exists public.trigger_new_lead_alert();

-- Step 3: Create the trigger function with correct pg_net syntax
create or replace function public.trigger_new_lead_alert()
returns trigger as $$
declare
  request_id bigint;
  url text := 'https://sexjelyevmsawiwyustp.supabase.co/functions/v1/new-lead-alert';
begin
  -- Make async HTTP POST request using pg_net
  select net.http_post(
    url := url,
    body := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'schema', TG_TABLE_SCHEMA
    ),
    headers := '{"Content-Type": "application/json"}'::jsonb
  ) into request_id;
  
  return NEW;
end;
$$ language plpgsql security definer;

-- Step 4: Create the trigger
create trigger on_new_lead_created
  after insert on public.leads
  for each row
  execute function public.trigger_new_lead_alert();

-- Verification: Check if trigger was created
select 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
from information_schema.triggers
where trigger_name = 'on_new_lead_created';
