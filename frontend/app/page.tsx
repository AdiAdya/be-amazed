// be-amazed-frontend/app/page.tsx
"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [script, setScript] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      console.log('Sending request to backend with script:', script);
      const response = await axios.post<{ intro: string }>('http://localhost:5000/api/generate-intro', { script });
      setIntro(response.data.intro);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('Error generating intro:', err.response ? err.response.data : err.message);
      } else {
        console.log('Error generating intro:', (err as Error).message);
      }
      setError('Failed to generate intro. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-4 text-foreground">YouTube Intro Generator</h1>
      <textarea
        className="border rounded p-2 w-1/2 mb-4 placeholder-gray-500 text-black"
        style={{ color: 'black' }} // Ensure text color is black
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste your video script here..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Generate Intro
      </button>
      {intro && <p className="mt-4 p-4 border rounded bg-gray-100 text-foreground">{intro}</p>}
      {error && <p className="mt-4 p-4 border rounded bg-red-100 text-red-700">{error}</p>}
    </div>
  );
};

export default Home;