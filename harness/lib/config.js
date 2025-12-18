/**
 * Reflektera Text Harness v1.1
 * Model configuration with environment variable overrides
 */

export const MODELS = {
  generationModel: process.env.REFLEKTERA_MODEL_GENERATION || "gpt-5.1",
  judgeModel: process.env.REFLEKTERA_MODEL_JUDGE || "gpt-5.1",
  patchModel: process.env.REFLEKTERA_MODEL_PATCH || "gpt-5.1"
};

