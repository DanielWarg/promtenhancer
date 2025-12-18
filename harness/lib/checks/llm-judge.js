/**
 * Reflektera Text Harness v1.1
 * LLM Judge checks
 */

// Score-based checks configuration
const SCORE_BASED_CHECKS = new Set(['W007']);

// LLM Judge prompts for each check
const JUDGE_PROMPTS = {
  B005: `Bedöm om texten innehåller en genuin vändning från skuld/stress till mänsklighet/tillåtelse.

PASS om:
- Det finns en tydlig rörelse från "jag borde/måste" till "det är okej att vara människa"
- Reframingen känns äkta, inte påklistrad
- Läsaren får tillåtelse utan att det blir peppigt

FAIL om:
- Ingen vändning finns
- Vändningen är ytlig eller forcerad
- Texten fastnar i problemet eller hoppar direkt till lösning

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).`,

  B008: `Bedöm om texten känns som en äkta, stillsam reflektion eller som en generisk inspirationspost.

FAIL om texten innehåller:
- Tomma uppmaningar ("Du klarar det!", "Tro på dig själv!", "Du är tillräcklig!")
- Överdrivet positiv/peppig ton
- Klyschor om "resan", "växande", "vara sin bästa version"
- Brist på konkret vardag och mänsklighet

PASS om:
- Texten tillåter stillhet och komplexitet
- Det finns konkreta mikrodetaljer (tid, plats, föremål, kroppsförnimmelser)
- Tonen är varm men inte forcerad
- Det känns som ett samtal, inte en affisch

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).`,

  W001: `Bedöm om textens öppning (första 2-3 meningarna) avslöjar ett självbedrägeri snarare än introducerar ett ämne.

SKILLNADEN:
- Påstående (FAIL): "Det är svårt att ge feedback" / "Konflikter är utmanande"
- Avslöjande (PASS): "Du tror att ni är öppna. Det är ni inte." / "Du är inte konflikträdd. Du är konfliktointresserad."

PASS om:
- Hooken avslöjar något läsaren gör men inte vill erkänna
- Läsaren känner sig SEDD, inte informerad
- Det finns en kontrast eller negation som skapar friktion

FAIL om:
- Öppningen är en generell observation
- Det saknas direkt tilltal
- Läsaren informeras istället för konfronteras

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).`,

  W005: `Bedöm om texten innehåller minst en metafor som:
1. Är konkret och visuell (inte abstrakt)
2. Bär en insikt (inte bara dekoration)
3. Skapar igenkänning och stannar kvar

PASS-exempel:
- "Det är som att säga att man älskar höjder – men bara när man står på marken"
- "Feedbackkulturen är en PowerPoint, men inte en verklighet"

FAIL om:
- Ingen metafor finns
- Metaforen är klichéartad ("livet är en resa", "vi sitter i samma båt")
- Metaforen känns påklistrad och bär ingen insikt

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).`,

  // W007 - Score-based (0-100) bedömning av TON (inte fraser - de fångas av W007b)
  W007: `Du ska bedöma TONEN i texten på en skala 0-100 för dimensionen "spegel vs predikan".

VIKTIGT: Ignorera explicita fraser som "du borde/måste/ska" - de hanteras separat. 
Fokusera ENDAST på den underliggande TONEN.

SKALA (spegel vs predikan):
- 90-100: Perfekt spegel. Läsaren känner "fan, det där är jag". Värme och humor. Avsändaren inkluderar sig själv.
- 70-89: Bra spegel med värme. Provocerar men dömer inte. Mestadels igenkänning.
- 50-69: Blandat. Ibland spegel, ibland lite föreläsande. Oklar position.
- 30-49: Övervägande predikan. Tonen är dömande eller överlärar-aktig.
- 0-29: Ren moralpredikan. Pekar finger. Läsaren känner "nu får jag skäll".

KALIBRERINGSEXEMPEL:

Exempel 1 (Score: 92):
"Du vet vem jag menar. Nej nej. Inte du. Du är ju inte konflikträdd. Du 'tycker bara inte om onödigt drama'. Exakt."
→ Reasons: ["Ironisk spegel som avslöjar", "Humor utan att döma", "Läsaren känner igen sig"]

Exempel 2 (Score: 75):
"Och grejen är – det handlar inte om att bli tuffare. Det handlar om att förstå att konflikt inte är ett sammanbrott."
→ Reasons: ["Reframing med värme", "Lite föreläsande men inte dömande", "Inkluderar snarare än pekar"]

Exempel 3 (Score: 45):
"Det är hög tid att börja ta ansvar. Om du inte gör det nu så kommer du ångra det senare."
→ Reasons: ["Föreläsande ton", "Implicit skuld", "Saknar igenkänning och värme"]

SVARA ENDAST I DETTA JSON-FORMAT:
{"score": <0-100>, "reasons": ["<anledning 1>", "<anledning 2>", "<anledning 3>"]}`
};

/**
 * Parse LLM response to extract PASS/FAIL and notes (binary checks)
 */
function parseLLMResponse(response) {
  const trimmed = response.trim();
  const upperStart = trimmed.toUpperCase();
  
  if (upperStart.startsWith('PASS')) {
    return {
      pass: true,
      notes: trimmed.replace(/^PASS[:\s]*/i, '').trim() || 'LLM judge: PASS'
    };
  }
  
  if (upperStart.startsWith('FAIL')) {
    return {
      pass: false,
      notes: trimmed.replace(/^FAIL[:\s]*/i, '').trim() || 'LLM judge: FAIL'
    };
  }
  
  // If unclear, fail and include full response
  return {
    pass: false,
    notes: `Unclear LLM response: ${trimmed.substring(0, 100)}`
  };
}

/**
 * Parse score-based LLM response (JSON format)
 * Returns: { score: 0-100, reasons: [...], pass: boolean }
 */
function parseScoreResponse(response, passThreshold = 70) {
  const trimmed = response.trim();
  
  try {
    // Try to extract JSON from response (might have extra text)
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    const score = parseInt(parsed.score, 10);
    const reasons = Array.isArray(parsed.reasons) ? parsed.reasons : [];
    
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error(`Invalid score: ${parsed.score}`);
    }
    
    return {
      pass: score >= passThreshold,
      score,
      reasons,
      notes: `Score: ${score}/100 (threshold: ${passThreshold}). ${reasons.join('; ')}`
    };
  } catch (error) {
    // Fallback: try to extract a number
    const numberMatch = trimmed.match(/\b(\d{1,3})\b/);
    if (numberMatch) {
      const score = parseInt(numberMatch[1], 10);
      if (score >= 0 && score <= 100) {
        return {
          pass: score >= passThreshold,
          score,
          reasons: ['Kunde inte parsa JSON, extraherade nummer'],
          notes: `Score: ${score}/100 (threshold: ${passThreshold}). Parse error: ${error.message}`
        };
      }
    }
    
    // Complete failure
    return {
      pass: false,
      score: 0,
      reasons: ['Parse error'],
      notes: `Score parse error: ${error.message}. Response: ${trimmed.substring(0, 100)}`
    };
  }
}

/**
 * Call OpenAI to judge text
 * @param {string} text - Text to evaluate
 * @param {string} checkId - Check identifier
 * @param {object} options - Options including passThreshold for score-based checks
 */
async function callLLMJudge(text, checkId, options = {}) {
  const prompt = JUDGE_PROMPTS[checkId];
  if (!prompt) {
    return {
      pass: false,
      notes: `No prompt defined for check ${checkId}`
    };
  }
  
  const isScoreBased = SCORE_BASED_CHECKS.has(checkId);
  const { passThreshold = 70 } = options;
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Stub mode - return FAIL with note
    return {
      pass: false,
      score: isScoreBased ? 0 : undefined,
      reasons: isScoreBased ? ['[STUB] No API key'] : undefined,
      notes: `[STUB] LLM judge disabled (no API key). Set OPENAI_API_KEY to enable.`
    };
  }
  
  // Different system prompts for binary vs score-based checks
  const systemPrompt = isScoreBased
    ? 'Du är en expert på tonanalys av texter. Svara ENDAST i JSON-format enligt instruktionerna.'
    : 'Du är en strikt textbedömare. Svara endast PASS eller FAIL följt av kort motivering.';
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: systemPrompt
          },
          { 
            role: 'user', 
            content: `${prompt}\n\n---\nTEXT ATT BEDÖMA:\n${text}` 
          }
        ],
        temperature: 0.2,  // Lower temperature for more consistent scoring
        max_tokens: isScoreBased ? 200 : 150
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || response.statusText);
    }
    
    const data = await response.json();
    const llmResponse = data.choices[0].message.content;
    
    // Use appropriate parser
    if (isScoreBased) {
      return parseScoreResponse(llmResponse, passThreshold);
    }
    return parseLLMResponse(llmResponse);
    
  } catch (error) {
    return {
      pass: false,
      score: isScoreBased ? 0 : undefined,
      reasons: isScoreBased ? [`Error: ${error.message}`] : undefined,
      notes: `LLM judge error: ${error.message}`
    };
  }
}

/**
 * Run an LLM judge check
 * @param {string} text - Text to evaluate
 * @param {object} check - Check definition (may include pass_threshold for score-based)
 * @param {object} options - Options including stubMode
 */
export async function runLLMJudgeCheck(text, check, options = {}) {
  const { id, pass_threshold = 70 } = check;
  const { stubMode = false } = options;
  const isScoreBased = SCORE_BASED_CHECKS.has(id);
  
  if (stubMode) {
    return {
      pass: false,
      score: isScoreBased ? 0 : undefined,
      reasons: isScoreBased ? ['[STUB] Disabled'] : undefined,
      notes: `[STUB] LLM judge disabled for ${id}`
    };
  }
  
  return await callLLMJudge(text, id, { passThreshold: pass_threshold });
}

/**
 * Run all LLM judge checks for a profile
 */
export async function runAllLLMJudgeChecks(text, checks, getTextByScope, options = {}) {
  const results = {};
  
  for (const check of checks) {
    if (check.type !== 'llm_judge') continue;
    
    const scopedText = getTextByScope(text, check.scope);
    const result = await runLLMJudgeCheck(scopedText, check, options);
    
    results[check.id] = {
      ...result,
      check
    };
  }
  
  return results;
}

/**
 * Check if a check ID is score-based
 */
export function isScoreBasedCheck(checkId) {
  return SCORE_BASED_CHECKS.has(checkId);
}

