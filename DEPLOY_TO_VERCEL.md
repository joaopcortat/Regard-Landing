# 🚀 Deploy to Vercel - Checklist

## ✅ Pre-Flight Checklist

### 1. Verify Build Configuration
- [x] `vercel.json` created (fixes SPA routing)
- [x] `package.json` has `"build": "vite build"`
- [x] `.env` file exists locally (not committed to Git)

### 2. Environment Variables (CRITICAL)
Before deploying, add these in Vercel Dashboard:

**Location:** Project Settings → Environment Variables

| Variable Name | Value Source | Example |
|--------------|--------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL | `https://sexjelyevmsawiwyustp.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anon Key | `sb_publishable_1GN8oWHO-...` |

⚠️ **Important:** Copy these values from your local `.env` file.

### 3. Deploy Steps

1. **Connect Repository:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the `regard-landing` repository

2. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

3. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Apply to: **Production, Preview, and Development**

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2 minutes)

### 4. Post-Deployment Verification

Once deployed, test these flows:

- [ ] Homepage loads correctly
- [ ] "Solicitar Acesso" button opens quiz modal
- [ ] Complete quiz and see "Member Since 2026" card
- [ ] Check Supabase Dashboard - new lead should appear
- [ ] Check email `cortatjpbc@gmail.com` - notification should arrive

### 5. Custom Domain (Optional)

To use `regard.md` or similar:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

---

## 🆘 Troubleshooting

**Build Fails:**
- Verify environment variables are set correctly
- Check logs for TypeScript/ESLint errors

**404 on Refresh:**
- Ensure `vercel.json` is in the repository root
- Redeploy if you added it after initial deployment

**Form Not Submitting:**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check browser console for errors

---

## 📊 Recommended Settings

**Deployment Protection:**
- Enable "Vercel Authentication" for staging branches
- Keep production publicly accessible

**Analytics:**
- Enable Vercel Analytics for traffic insights
- Monitor Core Web Vitals

**Git Integration:**
- Main branch → Production
- Other branches → Auto-deploy previews
