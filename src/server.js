import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;

// Initialize Hugging Face client with API key
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Load herbal medicine data from JSON file
async function loadHerbalData() {
  try {
    const dataPath = path.join(__dirname, '../data/herbal_medicine.json');
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading herbal medicine data:', error);
    return null;
  }
}

// Generate response using the model
async function generateResponse(question, herbalData) {
  try {
    // Find relevant sections based on keywords
    const sections = [];
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('digestion') || lowerQuestion.includes('stomach')) {
      sections.push(herbalData.herbs_for_digestion);
    }
    if (lowerQuestion.includes('immune') || lowerQuestion.includes('cold')) {
      sections.push(herbalData.herbs_for_immunity);
    }
    if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia')) {
      sections.push(herbalData.herbs_for_sleep);
    }

    // If no specific sections found, include all data
    const context = sections.length > 0 
      ? sections.map(s => `${s.title}:\n${s.content}`).join('\n\n')
      : Object.values(herbalData).map(s => `${s.title}:\n${s.content}`).join('\n\n');

    const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nAnswer: Let me help you with information about herbal medicine based on the available data.`;

    const response = await hf.textGeneration({
      model: 'google/flan-t5-base',  // Using a more accessible model
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15
      }
    });

    return response.generated_text;
  } catch (error) {
    // Fallback to simple keyword matching if model fails
    console.error('Error generating response:', error);
    return findRelevantInfo(question, herbalData);
  }
}

// Fallback function for simple keyword matching
function findRelevantInfo(question, herbalData) {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('digestion') || lowerQuestion.includes('stomach')) {
    return herbalData.herbs_for_digestion.content;
  }
  if (lowerQuestion.includes('immune') || lowerQuestion.includes('cold')) {
    return herbalData.herbs_for_immunity.content;
  }
  if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia')) {
    return herbalData.herbs_for_sleep.content;
  }
  
  return "I'm sorry, I don't have specific information about that. Please ask about digestion, immunity, or sleep-related herbs.";
}

app.use(cors());
app.use(express.json());

let herbalData = null;

// Initialize herbal data on server start
(async () => {
  try {
    herbalData = await loadHerbalData();
    console.log('Herbal medicine data loaded successfully');
  } catch (error) {
    console.error('Failed to load herbal data:', error);
  }
})();

app.post('/api/chat', async (req, res) => {
  if (!herbalData) {
    return res.status(500).json({ 
      answer: "Sorry, the herbal medicine database is not available right now. Please try again later." 
    });
  }

  const { question } = req.body;
  const answer = await generateResponse(question, herbalData);
  res.json({ answer });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});