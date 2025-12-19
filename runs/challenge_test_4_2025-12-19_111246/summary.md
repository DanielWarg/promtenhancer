# Run Summary

**Run ID:** challenge_test_4_2025-12-19_111246
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:12:57.061Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan självbild och verklighet, vilket skapar en känsla av att bli sedd snarare än informerad. Den etablerar också en friktion genom att ifrågasätta påståendet om att vara rak och öppen.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "städa under mattan" och "växa som ogräs", som bär insikter om att undvika svåra samtal och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Passivt aggressiv blinkning i Slack
– Viskande samtal i korridoren
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 55/100 (threshold: 70). Inkluderande 'vi' men med en del pekande formuleringar. Avsändaren delar egen erfarenhet men har en pedagogisk ton.
