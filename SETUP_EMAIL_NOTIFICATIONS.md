# GUIA COMPLETO: Sistema de Notificação por Email

## 🔍 Diagnóstico Completo

**Problema Identificado:**
O trigger SQL estava usando `extensions.http_post()` quando deveria usar `net.http_post()`.

**Status Atual:**
✅ Frontend (Quiz) - Funcionando
✅ Supabase Insert - Funcionando
✅ Edge Function - Deployed
❌ Database Trigger - Sintaxe Incorreta (CORRIGIDO)

---

## 📋 PASSO A PASSO DEFINITIVO

### Passo 1️⃣: Rodar o SQL Corrigido

1. Acesse: [Supabase SQL Editor](https://supabase.com/dashboard/project/sexjelyevmsawiwyustp/sql/new)

2. Copie **TODO** o conteúdo do arquivo:
   `/Users/joaopedrocortat/Project/regard-landing/setup_trigger_fixed.sql`

3. Cole no editor e clique em **RUN**

4. Você deve ver uma tabela com o nome do trigger (`on_new_lead_created`) confirmando sucesso.

---

### Passo 2️⃣: Testar o Sistema

1. Acesse: `http://localhost:5176`

2. Preencha o formulário com:
   - **Nome diferente** do teste anterior
   - **Email NOVO** (não usado antes)
   - WhatsApp com DDD

3. Complete até o final e veja o card "Member Since 2026"

4. Aguarde 30 segundos e cheque seu email em `cortatjpbc@gmail.com`
   - Verifique também em **Spam** e **Promoções**

---

### Passo 3️⃣: Se AINDA não receber o email

Execute este comando no terminal para ver logs da função:

```bash
npx supabase functions logs new-lead-alert --project-ref sexjelyevmsawiwyustp
```

---

## ✅ Checklist de Verificação

- [ ] SQL executado sem erros
- [ ] Formulário salva dados no Supabase
- [ ] Coluna `metadata` contém `revenue`, `painPoint`, `clinicName`
- [ ] Email recebido com dados do lead
- [ ] Botão WhatsApp funciona no email

---

## 🆘 Troubleshooting

**Se o email não chegar:**
1. Verifique se a chave Resend está correta
2. Verifique se o domínio está verificado no Resend
3. Cheque os logs da Edge Function

**Para ver os logs:**
```bash
npx supabase functions logs new-lead-alert --project-ref sexjelyevmsawiwyustp
```
