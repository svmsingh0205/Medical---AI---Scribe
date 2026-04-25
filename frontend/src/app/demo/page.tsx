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

  const handleGenerate = async () => {
    setLoading(true);
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

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Try MediScribe Demo</h1>
        <p className="text-gray-600 mb-8">
          Edit the transcript below or use the sample conversation to see how MediScribe generates SOAP notes
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder="Enter doctor-patient conversation..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !transcript}
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate SOAP Note'}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">SOAP Note</h2>
            {!result ? (
              <div className="h-96 flex items-center justify-center text-gray-400">
                Click "Generate SOAP Note" to see results
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto h-96">
                <div>
                  <h4 className="font-semibold text-blue-600">Subjective:</h4>
                  <p className="text-gray-700 text-sm">{result.soap_note.subjective}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Objective:</h4>
                  <p className="text-gray-700 text-sm">{result.soap_note.objective}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Assessment:</h4>
                  <p className="text-gray-700 text-sm">{result.soap_note.assessment}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Plan:</h4>
                  <p className="text-gray-700 text-sm">{result.soap_note.plan}</p>
                </div>

                {result.soap_note.icd10_codes && result.soap_note.icd10_codes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-600">ICD-10 Codes:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {result.soap_note.icd10_codes.map((code: any, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          {code.code}: {code.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.soap_note.cpt_codes && result.soap_note.cpt_codes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-600">CPT Codes:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {result.soap_note.cpt_codes.map((code: any, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          {code.code}: {code.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-800">
            <li>Doctor-patient conversation is transcribed using Groq Whisper (FREE)</li>
            <li>AI analyzes the transcript and extracts medical entities</li>
            <li>Structured SOAP note is generated using Llama 3.1 70B (FREE)</li>
            <li>ICD-10 and CPT codes are suggested with confidence scores</li>
            <li>Total processing time: &lt;30 seconds</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
