import { AppMode, ChannelType, LinkedInTone } from "../types";

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001' 
  : ''; // I produktion används samma domän

export const generateSuperPrompt = async (
  userInput: string, 
  method: string, 
  mode: AppMode, 
  channel: ChannelType,
  tone: LinkedInTone,
  audience: string,
  temperature: number = 0.7
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        method,
        mode,
        channel,
        tone,
        audience,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "Kunde inte generera ett svar. Försök igen.";
  } catch (error) {
    console.error("Error calling API for generation:", error);
    throw new Error("Ett fel uppstod vid kommunikation med AI-tjänsten.");
  }
};

export const runGeneratedPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "Ingen utdata genererades.";
  } catch (error) {
    console.error("Error calling API for execution:", error);
    throw new Error("Kunde inte köra prompten.");
  }
};