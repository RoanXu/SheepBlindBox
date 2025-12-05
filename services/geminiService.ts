
import { SheepResponse, SheepRarity } from "../types";
import { SHEEP_PRESETS } from "../data/sheepPresets";

// Probabilities for each rarity
const RARITY_WEIGHTS: Record<SheepRarity, number> = {
  Common: 0.50,    // 50%
  Rare: 0.30,      // 30%
  Epic: 0.15,      // 15%
  Legendary: 0.04, // 4%
  Glitch: 0.01     // 1%
};

const getRandomRarity = (): SheepRarity => {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (rand < cumulative) {
      return rarity as SheepRarity;
    }
  }
  return 'Common';
};

export const generateSheep = async (): Promise<SheepResponse> => {
  // Simulate a network delay for the "opening box" suspense effect
  await new Promise(resolve => setTimeout(resolve, 1000));

  const targetRarity = getRandomRarity();
  
  // Filter presets by the target rarity
  const candidates = SHEEP_PRESETS.filter(s => s.rarity === targetRarity);
  
  // If no candidates found (fallback), pick any random sheep
  const pool = candidates.length > 0 ? candidates : SHEEP_PRESETS;
  
  const randomSheep = pool[Math.floor(Math.random() * pool.length)];

  return randomSheep;
};
