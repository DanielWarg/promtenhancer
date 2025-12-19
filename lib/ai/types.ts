export interface LetterPromptParams {
  goldenStandard: string;
  feedbackHistory: string[];
  intensityLevel: number; // 1-5
  signature: { name: string; tagline?: string } | null;
  topic: string;
  audience: string;
  userInput: string;
}

export type LoadingPhase = 'draft' | 'critique' | 'rewrite' | null;

