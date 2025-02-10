'use client';

import { useState } from 'react';

export default function Home() {
  const [script, setScript] = useState('');
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(false);

  const generateIntro = async () => {
    setLoading(true);
    setIntro('');
    try {
      const response = await fetch('http://localhost:5000/generate-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script })
      });
      const data = await response.json();
      setIntro(data.intro);
    } catch (error) {
      console.log(error);
      setIntro('Error generating intro');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">YouTube Intro Generator</h1>
      <textarea className="w-full p-2 border rounded" rows={5} placeholder="Paste your script here..." value={script} onChange={(e) => setScript(e.target.value)} />
      <button className="mt-3 p-2 bg-blue-500 text-white rounded" onClick={generateIntro} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Intro'}
      </button>
      {intro && <p className="mt-4 p-3 bg-gray-100 border rounded">{intro}</p>}
    </div>
  );
}
