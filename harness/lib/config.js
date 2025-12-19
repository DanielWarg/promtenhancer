/**
 * Reflektera Text Harness v1.1
 * Runtime Configuration - Central config for offline/network modes
 */

/**
 * Check if network is disabled via environment variable or flag
 */
function isNetworkDisabled() {
  return process.env.NO_NETWORK === '1' || 
         process.env.NO_NETWORK === 'true' ||
         process.env.LLM_DISABLED === '1' ||
         process.env.LLM_DISABLED === 'true';
}

/**
 * Check if OpenAI API key is available
 */
function hasOpenAIKey() {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '';
}

/**
 * Determine LLM enabled status
 */
function isLLMEnabled() {
  if (isNetworkDisabled()) {
    return false;
  }
  return hasOpenAIKey();
}

/**
 * Get reason why LLM is disabled (if disabled)
 */
function getLLMSkipReason() {
  if (isNetworkDisabled()) {
    return 'NO_NETWORK mode enabled (NO_NETWORK=1 or --no-network flag)';
  }
  if (!hasOpenAIKey()) {
    return 'OPENAI_API_KEY not set';
  }
  return null;
}

/**
 * Runtime configuration object
 */
export const config = {
  NO_NETWORK: isNetworkDisabled(),
  HAS_OPENAI_KEY: hasOpenAIKey(),
  LLM_ENABLED: isLLMEnabled(),
  LLM_SKIP_REASON: getLLMSkipReason()
};

/**
 * Print configuration banner
 */
export function printConfigBanner() {
  if (!config.LLM_ENABLED) {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║  ⚠️  LLM DISABLED - Running in OFFLINE/NO_NETWORK mode        ║');
    console.log('║                                                               ║');
    console.log(`║  Reason: ${config.LLM_SKIP_REASON || 'Unknown'}${' '.repeat(Math.max(0, 60 - (config.LLM_SKIP_REASON || 'Unknown').length))}║`);
    console.log('║                                                               ║');
    console.log('║  • Generation will create placeholder output                ║');
    console.log('║  • LLM judge checks will be marked as SKIPPED               ║');
    console.log('║  • LLM-based patches will be skipped                        ║');
    console.log('║  • Deterministic patches (format/lista/rytm) will work      ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log('');
  }
}

