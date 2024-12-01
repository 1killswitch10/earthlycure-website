import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

dotenv.config();

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);