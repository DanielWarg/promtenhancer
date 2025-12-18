/**
 * Reflektera Text Harness v1.1
 * LLM Judge checks
 */

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

  W007: `Bedöm om texten provocerar med värme och igenkänning eller om den föreläser/moraliserar.

FAIL om:
- Texten pekar finger ("du borde", "man måste", "det är dags att")
- Tonen är överlärar-aktig eller dömande
- Det saknas självinsikt hos avsändaren
- Läsaren blir tillrättavisad istället för att känna igen sig

PASS om:
- Texten håller upp en spegel
- Provokationen kommer med värme och humor
- Avsändaren inkluderar sig själv ("Jag har också...", "Vi gör alla...")
- Läsaren känner "fan, det där är jag" – inte "nu får jag skäll"

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).`
};

/**
 * Parse LLM response to extract PASS/FAIL and notes
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
 * Call OpenAI to judge text
 */
async function callLLMJudge(text, checkId) {
  const prompt = JUDGE_PROMPTS[checkId];
  if (!prompt) {
    return {
      pass: false,
      notes: `No prompt defined for check ${checkId}`
    };
  }
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Stub mode - return FAIL with note
    return {
      pass: false,
      notes: `[STUB] LLM judge disabled (no API key). Set OPENAI_API_KEY to enable.`
    };
  }
  
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
            content: 'Du är en strikt textbedömare. Svara endast PASS eller FAIL följt av kort motivering.' 
          },
          { 
            role: 'user', 
            content: `${prompt}\n\n---\nTEXT ATT BEDÖMA:\n${text}` 
          }
        ],
        temperature: 0.3,  // Low temperature for consistent judging
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || response.statusText);
    }
    
    const data = await response.json();
    const llmResponse = data.choices[0].message.content;
    
    return parseLLMResponse(llmResponse);
    
  } catch (error) {
    return {
      pass: false,
      notes: `LLM judge error: ${error.message}`
    };
  }
}

/**
 * Run an LLM judge check
 * @param {string} text - Text to evaluate
 * @param {object} check - Check definition
 * @param {object} options - Options including stubMode
 */
export async function runLLMJudgeCheck(text, check, options = {}) {
  const { id } = check;
  const { stubMode = false } = options;
  
  if (stubMode) {
    return {
      pass: false,
      notes: `[STUB] LLM judge disabled for ${id}`
    };
  }
  
  return await callLLMJudge(text, id);
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

