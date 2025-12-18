/**
 * Reflektera Text Harness v1.1
 * Generator - Builds internal prompt and generates output via OpenAI
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MODELS } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HARNESS_ROOT = path.resolve(__dirname, '..');

// Anti-clone guardrail text
const ANTI_CLONE_GUARDRAIL = `
VIKTIG REGEL:
Använd examples som inspiration för FORM och KÄNSLA.
ÅTERANVÄND ALDRIG exakta fraser eller meningar från examples.
Parafrasera alltid. Skapa nytt.
Om du känner igen en mening från examples - skriv om den helt.
`;

/**
 * Load style DNA for a specific profile
 */
function loadStyleDNA(profile) {
  const styleDnaPath = path.join(HARNESS_ROOT, 'style_dna.md');
  const content = fs.readFileSync(styleDnaPath, 'utf-8');
  
  // Extract the relevant profile section
  const profileHeader = profile === 'brev' ? '## Brev-profil' : '## Warm Provocation-profil';
  const nextHeader = profile === 'brev' ? '## Warm Provocation-profil' : null;
  
  const startIndex = content.indexOf(profileHeader);
  if (startIndex === -1) {
    throw new Error(`Profile ${profile} not found in style_dna.md`);
  }
  
  let endIndex = nextHeader ? content.indexOf(nextHeader) : content.length;
  if (endIndex === -1) endIndex = content.length;
  
  return content.substring(startIndex, endIndex).trim();
}

/**
 * Load examples for a specific profile
 */
function loadExamples(profile) {
  const examplesPath = path.join(HARNESS_ROOT, 'examples.md');
  const content = fs.readFileSync(examplesPath, 'utf-8');
  
  // Extract the relevant profile section
  const profileHeader = profile === 'brev' ? '## Brev-profil' : '## Warm Provocation-profil';
  const nextHeader = profile === 'brev' ? '## Warm Provocation-profil' : null;
  
  const startIndex = content.indexOf(profileHeader);
  if (startIndex === -1) {
    throw new Error(`Profile ${profile} not found in examples.md`);
  }
  
  let endIndex = nextHeader ? content.indexOf(nextHeader) : content.length;
  if (endIndex === -1) endIndex = content.length;
  
  return content.substring(startIndex, endIndex).trim();
}

/**
 * Build the internal prompt based on spec, style DNA, and examples
 */
function buildInternalPrompt(spec, styleDna, examples) {
  const { profile, topic, audience, user_input, constraints, controls } = spec;
  
  let prompt = `# UPPGIFT
Skriv ett LinkedIn-inlägg enligt profilen "${profile}".

# STIL-DNA (följ detta noggrant)
${styleDna}

# EXEMPEL-FRAGMENT (för inspiration, EJ kopiering)
${examples}

${ANTI_CLONE_GUARDRAIL}`;

  // Add hard rules for warm_provocation profile
  if (profile === 'warm_provocation') {
    prompt += `

# HÅRDA REGLER FÖR WARM PROVOCATION (OBLIGATORISKT)

## Hook (OBLIGATORISKT - första raden)
Första raden MÅSTE börja med direkt tilltal "Du" och konfrontera läsaren. Välj EN av dessa strukturer:
- "Du är inte [X]. Du är [Y]." (t.ex. "Du är inte konflikträdd. Du är konfliktointresserad.")
- "Du tror att [X]. Det är det inte." (t.ex. "Du tror att du inte är konflikträdd. Det är det inte.")
- "Du vill ha [X]. Men du gör [Y]." (t.ex. "Du vill ha harmoni. Men du gör passivt aggressiva blinkningar i Slack.")

VIKTIGT: Variera mellan dessa tre strukturer för att undvika monotoni. Alla är konfronterande och avslöjande.

FÖRBJUD i första 3 meningarna:
- "Vi säger..."
- "Många..."
- "Det är viktigt..."
- "Konflikter är..."

## Ironisk spegel (OBLIGATORISKT block efter listan)
Efter listan MÅSTE följa ett ironiskt spegel-block. Strukturen är obligatorisk, men formuleringen kan varieras:

OBLIGATORISK STRUKTUR (4 delar):
1. En rad som pekar ut läsaren (t.ex. "Du vet vem jag menar." / "Du känner igen dig." / "Du vet exakt vad jag menar.")
2. En negation/ironi (t.ex. "Nej nej. Inte du." / "Inte du förstås." / "Nej, inte du.")
3. En ironisk rationalisering i citattecken (t.ex. "Du 'tycker bara inte om onödigt drama'." / "Du 'väljer bara dina strider'.")
4. En bekräftelse (t.ex. "Exakt." / "Precis." / "Just det.")

VIKTIGT: Behåll rytmen och funktionen, men variera formuleringen för att undvika box-ticking.

## Lista (OBLIGATORISKT)
- 3-5 rader
- Varje rad MÅSTE börja med exakt "– " (en dash + mellanslag)
- "- " (vanlig bindestreck) är FÖRBJUDET

## Avslut (OBLIGATORISKT)
Endast en spegelfråga. FÖRBJUD:
- "Tänk om vi..."
- "Det finns ett bättre sätt..."
- "Jag utmanar dig..."
- "Låt oss..."

Exempel på spegelfråga: "Vad kostar det att inte säga det?" eller "Vad försöker du slippa genom att kalla det 'onödigt drama'?"
`;
  }
  
  prompt += `

# ANVÄNDARENS INPUT
Ämne: ${topic}
Målgrupp: ${audience}
Beskrivning: ${user_input}

# CONSTRAINTS
- Språk: ${constraints.language || 'sv'}
- Längd: ${constraints.min_chars || 600}-${constraints.max_chars || 1200} tecken
- Inga asterisker (*) för formatering
- Signatur: /${constraints.signature?.name || 'Författaren'}
  ${constraints.signature?.tagline || ''}

# KONTROLLER
- Friktion: ${controls?.friction || 3}/5 (hur mycket texten utmanar läsaren)
- Värme: ${controls?.warmth || 3}/5 (hur varm/empatisk tonen är)
- Berättelse: ${controls?.story || 3}/5 (hur mycket personlig historia)

# OUTPUT
Skriv ENDAST LinkedIn-inlägget. Ingen inledning, ingen förklaring.
Börja direkt med texten och avsluta med signaturen.
`;

  return prompt;
}

/**
 * Generate dummy output when API key is missing
 */
function generateDummyOutput(spec) {
  const { profile, constraints } = spec;
  
  if (profile === 'brev') {
    return `Du som sitter där med datorn i knät och oron i magen.
Du som försöker vara på två ställen samtidigt.

Jag har varit du.
Jag minns känslan när telefonen ringde från förskolan.
Hur hjärtat sjönk. Inte för att barnet var sjukt.
Utan för att jag visste vad det betydde för jobbet.

Det är ingen bra känsla.
Att vara delad.

Men vet du vad?
Ditt barn kommer inte minnas vilka möten du missade.
De kommer minnas att du var där.
I soffan. Med filmen. Med febriga kinder mot din axel.

Det är inte ett misslyckande.
Det är livet.

Du gör det bästa du kan.
Och det är nog.

/${constraints.signature?.name || 'Ann-Christin'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  }
  
  // warm_provocation
  return `Du är inte konflikträdd.
Du är konfliktointresserad.

Du vill ha harmoni – men utan att betala för den.

Så istället för att ta det där samtalet:
– Du skriver ett "snällt" DM istället för att ringa.
– Du nickar i mötet men ventilerar i korridoren.
– Du säger "vi tar det sen" och menar "aldrig".

Nej nej. Inte du.
Du "gillar bara inte onödigt drama".

Exakt.

Det är som att säga att man älskar att träna – men bara i teorin.

Konflikter är inte sammanbrottet.
De är samtalet som aldrig fick hända.

Så nästa gång du känner den där klumpen:
Ta samtalet. Inte DM:et.

/${constraints.signature?.name || 'Ann-Christin'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
}

/**
 * Call OpenAI API to generate output
 */
async function callOpenAI(prompt, spec) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('⚠️  OPENAI_API_KEY saknas - genererar dummy output för testning');
    return {
      output: generateDummyOutput(spec),
      isDummy: true
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
        model: MODELS.generationModel,
        messages: [
          { role: 'system', content: 'Du är en expert på att skriva engagerande LinkedIn-inlägg på svenska. Du följer instruktioner exakt.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        seed: spec.controls?.seed || undefined
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return {
      output: data.choices[0].message.content,
      isDummy: false,
      usage: data.usage
    };
  } catch (error) {
    console.error('❌ OpenAI API fel:', error.message);
    console.log('⚠️  Faller tillbaka på dummy output');
    return {
      output: generateDummyOutput(spec),
      isDummy: true,
      error: error.message
    };
  }
}

/**
 * Main generate function
 */
export async function generate(specPath, runDir) {
  console.log('📝 Läser spec...');
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  
  console.log(`📂 Profil: ${spec.profile}`);
  console.log(`📂 Ämne: ${spec.topic}`);
  
  // Load style DNA and examples
  console.log('📚 Laddar style DNA och examples...');
  const styleDna = loadStyleDNA(spec.profile);
  const examples = loadExamples(spec.profile);
  
  // Build internal prompt
  console.log('🔧 Bygger internal prompt...');
  const internalPrompt = buildInternalPrompt(spec, styleDna, examples);
  
  // Save spec snapshot
  const specSnapshot = path.join(runDir, 'post_spec.json');
  fs.writeFileSync(specSnapshot, JSON.stringify(spec, null, 2));
  console.log(`💾 Sparade: ${specSnapshot}`);
  
  // Save internal prompt
  const promptPath = path.join(runDir, 'internal_prompt_v1.txt');
  fs.writeFileSync(promptPath, internalPrompt);
  console.log(`💾 Sparade: ${promptPath}`);
  
  // Generate output
  console.log('🤖 Genererar output...');
  const result = await callOpenAI(internalPrompt, spec);
  
  // Sanitize output: replace "- " with "– " in lists (compliance fix)
  let sanitizedOutput = result.output;
  // Match lines that start with "- " (not already "– ")
  sanitizedOutput = sanitizedOutput.replace(/^(\s*)- /gm, '$1– ');
  
  // Save output
  const outputPath = path.join(runDir, 'output_v1.txt');
  fs.writeFileSync(outputPath, sanitizedOutput);
  console.log(`💾 Sparade: ${outputPath}`);
  
  if (result.isDummy) {
    console.log('⚠️  Dummy output genererat (sätt OPENAI_API_KEY för riktigt output)');
  } else {
    console.log(`✅ Output genererat (${result.usage?.total_tokens || '?'} tokens)`);
  }
  
  return {
    spec,
    internalPrompt,
    output: sanitizedOutput,  // Return sanitized output
    isDummy: result.isDummy,
    runDir
  };
}

