# Run Summary

**Run ID:** challenge_test_3_2025-12-19_111336
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:13:47.650Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan påståendet om öppenhet och den faktiska beteendet, vilket gör texten engagerande.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "att hantera konflikter är som att gå på en lina" och "en osynlig mur av frustration", som bär insikter om att konfrontation är nödvändig för att undvika negativa konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– skriva passivt aggressiva meddelanden i Slack
– viska i korridoren istället för att ta debatten
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Fingerpekande ton, avsändaren står utanför. Skuldbeläggande och dömande språk.
