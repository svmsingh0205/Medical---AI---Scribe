'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/audio/process`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">MediScribe Dashboard</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Audio</h2>
          <div className="space-y-4">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Generate SOAP Note'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Transcript */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Transcript</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{result.transcript}</p>
            </div>

            {/* SOAP Note */}
            {result.soap_note && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">SOAP Note</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-600">Subjective:</h4>
                    <p className="text-gray-700">{result.soap_note.subjective}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Objective:</h4>
                    <p className="text-gray-700">{result.soap_note.objective}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Assessment:</h4>
                    <p className="text-gray-700">{result.soap_note.assessment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Plan:</h4>
                    <p className="text-gray-700">{result.soap_note.plan}</p>
                  </div>

                  {/* ICD-10 Codes */}
                  {result.soap_note.icd10_codes && result.soap_note.icd10_codes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-600">ICD-10 Codes:</h4>
                      <ul className="list-disc list-inside">
                        {result.soap_note.icd10_codes.map((code: any, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {code.code}: {code.description} ({Math.round(code.confidence * 100)}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CPT Codes */}
                  {result.soap_note.cpt_codes && result.soap_note.cpt_codes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-600">CPT Codes:</h4>
                      <ul className="list-disc list-inside">
                        {result.soap_note.cpt_codes.map((code: any, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {code.code}: {code.description} ({Math.round(code.confidence * 100)}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
