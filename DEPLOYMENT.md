# MediScribe.ai - Deployment Guide

## 🚀 Quick Deploy (100% FREE)

### Backend Deployment (Railway.app)

1. **Sign up for Railway**: https://railway.app
   - Connect your GitHub account
   - Get $5 free credit/month

2. **Deploy Backend**:
   ```bash
   # Push code to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **On Railway Dashboard**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `Medical---AI---Scribe` repository
   - Select `backend` folder as root directory
   - Railway will auto-detect Dockerfile

4. **Add Environment Variables** in Railway:
   ```
   GROQ_API_KEY=your_groq_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ENVIRONMENT=production
   ```

5. **Get your backend URL**: `https://your-app.railway.app`

### Frontend Deployment (Vercel)

1. **Sign up for Vercel**: https://vercel.com
   - Connect your GitHub account

2. **Deploy Frontend**:
   - Click "New Project"
   - Import `Medical---AI---Scribe` repository
   - Set root directory to `frontend`
   - Framework preset: Next.js

3. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.railway.app
   ```

4. **Deploy**: Click "Deploy"

5. **Get your live URL**: `https://your-app.vercel.app`

---

## 📋 Free Services Setup Checklist

### Priority 1: AI Services (Required)

- [ ] **Groq** (https://console.groq.com)
  - Sign up → Get API key
  - FREE: Llama 3.1 70B + Whisper Large v3
  - No credit card needed

- [ ] **Supabase** (https://supabase.com)
  - Create project
  - Get URL and anon key from Settings → API
  - FREE: 500MB DB + 2GB bandwidth

### Priority 2: Storage (Optional but Recommended)

- [ ] **Cloudflare R2** (https://cloudflare.com/products/r2/)
  - Sign up → Create bucket
  - Get access keys
  - FREE: 10GB storage

- [ ] **Pinecone** (https://www.pinecone.io/)
  - Sign up → Create index
  - FREE: 1 index, 100K vectors

### Priority 3: Monitoring (Optional)

- [ ] **Sentry** (https://sentry.io)
  - Sign up → Create project
  - Get DSN
  - FREE: 5K errors/month

---

## 🔧 Local Development

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Run server
uvicorn app.main:app --reload
```

Backend will run at: http://localhost:8000
API docs: http://localhost:8000/api/docs

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run dev server
npm run dev
```

Frontend will run at: http://localhost:3000

---

## 🧪 Testing the API

### Test Transcription (using curl)

```bash
# Upload and process audio
curl -X POST "http://localhost:8000/api/audio/upload" \
  -F "file=@sample.mp3"

# Generate SOAP note from transcript
curl -X POST "http://localhost:8000/api/notes/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "Patient presents with chest pain...",
    "specialty": "primary_care"
  }'
```

### Test with Demo Page

1. Go to http://localhost:3000/demo
2. Use the sample transcript or edit it
3. Click "Generate SOAP Note"
4. See results in real-time

---

## 📊 Monitoring

### Check Backend Health

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "development",
  "services": {
    "groq": "configured",
    "supabase": "configured"
  }
}
```

### View Logs

**Railway**: Dashboard → Your Project → Deployments → View Logs
**Vercel**: Dashboard → Your Project → Deployments → View Function Logs

---

## 🔒 Security Checklist

- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your frontend domain in production
- [ ] Set up HTTPS (automatic on Railway/Vercel)
- [ ] Implement rate limiting (TODO)
- [ ] Add authentication (TODO)

---

## 🐛 Troubleshooting

### Backend won't start
- Check if all environment variables are set
- Verify Groq API key is valid
- Check Railway logs for errors

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is deployed and running

### SOAP note generation fails
- Check Groq API key
- Verify transcript is not empty
- Check backend logs for errors

---

## 📈 Next Steps

1. **Week 1**: Deploy MVP and test with sample data
2. **Week 2**: Add medical NER and ICD-10/CPT coding
3. **Week 3**: Build full dashboard UI
4. **Week 4**: Beta testing with physicians

---

## 💰 Cost Breakdown (FREE Tier)

| Service | Free Tier | Cost After Free |
|---------|-----------|-----------------|
| Railway | $5/month credit | $0.000463/GB-hour |
| Vercel | 100GB bandwidth | $20/month Pro |
| Groq | Unlimited (rate limited) | FREE |
| Supabase | 500MB DB | $25/month Pro |
| Cloudflare R2 | 10GB storage | $0.015/GB |
| **Total** | **$0/month** | ~$25-50/month at scale |

---

## 🎯 Production Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] All environment variables configured
- [ ] Health check endpoint working
- [ ] Demo page functional
- [ ] CORS configured for production domain
- [ ] Error monitoring set up (Sentry)
- [ ] Custom domain configured (optional)

---

**Need help?** Open an issue on GitHub or check the docs at `/docs`
