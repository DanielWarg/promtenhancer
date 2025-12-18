import { GoogleGenAI } from "@google/genai";
import { getSystemInstruction } from "../constants";
import { AppMode, RoleType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSuperPrompt = async (userInput: string, method: string, mode: AppMode, role: RoleType, temperature: number = 0.7): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userInput,
      config: {
        systemInstruction: getSystemInstruction(method, mode, role),
        temperature: temperature,
      },
    });

    return response.text || "Kunde inte generera ett svar. Försök igen.";
  } catch (error) {
    console.error("Error calling Gemini API for generation:", error);
    throw new Error("Ett fel uppstod vid kommunikation med AI-tjänsten.");
  }
};

export const runGeneratedPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      // No system instruction here, we treat the super prompt as the user input/instruction
    });

    return response.text || "Ingen utdata genererades.";
  } catch (error) {
    console.error("Error calling Gemini API for execution:", error);
    throw new Error("Kunde inte köra prompten.");
  }
};