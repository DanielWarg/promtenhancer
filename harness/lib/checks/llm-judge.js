/**
 * Reflektera Text Harness v1.1
 * LLM Judge checks
 */

import { config } from '../config.js';

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

  W007: `Du är en tonbedömare. Bedöm ENBART textens TON på skalan "spegel" vs "predikan".

IGNORERA:
- Direkta imperativ (redan fångade av annan check)
- Innehållets ämne eller kvalitet
- Strukturella element (listor, pauser, längd)

BEDÖM ENDAST:
- Känns avsändaren inkluderad i texten? (spegel = hög poäng)
- Föreläser texten uppifrån-ner? (predikan = låg poäng)
- Skapar tonen igenkänning eller skuldbeläggning?

VIKTIGT FÖR HÅRD KONFRONTATION (nivå 5):
PASS även vid hård konfrontation OM avsändaren tydligt inkluderar sig själv som tidigare bärare av beteendet.
- "Jag kallade det exakt samma sak" = inkluderande, även om konfrontationen är hård
- "Jag har också varit där" = inkluderande, även om texten är kaxig
- Avsändaren står utanför och kritiserar = predikan, även om texten är mild

Skillnaden är positionen: Är avsändaren med läsaren (spegel) eller över läsaren (predikan)?

POÄNGSKALA 0-100:
- 0-30: Predikan. Texten pekar finger, avsändaren står utanför.
- 31-50: Lite predikan. Blandad ton, ibland inkluderande, ibland dömande.
- 51-70: Mestadels spegel. Avsändaren är med, men tonen kan vara överpedagogisk.
- 71-85: Bra spegel. Värme och igenkänning, avsändaren delar erfarenhet.
- 86-100: Excellent spegel. Texten känns som ett samtal mellan jämlikar.

CALIBRATION EXAMPLES:

Ex 1 (score: 85):
"Jag har också gjort exakt så. Valt att skicka ett meddelande istället för att ta samtalet. Det var lättare. Men det löste ingenting."
→ Avsändaren delar egen erfarenhet, sårbar, inkluderande.

Ex 2 (score: 45):
"Du borde ta de jobbiga samtalen. Sluta undvika konflikter. Det är dags att växa upp."
→ Fingerpekning, avsändaren står utanför och dömer.

Ex 3 (score: 70):
"Vi gör alla så ibland. Men kanske finns det ett bättre sätt."
→ Inkluderande "vi", men lite för pedagogisk i slutet.

Ex 4 (score: 90) - Hård konfrontation med tidig självinvolvering (nivå 5):
"Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad. Det tog mig lång tid att inse vad det gjorde med rummen jag satt i. Det här är inte snällhet. Det är anledningen till att samma saker tas upp – om och om igen – utan att något händer. Inte för att folk är dumma. Utan för att alla redan vet vad som inte sägs."
→ Mycket hård och konfrontativ, men avsändaren inkluderar sig själv som tidigare bärare av beteendet redan i hooken. Positionen är "med läsaren", inte "över läsaren". Detta är spegel, inte predikan. Hård konfrontation får hög score om avsändaren står "med läsaren" och inte etiketterar.

Ex 5 (score: 30) - Hård konfrontation utan självinvolvering (FAIL):
"Du kallar det diplomati. Dina kollegor kallar det feghet. Det här är inte snällhet. Det är anledningen till att inget förändras. Du måste sluta undvika samtal."
→ Hård konfrontation men avsändaren står utanför och etiketterar läsaren. Ingen självinvolvering. Detta är predikan, inte spegel.

Ex 6 (score: 88) - Smutsig, kaxig konfrontation med tidig självinvolvering och parentetiska stick (nivå 5):
"Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad. (Ja, jag sa det.) Vi pratar i korridoren, skickar passivt aggressiva meddelanden i Slack, eller skjuter upp möten med ett snällt 'vi tar det sen'. Det här är inte samarbete. Det är rollspel. Det är därför ingen längre tror på era retros. Alla vet vad som inte sägs. Vad skulle hända om du slutade försvara ordet – och började se vad det gör med dem som väntar?"
→ Mycket hård och konfrontativ med parentetiska stick och konkret rumsnärvaro, men avsändaren inkluderar sig själv som tidigare bärare av beteendet redan i hooken. Positionen är "med läsaren", inte "över läsaren". Detta är spegel, inte predikan. Smutsig röst och kaxig friktion är tillåtet om avsändaren står "med läsaren".

Ex 7 (score: 35) - För ren föreläsning, abstrakt utan konkret scen (FAIL):
"Det är en maskerad rädsla för att ta de jobbiga samtalen. Det är därför inget förändras. Det är viktigt att förstå att konflikter är en del av samarbetet. Vi måste lära oss att hantera dem på ett konstruktivt sätt."
→ För abstrakt, saknar konkret scen. Föreläsande ton ("Det är viktigt att förstå", "Vi måste lära oss"). Avsändaren står utanför och undervisar. Ingen självinvolvering. Detta är predikan, inte spegel.

Svara ENDAST med JSON:
{"score": <0-100>, "reasons": ["<max 2 korta skäl>"]}`
};

// Score threshold for W007 (PASS if score >= threshold)
const W007_THRESHOLD = 70;

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
 * Parse W007 score-based response (JSON)
 */
function parseW007Response(response) {
  const trimmed = response.trim();
  
  try {
    // Try to extract JSON from response
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    const score = parseInt(parsed.score, 10);
    const reasons = Array.isArray(parsed.reasons) ? parsed.reasons : [];
    
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error('Invalid score');
    }
    
    const pass = score >= W007_THRESHOLD;
    
    return {
      pass,
      score,
      reasons,
      notes: `Score: ${score}/100 (threshold: ${W007_THRESHOLD}). ${reasons.join(' ')}`
    };
  } catch (error) {
    // Fallback to PASS/FAIL parsing if JSON fails
    const fallback = parseLLMResponse(response);
    return {
      ...fallback,
      score: fallback.pass ? 75 : 40,
      reasons: [fallback.notes]
    };
  }
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
  
  // Different system prompt for score-based W007
  const isScoreBased = checkId === 'W007';
  const systemPrompt = isScoreBased 
    ? 'Du är en tonbedömare. Svara ENDAST med JSON i formatet {"score": <0-100>, "reasons": ["...", "..."]}. Ingen annan text.'
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
        temperature: 0.3,  // Low temperature for consistent judging
        max_tokens: isScoreBased ? 200 : 150
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || response.statusText);
    }
    
    const data = await response.json();
    const llmResponse = data.choices[0].message.content;
    
    // Use score-based parser for W007
    if (isScoreBased) {
      return parseW007Response(llmResponse);
    }
    
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
  
  // Check if LLM is disabled (via config or stubMode)
  if (stubMode || !config.LLM_ENABLED) {
    return {
      pass: false,
      skipped: true,
      notes: `[SKIPPED] LLM judge disabled for ${id} (${config.LLM_SKIP_REASON || 'stub mode'})`
    };
  }
  
  const result = await callLLMJudge(text, id);
  
  // Include score and reasons for W007 (score-based)
  if (id === 'W007' && result.score !== undefined) {
    return {
      pass: result.pass,
      notes: result.notes,
      score: result.score,
      reasons: result.reasons,
      threshold: W007_THRESHOLD
    };
  }
  
  return result;
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

