# Run Summary

**Run ID:** challenge_test_5_2025-12-19_133407
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:34:18.854Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 75 | 95 | ❌ NOT MET |
| Quality | 40 | 85 | ❌ NOT MET |
| Total | 61 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Öppningen avslöjar en självbedräglig uppfattning om konflikthantering och konfronterar läsaren med en obekväm sanning om deras beteende, vilket skapar en känsla av att bli sedd. Det finns en tydlig kontrast mellan självbild och verklighet som skapar friktion.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen…" 
– "Det är inte så viktigt…" 
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W005** (llm_judge, weight: 30): . Texten innehåller inga konkreta och visuella metaforer som bär insikt; den beskriver istället en situation utan att använda bildspråk som skapar igenkänning eller stannar kvar.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Avsändaren pekar finger och dömer läsaren. Det finns en distans mellan avsändaren och läsaren.
