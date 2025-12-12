export interface ModelTag {
  text: string;
  type: string;
}

export interface Model {
  id: string;
  name: string;
  provider: string; // 'openai' | 'anthropic' | ...
  tags: ModelTag[];
  multiplier: string | null;
  vision: boolean;
  usageRank: number;
  category: 'reasoning' | 'chat' | 'coding' | 'all-round';
}