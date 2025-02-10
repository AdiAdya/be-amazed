import axios from 'axios';

export const generateIntro = async (script: string): Promise<string> => {
  try {
    console.log('Using local Llama-3 model with Ollama'); // Log the usage of the local model
    
    const response = await axios.post('http://localhost:8000/generate', {
      model: "llama-3",  // Using the local Llama-3 model
      prompt: `Generate a catchy YouTube intro based on this script:\n${script}`,
      max_tokens: 50,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.data.choices[0]?.text || "Error: No response received";
  } catch (error: any) {
    console.error("Error generating intro:", error.response?.data || error.message);
    return "Error: Unable to generate intro.";
  }
};