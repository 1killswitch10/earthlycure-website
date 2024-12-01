import express from 'express';
import cors from 'cors';
import { generateResponse } from './llm.js';
import authRoutes from './auth.js';
import postRoutes from './routes/posts.js';
import { initDatabase } from './config/database.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Initialize database before starting the server
const startServer = async () => {
  try {
    await initDatabase();
    
    // Routes
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

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Server Error:', err);
      res.status(500).json({
        error: 'Server Error',
        message: err.message || 'An unexpected error occurred'
      });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();