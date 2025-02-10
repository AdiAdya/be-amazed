// be-amazed-backend/src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiRoutes from './routes/introVideoRoutes';

// Load environment variables from .env file
dotenv.config();

console.log('Environment variables loaded'); // Add this line to verify

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use the OpenAI routes
app.use('/api', openaiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));