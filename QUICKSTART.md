# 🚀 MediScribe.ai - Quick Start Guide

## ✅ What's Been Built (Week 1 MVP - COMPLETE)

### Backend (FastAPI + Groq)
- ✅ SOAP note generation API (`/api/notes/generate`)
- ✅ Audio transcription API (`/api/audio/transcribe`)
- ✅ One-shot processing (`/api/audio/process`)
- ✅ Health check endpoint (`/api/health`)
- ✅ Groq Whisper integration (FREE)
- ✅ Groq Llama 3.1 70B integration (FREE)
- ✅ Docker + Railway deployment config

### Frontend (Next.js 14)
- ✅ Landing page with features
- ✅ Interactive demo page
- ✅ Dashboard for audio upload
- ✅ Real-time SOAP note display
- ✅ Vercel deployment ready

---

## 🎯 Next Steps: Get Your Live Links

### Step 1: Sign Up for Free Services (5 minutes)

#### 1. Groq (REQUIRED - AI Engine)
- Go to: https://console.groq.com
- Sign up (no credit card needed)
- Get API key from dashboard
- **Copy your key**: `gsk_...`

#### 2. Railway (Backend Hosting)
- Go to: https://railway.app
- Sign up with GitHub
- You get $5 free credit/month

#### 3. Vercel (Frontend Hosting)
- Go to: https://vercel.com
- Sign up with GitHub
- Unlimited free deployments

---

### Step 2: Deploy Backend to Railway (3 minutes)

1. **Go to Railway Dashboard**: https://railway.app/dashboard

2. **Click "New Project"** → **"Deploy from GitHub repo"**

3. **Select**: `Medical---AI---Scribe` repository

4. **Settings**:
   - Root Directory: `backend`
   - Build Command: (auto-detected from Dockerfile)
   - Start Command: (auto-detected)

5. **Add Environment Variables**:
   Click "Variables" tab and add:
   ```
   GROQ_API_KEY=your_groq_key_here
   ENVIRONMENT=production
   ALLOWED_ORIGINS=*
   ```

6. **Deploy**: Railway will automatically build and deploy

7. **Get Your Backend URL**:
   - Click on your deployment
   - Copy the URL: `https://your-app.up.railway.app`
   - Test it: `https://your-app.up.railway.app/api/health`

---

### Step 3: Deploy Frontend to Vercel (2 minutes)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New"** → **"Project"**

3. **Import**: `Medical---AI---Scribe` repository

4. **Configure**:
   - Framework Preset: **Next.js**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
   ```
   (Use your Railway URL from Step 2)

6. **Deploy**: Click "Deploy"

7. **Get Your Frontend URL**:
   - Copy the URL: `https://your-app.vercel.app`
   - Visit it in your browser!

---

## 🧪 Test Your Live Deployment

### Test 1: Health Check
```bash
curl https://your-app.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "production",
  "services": {
    "groq": "configured"
  }
}
```

### Test 2: Generate SOAP Note
```bash
curl -X POST "https://your-app.up.railway.app/api/notes/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "Patient presents with chest pain radiating to left arm. BP 130/85, HR 78. EKG ordered.",
    "specialty": "primary_care"
  }'
```

### Test 3: Use the Demo Page
1. Go to: `https://your-app.vercel.app/demo`
2. Click "Generate SOAP Note"
3. See results in <30 seconds!

---

## 📱 Your Live Links

Once deployed, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Demo Page**: `https://your-app.vercel.app/demo`
- **Dashboard**: `https://your-app.vercel.app/dashboard`
- **API Docs**: `https://your-app.up.railway.app/api/docs`
- **Health Check**: `https://your-app.up.railway.app/api/health`

---

## 🔧 Local Development (Optional)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_key_here" > .env

# Run
uvicorn app.main:app --reload
```

Visit: http://localhost:8000/api/docs

### Frontend
```bash
cd frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run
npm run dev
```

Visit: http://localhost:3000

---

## 🎉 What You Can Do Now

1. **Try the Demo**: Generate SOAP notes from sample transcripts
2. **Upload Audio**: Test with real audio files (MP3, WAV, M4A)
3. **Share the Link**: Show it to physicians for feedback
4. **Monitor Usage**: Check Railway logs for API calls

---

## 📊 Current Features

✅ **Audio Transcription**: Upload audio → Get transcript (Groq Whisper)
✅ **SOAP Generation**: Transcript → Structured SOAP note (Llama 3.1 70B)
✅ **Medical Coding**: Auto-suggest ICD-10 and CPT codes
✅ **Real-time Processing**: <30 seconds end-to-end
✅ **Free Tier**: 100% free with Groq + Railway + Vercel

---

## 🚧 Coming Next (Week 2)

- [ ] Medical NER with spaCy
- [ ] Enhanced ICD-10/CPT coding
- [ ] Pinecone RAG for medical guidelines
- [ ] Speaker diarization (doctor vs patient)
- [ ] Supabase authentication
- [ ] Note history and management

---

## 💡 Tips

- **Railway**: Check logs if deployment fails
- **Vercel**: Redeploy if environment variables change
- **Groq**: Rate limits are generous but not unlimited
- **Testing**: Use the `/demo` page for quick testing

---

## 🐛 Troubleshooting

**Backend won't deploy?**
- Check Railway logs
- Verify Groq API key is set
- Ensure Dockerfile is in `backend/` folder

**Frontend can't connect?**
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend is running (health check)
- Check browser console for CORS errors

**SOAP generation fails?**
- Verify Groq API key is valid
- Check transcript is not empty
- View Railway logs for errors

---

## 📞 Need Help?

- **GitHub Issues**: https://github.com/svmsingh0205/Medical---AI---Scribe/issues
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Groq Docs**: https://console.groq.com/docs

---

**🎯 Goal**: Get your live demo link in the next 10 minutes!

**Ready?** Start with Step 1 above! 🚀
