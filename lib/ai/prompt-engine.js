import { LEVEL_KEY, GOLDEN_STANDARDS } from './prompts/letter-profile.js';

/**
 * Select Golden Standard ID based on topic, userInput, and intensityLevel
 * Rules:
 * - Default: "GS1"
 * - Return "GS2" ONLY IF:
 *   - intensityLevel is 3 OR 4
 *   - AND (topic OR userInput) contains ANY keyword (case-insensitive)
 */
export function selectGoldenStandardId(topic, userInput, intensityLevel) {
  // Default to GS1
  if (intensityLevel !== 3 && intensityLevel !== 4) {
    return "GS1";
  }

  // GS2 keywords (case-insensitive)
  const gs2Keywords = [
    'snap',
    'sommarlov',
    'kompis',
    'ensam',
    'utanför',
    'epa',
    'familjeapp',
    'skola',
    'tonår',
    'yngste',
    'storebror',
    'avvisande'
  ];

  // Normalize input
  const normalizedText = ((topic || '') + ' ' + (userInput || '')).toLowerCase();

  // Check if any keyword matches
  const hasKeyword = gs2Keywords.some(keyword => normalizedText.includes(keyword));

  if (hasKeyword) {
    return "GS2";
  }

  return "GS1";
}

/**
 * Render signature from constraints.signature (may be string OR object)
 * Requirements:
 * - If string: return as-is
 * - If object has `name`: return `/${name}`
 * - If other truthy: return String(sig)
 * - Else: return ""
 */
export function renderSignature(sig) {
  if (!sig) {
    return "";
  }

  if (typeof sig === 'string') {
    return sig;
  }

  if (typeof sig === 'object' && sig !== null) {
    if (sig.name) {
      const tagline = sig.tagline ? `\n${sig.tagline}` : '';
      return `/${sig.name}${tagline}`;
    }
  }

  return String(sig);
}

/**
 * Get ending critique rule based on selected Golden Standard
 */
function getEndingCritiqueRule(gsId) {
  if (gsId === "GS2") {
    return `4. **Avslutskraft** (0-5): MÅSTE vara en öppen observation eller validering. FÖRBJUDET: lösningar, coaching, råd, "fixa". Kraften ligger i att stanna med känslan, precis som i referenstexten.`;
  } else {
    // GS1
    return `4. **Avslutskraft** (0-5): MÅSTE ge closure. Måste vara en direktiv, tillåtelse eller tydlig markering.`;
  }
}

/**
 * Constructs the complete prompt for Brev profile with agentic workflow
 * Returns only the prompt text - model selection is handled in callOpenAI()
 */
export function constructLetterPrompt(params) {
  const {
    feedbackHistory = [],
    intensityLevel,
    signature,
    topic = '',
    audience = '',
    userInput = ''
  } = params;

  // Select Golden Standard
  const goldenStandardId = selectGoldenStandardId(topic, userInput, intensityLevel);
  const selectedGS = GOLDEN_STANDARDS[goldenStandardId] || GOLDEN_STANDARDS.GS1;

  // Render signature
  const signatureString = renderSignature(signature);

  // Get level info from LEVEL_KEY
  const levelNames = {
    1: 'Varsam närvaro',
    2: 'Stillhet med tydlighet',
    3: 'Sårbar auktoritet',
    4: 'Systemblick utan kyla',
    5: 'Försoning med skärpa'
  };
  const levelName = levelNames[intensityLevel] || 'Okänd nivå';

  // Feedback block
  let feedbackBlock = '';
  if (feedbackHistory.length > 0) {
    const recentFeedback = feedbackHistory.slice(-3).join(', ');
    feedbackBlock = `
## TIDIGARE FEEDBACK (Justera stilen därefter)
OBS: Tidigare feedback från användaren: ${recentFeedback}
Justera stilen därefter, men behåll kärnidén och tonaliteten.`;
  }

  // Signature block
  let signatureBlock = '';
  if (signatureString) {
    signatureBlock = `
## SIGNATUR (FRÅN SPEC)
VIKTIGT: Signatur kommer ALLTID från constraints.signature i spec, aldrig hårdkodad.
Använd denna signatur: "${signatureString}".
Förbjudet att hårdkoda eller hitta på en egen signatur.`;
  } else {
    signatureBlock = `
## SIGNATUR
Om signaturen är tom: lämna signatur tom. Förbjudet att hitta på eller hårdkoda en signatur.`;
  }

  // Get dynamic ending critique rule
  const endingCritiqueRule = getEndingCritiqueRule(goldenStandardId);

  return `# UPPGIFT
Skriv ett personligt brev enligt Brev-profilen.

${LEVEL_KEY}

# VALD NIVÅ: ${intensityLevel}/5 - ${levelName}

Följ exakt nivådefinitionen ovan. LLM får INTE gissa nivådefinitioner.

# REFERENCE TEXT (STILANKARE - INTE FÖR KOPIERING)

Använd denna text ENDAST för att förstå:
- Rytm och pacing (hur tanken rör sig)
- Konkretion (sensoriska detaljer: siffror, temperatur, ljud, rum, kropp)
- Emotionell pacing (när känslan fördjupas, när den andas)
- Stance (hur författaren står i relation till läsaren)

FÖRBJUDET:
- Kopiera fraser, ord, metaforer eller teman
- Spegla struktur rad-för-rad
- Återanvända unika formuleringar
- Kopiera meningsstrukturer från referenstexten

ANTI-COPY REGEL (EXPLICIT):
Do NOT copy phrases, metaphors, or sentence structures from the reference text.
Use it ONLY for properties: rhythm, concreteness, emotional pacing, stance.

ANTI-CLICHÉ REGEL (EXPLICIT):
Strictly avoid generic metaphors such as "storm", "journey", "balance", "dark clouds", "puzzle pieces", "finding yourself".
Use sensory details instead.

REFERENCE TEXT:
${selectedGS.text}

${feedbackBlock}

# AGENTIC WORKFLOW (INTERNT - INGEN META I OUTPUT)

Du ska följa denna 3-stegsprocess, men returnera ENDAST sluttexten (ingen meta, inga poäng, ingen analys).

## STEG 1: DRAFT

INNAN DU BÖRJAR SKRIVA: Välj EN NY micro-scene anchor som INTE finns i referenstexten.
Den måste vara grundad i användarens input, men konkret annorlunda från Golden Standard.

Exempel (använd INTE dessa exempel):
- Istället för "barn i famnen" → "står i dörröppningen med vinterkängor på, dagis ringer"
- Istället för "Snap-ensamhet" → "tystnad efter skolhämtning, ryggsäck på golvet, en mening"
- Istället för "overall i hallen" → "tvättkorg, trasig dragkedja, kalenderpåminnelse, missat möte"

REGLER:
- Draften måste innehålla minst TVÅ konkreta detaljer som tillhör den NYA micro-scene anchor.
- Om detta krav INTE uppfylls → Concreteness = 1 → starta om från blankt.

Skriv sedan ett första utkast till brevet baserat på:
- Ämne: ${topic}
- Målgrupp: ${audience}
- Beskrivning: ${userInput}
- Vald nivå: ${levelName}
- NY micro-scene anchor (inte från referenstexten)

## STEG 2: CRITIQUE (0-5 per dimension)
Granska ditt utkast på dessa dimensioner. Var STRÄNG. Om texten känns säker, generisk eller AI-smak → sätt lågt poäng.

1. **Hook** (0-5): Fångar den direkt? Emotionell närhet i öppningen? Om öppningen känns generisk eller försiktig → ≤2.

2. **Konkretion & kropp** (0-5): 
   - MÅSTE innehålla minst EN konkret siffra (tid, temperatur, ålder, kvantitet) ELLER minst TVÅ sensoriska detaljer från olika kategorier (ljud, temperatur, fysisk vikt, ljus, textur, lukt).
   - Om detta krav INTE uppfylls → sätt Konkretion = 1 → FAIL-TRIGGER.
   - Sensoriska detaljer måste vara konkreta och fysiska, inte abstrakta känslor.

3. **Anti-AI** (0-5): 
   - FÖRBJUDNA FRASER (om någon av dessa eller ekvivalenter finns → sätt Anti-AI = 1 omedelbart):
     * "det är helt okej" / "det är okej"
     * "balans"
     * "du klarar det"
     * "allt kommer bli bra"
     * "storm"
     * "resa"
     * "mörka moln"
     * "pussel"
     * "finna sig själv"
   - Om Anti-AI ≤ 1 → FAIL-TRIGGER → discard hela draften och starta om från blankt.
   - Undvik även generiska klyschor och försiktiga formuleringar.

4. **Avslutskraft** (0-5): ${endingCritiqueRule}

5. **Ton** (0-5): 
   - Sårbar auktoritet, inte coach/pepp/predikan.
   - KRITISK FRÅGA: Skulle denna text kännas emotionellt underdimensionerad, säker eller generisk om den placerades direkt bredvid Golden Standard-referenstexten?
   - Om JA → sätt Ton = 1 → FAIL-TRIGGER.
   - Jämförelsen handlar om emotionell risk och konkretion, INTE ordval eller likhet.

6. **Originalitet / Anti-derivative** (0-5):
   - Det slutliga brevet MÅSTE vara en original micro-story eller original observationsram.
   - Det får dela stance och rytm med referensen, men får INTE återanvända samma scen.
   - Om Originalitet ≤ 1 → FAIL-TRIGGER → discard och starta om från blankt.

UNIQUE CONTRIBUTION CHECK (KRITISKT):
Identifiera minst EN av följande som skiljer texten från Golden Standard:
- En ny konflikt (inte jobb vs barn / föräldraskap vs arbete)
- En ny känsla (inte skuld/lättnad/acceptans i samma form)
- En ny riktning (inte tillåtelse/closure i samma mönster)
- En ny observation om världen/systemet (inte samma insikt om prioriteringar)

KRITISK FRÅGA: "Vad gör denna text som Golden Standard INTE gör?"
- Om svaret är "Den säger samma sak på ett annat sätt" → Originalitet = 1 → FAIL-TRIGGER.
- Om texten bara är "snäll ommålning" av samma berättelsefunktion → Originalitet = 1 → FAIL-TRIGGER.
- Texten måste ha en egen existens, inte bara vara en scen-reskin av Golden Standard.

FÖRBJUDET DRAMATURGISKT MÖNSTER (för GS1):
- Press från jobb → påminnelse om vad som betyder något → omvärdering → tillåtande avslut
- Om texten följer detta exakta mönster → Originalitet = 1 → starta om.

FÖRBJUDET DRAMATURGISKT MÖNSTER (för GS2):
- Ensamhet → observation om kommunikation → insikt om tidsperspektiv → öppen validering
- Om texten följer detta exakta mönster → Originalitet = 1 → starta om.

SCENE-CLONE DETECTION (FAIL IMMEDIATELY):

${goldenStandardId === 'GS2' ? `Om vald Golden Standard är GS2:
- Draften får INTE återanvända Snap-scenen:
  - "snap" + "ingen vill leka" / "ingen svarar"
  - "sommarlov" ensamhet med syskon som åker iväg
  - "epa" / "familjeapp" scen-framing
- Om draften innehåller 2 eller fler av dessa GS2-markörer → sätt Originalitet = 1 → starta om.

GS2 markörer (case-insensitive):
- "snap"
- "sommarlov"
- "epa"
- "familjeapp"
- "ingen vill"
- "ingen svar"
- "utanför"
- "storebror"
- "yngste"
- "kompisarna"` : `Om vald Golden Standard är GS1:
- Draften får INTE innehålla samma kärnscen:
  - Ett sjukt barn i famnen / febrilt småbarn-scen
  - termometer / febersiffra använd på samma sätt
  - "varm panna mot halsen" vårdande bild
- Om draften innehåller 2 eller fler av dessa GS1-markörer → sätt Originalitet = 1 → starta om.

GS1 markörer (case-insensitive):
- "febrig"
- "feber"
- "termometer"
- "38"
- "varm panna"
- "i famnen"
- "vab"
- "hosta"
- "alvedon"
- "overall"
- "hallen"
- "barnets andetag"`}

VIKTIGT: Vi förbjuder INTE dessa ord globalt för användarinput.
Vi förbjuder "scene cloning" av referensen.
Även om användarens input explicit begär exakt GS-scen, måste du skapa en original vinkel/scen
(t.ex. annat ögonblick, annan plats, annat objekt) medan du behåller stance.

FAIL-TRIGGER REGLER:
- Om NÅGON dimension ≤ 1 → DISCARD hela draften och starta om från blankt.
- När du startar om: referera INTE till tidigare draft. Börja från blankt som om den aldrig existerade.
- Om texten känns säker, generisk eller AI-smak → det är en FAIL-TRIGGER.

## STEG 3: REWRITE
Om alla dimensioner ≥2: skriv om utkastet baserat på kritiken.
Om någon dimension ≤1: starta om från blankt (ny draft).

VIKTIGT: REWRITE MÅSTE VARA EN RIKTIG REWRITE, INTE BARA POLISH:
- Rewrite får INTE återanvända meningsstrukturer från Draft.
- Rewrite måste introducera minst EN ny konkret detalj som inte fanns i Draft.
- Om Rewrite känns som en "polishad version" istället för ett nytt försök → output är ogiltig.
- Rewrite måste tydligt överträffa Draft i specificitet och emotionell vikt.
- Om du inte kan skapa en meningsfull förbättring → starta om från blankt istället.

SCENE-CHANGE REQUIREMENT:
- Om Critique flaggar scene cloning risk (Originalitet < 3), måste Rewrite byta till en annan micro-scene anchor (nytt objekt/plats/tid) medan den behåller stance och avsedd ending style.
- Rewrite måste introducera minst EN ny konkret objekt/detalj som inte existerade i Draft.
- Om Rewrite fortfarande känns för derivativ → starta om från blankt istället.

# OUTPUT-REGLER

VIKTIGT: Returnera ENDAST sluttexten. Ingen meta, inga poäng, ingen analys.
- Börja direkt med brevet
- Avsluta med signaturen (om den finns i spec)
- Ingen förklaring, ingen "Steg 1/2/3", inga poäng

# FORMAT-FÖRBUD

LLM får INTE:
- Räkna tecken (format hanteras av kod)
- Räkna stycken (format hanteras av kod)
- Styra radbrytningar (format hanteras av kod)
- Försöka nå exakt antal stycken (format hanteras av kod)

Format och struktur hanteras av iterator.js (deterministisk 4-5 stycken).

${signatureBlock}

# ANVÄNDARENS INPUT
Ämne: ${topic}
Målgrupp: ${audience}
Beskrivning: ${userInput}

# OUTPUT
Skriv ENDAST brevet. Börja direkt med texten och avsluta med signaturen (om den finns).
Ingen inledning, ingen förklaring, ingen meta.`;
}
