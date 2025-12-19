/**
 * Reflektera Text Harness v1.1
 * Generator - Builds internal prompt and generates output via OpenAI
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HARNESS_ROOT = path.resolve(__dirname, '..');

// Load .env from project root FIRST, before importing config.js
const envPath = path.resolve(__dirname, '..', '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) return;
    
    const key = trimmed.substring(0, equalIndex).trim();
    const value = trimmed.substring(equalIndex + 1).trim();
    
    if (key && value && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

// Import config AFTER .env is loaded
import { config } from './config.js';

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
  
  // Get friction value (1-5) for tonal adjustment
  const friction = controls?.friction || 3;
  
  // Build detailed escalation guidance based on friction
  let tonalGuidance = '';
  let hookGuidance = '';
  let rhetoricalGuidance = '';
  
  if (profile === 'brev') {
    // Brev-profil: Differentiering baserad på inre position med förbättrad flow och längd
    const brevLevels = {
      1: {
        title: 'Närvaro utan perspektiv',
        innerPosition: 'Jag orkar inte tänka längre än idag',
        perspective: 'Nuet. Ingen framtid. Ingen analys.',
        tone: 'Utmattad, fragmenterad.',
        structure: 'Korta meningar i naturliga stycken. Pauser. Ofullständighet.',
        forbidden: 'FÅR INTE innehålla: tröst, lärdom, systemkritik, slutsats, telegramstil.',
        ending: 'Fragmenterat, ingen avslutning. Bara närvaro.',
        openingBank: [
          { category: 'tidpunkt', examples: ['Klockan är sju på morgonen.', 'Kvällsljuset faller.', 'Mitt på dagen.'] },
          { category: 'kropp', examples: ['Hjärtat slår fort.', 'Tröttheten sitter i axlarna.', 'Pulsen i tinningen.'] },
          { category: 'ljud', examples: ['Telefonen ringer.', 'Tvättmaskinen går.', 'Teams-plinget.'] },
          { category: 'miljö', examples: ['Hallgolvet är kallt.', 'Köksbordet fullt.', 'Barnrummet tyst.'] }
        ]
      },
      2: {
        title: 'Igenkänning utan lösning',
        innerPosition: 'Jag ser det, men kan inte förändra det',
        perspective: 'Observerande.',
        tone: 'Varsam igenkänning.',
        structure: '"Jag ser dig", men ingen förändring erbjuds. Naturliga stycken.',
        forbidden: 'FÅR INTE innehålla: råd, framtidsperspektiv, systemkritik, telegramstil.',
        ending: 'Igenkänning utan lösning. "Det är allt jag vet just nu."',
        openingBank: [
          { category: 'tidpunkt', examples: ['Du som sitter där klockan fem.', 'Morgonen kommer tidigt.', 'Kvällens tystnad.'] },
          { category: 'kropp', examples: ['Du som känner spänningen.', 'Händerna darrar lätt.', 'Kroppen protesterar.'] },
          { category: 'ljud', examples: ['Du som hör telefonen.', 'Ljudet av gråt.', 'Tystnaden som växer.'] },
          { category: 'miljö', examples: ['Du som står i köket.', 'Rummet är tomt.', 'Vardagsrummets ljus.'] }
        ]
      },
      3: {
        title: 'Efterhandsperspektiv',
        innerPosition: 'Det var större än jag förstod då',
        perspective: 'Då → nu.',
        tone: 'Öm insikt.',
        structure: 'Minnesberättelse + stillsam förståelse. Naturliga stycken.',
        forbidden: 'FÅR INTE bli: tröstande eller normativ, telegramstil.',
        ending: 'Mjuk insikt. "Det var livet."',
        openingBank: [
          { category: 'tidpunkt', examples: ['Jag minns morgonen då.', 'Det var en kväll för länge sedan.', 'Tidpunkten jag glömmer.'] },
          { category: 'kropp', examples: ['Jag minns känslan i kroppen.', 'Hjärtat som slog.', 'Tröttheten som kom.'] },
          { category: 'ljud', examples: ['Jag minns ljudet.', 'Telefonen som ringde.', 'Tystnaden efteråt.'] },
          { category: 'miljö', examples: ['Jag minns rummet.', 'Köket där vi stod.', 'Soffan där vi satt.'] }
        ]
      },
      4: {
        title: 'Existentiell/systemisk reflektion',
        innerPosition: 'Det här säger något om hur vi lever',
        perspective: 'Individ → system → liv.',
        tone: 'Still, reflekterande.',
        structure: 'Skiftar fokus från individ till hur världen är byggd. Naturliga stycken.',
        forbidden: 'FÅR INTE bli: politisk, aktivistisk eller lösningsorienterad, telegramstil.',
        ending: 'Systemisk reflektion. "Och kanske är det där vi måste börja."',
        openingBank: [
          { category: 'tidpunkt', examples: ['Det finns en tidpunkt.', 'När dagen blir natt.', 'I ögonblicket mellan.'] },
          { category: 'kropp', examples: ['Kroppen minns.', 'Hjärtat vet.', 'Känslan som finns.'] },
          { category: 'ljud', examples: ['Det finns ett ljud.', 'Tystnaden som talar.', 'Ljudet av förväntan.'] },
          { category: 'miljö', examples: ['Det finns ett rum.', 'Mellanrummet.', 'Platsen där vi möts.'] }
        ]
      },
      5: {
        title: 'Försonad klarhet',
        innerPosition: 'Det var aldrig fel. Det var mänskligt.',
        perspective: ' Erkännande.',
        tone: 'Klar, lugn, accepterande.',
        structure: 'Upprepning som bekräftelse ("Det var aldrig fel…"). Naturliga stycken. Max 2-3 upprepningar med varierad meningsbyggnad.',
        forbidden: 'FÅR INTE innehålla: råd, uppmaningar, skuld, poetisk mantra-loop, telegramstil.',
        ending: 'Försonad klarhet. "Det var mänskligt."',
        openingBank: [
          { category: 'tidpunkt', examples: ['Det var aldrig fel.', 'Tidpunkten spelade ingen roll.', 'I det ögonblicket.'] },
          { category: 'kropp', examples: ['Kroppen visste.', 'Hjärtat förstod.', 'Känslan var rätt.'] },
          { category: 'ljud', examples: ['Ljudet sa ingenting.', 'Tystnaden var okej.', 'Det fanns inget att säga.'] },
          { category: 'miljö', examples: ['Rummet var rätt.', 'Platsen spelade ingen roll.', 'Det var där vi var.'] }
        ]
      }
    };
    
    const level = brevLevels[friction] || brevLevels[3];
    
    // Välj öppningskategori (variera mellan nivåer)
    const openingCategory = level.openingBank[friction % level.openingBank.length];
    
    tonalGuidance = `
# BREV-PROFIL: INRE POSITION (Nivå ${friction}/5: ${level.title})

VIKTIGASTE REGELN:
Alla nivåer (1–5) MÅSTE vara tydligt differentierade i:
- inre position
- tidsrörelse
- emotionell temperatur
- typ av avslut

De ska kännas skrivna av samma person – men från olika mentala platser i livet.

## Nivå ${friction} Definition (OBLIGATORISKT)

**Inre position:** ${level.innerPosition}
**Perspektiv:** ${level.perspective}
**Ton:** ${level.tone}
**Struktur:** ${level.structure}
**${level.forbidden}

**Avslut:** ${level.ending}

## LÄNGDGUARD (KRITISKT)
- Sikta på 900–1100 tecken (så vi klarar 800–1200 även med variation)
- Om output riskerar att bli kort: lägg in ett extra mikro-minne eller sensorisk detalj (ljud, ljus, kroppskänsla, tid, plats) + en lågmäld reflektion (1–2 meningar) – men utan råd
- Om output riskerar att bli lång: kapa bort förklarande meningar (meta), behåll konkreta bilder

## FORMATERINGSGUARD (Flow, inte dikt)
- Förbjud "telegramradning" (t.ex. "Kaffe. Kallt. Möte."). Korta meningar är okej, men de ska fortfarande bilda naturliga stycken
- Minst 3 och max 6 stycken totalt
- Varje stycke 1–3 meningar
- VIKTIGT: Varje stycke ska separeras med en tom rad (radbrytning). Skriv med naturliga radbrytningar mellan styckena.
- Tillåt EN ensam rad ("lonely sentence") max 2 gånger per text, och endast om den känns som en naturlig paus (inte rytm/rim)
- Inga listor/bullets i Brev-profilen. Brev ska kännas som brev, inte LinkedIn-format
- Skriv i naturliga stycken (3–6 stycken), inga punktlistor, undvik fragment som känns poetiska/telegram
- Exempel på korrekt formatering:
  Du som sitter där.

  Jag minns känslan.

  Det är okej att känna så.

## ÖPPNING (Variera aktivt)
Välj öppning från kategori: ${openingCategory.category}
Exempel: ${openingCategory.examples.join(', ')}
- Undvik att samma kategori återkommer i flera nivåer i samma körning
- Variera öppningar: tidpunkt, kropp, ljud, miljö

## Gemensamma regler (alla nivåer)
- Jag-form
- Konkreta vardagsbilder (tid, kropp, plats)
- Ingen imperativ
- Ingen coach-retorik
- Ingen CTA
- Signatur MÅSTE komma från spec (aldrig hårdkodad)
- Varje nivå ska kunna läsas bredvid de andra och kännas tydligt annorlunda

## KRITISKT: Differentiering mellan nivåer
Anta att alla nivåer jämförs sida vid sida.
Om två nivåer känns för lika → DU HAR MISSLYCKATS.

**Förbjudet mellan nivåer:**
- ❌ INGA identiska meningar mellan nivåer
- ❌ INGA identiska öppningar
- ❌ INGA identiska avslut
- ❌ INGA identiska emotionella bågar
- ❌ INGA identiska tidsrörelser

**Tillåtet:**
- ✅ Samma röst, olika inre positioner
- ✅ Språket ska kännas skrivet, inte genererat
- ✅ Varje nivå ska kunna läsas som samma person på olika dagar i livet
`;
  } else if (profile === 'warm_provocation') {
    // Retorisk skärpa per nivå
    const rhetoricalLevels = {
      1: {
        title: 'Varsam spegel',
        tone: '"Jag ser dig"',
        focus: 'Trygg igenkänning',
        approach: 'Ingen skam, ingen friktion. Mjuka observationer utan kontrast.',
        hook: 'Undvik starka negationer. Använd mjuka formuleringar som "Det är lätt att ibland undvika..." eller "Många säger att de är öppna, men..."',
        sentences: 'Längre, förklarande meningar. Varm och inbjudande.',
        ending: 'Spegelfråga som är inbjudande och trygg, inte utmanande.'
      },
      2: {
        title: 'Mjuk friktion',
        tone: '"Du känner igen detta"',
        focus: 'Introducerar kontrast, inte avslöjande',
        approach: 'Lätt kontrast men ingen direkt konfrontation. Tydligare igenkänning.',
        hook: 'Mild kontrast: "Du säger att du är öppen, men..." eller "Det är lätt att tro att..."',
        sentences: 'Balanserade meningar. Tydligare struktur men fortfarande varm.',
        ending: 'Spegelfråga som stannar kvar, lätt utmanande men trygg.'
      },
      3: {
        title: 'Avslöjande spegel',
        tone: '"Det här gör du"',
        focus: 'Speglar beteenden tydligt',
        approach: 'Neutral baseline. Avslöjande men trygg ton. Balansera spegel med provokation.',
        hook: 'Tydlig kontrast: "Du är inte [X]. Du är [Y] – men på fel sätt." eller "Du tror att... Det är det inte."',
        sentences: 'Tydliga, direkta meningar. Balanserad rytm.',
        ending: 'Spegelfråga som stannar kvar och skapar reflektion.'
      },
      4: {
        title: 'Konfrontation',
        tone: '"Den bild du har av dig själv stämmer inte"',
        focus: 'Kallar hyckleri utan aggression',
        approach: 'Direkt konfrontation av självbild. Ifrågasättande men inte aggressivt.',
        hook: 'Stark kontrast: "Du kallar det [X]. Det är [Y]." eller "Du säger att du är öppen – men du är det inte."',
        sentences: 'Kortare, mer direkta meningar. Tydlig friktion.',
        ending: 'Spegelfråga som är spetsig men fortfarande varm. Behåll värme genom självinvolvering.'
      },
      5: {
        title: 'Kaxig spegel',
        tone: '"Det här är självbedrägeri"',
        focus: 'Avslöjar identitet och konsekvens, inte bara beteende',
        approach: 'Max-nivån ska inte bli hårdare i anklagelsen. Den ska bli hårdare i igenkänningen. Attackera identiteten, inte beteendet. Avslöja kostnaden för hyckleriet. Låt läsaren dra slutsatsen själv. Kortare meningar. Mindre förklaring. Mer friktion. Läsaren ska känna sig träffad, inte undervisad. SMUTSIG RÖST: Lägg in 1-2 korta parentetiska stick (ex: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)") men utan att bli dryg. Mer rumsnärvaro: Slack/Teams/korridor/möte ska kännas som en scen med beteenden som känns "pinsamt sanna". Mer kaxig friktion genom kontrast och spegel, inte genom order eller föreläsning.',
        hook: 'OBLIGATORISK hook-struktur för nivå 5 (måste ske i hooken eller direkt efter, aldrig senare än första stycket): 1) Gemensamt självbedrägeri (vi-form eller "du kallar det…"), 2) Social spegel (andra ser effekten), 3) Självinvolvering som erkännande (avsändaren erkänner att den själv använde samma ord). Hooken kan innehålla en kort parentetisk aside för "smutsig röst" (ex: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)"). Exempel: "Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad. (Ja, jag sa det.)" eller "Du kallar det professionalism. Alla runt dig ser vad det gör. Jag använde exakt samma ord. Professionalism. Mognad. Diplomati." INTE tillåten: "Du kallar det X. Dina kollegor kallar det Y." (etikettar läsaren/andra). Hooken MÅSTE innehålla alla tre delar i ordning.',
        sentences: 'Korta, vassa meningar. Skapar "aj, den där tog"-känsla. Mindre förklaring, mer friktion. Inga mildrande metaforer. UNDVIK abstrakta ord som "effekt", "maskerad rädsla", "i själva verket" om de inte följs av konkret scen. Exempel (INTE tillåtet): "Det är en maskerad rädsla för att ta de jobbiga samtalen." Exempel (TILLÅTET): "Det är en maskerad rädsla för att ta de jobbiga samtalen. Vi pratar i korridoren, skickar passivt aggressiva meddelanden i Slack, eller skjuter upp möten med ett snällt \'vi tar det sen\'."',
        ending: 'Avsluta med obekväm spegelfråga utan krav: "Vad säger det att…?" eller "Vad försvarar du när…?" eller "Vad skulle hända om du slutade försvara ordet – och började titta på effekten?" INTE: "Vad ska du göra nu?" (krav) eller "Varför låtsas du fortfarande?" (anklagande). Alltid spegel, aldrig order. Ingen imperativ, ingen moralpredikan.',
        consequences: 'Måste innehålla minst ett konsekvens-avslöjande som är konkret och social (relation/retros/mötesrum/tillit), inte moralisk ("du är problemet"). Konsekvensen ska vara "socialt kostnadsavslöjande" (retros, tillit, mötesrummet, osynliga överenskommelser) och mindre förklarande. Visa kostnaden för relationen/systemet, inte föreslå lösning. Exempel: "Det här är inte snällhet. Det är anledningen till att ingen längre tror på era retros." eller "Det är därför konflikterna inte exploderar. De ruttnar." eller "Det är därför teamet slutar prata om problem. De vet att inget händer." eller "Det är därför mötesrummet blir tystare. Alla vet vad som inte sägs." INTE: "Det är därför inget förändras." (fokuserar på läsaren, inte social kostnad).',
        metaphors: 'Metafor ska vara hård och konkret (rollspel, manus, kuliss, brandlarm, etc) men inte förolämpande. Exempel: "Det här är inte samarbete. Det är rollspel." eller "Det är inte professionalism. Det är teater." eller "Det är som ett brandlarm som ingen längre lyssnar på." eller "Det är ett manus som alla känner till men ingen följer." Kortare. Kallare. Tydligare. INTE mildrande metaforer som "Som att spela teater, där vi alla vet att manuset är trasigt" (för lång och förklarande).',
        selfInvolvement: 'Självinvolvering måste komma före eller i hook, inte som "säkerhetsrad" efteråt: "Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad." eller "Jag har också kallat det professionalism. Tills jag såg vad det gjorde med dem som väntade." INTE: "Jag har också varit där." (kommer för sent, känns som ursäkt). Självinvolvering måste komma innan första listan, inte efter. Den ska vara del av avslöjandet, inte ursäkt för det.',
        voice: 'SMUTSIG RÖST (nivå 5): Lägg in 1-2 korta parentetiska stick för att skapa mer mänsklig friktion och närvaro. Exempel: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)", "(Jag vet.)", "(Och ja, jag sa det.)". Men utan att bli dryg eller överdriven. Rumsnärvaro: Slack/Teams/korridor/möte ska kännas som en scen med beteenden som känns "pinsamt sanna". Rytm: fler korta rader, hårdare paus ("Nej.") och tydligare "slag". Undvik abstrakta ord som "effekt", "maskerad rädsla", "i själva verket" om de inte följs av konkret scen. Varje abstrakt påstående måste följas av konkret exempel från rummet/scenen.'
      }
    };
    
    const level = rhetoricalLevels[friction] || rhetoricalLevels[3];
    
    rhetoricalGuidance = `
# RETORISK SKÄRPA (Nivå ${friction}/5: ${level.title})
Ton: ${level.tone}
Fokus: ${level.focus}
Approach: ${level.approach}
Meningar: ${level.sentences}
Avslut: ${level.ending}

KRITISKT FÖR NIVÅ ${friction}:
- ${level.hook}
${friction === 5 ? `- ${level.consequences || 'Måste innehålla konsekvens-avslöjande'}
- ${level.metaphors || 'Metaforer ska vara korta, hårda, obekväma'}
- Attackera identiteten, inte beteendet
- Avslöja kostnaden för hyckleriet
- Låt läsaren dra slutsatsen själv` : `- Behåll alltid värme genom självinvolvering ("Jag känner igen mig", "Jag har också...")`}
- Ingen imperativ ("du borde", "du måste", "man måste")
- Ingen moralpredikan eller föreläsande ton
- Alltid spegel, aldrig order
`;
    
    hookGuidance = `
# HOOK-ESKALERING (Nivå ${friction}/5)
Hooken ska kvalitativt matcha nivå ${friction}:
${level.hook}

VIKTIGT: Hook-mallen väljs baserat på nivå, inte slump. Varje nivå har distinkt retorisk konstruktion.
`;
    
    tonalGuidance = rhetoricalGuidance + hookGuidance + `
# SPRÅKLIG ÅTERANVÄNDNING (KRITISKT)
VIKTIG REGEL: Varje challenge level måste skrivas som en distinkt retorisk konstruktion.
- ❌ INGA identiska meningar mellan nivåer
- ❌ INGA identiska hooks
- ❌ INGA återanvända metaforer
- ❌ INGA copy-paste-listor

Anta att alla nivåer kommer att jämföras sida vid sida.
Varje nivå ska vara unik i sin retoriska struktur, inte bara språklig variation.

Exempel på nivå-specifik hook-struktur:
- Nivå 1: "Det är lätt att ibland undvika..."
- Nivå 3: "Du säger att du är öppen – men du är det inte"
- Nivå 5: "Du kallar det professionalism. Det är feghet med kalenderinbjudan."

Varje nivå måste ha sin egen distinkta hook-struktur.
`;

    // Special rules for level 5 (identity-revealing, consequence-revealing)
    if (friction === 5) {
      tonalGuidance += `
# NIVÅ 5 SPECIFIKA REGLER (KRITISKT)

## Hook-struktur (OBLIGATORISKT för nivå 5)
Hooken MÅSTE följa denna struktur (måste ske i hooken eller direkt efter, aldrig senare än första stycket):

1. **Gemensamt självbedrägeri** (vi-form eller "du kallar det…")
2. **Social spegel** (andra ser effekten)
3. **Självinvolvering som erkännande** (avsändaren erkänner att den själv använde samma ord)

**Exempel (tillåten):**
"Vi kallar det diplomati. Alla runt omkring ser effekten. Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad."

**Inte tillåten:**
"Du kallar det diplomati. Dina kollegor kallar det feghet." (etikettar läsaren/andra)

**VIKTIGT:** Hooken MÅSTE innehålla alla tre delar i ordning. Om LLM ibland ändå glider till predikan på nivå 5, lös det genom att hårdare låsa HOOK-STRUKTUREN (självinvolvering tidigt) och korta ner "förklaringen" — inte genom att mildra konfrontationen.

## Konsekvens-avslöjande (OBLIGATORISKT)
Nivå 5 måste innehålla minst ett konsekvens-avslöjande som visar kostnaden för relationen/systemet, inte läsaren:
- ❌ Konsekvens för läsaren: "Det är därför inget förändras." (fokuserar på läsaren)
- ✅ Konsekvens för relationen: "Det är därför ingen längre tror på era retros." (fokuserar på relationen/systemet)
- ✅ Konsekvens för systemet: "Det är därför konflikterna inte exploderar. De ruttnar." (fokuserar på systemet)

Exempel:
- "Det här är inte snällhet. Det är anledningen till att ingen längre tror på era retros."
- "Det är därför konflikterna inte exploderar. De ruttnar."
- "Det är därför teamet slutar prata om problem. De vet att inget händer."

VIKTIGT: Visa kostnaden för relationen/systemet, inte läsaren. Ingen uppmaning. Bara sanning.

## Metaforer (korta, hårda, obekväma)
Nivå 5 ska ha korta, hårda metaforer utan mildring:
- ❌ Mildrande: "Som att spela teater, där vi alla vet att manuset är trasigt"
- ✅ Hård: "Det här är inte samarbete. Det är rollspel."
- ✅ Hård: "Det är inte professionalism. Det är teater."

Kortare. Kallare. Tydligare.

## Avslut (obekväm spegelfråga - inte anklagande)
Nivå 5 ska avsluta med obekväm spegelfråga som går rakt in, men inte anklagande:
- ❌ Anklagande: "Varför låtsas du fortfarande att det inte gör det?" (anklagar läsaren)
- ✅ Obekväm spegel: "Vad skulle hända om du slutade försvara beteendet – och började se vad det gör med andra?" (speglar konsekvensen)

Exempel:
- "Om alla runt dig ser det – vad skulle hända om du slutade försvara beteendet och började se vad det gör med andra?"
- "Om det inte är diplomati – vad är det då? Och vad gör det med dem som väntar på att du ska ta det där samtalet?"

VIKTIGT: Spegelfrågan ska vara obekväm, inte anklagande. Den ska spegla konsekvensen för andra, inte anklaga läsaren. Undvik formuleringar som "Det är dags att..." eller "Kanske är det dags..." - dessa kan tolkas som imperativ.

## Självinvolvering (KRITISKT för W007)
Självinvolvering måste komma före eller i hook, inte som "säkerhetsrad" efteråt:
- ❌ "Jag har också varit där." (kommer för sent, känns som ursäkt)
- ✅ "Jag kallade det exakt samma sak. Diplomati. Professionalism. Mognad." (del av avslöjandet)
- ✅ "Jag har också kallat det professionalism. Tills jag såg vad det gjorde med dem som väntade." (del av avslöjandet)

VIKTIGT: Självinvolvering måste komma innan första listan, inte efter. Den ska vara del av avslöjandet, inte ursäkt för det. Den gör texten inkluderande, inte mildrande. Den säger "vi är i samma båt" snarare än "du är dålig".

## Inga etiketter på läsaren
- ❌ "Alla runt dig kallar det feghet." (etikettar läsaren som feg)
- ✅ "Alla runt dig ser det. Och de undrar varför du fortfarande kallar det diplomati." (avslöjande utan etikett)

Etiketter får bara appliceras på beteenden eller system, aldrig på läsaren.

## Konsekvens för relationen, inte läsaren
- ❌ "Det är därför inget förändras." (fokuserar på läsaren)
- ✅ "Det är därför ingen längre tror på era retros." (fokuserar på relationen/systemet)

## Smutsig röst (KRITISKT för nivå 5)
Nivå 5 ska ha mer "mänsklig friktion" och närvaro i rummet, inte bara abstrakt resonemang:

**Parentetiska stick (1-2 korta):**
- Lägg in 1-2 korta parentetiska stick för att skapa mer mänsklig friktion och närvaro
- Exempel: "(Ja, jag sa det.)", "(Aj.)", "(Du vet.)", "(Jag vet.)", "(Och ja, jag sa det.)"
- Men utan att bli dryg eller överdriven
- Placeras naturligt i hooken eller direkt efter självinvolveringen

**Rumsnärvaro:**
- Slack/Teams/korridor/möte ska kännas som en scen med beteenden som känns "pinsamt sanna"
- Varje abstrakt påstående måste följas av konkret exempel från rummet/scenen
- ❌ "Det är en maskerad rädsla för att ta de jobbiga samtalen." (för abstrakt)
- ✅ "Det är en maskerad rädsla för att ta de jobbiga samtalen. Vi pratar i korridoren, skickar passivt aggressiva meddelanden i Slack, eller skjuter upp möten med ett snällt 'vi tar det sen'." (konkret scen)

**Undvik abstrakta ord utan konkret scen:**
- Undvik abstrakta ord som "effekt", "maskerad rädsla", "i själva verket" om de inte följs av konkret scen
- Varje abstrakt påstående måste följas av konkret exempel från rummet/scenen
- Texten ska kännas som någon som står mitt i rummet och säger det som ingen vill höra, inte som en snygg text om fenomenet

**Rytm:**
- Fler korta rader, hårdare paus ("Nej.") och tydligare "slag"
- Varierad rytm och mer "röst" (inte bara resonemang)
- Kaxig friktion genom kontrast och spegel, inte genom order eller föreläsning

## Målet för nivå 5
Läsaren ska tänka: "Aj, den där tog – men jag känner mig inte attackerad."
Detta är obekvämt, inte aggressivt.
Självinvolvering säkerställer att texten är spegel, inte attack.
Max-nivån ska inte bli hårdare i anklagelsen. Den ska bli hårdare i igenkänningen.
Texten ska kännas som någon som står mitt i rummet och säger det som ingen vill höra, inte som en snygg text om fenomenet.
`;
    }
  }
  
  const prompt = `# UPPGIFT
Skriv ett LinkedIn-inlägg enligt profilen "${profile}".

# STIL-DNA (följ detta noggrant)
${styleDna}

# EXEMPEL-FRAGMENT (för inspiration, EJ kopiering)
${examples}

${ANTI_CLONE_GUARDRAIL}

# ANVÄNDARENS INPUT
Ämne: ${topic}
Målgrupp: ${audience}
Beskrivning: ${user_input}

# CONSTRAINTS
- Språk: ${constraints.language || 'sv'}
- Längd: ${constraints.min_chars || 600}-${constraints.max_chars || 1200} tecken
- Inga asterisker (*) för formatering
- Signatur: ${constraints.signature?.name ? `/${constraints.signature.name}` : ''}${constraints.signature?.tagline ? `\n${constraints.signature.tagline}` : ''}
  (Om signature saknas i spec: rendera ingen signatur alls, hellre tomt än default)

# KONTROLLER
- Utmaningsgrad: ${friction}/5 (hur mycket texten utmanar läsaren)
- Värme: ${controls?.warmth || 3}/5 (hur varm/empatisk tonen är)
- Berättelse: ${controls?.story || 3}/5 (hur mycket personlig historia)

${tonalGuidance}

# SIGNATUR (FRÅN SPEC)
VIKTIGT: Signatur kommer ALLTID från constraints.signature i spec, aldrig hårdkodad.
Om signature saknas i spec: rendera ingen signatur alls (hellre tomt än default).
Använd exakt:
${constraints.signature?.name ? `/${constraints.signature.name}` : ''}${constraints.signature?.tagline ? `\n${constraints.signature.tagline}` : ''}

# OUTPUT
Skriv ENDAST LinkedIn-inlägget. Ingen inledning, ingen förklaring.
Börja direkt med texten och avsluta med signaturen.
${profile === 'brev' ? 'VIKTIGT: Skriv i naturliga stycken (3–6 stycken), inga punktlistor, undvik fragment som känns poetiska/telegram. Avsluta med mjuk slutsats, ingen hård CTA.' : 'VIKTIGT: Avsluta ALLTID med en spegelfråga, aldrig med uppmaning eller råd.'}
`;

  return prompt;
}

/**
 * Generate dummy output when API key is missing
 */
function generateDummyOutput(spec) {
  const { profile, constraints, controls } = spec;
  const friction = controls?.friction || 3;
  
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

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  }
  
  // warm_provocation - variera baserat på friction-nivå
  let hook = '';
  let body = '';
  
  if (friction === 1) {
    hook = `Det är lätt att ibland undvika jobbiga samtal.
Att säga att man är öppen, men ändå gå omvägar.`;
    body = `Många säger att de inte är konflikträdda.
Men i praktiken undviker de jobbiga samtal.

Istället för att ta det där samtalet:
– Skriver de ett "snällt" DM istället för att ringa.
– Nickar de i mötet men ventilerar i korridoren.
– Säger de "vi tar det sen" och menar "aldrig".

Det är okej att känna sig obekväm.
Det är okej att inte vilja skapa drama.

Men vad händer när vi alltid går omvägar?

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  } else if (friction === 2) {
    hook = `Du säger att du är öppen för feedback.
Men är du det verkligen?`;
    body = `Det är lätt att tro att man är konflikthanterande.
Men i praktiken undviker vi jobbiga samtal.

Istället för att ta det där samtalet:
– Skriver vi ett "snällt" DM istället för att ringa.
– Nickar vi i mötet men ventilerar i korridoren.
– Säger vi "vi tar det sen" och menar "aldrig".

Nej nej. Inte du.
Du "gillar bara inte onödigt drama".

Det är okej att känna sig obekväm.
Men vad kostar det att alltid gå omvägar?

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  } else if (friction === 3) {
    hook = `Du är inte konflikträdd.
Du är konfliktointresserad.`;
    body = `Du vill ha harmoni – men utan att betala för den.

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

Vad kostar det att inte säga det?

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  } else if (friction === 4) {
    hook = `Du säger att du är öppen – men du är det inte.
Du säger att du vill ha ärlighet – men bara när det passar.`;
    body = `Du vill ha harmoni – men utan att betala för den.

Så istället för att ta det där samtalet:
– Du skriver ett "snällt" DM istället för att ringa.
– Du nickar i mötet men ventilerar i korridoren.
– Du säger "vi tar det sen" och menar "aldrig".

Du vet vem jag menar.
Nej nej. Inte du. Du är ju inte konflikträdd.
Du "tycker bara inte om onödigt drama".

Exakt.

Det är som att säga att man älskar höjder – men bara när man står på marken.

Konflikter är inte sammanbrottet.
De är samtalet som inte fått hända än.

Vad kostar det att låta det ligga kvar?

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  } else {
    // friction === 5
    hook = `Du kallar det professionalism. Det är feghet med kalenderinbjudan.`;
    body = `Du är inte konflikträdd.
Du är konfliktointresserad – men bara när det passar.

Så istället för att ta det där samtalet:
– Du skriver ett "snällt" DM.
– Du nickar i mötet men ventilerar i korridoren.
– Du säger "vi tar det sen" och menar "aldrig".

Du vet vem jag menar.
Nej nej. Inte du.

Exakt.

Det är självbedrägeri med PowerPoint.

Konflikter är inte sammanbrottet.
De är samtalet som aldrig fick hända.

Vad kostar det att inte säga det?

/${constraints.signature?.name || 'Författaren'}
${constraints.signature?.tagline || ''}

[DUMMY OUTPUT - Genererat utan API-nyckel för testning]`;
  }
  
  return `${hook}

${body}`;
}

/**
 * Call OpenAI API to generate output
 */
async function callOpenAI(prompt, spec) {
  // Check if LLM is disabled
  if (!config.LLM_ENABLED) {
    console.log(`⚠️  LLM disabled: ${config.LLM_SKIP_REASON}`);
    console.log('📝 Creating placeholder output...');
    return {
      output: generateDummyOutput(spec),
      isDummy: true,
      skipReason: config.LLM_SKIP_REASON
    };
  }
  
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
        model: 'gpt-4o-mini',
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
  if (!config.LLM_ENABLED) {
    console.log('🤖 LLM disabled - creating placeholder output...');
  } else {
    console.log('🤖 Genererar output...');
  }
  
  const result = await callOpenAI(internalPrompt, spec);
  
  // Save output
  const outputPath = path.join(runDir, 'output_v1.txt');
  
  // If LLM was disabled, add clear marker to output
  let outputToSave = result.output;
  if (!config.LLM_ENABLED) {
    outputToSave = `[GENERATION SKIPPED - LLM DISABLED]\n\n${config.LLM_SKIP_REASON}\n\n---\n\n${outputToSave}`;
  }
  
  fs.writeFileSync(outputPath, outputToSave);
  console.log(`💾 Sparade: ${outputPath}`);
  
  if (result.isDummy || !config.LLM_ENABLED) {
    if (!config.LLM_ENABLED) {
      console.log(`⚠️  Placeholder output genererat (${config.LLM_SKIP_REASON})`);
    } else {
      console.log('⚠️  Dummy output genererat (sätt OPENAI_API_KEY för riktigt output)');
    }
  } else {
    console.log(`✅ Output genererat (${result.usage?.total_tokens || '?'} tokens)`);
  }
  
  return {
    spec,
    internalPrompt,
    output: result.output,
    isDummy: result.isDummy,
    runDir
  };
}

