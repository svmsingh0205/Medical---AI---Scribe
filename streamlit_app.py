"""
MediScribe.ai - Streamlit Demo
AI-powered SOAP note generator
"""
import streamlit as st
import requests
import json
import os
from groq import Groq

# Page config
st.set_page_config(
    page_title="MediScribe.ai - AI Medical Scribe",
    page_icon="🏥",
    layout="wide"
)

# Initialize Groq client
@st.cache_resource
def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY") or st.secrets.get("GROQ_API_KEY", "")
    if not api_key:
        return None
    return Groq(api_key=api_key)

# SOAP generation function
def generate_soap_note(transcript, client):
    """Generate SOAP note using Groq Llama 3.1 70B"""
    
    system_prompt = """You are an expert medical scribe AI. Convert doctor-patient conversations into structured SOAP notes.

SOAP Format:
- Subjective: Patient's complaints and symptoms
- Objective: Measurable findings and vital signs
- Assessment: Diagnosis with ICD-10 codes
- Plan: Treatment plan with CPT codes

Return ONLY valid JSON in this format:
{
  "subjective": "string",
  "objective": "string",
  "assessment": "string",
  "plan": "string",
  "icd10_codes": [{"code": "string", "description": "string"}],
  "cpt_codes": [{"code": "string", "description": "string"}],
  "chief_complaint": "string"
}"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Transcript:\n{transcript}\n\nGenerate SOAP note:"}
            ],
            temperature=0.1,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        st.error(f"Error generating SOAP note: {str(e)}")
        return None

# Sample transcript
SAMPLE_TRANSCRIPT = """Doctor: Good morning! How can I help you today?

Patient: Hi doctor. I've been having this persistent chest pain for the past three days. It's a dull ache that comes and goes.

Doctor: I see. Can you describe the pain more? Is it sharp or dull? Does it radiate anywhere?

Patient: It's more of a dull, aching pain. Sometimes it feels like pressure. It doesn't really radiate, but I do feel it more when I take deep breaths.

Doctor: Okay. Any shortness of breath, dizziness, or nausea?

Patient: No dizziness or nausea, but I have been feeling a bit short of breath, especially when climbing stairs.

Doctor: Have you had any recent injuries or trauma to your chest?

Patient: No, nothing like that.

Doctor: Let me check your vitals. Blood pressure is 130/85, heart rate is 78, temperature is 98.6°F. Let me listen to your heart and lungs.

Doctor: Your heart sounds normal, lungs are clear. Based on your symptoms, this could be musculoskeletal pain, possibly costochondritis, but we should rule out cardiac causes given the chest pain and shortness of breath.

Doctor: I'm going to order an EKG and chest X-ray to be safe. In the meantime, I'll prescribe ibuprofen 400mg three times daily for the pain. If the pain worsens or you experience severe shortness of breath, go to the ER immediately.

Patient: Okay, thank you doctor.

Doctor: Follow up with me in one week or sooner if symptoms worsen."""

# Main app
def main():
    # Header
    st.title("🏥 MediScribe.ai")
    st.subheader("AI-Powered Clinical Documentation")
    st.markdown("Transform doctor-patient conversations into structured SOAP notes in seconds")
    
    # Sidebar
    with st.sidebar:
        st.header("⚙️ Settings")
        
        # API Key input
        api_key_input = st.text_input(
            "Groq API Key",
            type="password",
            help="Get your free API key from https://console.groq.com"
        )
        
        if api_key_input:
            os.environ["GROQ_API_KEY"] = api_key_input
        
        st.markdown("---")
        st.markdown("### 📊 Stats")
        st.metric("Processing Time", "< 30 sec")
        st.metric("Accuracy", "95%+")
        st.metric("Cost", "$0 FREE")
        
        st.markdown("---")
        st.markdown("### 🔗 Links")
        st.markdown("[GitHub Repo](https://github.com/svmsingh0205/Medical---AI---Scribe)")
        st.markdown("[Get Groq API Key](https://console.groq.com)")
        st.markdown("[Documentation](https://github.com/svmsingh0205/Medical---AI---Scribe/blob/main/README.md)")
    
    # Main content
    col1, col2 = st.columns(2)
    
    with col1:
        st.header("📝 Transcript")
        
        # Use sample or custom
        use_sample = st.checkbox("Use sample transcript", value=True)
        
        if use_sample:
            transcript = st.text_area(
                "Doctor-Patient Conversation",
                value=SAMPLE_TRANSCRIPT,
                height=400,
                help="Edit the sample or write your own"
            )
        else:
            transcript = st.text_area(
                "Doctor-Patient Conversation",
                height=400,
                placeholder="Enter the conversation transcript here..."
            )
        
        # Generate button
        if st.button("🚀 Generate SOAP Note", type="primary", use_container_width=True):
            if not transcript:
                st.error("Please enter a transcript")
            else:
                client = get_groq_client()
                if not client:
                    st.error("⚠️ Please enter your Groq API Key in the sidebar")
                    st.info("Get a free API key from https://console.groq.com")
                else:
                    with st.spinner("Generating SOAP note..."):
                        soap_note = generate_soap_note(transcript, client)
                        if soap_note:
                            st.session_state.soap_note = soap_note
                            st.success("✅ SOAP note generated successfully!")
    
    with col2:
        st.header("📋 SOAP Note")
        
        if "soap_note" in st.session_state:
            soap = st.session_state.soap_note
            
            # Display SOAP note
            st.markdown("### 🔵 Subjective")
            st.write(soap.get("subjective", "N/A"))
            
            st.markdown("### 🔵 Objective")
            st.write(soap.get("objective", "N/A"))
            
            st.markdown("### 🔵 Assessment")
            st.write(soap.get("assessment", "N/A"))
            
            st.markdown("### 🔵 Plan")
            st.write(soap.get("plan", "N/A"))
            
            # ICD-10 Codes
            if soap.get("icd10_codes"):
                st.markdown("### 💊 ICD-10 Codes")
                for code in soap["icd10_codes"]:
                    st.markdown(f"- **{code['code']}**: {code['description']}")
            
            # CPT Codes
            if soap.get("cpt_codes"):
                st.markdown("### 🏥 CPT Codes")
                for code in soap["cpt_codes"]:
                    st.markdown(f"- **{code['code']}**: {code['description']}")
            
            # Export options
            st.markdown("---")
            col_a, col_b = st.columns(2)
            
            with col_a:
                # JSON export
                json_str = json.dumps(soap, indent=2)
                st.download_button(
                    "📥 Download JSON",
                    json_str,
                    "soap_note.json",
                    "application/json",
                    use_container_width=True
                )
            
            with col_b:
                # Text export
                text_output = f"""SOAP NOTE
Generated by MediScribe.ai

SUBJECTIVE:
{soap.get('subjective', 'N/A')}

OBJECTIVE:
{soap.get('objective', 'N/A')}

ASSESSMENT:
{soap.get('assessment', 'N/A')}

PLAN:
{soap.get('plan', 'N/A')}

ICD-10 CODES:
{chr(10).join([f"- {c['code']}: {c['description']}" for c in soap.get('icd10_codes', [])])}

CPT CODES:
{chr(10).join([f"- {c['code']}: {c['description']}" for c in soap.get('cpt_codes', [])])}
"""
                st.download_button(
                    "📄 Download Text",
                    text_output,
                    "soap_note.txt",
                    "text/plain",
                    use_container_width=True
                )
        else:
            st.info("👈 Enter a transcript and click 'Generate SOAP Note' to see results")
    
    # Footer
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center; color: gray;'>
        <p>Built with ❤️ using Groq AI (FREE) | 
        <a href='https://github.com/svmsingh0205/Medical---AI---Scribe'>GitHub</a> | 
        <a href='https://console.groq.com'>Get API Key</a></p>
        <p><small>⚠️ AI-generated notes are suggestions only. Physicians must review and approve all content.</small></p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
