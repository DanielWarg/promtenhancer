# Run Summary

**Run ID:** challenge_test_3_2025-12-19_133457
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:35:08.837Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 90 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 82 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse och uppmanar till självreflektion, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad läsaren påstår och verkligheten, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om en "läckande kran" som bär en insikt om att ignorera problem kan leda till större konsekvenser, vilket skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Viska i korridoren om det som stör
– Skriva passivt aggressiva meddelanden i Slack
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Det är dags att
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Inkluderar läsaren i vissa delar, men har en övergripande kritisk ton. Avsändaren framstår som mer undervisande än delaktig.
