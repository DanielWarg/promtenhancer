import { LetterPromptParams } from './types';
import { buildLetterPrompt } from './prompts/letter-profile';

/**
 * Constructs the complete prompt for Brev profile with agentic workflow
 * Returns only the prompt text - model selection is handled in callOpenAI()
 */
export function constructLetterPrompt(params: LetterPromptParams): string {
  return buildLetterPrompt(params);
}

