import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadHerbalData() {
  try {
    const dataPath = path.join(__dirname, '../data/herbal_medicine.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    
    if (!jsonData.herbs || !Array.isArray(jsonData.herbs)) {
      console.error('Invalid data format: expected herbs array');
      return [];
    }

    return jsonData.herbs.filter(entry => 
      entry && 
      typeof entry.text === 'string' && 
      entry.text.trim().length > 0
    );
  } catch (error) {
    console.error('Error loading herbal medicine data:', error);
    return [];
  }
}