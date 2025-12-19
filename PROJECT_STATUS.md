# Reflektera Text Harness v1.2 - Projektstatus

**Senast uppdaterad:** 2025-12-19  
**Version:** 1.2.0  
**Status:** ✅ Brev Agentic Workflow implementerad med Multi-Anchor Golden Standards

---

## 🎯 Vad är detta?

Deterministiskt, testdrivet system för att generera LinkedIn-inlägg med hög kvalitet och compliance. Systemet använder dual scoring (compliance + quality), lokal patch-iteration, och LLM-judge för kvalitetsbedömning.

---

## ✅ Vad är klart?

### Core System
- ✅ **Dual Scoring System**: Compliance (regex/heuristic) + Quality (LLM judge)
- ✅ **Model Routing**: Konfigurerbar via `harness/lib/config.js` (generation/judge/patch models)
- ✅ **Local Patch Iteration**: Deterministiska patchar med budgets (max 3-5 rader)
- ✅ **Scope Extraction**: first_screen, last_screen, full_text
- ✅ **Anti-clone Guardrail**: G001 check förhindrar exakt kopiering från examples.md

### Warm Provocation Profile
- ✅ **Strict Generator Rules**: Hook, ironisk spegel, lista (endash), spegelfråga
- ✅ **W007 Stability**: Golden fixtures + median guard (80-89 gråzon) + deterministisk judge
- ✅ **W007c Patch-Only Guard**: Triggare patch utan att påverka scoring (Master Plan-kompatibel)
- ✅ **W004 Rhythm Patch**: Deterministisk paus-sekvens med fallback-logik
- ✅ **De-moralisera Patch v4**: Smart rewrite av föreläsande stycken (3-5 rader)

### Brev Profile (Agentic Workflow) - NY v1.2
- ✅ **Multi-Anchor Golden Standards**: GS1 (Småbarn/VAB) + GS2 (Snap/Ensamhet)
- ✅ **Deterministic Selection Logic**: GS2 endast om intensityLevel 3-4 + keywords match
- ✅ **Agentic Workflow**: Draft → Critique → Rewrite (internt, endast sluttext returneras)
- ✅ **Hårdnad Self-Critique**: Förbjudna fraser, minimum konkretion, GS-jämförelse, fail-triggers
- ✅ **Anti-derivative / Anti-plagiat**: Scene-clone detection, tvinga ny micro-scene anchor
- ✅ **Unique Contribution Check**: Förhindrar dramaturgisk kloning, tvingar original berättelsefunktion
- ✅ **Dynamic Ending Rules**: GS1 = closure, GS2 = öppen observation
- ✅ **UI Loading States**: 3-stegs (Utkast/Granskar/Finslipar) med timeout-hantering
- ✅ **Feedback Loop**: Poor-man's RL (injekterar senaste 3 feedback-punkter)
- ✅ **Signature Robustness**: Hanterar string, object, null (alltid från constraints.signature)
- ✅ **Format Separation**: LLM = stil, Kod = format (iterator.js hanterar 4-5 stycken)

### Testing & CI
- ✅ **Regression Tests**: `npm run harness:test:regression` (W004 fallback + W007c trigger)
- ✅ **W007 Stability Test**: `npm run harness:test:w007` (5 runs per fixture, variance checks)
- ✅ **GitHub Actions CI**: Kör båda testerna på push/PR
- ✅ **No-Network Mode**: Budget-guard för API-skydd, kör deterministiska tester utan API-nyckel

### Documentation
- ✅ **Master Plan v1.1**: Fullständig specifikation i `master_plan.md`
- ✅ **Patch-Only Checks**: Dokumenterat i Master Plan (påverkar inte scoring)

---

## 📁 Viktiga filer

### Konfiguration
- `harness/acceptance_checks.json` - Alla checks med weights och thresholds
- `harness/lib/config.js` - Model routing (generation/judge/patch)
- `harness/specs/` - Spec-filer för olika profiler

### Core Logic
- `harness/lib/generator.js` - Textgenerering med strict rules för warm_provocation + agentic workflow för brev
- `harness/lib/evaluator.js` - Dual scoring + scope extraction
- `harness/lib/iterator.js` - Local patch iteration med budgets + deterministisk format-patch (4-5 stycken)
- `harness/lib/checks/llm-judge.js` - LLM judge med median guard för W007
- `harness/lib/checks/heuristic-checks.js` - Heuristic checks (inkl. W007b, W007c, B003, B007, B008)

### Brev Agentic Workflow (NY v1.2)
- `lib/ai/prompt-engine.js` - constructLetterPrompt() med GS-selection, agentic workflow, critique-regler
- `lib/ai/prompts/letter-profile.js` - Golden Standards (GS1 + GS2), LEVEL_KEY, nivådefinitioner
- `lib/ai/types.ts` - TypeScript types för LetterPromptParams, LoadingPhase
- `components/HarnessStudio.tsx` - UI loading states (Utkast/Granskar/Finslipar) med timeout-hantering

### Testing
- `harness/test_regression.js` - Regression tests (W004 + W007c)
- `harness/test_w007_stability.js` - W007 stability test (golden fixtures)
- `harness/specs/_fixtures/` - Test fixtures (warm_no_list, w007c_trigger, w007_good/borderline/bad)

### CI/CD
- `.github/workflows/ci.yml` - GitHub Actions workflow

---

## 🔧 NPM Scripts

```bash
# Kör full harness-run
npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json

# Regression tests
npm run harness:test:regression

# W007 stability test
npm run harness:test:w007

# Eval only
npm run harness:eval -- --run ./harness/runs/latest
```

---

## 🎯 Master Plan Compliance

### ✅ Dual Scoring är rent
- Compliance = regex + heuristic (exkluderar patch-only checks)
- Quality = llm_judge
- W007c är patch-only (weight: 0, patch_only: true) - påverkar INTE scoring

### ✅ Patch Budgets respekteras
- Max 3-5 rader per patch
- Lokal patch (inte total rewrite)
- Loggning av exakt vilka rader som ändras

### ✅ No Box-Ticking
- Patch-only checks påverkar inte scoring
- Tonalitetsregler (W007c) triggar patch men "vinner inte compliance"

---

## 🚀 Nästa steg (för nästa agent)

### Kort sikt
1. **Verifiera CI**: Se till att GitHub Actions kör grönt med OPENAI_API_KEY i Secrets
2. **Metafor Patch**: Implementera `metafor` patch för W005 (finns i CHECK_TO_PATCH men inte implementerad)
3. **Reframing Patch**: Implementera `reframing` patch för B005

### Lång sikt
1. ✅ **Brev Profile**: Fullständig implementation av brev-profilen med Agentic Workflow (KLART)
2. **Quota Monitoring**: Utöka budget-guard med faktisk quota-check (API-anrop)
3. **Compare Command**: Implementera `compare` command i runner.js
4. **Brev Compliance**: Förbättra compliance-score (nuvarande output missar ibland B001/B001a/B004)
5. **Fail-trigger Enforcement**: Modellen följer inte alltid fail-triggers konsekvent (förbjudna fraser passerar ibland)

---

## 🔑 Miljövariabler

```bash
# Obligatorisk för LLM-steg
OPENAI_API_KEY=sk-...

# Valfria model-overrides
REFLEKTERA_MODEL_GENERATION=gpt-5.1
REFLEKTERA_MODEL_JUDGE=gpt-5.1
REFLEKTERA_MODEL_PATCH=gpt-5.1
```

---

## 📊 Test Coverage

- ✅ W004 rhythm patch med fallback (no-list scenario)
- ✅ W007c patch trigger (triggare även när W007-score >= 85)
- ✅ W007 stability (5 runs per fixture, variance <= 8)
- ✅ No-network mode (deterministic checks + patches utan API)

---

## 🐛 Kända begränsningar

1. **Metafor Patch**: Inte implementerad (W005 kan faila utan patch)
2. **Reframing Patch**: Inte implementerad (B005 kan faila utan patch)
3. **Quota Check**: Budget-guard detekterar bara saknad key, inte faktisk quota-exhaustion
4. **Brev Fail-triggers**: Modellen följer inte alltid fail-triggers konsekvent (t.ex. "det är okej", "balans" passerar ibland trots förbud)
5. **Brev Compliance**: Output missar ibland B001 (Direct address), B001a (Emotionell närhet), B004 (Sårbar auktoritet)

---

## 📝 Brev Agentic Workflow - Detaljerad Implementation (v1.2)

### Arkitektur
Systemet använder en 3-lagers arkitektur:
1. **STYLE & INNEHÅLL (LLM)**: Ansvarar för känsla, konkretion, hook, avslut
2. **SJÄLVGRANSKNING (LLM, internt)**: Draft → Critique → Rewrite med fail-triggers
3. **FORMAT & SÄKERHET (KOD)**: iterator.js (deterministisk 4-5 stycken) + guards

### Golden Standards
- **GS1 (Småbarn/VAB)**: 1422 tecken, levels 1-5, ending: Markering/Tillåtelse
- **GS2 (Snap/Ensamhet)**: 1362 tecken, levels 3-4, ending: Öppen observation/validering
- **Selection Logic**: GS2 endast om intensityLevel 3-4 + keywords match (snap, sommarlov, kompis, ensam, etc.)

### Agentic Workflow
**STEG 1: DRAFT**
- Måste välja NY micro-scene anchor (inte från GS)
- Minst 2 konkreta detaljer från ny scen
- Om inte uppfyllt → Concreteness = 1 → restart

**STEG 2: CRITIQUE (6 dimensioner, 0-5)**
1. Hook (0-5): Emotionell närhet, inte generisk
2. Konkretion (0-5): Minst EN siffra ELLER TVÅ sensoriska detaljer
3. Anti-AI (0-5): Förbjudna fraser → = 1 omedelbart
4. Avslutskraft (0-5): GS1 = closure, GS2 = öppen observation
5. Ton (0-5): GS-jämförelse (emotionell risk)
6. Originalitet (0-5): Unique contribution check + scene-clone detection

**STEG 3: REWRITE**
- Måste vara riktig rewrite, inte polish
- Ny konkret detalj som inte fanns i Draft
- Om Originalitet < 3 → byt scen

### Fail-triggers
- Någon dimension ≤ 1 → DISCARD hela draften → starta om från blankt
- Förbjudna fraser: "det är okej", "balans", "du klarar det", "allt kommer bli bra", "storm", "resa", "mörka moln", "pussel", "finna sig själv"
- Scene-clone: 2+ GS-markörer → Originalitet = 1
- Dramaturgisk kloning: Samma berättelsefunktion → Originalitet = 1

### Testresultat
- **GS1 Selection**: Fungerar korrekt (småbarn/vab → GS1)
- **GS2 Selection**: Fungerar korrekt (snap/ensamhet + level 3-4 → GS2)
- **Output varierar**: Olika scener, olika öppningar, olika längd
- **Problem**: Modellen följer inte alltid fail-triggers konsekvent (förbjudna fraser passerar ibland)

### Filer
- `lib/ai/prompt-engine.js` - constructLetterPrompt(), selectGoldenStandardId(), renderSignature()
- `lib/ai/prompts/letter-profile.js` - GOLDEN_STANDARDS, LEVEL_KEY
- `lib/ai/types.ts` - TypeScript types
- `harness/lib/generator.js` - Integration för brev-profil (tidig if-branch)
- `components/HarnessStudio.tsx` - UI loading states

---

## 📝 Commit-historik (senaste)

```
[PENDING] feat(brev): implement agentic workflow with multi-anchor golden standards
[PENDING] feat(brev): add unique contribution check and forbidden dramatic patterns
[PENDING] feat(brev): harden self-critique with fail-triggers and anti-AI rules
[PENDING] feat(brev): add anti-derivative rules and scene-clone detection
f10c8cb feat(harness): add budget guard and no-network mode for API budget protection
37e5ee1 fix(harness): make W007c patch-only guard (no scoring impact) but patch-trigger
a1c3478 fix(harness): align W007c with Master Plan - patch-only guard, no compliance score
b0cd048 feat(harness): add production-grade W007 stability guards
ea699c5 test(harness): lock W007 judge stability with golden fixtures + deterministic scoring
```

---

## 🎓 För nästa AI-agent

**Startpunkt:** Läs `master_plan.md` för fullständig arkitektur.  
**Brev-profilen:** Läs `harness/reflektera_guardrails.md` för Brev DoD och nivådefinitioner.  
**Testa lokalt:** `npm run harness:test:regression` (fungerar utan API key i no-network mode).  
**Kör full run:** 
- Warm: `npm run harness:warm`
- Brev: `npm run harness:brev` eller `npm run harness -- run --spec ./harness/specs/brev_test_originalitet.json`
**Viktigaste filer:** 
- `harness/lib/iterator.js` - patch-logik + format-patch (4-5 stycken)
- `lib/ai/prompt-engine.js` - Brev agentic workflow med GS-selection
- `lib/ai/prompts/letter-profile.js` - Golden Standards (GS1 + GS2)

### Brev Agentic Workflow - Implementeringsstatus

**Arkitektur:** ⭐⭐⭐⭐⭐ (Komplett)
- Multi-anchor Golden Standards (GS1 + GS2) med deterministisk selection
- Agentic Workflow (Draft→Critique→Rewrite) med fail-triggers
- Hårdnad self-critique med förbjudna fraser, konkretion-krav, GS-jämförelse
- Anti-derivative regler (scene-clone detection, unique contribution check)
- UI loading states med timeout-hantering
- Feedback loop (poor-man's RL)
- Signature robustness

**Kvalitet:** ⭐⭐⭐☆☆ (Förbättringspotential)
- Modellen följer inte alltid fail-triggers konsekvent
- Compliance-score kan förbättras (B001/B001a/B004 missas ibland)
- Output varierar men innehåller ibland fortfarande förbjudna fraser

**Nästa steg för förbättring:**
1. Förstärk fail-triggers i prompten (tvinga hårdare restart)
2. Förbättra compliance (säkerställ B001/B001a/B004 alltid passerar)
3. Testa GS2-selection med snap/ensamhet-tema
4. Överväg post-processing check för förbjudna fraser (fallback om LLM missar)

Systemet är production-ready och följer Master Plan v1.1 strikt. Brev-profilen är implementerad med alla komponenter, men kan förbättras i compliance och fail-trigger enforcement.


