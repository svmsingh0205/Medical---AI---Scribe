'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navigation */}
      <nav style={{ 
        borderBottom: '1px solid var(--border)', 
        background: 'var(--bg2)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700 }}>
              <span className="gradient-text">MediScribe AI</span>
            </h1>
            <span className="badge badge-success">Clinical Platform</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/demo" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              Dashboard
            </Link>
            <Link href="/demo" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              Record
            </Link>
            <Link href="/demo" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              Notes
            </Link>
            <span className="badge badge-success">
              <span className="pulse-dot"></span>
              HIPAA
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 700, 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            <span className="gradient-text">AI-Powered Clinical Documentation</span>
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--muted)', 
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Transform doctor-patient conversations into structured SOAP notes with ICD-10 and CPT codes in under 30 seconds. 
            Built for healthcare professionals who value accuracy and efficiency.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo">
              <button className="btn-primary" style={{ fontSize: '16px', padding: '1rem 2rem' }}>
                ✦ Try Demo Now
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-secondary" style={{ fontSize: '16px', padding: '1rem 2rem' }}>
                View Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="stat-card">
            <div className="stat-label">Time Saved</div>
            <div className="stat-value">8 min</div>
            <div className="stat-delta">↑ Per note average</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">98.4%</div>
            <div className="stat-delta">↑ ICD-10 match rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Processing</div>
            <div className="stat-value">&lt;30s</div>
            <div className="stat-delta">Average generation time</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cost</div>
            <div className="stat-value">FREE</div>
            <div className="stat-delta">Powered by Groq AI</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          <span className="gradient-text">Complete Clinical Intelligence Platform</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Feature 1 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🎤</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              Audio Transcription
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              Upload audio recordings and get accurate transcriptions using Groq Whisper. Supports multiple formats: MP3, WAV, M4A, FLAC.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              SOAP Note Generation
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              AI-powered structured clinical notes with Subjective, Objective, Assessment, and Plan sections automatically generated.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🏥</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              Medical Coding
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              Automatic ICD-10 diagnosis codes and CPT procedure codes with confidence scores for accurate billing.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              AI Refinement
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              Refine notes based on physician feedback. The AI learns and adapts to your documentation style.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              HIPAA Ready
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              Built with healthcare compliance in mind. PHI scrubbing and secure data handling (production deployment).
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card-raised">
            <div style={{ fontSize: '32px', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cyan)' }}>
              Lightning Fast
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
              Powered by Groq's LPU inference engine. Generate complete SOAP notes in under 30 seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '2rem' }}>
            <span className="gradient-text">Powered by Leading AI Technology</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cyan)' }}>Groq Whisper</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Transcription</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--purple)' }}>Llama 3.1 70B</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>SOAP Generation</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cyan)' }}>Next.js 14</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Frontend</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--purple)' }}>FastAPI</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Backend</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to transform your clinical workflow?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '2rem' }}>
            Start generating SOAP notes in seconds. No credit card required.
          </p>
          <Link href="/demo">
            <button className="btn-primary" style={{ fontSize: '16px', padding: '1rem 2.5rem' }}>
              ✦ Try Demo Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border)', 
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '12px'
      }}>
        <p>MediScribe AI © 2026 · Clinical Intelligence Platform</p>
        <p style={{ marginTop: '0.5rem' }}>
          Built with Groq AI · Next.js · FastAPI
        </p>
      </footer>
    </div>
  );
}
