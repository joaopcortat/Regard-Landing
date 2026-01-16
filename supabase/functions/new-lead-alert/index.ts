import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadRecord {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    metadata: {
        revenue?: string;
        clinicName?: string;
        painPoint?: string;
    };
}

interface WebhookPayload {
    type: 'INSERT';
    table: 'leads';
    record: LeadRecord;
    schema: 'public';
}

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload: WebhookPayload = await req.json();
        const lead = payload.record;

        console.log("New Lead Received:", lead.name);

        if (!lead.email) {
            throw new Error("Lead has no email");
        }

        const { data, error } = await resend.emails.send({
            from: "Regard Waitlist <onboarding@resend.dev>", // Or your verified domain
            to: ["cortatjpbc@gmail.com"],
            subject: `💎 Novo Lead: ${lead.name} (${lead.metadata?.revenue || "N/A"})`,
            html: `
        <div style="font-family: sans-serif; color: #111;">
          <h1>Novo Lead na Lista de Espera 🚀</h1>
          <p><strong>Nome:</strong> ${lead.name}</p>
          <p><strong>Clínica:</strong> ${lead.metadata?.clinicName || "Não informado"}</p>
          <p><strong>Faturamento:</strong> ${lead.metadata?.revenue || "N/A"}</p>
          <p><strong>Dor Principal:</strong> ${lead.metadata?.painPoint || "N/A"}</p>
          <br />
          <a href="https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Conversar no WhatsApp 💬
          </a>
          <br /><br />
          <p style="font-size: 12px; color: #666;">ID: ${lead.id}</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});

/* 
  DEPLOYMENT INSTRUCTIONS:
  1. Run: supabase functions deploy new-lead-alert --no-verify-jwt
  2. Set Secret: supabase secrets set RESEND_API_KEY=your_key_here
  3. Database Webhook (SQL):
     create trigger "new_lead_trigger"
     after insert on "leads"
     for each row
     execute function supabase_functions.http_request(
       'https://<project-ref>.supabase.co/functions/v1/new-lead-alert',
       'POST',
       '{"Content-type":"application/json"}',
       '{}',
       '1000'
     );
*/
