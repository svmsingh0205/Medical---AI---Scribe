'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '0.5rem' }}>
            Dashboard Overview
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
            Monitor your clinical documentation workflow and performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Notes Today</div>
            <div className="stat-value">24</div>
            <div className="stat-delta">↑ 12% vs yesterday</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Time Saved</div>
            <div className="stat-value">3.2h</div>
            <div className="stat-delta">8 min / note avg</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">98.4%</div>
            <div className="stat-delta">ICD-10 match rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value">7</div>
            <div className="stat-delta">Requires signature</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Recent Notes */}
          <div className="card">
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '1.5rem' }}>Recent Notes</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Note Item */}
              <div style={{ 
                padding: '1rem', 
                background: 'var(--bg3)', 
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '0.25rem' }}>
                    James Thornton
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    DOB: 08/22/1957 · M · MRN 00891
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '0.25rem' }}>
                    Chief Complaint: Chest pain, shortness of breath
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-success">Completed</span>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}>
                    Review
                  </button>
                </div>
              </div>

              {/* Note Item */}
              <div style={{ 
                padding: '1rem', 
                background: 'var(--bg3)', 
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Sarah Mitchell
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    DOB: 03/15/1982 · F · MRN 00892
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '0.25rem' }}>
                    Chief Complaint: Annual physical examination
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-warning">Pending</span>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}>
                    Review
                  </button>
                </div>
              </div>

              {/* Note Item */}
              <div style={{ 
                padding: '1rem', 
                background: 'var(--bg3)', 
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Robert Chen
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    DOB: 11/08/1975 · M · MRN 00893
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '0.25rem' }}>
                    Chief Complaint: Follow-up diabetes management
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-success">Completed</span>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}>
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '1.5rem' }}>Quick Actions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/demo">
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="pulse-dot"></span>
                  New Recording
                </button>
              </Link>
              <Link href="/demo">
                <button className="btn-secondary" style={{ width: '100%' }}>
                  📋 Generate from Text
                </button>
              </Link>
              <button className="btn-secondary" style={{ width: '100%' }}>
                📁 View All Notes
              </button>
              <button className="btn-secondary" style={{ width: '100%' }}>
                ⚙️ Settings
              </button>
            </div>

            {/* System Status */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg3)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: '0.75rem' }}>System Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)' }}>API Status</span>
                  <span style={{ color: 'var(--green)' }}>● Operational</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)' }}>Groq AI</span>
                  <span style={{ color: 'var(--green)' }}>● Connected</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)' }}>Storage</span>
                  <span style={{ color: 'var(--green)' }}>● Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Pipeline Visualization */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '1.5rem' }}>AI Pipeline</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🎤</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)' }}>Audio</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Input</div>
            </div>
            <div style={{ color: 'var(--border)' }}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>📝</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)' }}>Transcription</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Whisper</div>
            </div>
            <div style={{ color: 'var(--border)' }}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🧠</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)' }}>NLP</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Analysis</div>
            </div>
            <div style={{ color: 'var(--border)' }}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)' }}>SOAP</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Generation</div>
            </div>
            <div style={{ color: 'var(--border)' }}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🏥</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)' }}>ICD/CPT</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Coding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
