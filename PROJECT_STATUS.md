# Reflektera Text Harness v1.1 - Projektstatus

**Senast uppdaterad:** 2025-12-18  
**Version:** 1.1.0  
**Status:** ✅ Production-ready med full test coverage

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
- `harness/lib/generator.js` - Textgenerering med strict rules för warm_provocation
- `harness/lib/evaluator.js` - Dual scoring + scope extraction
- `harness/lib/iterator.js` - Local patch iteration med budgets
- `harness/lib/checks/llm-judge.js` - LLM judge med median guard för W007
- `harness/lib/checks/heuristic-checks.js` - Heuristic checks (inkl. W007b, W007c)

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
1. **Brev Profile**: Fullständig implementation av brev-profilen
2. **Quota Monitoring**: Utöka budget-guard med faktisk quota-check (API-anrop)
3. **Compare Command**: Implementera `compare` command i runner.js

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

---

## 📝 Commit-historik (senaste)

```
f10c8cb feat(harness): add budget guard and no-network mode for API budget protection
37e5ee1 fix(harness): make W007c patch-only guard (no scoring impact) but patch-trigger
a1c3478 fix(harness): align W007c with Master Plan - patch-only guard, no compliance score
b0cd048 feat(harness): add production-grade W007 stability guards
ea699c5 test(harness): lock W007 judge stability with golden fixtures + deterministic scoring
```

---

## 🎓 För nästa AI-agent

**Startpunkt:** Läs `master_plan.md` för fullständig arkitektur.  
**Testa lokalt:** `npm run harness:test:regression` (fungerar utan API key i no-network mode).  
**Kör full run:** `npm run harness -- run --spec ./harness/specs/warm_provocation_konflikter.json` (kräver OPENAI_API_KEY).  
**Viktigaste filen:** `harness/lib/iterator.js` - här är patch-logiken.

Systemet är production-ready och följer Master Plan v1.1 strikt. Alla principer (dual scoring, patch budgets, no box-ticking) är implementerade och testade.


