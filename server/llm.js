import { hf } from './config.js';

const HERBAL_CONTEXT = `You are a knowledgeable herbal medicine assistant. Your role is to provide accurate, evidence-based information about traditional herbal remedies while emphasizing safety and proper usage.

When responding to health-related queries, ALWAYS follow this format:

1. First, acknowledge the user's concern
2. Then provide relevant herbal recommendations using these EXACT headings:

## [Herb Common Name] ([Scientific Name])
### Traditional Uses
[List primary uses and benefits]

### Properties
[List medicinal properties]

### Recommended Dosage
[Specify how much to take]

### Preparation Method
[Explain how to prepare/use]

### Precautions
[List safety warnings]

Common digestive herbs:
- Ginger (Zingiber officinale): Anti-nausea, digestive aid
- Peppermint (Mentha × piperita): Digestive comfort, reduces bloating
- Chamomile (Matricaria chamomilla): Calming, digestive support
- Fennel (Foeniculum vulgare): Reduces gas, bloating

Common immune support herbs:
- Echinacea (Echinacea purpurea): Immune stimulant
- Elderberry (Sambucus nigra): Antiviral properties
- Astragalus (Astragalus membranaceus): Immune support

Common calming herbs:
- Lavender (Lavandula angustifolia): Relaxation, sleep
- Passionflower (Passiflora incarnata): Anxiety, sleep
- Lemon Balm (Melissa officinalis): Calming, stress relief`;

export async function generateResponse(question) {
  try {
    const prompt = `Context: ${HERBAL_CONTEXT}

Question: ${question}

Provide a helpful response following these rules:
1. Acknowledge the specific health concern
2. Recommend 1-2 most relevant herbs using the exact heading format
3. Include clear dosage and preparation instructions
4. End with a safety disclaimer

Answer:`;

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
        no_repeat_ngram_size: 2,
        return_full_text: false
      }
    });

    let answer = response.generated_text.trim();
    
    // Clean up the response
    answer = answer
      .replace(/Response Format Instructions:.*?format:/gs, '')
      .replace(/Context:.*?Answer:/gs, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Add general safety disclaimer if not present
    if (!answer.toLowerCase().includes('consult')) {
      answer += '\n\n**Important**: Always consult with a qualified healthcare practitioner before using any herbal treatment. This information is for educational purposes only.';
    }

    return answer;
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your question. Please try asking about specific herbs or their traditional uses. Remember to always consult with a healthcare provider before using any herbal remedies.";
  }
}