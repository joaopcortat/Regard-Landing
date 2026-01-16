-- 1. Enable pg_net extension for HTTP requests
create extension if not exists "pg_net" with schema "extensions";

-- 2. Create the Trigger Function
-- This function formats the record as JSON and sends it to your Edge Function
create or replace function public.trigger_new_lead_alert()
returns trigger as $$
declare
  project_ref text := 'sexjelyevmsawiwyustp'; -- SEU ID DO PROJETO AQUI
  anon_key text := 'sb_publishable_1GN8oWHO-_edOcKEeWC7Aw_7Xcn4zHs'; -- SUA ANON KEY AQUI (Opcional, mas boa prática passar no header)
  url text := 'https://' || project_ref || '.supabase.co/functions/v1/new-lead-alert';
begin
  perform
    net.http_post(
      url,
      jsonb_build_object(
        'type', TG_OP, 
        'table', TG_TABLE_NAME, 
        'record', row_to_json(NEW), 
        'schema', TG_TABLE_SCHEMA
      ),
      jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key
      )
    );
  return NEW;
end;
$$ language plpgsql security definer;

-- 3. Create the Trigger on the 'leads' table
-- It fires AFTER a new row is successfully inserted
drop trigger if exists on_new_lead_created on public.leads;

create trigger on_new_lead_created
after insert on public.leads
for each row execute function public.trigger_new_lead_alert();
