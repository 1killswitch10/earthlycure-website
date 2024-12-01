import ashwagandha from '../assets/images/ashwagandha.jpg';
import gotuKola from '../assets/images/gotu-kola.png';
import centella from '../assets/images/centella.jpg';
import { Herb } from '../types/herb';

export const herbs: Herb[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    description: 'A powerful adaptogenic herb known for its stress-reducing and energy-boosting properties. Traditional Ayurvedic medicine uses it to promote overall wellness and vitality.',
    image: ashwagandha,
    uses: [
      'Reduces stress and anxiety',
      'Improves sleep quality',
      'Boosts energy and reduces fatigue',
      'Enhances concentration and memory',
      'Supports immune system function'
    ],
    properties: [
      'Adaptogenic',
      'Anti-inflammatory',
      'Antioxidant',
      'Immunomodulatory',
      'Neuroprotective'
    ],
    preparation: 'Ashwagandha can be taken as a powder, capsule, or tincture. For powder form, mix 1/4 to 1/2 teaspoon with warm milk or water. It can also be added to smoothies or other beverages.',
    dosage: 'Typical dosage ranges from 300-600mg per day, taken with meals. Start with a lower dose and gradually increase as needed.',
    precautions: [
      'Pregnant or nursing women should avoid use',
      'May interact with thyroid medications',
      'Can cause drowsiness when combined with sedatives',
      'Those with autoimmune conditions should consult a healthcare provider',
      'Stop use 2 weeks before surgery'
    ]
  },
  {
    id: 'gotu-kola',
    name: 'Gotu Kola',
    scientificName: 'Centella asiatica',
    description: 'A rejuvenating herb that supports cognitive function and mental clarity. It has been used in traditional medicine for centuries to enhance memory and promote longevity.',
    image: gotuKola,
    uses: [
      'Enhances memory and cognitive function',
      'Reduces anxiety and stress',
      'Promotes wound healing',
      'Improves circulation',
      'Supports skin health'
    ],
    properties: [
      'Neuroprotective',
      'Anti-anxiety',
      'Wound healing',
      'Venotropic',
      'Antioxidant'
    ],
    preparation: 'Can be consumed as tea, tincture, or capsules. For tea, steep 1-2 teaspoons of dried herb in hot water for 10-15 minutes.',
    dosage: 'Standard dosage is 300-600mg of dried herb, 2-3 times daily. For tea, drink 1-2 cups daily.',
    precautions: [
      'May cause skin sensitivity in some people',
      'Not recommended during pregnancy',
      'Can interact with certain medications',
      'May cause headaches in sensitive individuals',
      'Should not be used before surgery'
    ]
  },
  {
    id: 'centella',
    name: 'Centella Asiatica',
    scientificName: 'Centella asiatica',
    description: 'Also known as Indian Pennywort, this herb is renowned for its healing properties and ability to support skin health and circulation.',
    image: centella,
    uses: [
      'Promotes skin healing',
      'Improves blood circulation',
      'Reduces inflammation',
      'Supports cognitive function',
      'Aids in wound healing'
    ],
    properties: [
      'Anti-inflammatory',
      'Wound healing',
      'Cognitive enhancing',
      'Antioxidant',
      'Vein toning'
    ],
    preparation: 'Available as cream, capsules, or tea. For tea, use 1-2 teaspoons of dried herb per cup of hot water.',
    dosage: 'Typical dosage is 250-500mg extract, 2-3 times daily. For tea, drink 2-3 cups daily.',
    precautions: [
      'May cause skin irritation in sensitive individuals',
      'Avoid during pregnancy and breastfeeding',
      'Can interact with certain medications',
      'May cause nausea in some people',
      'Discontinue use if allergic reactions occur'
    ]
  }
];