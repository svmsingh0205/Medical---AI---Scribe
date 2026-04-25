"""
MediScribe.ai - Local Demo
Run this file to test SOAP note generation locally
No deployment needed!
"""

import os
import json
from groq import Groq

# Your Groq API Key - REPLACE THIS WITH YOUR OWN KEY
# Get it from: https://console.groq.com/keys
GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE"

# Sample medical transcript
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

def generate_soap_note(transcript):
    """Generate SOAP note using Groq"""
    
    print("🏥 MediScribe.ai - Generating SOAP Note...")
    print("=" * 60)
    
    client = Groq(api_key=GROQ_API_KEY)
    
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
        
        soap_note = json.loads(response.choices[0].message.content)
        return soap_note
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

def display_soap_note(soap_note):
    """Display SOAP note in a nice format"""
    
    if not soap_note:
        print("❌ Failed to generate SOAP note")
        return
    
    print("\n✅ SOAP NOTE GENERATED SUCCESSFULLY!")
    print("=" * 60)
    
    print("\n📋 SUBJECTIVE:")
    print(soap_note.get('subjective', 'N/A'))
    
    print("\n📋 OBJECTIVE:")
    print(soap_note.get('objective', 'N/A'))
    
    print("\n📋 ASSESSMENT:")
    print(soap_note.get('assessment', 'N/A'))
    
    print("\n📋 PLAN:")
    print(soap_note.get('plan', 'N/A'))
    
    if soap_note.get('icd10_codes'):
        print("\n💊 ICD-10 CODES:")
        for code in soap_note['icd10_codes']:
            print(f"  - {code['code']}: {code['description']}")
    
    if soap_note.get('cpt_codes'):
        print("\n🏥 CPT CODES:")
        for code in soap_note['cpt_codes']:
            print(f"  - {code['code']}: {code['description']}")
    
    print("\n" + "=" * 60)
    print("✅ Demo completed successfully!")
    print("\n💡 Want to try your own transcript?")
    print("   Edit the SAMPLE_TRANSCRIPT variable in this file!")

def main():
    """Main demo function"""
    
    print("\n" + "=" * 60)
    print("🏥 MediScribe.ai - Local Demo")
    print("=" * 60)
    print("\n📝 Using sample medical transcript...")
    print("\n" + "-" * 60)
    print(SAMPLE_TRANSCRIPT[:200] + "...")
    print("-" * 60)
    
    # Generate SOAP note
    soap_note = generate_soap_note(SAMPLE_TRANSCRIPT)
    
    # Display results
    display_soap_note(soap_note)
    
    # Save to file
    if soap_note:
        with open('soap_note_output.json', 'w') as f:
            json.dump(soap_note, f, indent=2)
        print("\n💾 SOAP note saved to: soap_note_output.json")

if __name__ == "__main__":
    main()
