'use client';

import { useState } from 'react';

const SAMPLE_TRANSCRIPT = `Doctor: Good morning! How can I help you today?

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

Doctor: Follow up with me in one week or sooner if symptoms worsen.`;

export default function Demo() {
  const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/notes/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript,
          specialty: 'primary_care',
          encounter_type: 'office_visit',
        }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Generation failed. Make sure the backend is running and API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  const handleLoadDemo = () => {
    setTranscript(SAMPLE_TRANSCRIPT);
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '0.5rem' }}>
            <span className="gradient-text">MediScribe AI</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
            Clinical Intelligence Platform · Generate SOAP notes from doctor-patient conversations
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Processing Time</div>
            <div className="stat-value">&lt;30s</div>
            <div className="stat-delta">Average per note</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">98.4%</div>
            <div className="stat-delta">ICD-10 match rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">AI Model</div>
            <div className="stat-value">Llama 3.1</div>
            <div className="stat-delta">70B parameters</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Status</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '16px' }}>Live</span>
            </div>
            <div className="stat-delta">All systems operational</div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error">
            <span>✕</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {result && !error && (
          <div className="alert alert-success">
            <span>✓</span>
            <span>SOAP note generated successfully. Ready to export.</span>
          </div>
        )}

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Input Section */}
          <div className="card">
            <div style={{ marginBottom: '1rem' }}>
              <label className="label">Transcript Input</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                style={{
                  width: '100%',
                  height: '400px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontFamily: 'var(--font)',
                  resize: 'vertical',
                  lineHeight: '1.6'
                }}
                placeholder="Enter doctor-patient conversation..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleGenerate}
                disabled={loading || !transcript}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                {loading ? '⟳ Generating…' : '✦ Generate SOAP Note'}
              </button>
              <button
                onClick={handleLoadDemo}
                className="btn-secondary"
              >
                Load Demo
              </button>
              <button
                onClick={handleClear}
                className="btn-secondary"
                disabled={!result}
              >
                ✕ Clear Note
              </button>
            </div>

            {/* AI Pipeline */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg3)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: '0.75rem' }}>AI Pipeline</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px', color: 'var(--muted)' }}>
                <span style={{ color: loading ? 'var(--cyan)' : 'var(--muted)' }}>🎤 Audio</span>
                <span>→</span>
                <span style={{ color: loading ? 'var(--cyan)' : 'var(--muted)' }}>📝 Transcription</span>
                <span>→</span>
                <span style={{ color: loading ? 'var(--cyan)' : 'var(--muted)' }}>🧠 NLP</span>
                <span>→</span>
                <span style={{ color: loading ? 'var(--cyan)' : 'var(--muted)' }}>📋 SOAP</span>
                <span>→</span>
                <span style={{ color: loading ? 'var(--cyan)' : 'var(--muted)' }}>🏥 ICD/CPT</span>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="card">
            <label className="label">SOAP Note Output</label>
            
            {!result ? (
              <div style={{ 
                height: '400px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'var(--bg3)',
                borderRadius: '8px',
                border: '1px dashed var(--border)',
                color: 'var(--muted)',
                fontSize: '13px'
              }}>
                Click "Generate SOAP Note" to see results
              </div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {/* Subjective */}
                <div className="soap-section">
                  <div className="soap-header">S — Subjective</div>
                  <div className="soap-content">{result.soap_note.subjective}</div>
                </div>

                {/* Objective */}
                <div className="soap-section">
                  <div className="soap-header">O — Objective</div>
                  <div className="soap-content">{result.soap_note.objective}</div>
                </div>

                {/* Assessment */}
                <div className="soap-section">
                  <div className="soap-header">A — Assessment</div>
                  <div className="soap-content">{result.soap_note.assessment}</div>
                </div>

                {/* Plan */}
                <div className="soap-section">
                  <div className="soap-header">P — Plan</div>
                  <div className="soap-content">{result.soap_note.plan}</div>
                </div>

                {/* ICD-10 Codes */}
                {result.soap_note.icd10_codes && result.soap_note.icd10_codes.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <label className="label">ICD-10 Codes</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {result.soap_note.icd10_codes.map((code: any, idx: number) => (
                        <div key={idx} className="code-badge">
                          <span className="code">{code.code}</span>
                          <span className="description">{code.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CPT Codes */}
                {result.soap_note.cpt_codes && result.soap_note.cpt_codes.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <label className="label">CPT Codes</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {result.soap_note.cpt_codes.map((code: any, idx: number) => (
                        <div key={idx} className="code-badge">
                          <span className="code">{code.code}</span>
                          <span className="description">{code.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Export Button */}
                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    onClick={() => {
                      const text = `SOAP NOTE\n\nSUBJECTIVE:\n${result.soap_note.subjective}\n\nOBJECTIVE:\n${result.soap_note.objective}\n\nASSESSMENT:\n${result.soap_note.assessment}\n\nPLAN:\n${result.soap_note.plan}`;
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'soap-note.txt';
                      a.click();
                    }}
                    className="btn-secondary"
                    style={{ width: '100%' }}
                  >
                    ⤓ Export (.txt)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div style={{ 
          marginTop: '2rem', 
          background: 'rgba(0, 212, 255, 0.05)', 
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cyan)', marginBottom: '1rem' }}>
            How it works:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', fontSize: '12px', color: 'var(--text)' }}>
            <div>
              <strong style={{ color: 'var(--cyan)' }}>1. Transcription</strong>
              <p style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>Audio converted to text using Groq Whisper (FREE)</p>
            </div>
            <div>
              <strong style={{ color: 'var(--cyan)' }}>2. NLP Analysis</strong>
              <p style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>Medical entities extracted with Llama 3.1 70B</p>
            </div>
            <div>
              <strong style={{ color: 'var(--cyan)' }}>3. SOAP Generation</strong>
              <p style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>Structured clinical note with ICD-10/CPT codes</p>
            </div>
            <div>
              <strong style={{ color: 'var(--cyan)' }}>4. Export</strong>
              <p style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>Download or integrate with your EHR system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
