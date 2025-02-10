import { Request, Response } from 'express';
import { generateIntro } from '../services/introVideoService';

export const generateIntroController = async (req: Request, res: Response) => {
  const { script } = req.body;
  try {
    const intro = await generateIntro(script);
    res.json({ intro });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating intro:', (error as any).response ? (error as any).response.data : error.message);
    } else {
      console.error('Error generating intro:', error);
    }
    res.status(500).json({ error: 'Failed to generate intro' });
  }
};