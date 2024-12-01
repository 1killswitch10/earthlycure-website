import express from 'express';
import cors from 'cors';
import { generateResponse } from './llm.js';
import authRoutes from './auth.js';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://earthlycure.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Question is required'
      });
    }

    const answer = await generateResponse(question.trim());
    res.json({ answer });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      error: 'Chat Error',
      message: error.message || 'Failed to process chat request'
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});