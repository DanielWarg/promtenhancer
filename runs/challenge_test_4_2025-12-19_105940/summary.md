# Run Summary

**Run ID:** challenge_test_4_2025-12-19_105940
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:59:50.423Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 76 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan självbild och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan påståendet om att vara öppen och den faktiska beteendet att undvika svåra samtal.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att bygga en mur av obehag, vilket bär en insikt om att ytan kan dölja djupare problem. Metaforen skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Inkluderande inslag men starkt dömande ton. Avsändaren står delvis utanför och pekar finger.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
