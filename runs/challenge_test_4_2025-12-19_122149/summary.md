# Run Summary

**Run ID:** challenge_test_4_2025-12-19_122149
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:22:00.815Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en självklarhet de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan självbild och verklighet som skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att vara en dykare som simmar i grundvattnet, vilket bär en insikt om att undvika svåra samtal inte är äkta mod. Metaforen skapar igenkänning och stannar kvar genom att relatera till läsarens egna erfarenheter av konflikter.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren delar egen erfarenhet, vilket skapar igenkänning. Inkluderande frågor och reflektioner, men något pedagogisk ton.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
