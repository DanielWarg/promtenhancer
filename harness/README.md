# Reflektera Text Harness v1.1 - Release Kvitto

Detta dokument verifierar att harness v1.1 fungerar korrekt enligt Master Plan.

## Snabbverifiering (2 minuter)

Kör dessa tre kommandon i ordning och verifiera output:

### 1. Offline Sanity Test (CI-likhet)

```bash
NO_NETWORK=1 npm run harness:test:regression
```

**Förväntat output:**
- ✅ Alla 3 tester passerar
- Quality status: `SKIPPED`
- Run status: `OFFLINE_INCOMPLETE` eller `PARTIAL_OFFLINE_SUCCESS`
- `quality_score: null` i results_v*.json
- `quality_status: "SKIPPED"` i results_v*.json
- `total_score_formula: "compliance_only (quality skipped)"`

**Exit code:** 0 (success)

---

### 2. E2E med LLM - Brev-profil

**Förutsättning:** `OPENAI_API_KEY` måste vara satt i miljön

```bash
npm run harness:brev
```

**Förväntat output:**
- Iterator tar dig till `compliance >= 95` och `quality >= 85` inom max 3 iterationer
- Run-mappen (`harness/runs/YYYY-MM-DD_HHMMSS/`) innehåller:
  - ✅ `post_spec.json`
  - ✅ `internal_prompt_v1.txt` (och v2/v3 om iterate)
  - ✅ `output_v1.txt` (och v2/v3)
  - ✅ `results_v1.json` (och v2/v3) med dual scores
  - ✅ `summary.md` med iteration history
  - ✅ `diff.md` med patch-detaljer

**Exit code:** 0 (success)

---

### 3. E2E med LLM - Warm Provocation-profil

**Förutsättning:** `OPENAI_API_KEY` måste vara satt i miljön

```bash
npm run harness:warm
```

**Förväntat output:**
- Samma som Brev-profil ovan
- Plus: W007 (Inte moralpredikan), W001 (Avslöjande hook), W005 (Metafor) är stabila mellan iterationer
- Quality score når >= 85 utan att compliance påverkas negativt

**Exit code:** 0 (success)

---

## Klardefinition (Master Plan)

Alla följande krav är uppfyllda:

- [x] Alla filer skapade enligt filstruktur
- [x] `acceptance_checks.json` har alla checks med rätt weights och scopes (inkl W007b)
- [x] Dual scoring fungerar (compliance + quality)
- [x] G001 Jaccard clone detector fungerar (threshold 0.85, min 35 tecken)
- [x] W007b heuristic check fungerar (identifierar imperativ före LLM-judge)
- [x] Iterator gör lokala patchar (diff visar små ändringar)
- [x] De-moralisera patch skyddar lista-struktur (W003) och lägger till självinvolvering
- [x] Format-patch ändrar aldrig ord (word_diff == 0 enforcement)
- [x] CLI fungerar med alla kommandon (generate, eval, iterate, run, compare)
- [x] `npm run harness:brev` och `npm run harness:warm` kör framgångsrikt
- [x] `runs/` skapas med alla loggfiler (post_spec, internal_prompt, output, results, summary, diff)
- [x] **NYTT:** Offline mode fungerar utan LLM (NO_NETWORK=1)
- [x] **NYTT:** Quality score är null (inte sträng) när LLM är avstängt
- [x] **NYTT:** Explicit patch-klassning (LLM_REQUIRED_PATCHES vs DETERMINISTIC_PATCHES)
- [x] **NYTT:** CI-stabil regression testing utan API-nyckel

---

## Version

**v1.1.0** - Production-safe offline mode med explicit SKIPPED-hantering

---

## Ytterligare information

Se `master_plan.md` för fullständig specifikation och arkitektur.

