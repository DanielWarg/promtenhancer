# Run Summary

**Run ID:** challenge_test_1_2025-12-19_133552
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:36:06.851Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 73 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar att läsaren kanske inte är så öppen för feedback som de vill tro, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en kontrast mellan påståendet om öppenhet och de undvikande fraserna som används.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att lägga ett lakan över skräp, vilket bär en insikt om att konflikter inte försvinner bara för att de ignoreras. Metaforen skapar igenkänning och stannar kvar genom att koppla till en vanlig upplevelse på arbetsplatsen.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen"…
– "Det är kanske inte så viktigt"…
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 50/100 (threshold: 70). Blandad ton, ibland inkluderande men också dömande. Avsändaren ställer frågor som kan kännas konfrontativa.
