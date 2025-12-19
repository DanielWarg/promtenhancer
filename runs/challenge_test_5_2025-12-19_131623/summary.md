# Run Summary

**Run ID:** challenge_test_5_2025-12-19_131623
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:16:33.506Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om att det finns en skillnad mellan hur konflikthantering uppfattas och hur den faktiskt praktiseras, vilket skapar en känsla av att läsaren blir sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "konflikterna gro" och "de ruttnar i stället för att spridas ut på bordet", som bär insikter om hur konflikter hanteras. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen." 
 – "Det är inte så viktigt." 
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 35/100 (threshold: 70). Avsändaren pekar ut beteenden hos andra utan att inkludera sig själv. Tonen känns dömande och kritisk, vilket skapar en känsla av överlägsenhet.
