# 🚀 Deploy MediScribe.ai to Streamlit Cloud (FREE)

## Quick Deploy (5 minutes)

### Step 1: Get Groq API Key (2 minutes)
1. Go to: https://console.groq.com
2. Sign up (no credit card needed)
3. Click "API Keys" → "Create API Key"
4. Copy your key: `gsk_...`

### Step 2: Deploy to Streamlit Cloud (3 minutes)

1. **Go to Streamlit Cloud**: https://share.streamlit.io

2. **Sign in with GitHub**

3. **Click "New app"**

4. **Configure**:
   - Repository: `svmsingh0205/Medical---AI---Scribe`
   - Branch: `main`
   - Main file path: `streamlit_app.py`

5. **Add Secret** (Advanced settings):
   ```toml
   GROQ_API_KEY = "your_groq_key_here"
   ```

6. **Click "Deploy"**

7. **Get Your Link**: `https://your-app.streamlit.app`

---

## 🎯 Your Live Streamlit Link

After deployment, you'll get a link like:
```
https://mediscribe-ai.streamlit.app
```

Share this link with anyone - they can use it immediately!

---

## 🧪 Test Locally First (Optional)

```bash
# Install dependencies
pip install -r requirements-streamlit.txt

# Create secrets file
mkdir .streamlit
echo 'GROQ_API_KEY = "your_key_here"' > .streamlit/secrets.toml

# Run app
streamlit run streamlit_app.py
```

Visit: http://localhost:8501

---

## ✨ Features

- ✅ Interactive UI with sample transcript
- ✅ Real-time SOAP note generation
- ✅ ICD-10 and CPT code suggestions
- ✅ Download as JSON or Text
- ✅ 100% FREE (Groq + Streamlit Cloud)
- ✅ No backend needed - runs entirely on Streamlit

---

## 💰 Cost

**$0/month** - Both Groq and Streamlit Cloud are FREE!

---

## 🐛 Troubleshooting

**App won't start?**
- Check if `streamlit_app.py` is in the root directory
- Verify Groq API key is set in secrets

**SOAP generation fails?**
- Verify Groq API key is valid
- Check Streamlit logs for errors

---

## 📱 Share Your Link

Once deployed, share your Streamlit link:
- With physicians for feedback
- On social media
- In your portfolio
- For beta testing

---

**Ready to deploy?** Follow the steps above! 🚀
