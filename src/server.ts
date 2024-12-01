import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://earthlycure.netlify.app']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.post('/api/chat', (req: express.Request, res: express.Response) => {
  const { question } = req.body;
  const answer = findRelevantInfo(question);
  res.json({ answer });
});

const findRelevantInfo = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('digestion') || lowerQuestion.includes('stomach')) {
    return "Ginger is widely used to relieve nausea, improve digestion, and reduce bloating.";
  }
  if (lowerQuestion.includes('immune') || lowerQuestion.includes('cold')) {
    return "Echinacea is commonly used to boost the immune system.";
  }
  if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia')) {
    return "Chamomile is a gentle herb known for its calming properties.";
  }
  
  return "I'm sorry, I don't have specific information about that. Please ask about digestion, immunity, or sleep-related herbs.";
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});