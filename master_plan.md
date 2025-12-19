# Reflektera Text Harness v1.1 - Master Plan

## Innehållsförteckning

1. [Översikt och arkitektur](#1-översikt-och-arkitektur)
2. [Filstruktur](#2-filstruktur)
3. [Acceptance Checks med Weights](#3-acceptance-checks-med-weights)
4. [Dual Scoring System](#4-dual-scoring-system)
5. [Scope Extraction](#5-scope-extraction)
6. [G001 Clone Detector](#6-g001-clone-detector)
7. [LLM Judge Prompts](#7-llm-judge-prompts)
8. [Lokal Patch Iteration](#8-lokal-patch-iteration)
9. [Core Artifacts Specifikationer](#9-core-artifacts-specifikationer)
10. [CLI och npm scripts](#10-cli-och-npm-scripts)
11. [Logging och Output](#11-logging-och-output)
12. [End-to-End Test](#12-end-to-end-test)
13. [Implementationsordning](#13-implementationsordning)

---

## 1. Översikt och arkitektur

### Syfte

Deterministiskt, testdrivet system för LinkedIn-inlägg som:
- Undviker "box-ticking" (falskt 90%)
- Gör lokala patchar istället för total omskrivning
- Skyddar mot example-kloning
- Separerar compliance (form) från quality (innehåll)

### Flöde

```
Input Layer:
  Human Input → post_spec.json

Generation Layer:
  style_dna.md + examples.md → generator.js → Anti-clone guardrail → internal_prompt.txt → OpenAI → output.txt

Evaluation Layer (Dual Score):
  output.txt → Scope Extraction → Regex Checks + Heuristic Checks + LLM Judge + G001 Clone Detector
  → compliance_score (form) + quality_score (innehåll)

Iteration Layer (Local Patch):
  IF compliance >= 95 AND quality >= 85 → Final Output
  ELSE → Check-to-Patch Mapping → Local Patch with Budget → Re-generate (max 3 iterations)
```

---

## 2. Filstruktur

```
./harness/
├── post_spec.json              # Mall/schema för körningar
├── acceptance_checks.json      # Alla checks med weights och scopes
├── style_dna.md               # DNA för Brev och Warm Provocation
├── examples.md                # Fragment-exempel per profil
├── runner.js                  # CLI entrypoint
├── lib/
│   ├── generator.js           # Internal prompt builder + anti-clone
│   ├── evaluator.js           # Dual scoring + scope + G001
│   ├── iterator.js            # Lokal patch med budgets
│   ├── utils.js               # Hjälpfunktioner
│   └── checks/
│       ├── regex-checks.js    # Regex-baserade checks
│       ├── heuristic-checks.js # Heuristik + W001a
│       └── llm-judge.js       # LLM-baserade bedömningar
├── specs/
│   ├── brev_smallbarn.json    # Exempel: småbarn/vab
│   └── warm_provocation_konflikter.json  # Exempel: konflikter
└── runs/                      # Körloggar (skapas automatiskt)
    └── YYYY-MM-DD_HHMMSS/
        ├── post_spec.json
        ├── internal_prompt_v1.txt
        ├── output_v1.txt
        ├── results_v1.json
        ├── summary.md
        └── diff.md
```

---

## 3. Acceptance Checks med Weights

### Brev-profil

#### Compliance Score (regex + heuristic) = 100

| ID | Check | Type | Scope | Weight |
|----|-------|------|-------|--------|
| B001 | Direct address ("Du som...", "Till dig som...") i första 2 raderna | regex | first_screen | **18** |
| B001a | Emotionell närhet i öppningen (inte tes-intro) | heuristic | first_screen | **12** |
| B002 | 2-3 sensoriska mikrodetaljer (tid/plats/kropp/föremål) | heuristic | full_text | **18** |
| B003 | Whitespace: 8+ radbrytningar, 3+ ensamma meningar | heuristic | full_text | **16** |
| B004 | Sårbar auktoritet ("Jag har varit där/minns") | regex | full_text | **14** |
| B006 | Mjuk slutsats: inga hårda CTA:s i sista raderna | regex | last_screen | **10** |
| B007 | Längd: 800-1200 tecken | heuristic | full_text | **6** |
| G001 | No exact example line reuse | heuristic | full_text | **6** |
| | | | **SUMMA:** | **100** |

#### Quality Score (llm_judge) = 100

| ID | Check | Type | Scope | Weight |
|----|-------|------|-------|--------|
| B005 | Reframing: skuld/stress → mänsklighet/tillåtelse | llm_judge | full_text | **55** |
| B008 | Ingen pepp/klyscha | llm_judge | full_text | **45** |
| | | | **SUMMA:** | **100** |

---

### Warm Provocation-profil

#### Compliance Score (regex + heuristic) = 100

| ID | Check | Type | Scope | Weight |
|----|-------|------|-------|--------|
| W001a | Hook inom första 2-3 meningar (direkt tilltal + kontrast) | heuristic | first_screen | **15** |
| W002 | Vardagsmiljö (Slack/Teams/korridor/möte) | regex | full_text | **20** |
| W003 | Listsekvens med tankstreck (3-5 rader) | regex | full_text | **20** |
| W004 | Rytmisk paus ("Nej." / "Nej nej." / "Exakt.") | regex | full_text | **15** |
| W006 | Signaturblock i slutet | regex | last_screen | **15** |
| W007b | Inga imperativ (fingerpekning-fraser) | heuristic | full_text | **10** |
| G001 | No exact example line reuse | heuristic | full_text | **5** |
| | | | **SUMMA:** | **100** |

#### Quality Score (llm_judge) = 100

| ID | Check | Type | Scope | Weight |
|----|-------|------|-------|--------|
| W001 | Avslöjande hook (självbedrägeri, inte påstående) | llm_judge | first_screen | **40** |
| W005 | Metafor som bär insikt (konkret, inte dekoration) | llm_judge | full_text | **30** |
| W007 | Inte moralpredikan (värme, inte föreläsning) | llm_judge | full_text | **30** |
| | | | **SUMMA:** | **100** |

---

## 4. Dual Scoring System

### Score-beräkning (evaluator.js)

```javascript
function calculateScores(checkResults, profile) {
  const profileChecks = CHECKS[profile];
  
  // Compliance = regex + heuristic
  const complianceChecks = profileChecks.filter(c => 
    c.type === 'regex' || c.type === 'heuristic'
  );
  const compliancePassed = complianceChecks
    .filter(c => checkResults[c.id].pass)
    .reduce((sum, c) => sum + c.weight, 0);
  const complianceTotal = complianceChecks
    .reduce((sum, c) => sum + c.weight, 0);
  const compliance_score = Math.round(100 * compliancePassed / complianceTotal);

  // Quality = llm_judge
  const qualityChecks = profileChecks.filter(c => c.type === 'llm_judge');
  const qualityPassed = qualityChecks
    .filter(c => checkResults[c.id].pass)
    .reduce((sum, c) => sum + c.weight, 0);
  const qualityTotal = qualityChecks
    .reduce((sum, c) => sum + c.weight, 0);
  const quality_score = Math.round(100 * qualityPassed / qualityTotal);

  // Total (konfigurerbar, default 0.6/0.4)
  const total_score = Math.round(0.6 * compliance_score + 0.4 * quality_score);

  return { compliance_score, quality_score, total_score };
}
```

### Patch-Only Checks

**VIKTIGT:** Checks med `weight: 0` eller `patch_only: true` påverkar **INTE** scoring (varken compliance_score eller quality_score), men kan fortfarande trigga patch-routing. Detta förhindrar att tonalitetsregler (som W007c) "vinner compliance" genom att vara form-checks när de egentligen är quality-guards.

Exempel: W007c (subtila föreläsarfraser) är en patch-only guard som triggar `de-moralisera` patch men påverkar inte compliance_score.

### Default Targets

```javascript
const DEFAULT_TARGETS = {
  compliance: 95,
  quality: 85
};
```

### results_vX.json struktur

```json
{
  "version": "v1",
  "timestamp": "2025-01-15T10:30:00Z",
  "profile": "brev",
  "scores": {
    "compliance_score": 88,
    "quality_score": 55,
    "total_score": 75,
    "formula": "0.6 * compliance + 0.4 * quality"
  },
  "targets": {
    "compliance_target": 95,
    "quality_target": 85,
    "compliance_met": false,
    "quality_met": false
  },
  "per_check": [
    {
      "id": "B001",
      "title": "Direct address",
      "type": "regex",
      "scope": "first_screen",
      "weight": 18,
      "pass": true,
      "notes": "Found 'Du som' on line 1"
    },
    {
      "id": "B008",
      "title": "Ingen pepp/klyscha",
      "type": "llm_judge",
      "scope": "full_text",
      "weight": 45,
      "pass": false,
      "notes": "Text contains generic encouragement: 'Du klarar det!'"
    }
  ]
}
```

---

## 5. Scope Extraction

### Implementation (utils.js)

```javascript
function getTextByScope(output, scope) {
  const lines = output.split('\n');
  const totalChars = output.length;
  
  switch (scope) {
    case 'first_screen':
      // Första 6 raderna ELLER max 280 tecken (utan att klippa mitt i rad)
      let firstScreen = '';
      let charCount = 0;
      for (let i = 0; i < Math.min(6, lines.length); i++) {
        if (charCount + lines[i].length > 280 && i > 0) break;
        firstScreen += lines[i] + '\n';
        charCount += lines[i].length + 1;
      }
      return firstScreen.trim();
      
    case 'last_screen':
      // Sista 6 raderna
      return lines.slice(-6).join('\n');
      
    case 'full_text':
    default:
      return output;
  }
}
```

---

## 6. G001 Clone Detector

### Implementation (utils.js)

```javascript
const SWEDISH_STOPWORDS = new Set([
  'och', 'att', 'det', 'som', 'är', 'i', 'på', 'en', 'ett', 
  'jag', 'du', 'ni', 'vi', 'de', 'den', 'har', 'för', 'med',
  'av', 'till', 'om', 'kan', 'när', 'så', 'men', 'inte', 'vara'
]);

function normalizeForComparison(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-–—]/g, '')  // Ta bort punktuation
    .split(/\s+/)
    .filter(word => word.length > 0 && !SWEDISH_STOPWORDS.has(word));
}

function jaccardSimilarity(words1, words2) {
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function checkExampleCloning(output, examplesContent) {
  const SIMILARITY_THRESHOLD = 0.85;
  const MIN_EXAMPLE_LENGTH = 35;
  
  // Extrahera exempelrader (ignorera korta och rubrikrader)
  const exampleLines = examplesContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length >= MIN_EXAMPLE_LENGTH && !line.startsWith('#'));
  
  const outputLines = output
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  const clonedLines = [];
  
  for (const outputLine of outputLines) {
    const outputWords = normalizeForComparison(outputLine);
    if (outputWords.length < 3) continue;  // Ignorera för korta rader
    
    for (const exampleLine of exampleLines) {
      const exampleWords = normalizeForComparison(exampleLine);
      const similarity = jaccardSimilarity(outputWords, exampleWords);
      
      if (similarity >= SIMILARITY_THRESHOLD) {
        clonedLines.push({
          outputLine,
          exampleLine,
          similarity: Math.round(similarity * 100) / 100
        });
      }
    }
  }
  
  return {
    pass: clonedLines.length === 0,
    clonedLines,
    notes: clonedLines.length > 0 
      ? `Found ${clonedLines.length} cloned line(s) with similarity >= ${SIMILARITY_THRESHOLD}`
      : 'No cloning detected'
  };
}
```

### Word Diff för Format-patch (utils.js)

```javascript
function wordDiff(before, after) {
  const beforeWords = normalizeForComparison(before);
  const afterWords = normalizeForComparison(after);
  
  // Jämför ordlistorna
  if (beforeWords.length !== afterWords.length) {
    return { identical: false, diff: beforeWords.length - afterWords.length };
  }
  
  for (let i = 0; i < beforeWords.length; i++) {
    if (beforeWords[i] !== afterWords[i]) {
      return { identical: false, diff: i };
    }
  }
  
  return { identical: true, diff: 0 };
}
```

---

## 7. LLM Judge Prompts

### B005 - Reframing (Brev)

```
Bedöm om texten innehåller en genuin vändning från skuld/stress till mänsklighet/tillåtelse.

PASS om:
- Det finns en tydlig rörelse från "jag borde/måste" till "det är okej att vara människa"
- Reframingen känns äkta, inte påklistrad
- Läsaren får tillåtelse utan att det blir peppigt

FAIL om:
- Ingen vändning finns
- Vändningen är ytlig eller forcerad
- Texten fastnar i problemet eller hoppar direkt till lösning

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).
```

### B008 - Ingen pepp/klyscha (Brev)

```
Bedöm om texten känns som en äkta, stillsam reflektion eller som en generisk inspirationspost.

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

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).
```

### W001 - Avslöjande hook (Warm Provocation)

```
Bedöm om textens öppning (första 2-3 meningarna) avslöjar ett självbedrägeri snarare än introducerar ett ämne.

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

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).
```

### W005 - Metafor som bär insikt (Warm Provocation)

```
Bedöm om texten innehåller minst en metafor som:
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

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).
```

### W007b - Inga imperativ (Warm Provocation) - Heuristic Pre-check

```
Heuristisk check som identifierar fingerpekning-fraser före LLM-judge.

FAIL om texten innehåller:
- "du borde", "du måste", "man måste", "man borde"
- "det är dags att", "ni behöver"
- Softer imperativ: "tänk om du", "vad sägs om att du", "prova att", "försök att"
- "vill du", "tänk på det som", "börja med att"

PASS om:
- Inga imperativ hittas OCH texten innehåller självinvolvering ("jag har", "jag också", "vi gör", "jag känner igen")
```

### W007 - Inte moralpredikan (Warm Provocation)

```
Bedöm om texten provocerar med värme och igenkänning eller om den föreläser/moraliserar.

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

Svara endast: PASS eller FAIL, följt av en kort motivering (max 2 meningar).
```

---

## 8. Lokal Patch Iteration

### Check-to-Patch Mapping

```javascript
const CHECK_TO_PATCH = {
  // Warm Provocation
  'W001': 'hook',
  'W001a': 'hook',
  'W002': 'miljo',
  'W003': 'lista',
  'W004': 'rytm',
  'W005': 'metafor',
  'W006': 'signatur',
  'W007': 'de-moralisera',
  'W007b': 'de-moralisera',
  
  // Brev
  'B001': 'hook',
  'B001a': 'hook',
  'B002': 'mikrodetaljer',
  'B003': 'format',
  'B004': 'sarbar-auktoritet',
  'B005': 'reframing',
  'B006': 'signatur',
  'B007': 'langd',
  'B008': 'de-klyscha',
  
  // Global
  'G001': 'parafrasera'
};
```

### Patch Priority Order (UPPDATERAD)

```javascript
const PATCH_ORDER = [
  'hook',           // Alltid först - viktigast för första intryck
  'lista',          // Strukturellt element
  'parafrasera',    // Fixa kloning tidigt (flyttad före miljo)
  'miljo',          // Konkret detalj
  'format',         // Whitespace/radbrytningar
  'rytm',           // Pauser och variation
  'metafor',        // Bildspråk
  'mikrodetaljer',  // Sensoriska detaljer
  'sarbar-auktoritet',
  'reframing',
  'de-klyscha',     // Ta bort pepp
  'de-moralisera',  // Ta bort predikan
  'signatur',       // Alltid sist
  'langd'
];
```

### Patch Budgets

```javascript
const PATCH_BUDGETS = {
  'hook': { maxLines: 4, location: 'top' },
  'lista': { maxLines: 5, location: 'middle', insert: true },
  'parafrasera': { maxLines: 2, location: 'any', replace: true },
  'miljo': { maxLines: 2, location: 'middle', insert: true },
  'format': { maxLines: 0, location: 'full', modifyOnly: true, noWordChange: true },
  'rytm': { maxLines: 2, location: 'middle', insert: true },
  'metafor': { maxLines: 2, location: 'middle', insert: true },
  'mikrodetaljer': { maxLines: 3, location: 'middle', insert: true },
  'sarbar-auktoritet': { maxLines: 2, location: 'middle', insert: true },
  'reframing': { maxLines: 4, location: 'middle' },
  'de-klyscha': { maxLines: 4, location: 'any', replace: true },
  'de-moralisera': { maxLines: 3, location: 'any', replace: true },
  'signatur': { maxLines: 3, location: 'bottom' },
  'langd': { maxLines: 0, location: 'full', trimOrExpand: true }
};
```

### De-Moralisera Patch - Förbättrad Implementation (UPPDATERAD)

```javascript
// I iterator.js - för de-moralisera patch
// Strategi:
// 1. Ersätt fingerpekning-fraser med spegel/inkludering
// 2. Lägg till självinvolverande rad inom budget
// 3. Skydda lista-struktur (W003) - hoppa över listrader vid ersättningar
// 4. Undvik att lägga till självinvolvering mitt i listsekvenser

// Ersättningar:
// - "du borde/måste/ska" → "jag har också känt att jag borde" / "vi kan"
// - "man måste/borde" → "vi gör ofta" / "det är lätt att"
// - "det är dags att" → "jag känner igen mig i att"
// - "ni behöver" → "vi behöver ibland"
// - "sluta" → "det är okej att inte"
// - Softer imperativ → självinvolverande formuleringar

// Självinvolverande rad (om budget finns):
// - "Jag har också gjort exakt så."
// - Placeras EFTER beskrivning av beteende, INTE i listor
```

### Format Patch - Sanity Check (KRITISKT)

```javascript
// I iterator.js - för format-patch
if (patchType === 'format') {
  const wordDiffResult = wordDiff(originalOutput, patchedOutput);
  if (!wordDiffResult.identical) {
    return {
      success: false,
      error: 'FORMAT_PATCH_CHANGED_WORDS',
      message: 'Format-patch ändrade ord (tillåts endast radbrytningar). Patch avbruten.',
      patchedOutput: null
    };
  }
}
```

### Iterator Logic

```javascript
function determinePatch(failedChecks) {
  // Sortera failade checks efter patch priority
  const patchesNeeded = failedChecks
    .map(checkId => CHECK_TO_PATCH[checkId])
    .filter(Boolean);
  
  // Returnera första enligt priority order
  for (const patch of PATCH_ORDER) {
    if (patchesNeeded.includes(patch)) {
      return patch;
    }
  }
  return null;
}

async function applyPatch(output, patchType, spec, failedCheck) {
  const budget = PATCH_BUDGETS[patchType];
  const lines = output.split('\n');
  
  // Bygg patch-prompt baserat på typ
  const patchPrompt = buildPatchPrompt(patchType, output, spec, budget);
  
  // Anropa LLM för patch (med strikt instruktion om budget)
  const patchedSection = await callLLMForPatch(patchPrompt);
  
  // Applicera patch på rätt location
  const patchedOutput = insertPatch(lines, patchedSection, budget.location);
  
  // Sanity check för format
  if (patchType === 'format') {
    const wordDiffResult = wordDiff(output, patchedOutput);
    if (!wordDiffResult.identical) {
      return {
        success: false,
        error: 'FORMAT_PATCH_CHANGED_WORDS'
      };
    }
  }
  
  return {
    success: true,
    patchedOutput,
    patchDescription: {
      type: patchType,
      location: budget.location,
      linesChanged: countChangedLines(output, patchedOutput),
      budgetUsed: `${countChangedLines(output, patchedOutput)}/${budget.maxLines}`
    }
  };
}
```

---

## 9. Core Artifacts Specifikationer

### post_spec.json (mall)

```json
{
  "meta": {
    "created_at": "2025-01-15T10:00:00Z",
    "version": "1.1",
    "harness_version": "1.1.0"
  },
  "channel": "linkedin",
  "profile": "brev",
  "topic": "Småbarnsförälder med sjukt barn och jobbstress",
  "audience": "Föräldrar som jonglerar jobb och familj",
  "user_input": "Skriv ett LinkedIn-inlägg som känns som ett varmt brev...",
  "constraints": {
    "no_asterisks": true,
    "no_swearing": true,
    "language": "sv",
    "max_chars": 1200,
    "min_chars": 800,
    "signature": {
      "name": "Ann-Christin",
      "tagline": "Ninja-psykolog och tidigare expert på att känna stress för fel saker"
    }
  },
  "controls": {
    "friction": 2,
    "warmth": 5,
    "story": 4,
    "seed": 42
  }
}
```

### style_dna.md

```markdown
# Style DNA

## Brev-profil

### Kärna
Emotionell närhet före åsikt. Stillhet före pepp. Vardag före visdom.

### Signaturdrag
1. **Direkt tilltal**: "Du som...", "Till dig som..."
2. **Mikrosituationer**: Frukostbord, termometer, famn, panna mot hals, novembermorgon
3. **Whitespace**: Ensamma meningar. Pauser. Luft.
4. **Sårbar auktoritet**: "Jag har varit du", "Jag minns känslan"
5. **Reframing**: Från skuld/stress → mänsklighet/tillåtelse
6. **Mjuk slutsats**: Ingen hård CTA. Värme utan krav.

### Ton
Varm. Stillsam. Sant. Som ett brev från någon som förstår.

### Undvik
- Pepp och klyschor
- "Du klarar det!" / "Tro på dig själv!"
- Generiska livsråd
- Överdriven positivitet

---

## Warm Provocation-profil

### Kärna
Avslöja självbedrägeri med värme. Hålla upp spegeln utan att peka finger.

### Signaturdrag
1. **Avslöjande hook**: Första meningarna ska avslöja, inte informera
2. **Vardags-hyckleri**: Slack, korridor, möte, "vi tar det sen"
3. **Listor**: Tankstreck med konkreta beteenden
4. **Rytmiska pauser**: "Nej." "Nej nej." "Exakt."
   - En pausrad på egen rad som kommer direkt efter en obekväm observation för att skapa slag i rytmen
5. **Metaforer**: Konkreta bilder som bär insikt
6. **Varm CTA**: Självsäker men inte säljig

### Ton
Provocerande men varm. Rak men mänsklig. Som en klok vän som vågar säga sanningen.

### Undvik
- Moralpredikan
- Fingerpekning
- Överlärar-ton
- "Du borde" / "Man måste"
```

### examples.md

```markdown
# Examples (Fragment Only)

VIKTIGT: Dessa är byggklossar för FORM, inte innehåll.
ÅTERANVÄND ALDRIG exakta fraser. Parafrasera alltid.

## Brev-profil

### Öppningar (typ)
- "Du som jonglerar..."
- "Till dig som sitter där nu..."
- "Du som känner..."

### Sårbar auktoritet (typ)
- "Jag har varit du."
- "Jag minns känslan i magen när..."
- "Jag hade gett allt för att få..."

### Mikrodetaljer (typ, inte exakt)
- tid: "grå novembermorgon", "klockan fem"
- plats: "frukostbordet", "vid sängen"
- kropp: "panna mot halsen", "tung i kroppen"
- föremål: "termometern", "datorn i knät"

### Reframing (typ)
- "Det var aldrig 'inget särskilt'. Det var livet."
- "Du är inte dålig på... Du är bara mitt i..."

### Mjuka avslut (typ)
- "Du gör det bästa du kan. Och det är nog."
- "Då behöver du vara människa först."

---

## Warm Provocation-profil

### Avslöjande hooks (typ)
- "Du är inte [X]. Du är [Y] – men på fel sätt."
- "Du tror att... Det är det inte."

### Rytmiska pauser (typ)
- "Nej."
- "Nej nej."
- "Exakt."
- En pausrad på egen rad som kommer direkt efter en obekväm observation för att skapa slag i rytmen

### Metaforer (typ)
- "Det är som att säga att man [X] – men bara när [Y]."
- "[X] är en PowerPoint, men inte en verklighet."

### Lista-struktur (typ)
- " – [konkret beteende 1]"
- " – [konkret beteende 2]"
- " – [konkret beteende 3]"

### Vardags-hyckleri (typ)
- "passivt aggressiv blinkning i Slack"
- "viskar i korridoren men tystnar i mötet"
- "'vi tar det sen'... i typ sex månader"
```

---

## 10. CLI och npm scripts

### Miljövariabler och API-nyckel

**VIKTIGT:** API-nyckel konfigureras via `.env`-fil i projektets root.

1. **Skapa `.env`-fil i root:**
   ```bash
   # I projektets root (/Users/evil/Desktop/EVIL/PROJECT/Promtenhancer/promtenhancer/)
   OPENAI_API_KEY=sk-din-api-nyckel-här
   PORT=3001
   ```

2. **Hämta API-nyckel:**
   - Gå till https://platform.openai.com/api-keys
   - Skapa en ny API-nyckel
   - Kopiera nyckeln till `.env`-filen

3. **Verifiera att `.env` läses:**
   - `harness/runner.js` läser automatiskt `.env` från root
   - `server/index.js` använder `dotenv.config()` för att läsa `.env`
   - Om `OPENAI_API_KEY` saknas körs systemet i "no-network mode" (dummy output)

4. **För tester:**
   - `npm run harness:test:challenge` kräver `OPENAI_API_KEY` för riktiga tester
   - Utan API-nyckel körs testerna med dummy output (verifierar logik, inte faktisk generation)

### runner.js kommandon

```bash
# Generera output från spec
npm run harness -- generate --spec ./harness/specs/brev_smallbarn.json

# Utvärdera senaste output
npm run harness -- eval --run ./harness/runs/latest

# Iterera tills mål nås
npm run harness -- iterate --target-compliance 95 --target-quality 85 --max 3

# Komplett körning: generate + eval + iterate
npm run harness -- run --spec ./harness/specs/brev_smallbarn.json

# Jämför versioner
npm run harness -- compare --run ./harness/runs/latest
```

### package.json tillägg

```json
{
  "scripts": {
    "harness": "node harness/runner.js",
    "harness:brev": "node harness/runner.js run --spec ./harness/specs/brev_smallbarn.json",
    "harness:warm": "node harness/runner.js run --spec ./harness/specs/warm_provocation_konflikter.json",
    "harness:eval": "node harness/runner.js eval --run ./harness/runs/latest",
    "harness:compare": "node harness/runner.js compare --run ./harness/runs/latest"
  }
}
```

---

## 11. Logging och Output

### Run-mapp struktur

```
./harness/runs/2025-01-15_103000/
├── post_spec.json              # Snapshot av input
├── internal_prompt_v1.txt      # Genererad prompt
├── output_v1.txt               # LLM output
├── results_v1.json             # Utvärdering med dual scores
├── internal_prompt_v2.txt      # (om iterate)
├── output_v2.txt
├── results_v2.json
├── summary.md                  # Sammanfattning
└── diff.md                     # (om compare)
```

### summary.md format

```markdown
# Run Summary

**Run ID:** 2025-01-15_103000
**Profile:** brev
**Iterations:** 2

## Final Scores
| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 96 | 95 | MET |
| Quality | 87 | 85 | MET |
| Total | 92 | - | - |

## Iteration History

### v1
- Compliance: 72
- Quality: 55
- Failed: B003 (whitespace), B008 (pepp/klyscha)

### v1 → v2
- **Patch:** format
- **Location:** full_text
- **Action:** Lade till 4 radbrytningar och 2 ensamma meningar
- **Budget used:** 0/0 (whitespace only)
- **Word diff:** 0 (VALID)

### v2
- Compliance: 88
- Quality: 55
- Failed: B008 (pepp/klyscha)

### v2 → v3
- **Patch:** de-klyscha
- **Location:** middle (lines 8-11)
- **Action:** Ersatte "Du klarar det!" med konkret mikrodetalj
- **Budget used:** 3/4 rader
- **Before:** "Du klarar det! Tro på dig själv och din förmåga."
- **After:** "Jag minns hur termometern visade 38,7 och hjärtat slog lite fortare."

### v3 (final)
- Compliance: 96
- Quality: 87
- All targets met
```

---

## 12. End-to-End Test

### Förväntat output

```
=== BREV PROFILE ===
Running: npm run harness:brev

Generation complete.
Evaluating...

Compliance Score: 88/100 (target: 95) - NOT MET
Quality Score: 55/100 (target: 85) - NOT MET

Failed checks:
- B003: Whitespace (compliance, weight: 16)
- B008: Ingen pepp/klyscha (quality, weight: 45)

Iterating... (max 3)

[v1 → v2] Applying patch: format
[v2] Compliance: 94, Quality: 55 - NOT MET
[v2 → v3] Applying patch: de-klyscha  
[v3] Compliance: 96, Quality: 87 - MET

Final: compliance=96, quality=87, total=92
Run saved to: ./harness/runs/2025-01-15_103000/

=== WARM PROVOCATION PROFILE ===
Running: npm run harness:warm

Generation complete.
Evaluating...

Compliance Score: 85/100 (target: 95) - NOT MET
Quality Score: 70/100 (target: 85) - NOT MET

Failed checks:
- W003: Listsekvens (compliance, weight: 20)
- W005: Metafor (quality, weight: 30)

Iterating... (max 3)

[v1 → v2] Applying patch: lista
[v2] Compliance: 100, Quality: 70 - NOT MET
[v2 → v3] Applying patch: metafor
[v3] Compliance: 100, Quality: 88 - MET

Final: compliance=100, quality=88, total=95
Run saved to: ./harness/runs/2025-01-15_103500/
```

---

## 13. Implementationsordning

1. **Skapa mappstruktur**
   - harness/, lib/, lib/checks/, specs/, runs/

2. **Skapa acceptance_checks.json**
   - Alla checks med exakta weights och scopes

3. **Skapa style_dna.md och examples.md**
   - DNA för båda profiler
   - Fragment (ej hela inlägg)

4. **Implementera lib/utils.js**
   - Scope extraction
   - Jaccard similarity
   - Swedish stopwords
   - Word diff

5. **Implementera lib/checks/**
   - regex-checks.js
   - heuristic-checks.js (inkl W001a, W007b och G001)
   - llm-judge.js (alla prompts)

6. **Implementera lib/generator.js**
   - Internal prompt builder
   - Anti-clone guardrail

7. **Implementera lib/evaluator.js**
   - Dual scoring
   - Scope-hantering
   - Clone detection

8. **Implementera lib/iterator.js**
   - Check-to-patch mapping
   - Patch budgets
   - Local patch logic
   - Format-patch word_diff sanity check

9. **Implementera runner.js**
   - CLI med alla kommandon
   - Logging

10. **Skapa exempel-specs**
    - brev_smallbarn.json
    - warm_provocation_konflikter.json

11. **Uppdatera package.json**
    - npm scripts

12. **End-to-End test**
    - Kör båda profiler
    - Verifiera dual scores
    - Verifiera lokala patchar (diff)
    - Verifiera ingen kloning

---

## Referenstexter

### Brev-profil referens (småbarn/vab)

```
Ett brev till dig som är mitt i småbarnsåren
Du som jonglerar vab, Teams, deadlines, barn med feber och självsnack som låter ungefär:
 "Jag måste bara få klart det här först..."
Jag har varit du.
 Jag minns känslan i magen när jag hörde barnets hosta vid frukostbordet. 
 Pulsen när termometern visade 38,7 – och jag visste att jag inte kunde stanna hemma "idag också".
Då kändes jobbet som det viktigaste.
 Mötet, leveransen, förväntningarna, "jag ska bara".
Men vet du?
 Jag hade gett allt för att få gå tillbaka till en vanlig grå novembermorgon.
 Ett sådant där vab-dygn jag hatade.
 Och bara få sitta där – med ett barn som sover i famnen, varm panna mot halsen –
 och inte känna stress.
 Bara vara där. I det lilla.
 För det var aldrig "inget särskilt". Det var livet.
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
 Du gör det bästa du kan. Och det är nog.

 /Ann-Christin
 Ninja-psykolog™ och tidigare expert på att känna stress för fel saker
```

### Warm Provocation-profil referens (konflikter)

```
Du är inte konflikträdd.
Du är konfliktointresserad.

Du vill ha harmoni – men utan att betala för den.
Så istället för att ta det där jobbiga samtalet...
– Sitter de på information de aldrig delat.
– Går de omvägar runt kollegor de inte pallar.
– Pratar de i korridoren men tystnar i mötet.
– Och så – den klassikern – en passivt aggressiv blinkning i Slack.

Du vet vem jag menar.
Nej nej. Inte du. Du är ju inte konflikträdd.
Du "tycker bara inte om onödigt drama".
Exakt.

Det är som att säga att man älskar höjder – men bara när man står på marken.

Och grejen är – det handlar inte om att bli tuffare.
Det handlar om att förstå att konflikt inte är ett sammanbrott.
Det är ett samtal som inte fått hända än.

Så nästa gång du känner den där klumpen i magen...
och du funderar på att "ta det sen" (i typ sex månader)...
fråga dig: Vad kostar det att inte säga det?

/Ann-Christin
Ninja-psykolog™ och den som fortfarande övar på att inte skicka DM när jag borde ta mötet
```

---

## Klardefinition

Implementation är klar när:

- [x] Alla filer skapade enligt filstruktur
- [x] acceptance_checks.json har alla checks med rätt weights och scopes (inkl W007b)
- [x] Dual scoring fungerar (compliance + quality)
- [x] G001 Jaccard clone detector fungerar (threshold 0.85, min 35 tecken)
- [x] W007b heuristic check fungerar (identifierar imperativ före LLM-judge)
- [x] Iterator gör lokala patchar (diff visar små ändringar)
- [x] De-moralisera patch skyddar lista-struktur (W003) och lägger till självinvolvering
- [x] Format-patch ändrar aldrig ord (word_diff == 0 enforcement)
- [x] CLI fungerar med alla kommandon (generate, eval, iterate, run, compare)
- [x] npm run harness:brev och npm run harness:warm kör framgångsrikt
- [x] runs/ skapas med alla loggfiler (post_spec, internal_prompt, output, results, summary, diff)
- [x] **Offline mode fungerar utan LLM (NO_NETWORK=1)**
- [x] **Quality score är null (inte sträng) när LLM är avstängt**
- [x] **Explicit patch-klassning (LLM_REQUIRED_PATCHES vs DETERMINISTIC_PATCHES)**
- [x] **CI-stabil regression testing utan API-nyckel**

**Status:** ✅ **KLAR** - v1.1.0

**Verifiering:** Se `harness/README.md` för release-kvitto och snabbverifiering.

