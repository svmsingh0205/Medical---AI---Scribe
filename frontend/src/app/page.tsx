'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            MediScribe<span className="text-blue-600">.ai</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            AI-Powered Clinical Documentation
          </p>
          <p className="text-xl text-gray-600 mb-8">
            Transform doctor-patient conversations into structured SOAP notes in seconds
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Try Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10+</div>
              <div className="text-gray-600">Hours Saved/Week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">&lt;30s</div>
              <div className="text-gray-600">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">95%+</div>
              <div className="text-gray-600">Accuracy</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Transcription</h3>
              <p className="text-gray-600">
                Convert conversations to text using state-of-the-art Whisper AI
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">SOAP Notes</h3>
              <p className="text-gray-600">
                Automatically generate structured clinical documentation
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">💊</div>
              <h3 className="text-xl font-semibold mb-2">Medical Coding</h3>
              <p className="text-gray-600">
                ICD-10 and CPT codes suggested with confidence scores
              </p>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="text-lg font-semibold">Free</div>
                <div className="text-3xl font-bold my-2">$0</div>
                <div className="text-gray-600">50 notes/month</div>
              </div>
              <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
                <div className="text-lg font-semibold text-blue-600">Solo</div>
                <div className="text-3xl font-bold my-2">$199</div>
                <div className="text-gray-600">Unlimited notes</div>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="text-lg font-semibold">Group</div>
                <div className="text-3xl font-bold my-2">$149</div>
                <div className="text-gray-600">per user (5+)</div>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="mt-8 text-sm text-gray-500">
            <p>🟢 API Status: <span className="font-semibold">Operational</span></p>
            <p className="mt-2">
              Backend: <code className="bg-gray-100 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
              </code>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
