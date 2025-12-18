export type ChannelType = 'linkedin' | 'newsletter' | 'general';

export type LinkedInTone = 'rebel' | 'leader' | 'coach';

export interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  date: string;
  channel: ChannelType;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  TESTING = 'TESTING',
}

export const METHODS = [
  "Automatisk (AI bestämmer)",
  "Chain of Thought (Logik)",
  "Trees of Thought (Strategi)",
  "Playoff (Kritik)",
  "Bro-etry (LinkedIn)"
] as const;

export type MethodType = typeof METHODS[number];

export type AppMode = 'create' | 'reverse-engineer';