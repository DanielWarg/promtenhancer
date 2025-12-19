# Run Summary

**Run ID:** challenge_test_4_2025-12-19_133630
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:36:41.912Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Den framhäver också en kontrast mellan det uttalade och det faktiska beteendet, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer som "en bil utan bensin" och "konflikter är inte fiender, de är möjligheter", vilka bär insikter och skapar igenkänning kring vikten av att konfrontera konflikter. Dessa metaforer stannar kvar och uppmanar till reflektion och förändring.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar vi i korridoren istället för att ta samtalet
 – skickar passivt aggressiv feedback i Slack
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): Found 1 imperative(s): Det är dags att
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och pekar finger. Det finns ingen självinvolvering eller inkluderande språk.
