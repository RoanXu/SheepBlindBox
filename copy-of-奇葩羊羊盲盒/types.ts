
export type SheepRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Glitch';

export interface SheepData {
  id: string;
  name: string;
  description: string;
  color: string; // Hex code for wool
  skinColor: string; // Hex code for skin/face
  rarity: SheepRarity;
  accessory?: string;
  timestamp: number;
}

export interface SheepResponse {
  name: string;
  description: string;
  color: string;
  skinColor: string;
  rarity: SheepRarity;
  accessory: string;
}
