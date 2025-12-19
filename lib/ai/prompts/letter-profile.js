/**
 * Nivå-nyckel: Definitioner för nivå 1-5 (verbatim, do not edit)
 */
export const LEVEL_KEY = `
NIVÅ 1: Varsam närvaro (mjuk, skyddande, nuet)
NIVÅ 2: Stillhet med tydlighet (trygg, lite mer markerad)
NIVÅ 3: Sårbar auktoritet (jag har varit där, efterhand/reflektion, tydlig markering)
NIVÅ 4: Systemblick utan kyla (ser mönster, distans, riktning mot ansvar)
NIVÅ 5: Försoning med skärpa (accepterar verkligheten, markerar gräns, slutgiltig tydlighet)
`;

/**
 * Types for Golden Standards (JSDoc for type safety)
 * @typedef {"GS1" | "GS2"} GoldenStandardId
 * @typedef {Object} GoldenStandard
 * @property {GoldenStandardId} id
 * @property {string} label
 * @property {number[]} levels
 * @property {string[]} themes
 * @property {string} endingStyle
 * @property {string} text
 */

/**
 * Golden Standards dictionary
 * GS1 text MUST remain EXACTLY as current production baseline
 */
export const GOLDEN_STANDARDS = {
  GS1: {
    id: "GS1",
    label: "Småbarn/VAB (Närvaro)",
    levels: [1, 2, 3, 4, 5],
    themes: ["småbarn", "vab", "jobbstress", "föräldraskap", "balans"],
    endingStyle: "Markering/Tillåtelse",
    text: `Ett brev till dig som är mitt i småbarnsåren
Du som jonglerar vab, Teams, deadlines, barn med feber och självsnack som låter ungefär:
'Jag måste bara få klart det här först...'
Jag har varit du.
Jag minns känslan i magen när jag hörde barnets hosta vid frukostbordet.
Pulsen när termometern visade 38,7 – och jag visste att jag inte kunde stanna hemma 'idag också'.
Då kändes jobbet som det viktigaste.
Mötet, leveransen, förväntningarna, 'jag ska bara'.

Men vet du?
Jag hade gett allt för att få gå tillbaka till en vanlig grå novembermorgon.
Ett sådant där vab-dygn jag hatade.
Och bara få sitta där – med ett barn som sover i famnen, varm panna mot halsen –
och inte känna stress.
Bara vara där. I det lilla.
För det var aldrig 'inget särskilt'. Det var livet.

Så – till dig som är där nu:
Ditt jobb är viktigt. Men inte viktigast.
Du är inte dålig på att prioritera. Du är bara mitt i det omöjliga.
När du är hemma med ett sjukt barn – stanna där med hela dig, om du kan.
Och om du inte kan? Då behöver det inte vara du som ska ändra dig.
Kanske är det systemet som behöver förstå bättre.

Jag tänker ofta att det borde stå i alla jobbeskrivningar:
Ibland kommer ditt barn att ha feber.
Då behöver du vara människa först, medarbetare sen.
Det är inte ett avbrott i produktiviteten.
Det är ett kvitto på att du är levande.

Till dig med barn i famnen och jobbdator i tankarna:
Du gör det bästa du kan. Och det är nog.`
  },
  GS2: {
    id: "GS2",
    label: "Snap/Ensamhet (Observation)",
    levels: [3, 4],
    themes: ["barn", "ungdom", "ensamhet", "socialt", "föräldraskap"],
    endingStyle: "Öppen observation/validering",
    text: `"Det är ingen som vill leka, mamma...". Min yngste ringer mig på Snap, mitt i mamma "VDns" höstplanering. Jag släpper allt. "Kan inte pappa ta med dig och bada då?" frågar jag. "Pappa bara jobbar, han är inte hemma". Samtidigt ser jag i familjeappen att hans storebror drar iväg med en kompis (otrimmad EPA, max 31 km i timmen). Kvar sitter han. Inte en gång på hela sommarlovet har det klaffat med kompisarna, de är iväg, vi är iväg, någon leker med någon redan så "det går inte".

Temperaturen stiger, det är lite sommarlov kvar. Det är inte att han inte har några bra vänner, det bara känns för honom som att ingen vill. De ringer inte heller, och varje obesvarad snap känns som ett avvisande. Jag tror inte det är menat så, men våra unga har tappat dialogen. Att svara "åh det hade varit roligt men vi är hos mormor idag, kanske till helgen?" finns inte. Bara "det går inte".

De har också fått ett konstigt tidsperspektiv. "Men kolla med S om han vill åka till stranden med dig imorgon då" säger jag. Det ska man tydligen snappa om imorgon först, inte med någon framförhållning, och utan framförhållning kanske det inte går. Så då sitter han ensam igen. En ny kommunikationskultur som ibland är dömd till att misslyckas därför att det inte leder till lek. Jag tror inte min son är ensam om detta även om han känner sig väldigt ensam och utanför just idag...`
  }
};

/**
 * Nivå-nyckel: Definitioner för nivå 1-5 (låsta, verbatim)
 * @deprecated Use LEVEL_KEY export instead
 */
const LEVEL_DEFINITIONS = {
  1: {
    name: 'Varsam närvaro',
    description: 'Inre position: mjuk, skyddande, låg friktion. Tidsrörelse: nuet, nära kroppen. Avslut: tillåtelse/varsam riktning (inte krav). Språktemp: varm, låg intensitet.'
  },
  2: {
    name: 'Stillhet med tydlighet',
    description: 'Inre position: trygg, lite mer markerad. Tidsrörelse: nu + liten distans. Avslut: enkel markering "det här är viktigt". Språktemp: varm, tydligare kontur.'
  },
  3: {
    name: 'Sårbar auktoritet',
    description: 'Inre position: "jag har varit där" + tydlig observation. Tidsrörelse: efterhand/reflektion. Avslut: tydlig markering/tillåtelse som stannar kvar. Språktemp: varm men rak.'
  },
  4: {
    name: 'Systemblick utan kyla',
    description: 'Inre position: ser mönster/struktur, fortfarande mänsklig. Tidsrörelse: distans + sammanhang. Avslut: riktning som pekar på ansvar/system (inte skuld på individ). Språktemp: klar, mer kant, ingen hårdhet.'
  },
  5: {
    name: 'Försoning med skärpa',
    description: 'Inre position: accepterar verkligheten men markerar gräns. Tidsrörelse: helhet/försoning. Avslut: slutgiltig tydlighet (utan aggressivitet). Språktemp: lugn, skarp, ovikbar.'
  }
};

/**
 * Bygger systemprompten för Brev-profilen med agentic workflow
 * @deprecated This function is now handled in prompt-engine.js with GS selection
 */
export function buildLetterPrompt(params) {
  const {
    goldenStandard,
    feedbackHistory,
    intensityLevel,
    signature,
    topic,
    audience,
    userInput
  } = params;

  const level = LEVEL_DEFINITIONS[intensityLevel];
  if (!level) {
    throw new Error(`Invalid intensity level: ${intensityLevel}. Must be 1-5.`);
  }

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
  if (signature) {
    signatureBlock = `
## SIGNATUR (FRÅN SPEC)
VIKTIGT: Signatur kommer ALLTID från constraints.signature i spec, aldrig hårdkodad.
Formatering: ny rad + "/${signature.name}"${signature.tagline ? `\n${signature.tagline}` : ''}
Använd exakt denna signatur i slutet av texten.`;
  } else {
    signatureBlock = `
## SIGNATUR
Om signature saknas i spec: rendera ingen signatur alls (hellre tomt än default).`;
  }

  return `# UPPGIFT
Skriv ett personligt brev enligt Brev-profilen.

# REFERENCE TEXT (STILANKARE - INTE FÖR KOPIERING)
Använd denna text ENDAST för att förstå:
- Rytm och pacing (hur tanken rör sig)
- Konkretion (sensoriska detaljer: siffror, temperatur, ljud, rum, kropp)
- Emotionell pacing (när känslan fördjupas, när den andas)
- Avslutskraft (hur markeringen/tillåtelsen/riktningen formas)

FÖRBJUDET:
- Kopiera fraser, ord, metaforer eller teman
- Spegla struktur rad-för-rad
- Återanvända unika formuleringar

REFERENCE TEXT:
${goldenStandard}

# VALD NIVÅ: ${intensityLevel}/5 - ${level.name}

${level.description}

LLM får INTE gissa nivådefinitioner. Följ exakt definitionen ovan.

${feedbackBlock}

# AGENTIC WORKFLOW (INTERNT - INGEN META I OUTPUT)

Du ska följa denna 3-stegsprocess, men returnera ENDAST sluttexten (ingen meta, inga poäng, ingen analys).

## STEG 1: DRAFT
Skriv ett första utkast till brevet baserat på:
- Ämne: ${topic}
- Målgrupp: ${audience}
- Beskrivning: ${userInput}
- Vald nivå: ${level.name}

## STEG 2: CRITIQUE (0-5 per dimension)
Granska ditt utkast på dessa dimensioner:

1. **Hook** (0-5): Fångar den direkt? Emotionell närhet i öppningen?
2. **Konkretion & kropp** (0-5): Minst 2 sensoriska detaljer (siffra/temperatur/ljud/rum/kropp)?
3. **Anti-AI** (0-5): Undviker förbjudna ord: balans, resa, landskap, storm, mörka moln + generiska klyschor?
4. **Avslutskraft** (0-5): Markering/tillåtelse/riktning – inte passivt slocknande?
5. **Ton** (0-5): Sårbar auktoritet, inte coach/pepp/predikan?

FAIL-TRIGGER: Om någon dimension ≤1 → DISCARD hela draften och starta om från blankt.

## STEG 3: REWRITE
Om alla dimensioner ≥2: skriv om utkastet baserat på kritiken.
Om någon dimension ≤1: starta om från blankt (ny draft).

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
