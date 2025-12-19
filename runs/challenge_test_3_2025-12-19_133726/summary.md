# Run Summary

**Run ID:** challenge_test_3_2025-12-19_133726
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:37:42.536Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 91 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras påstående och verklighet, vilket skapar friktion och får dem att känna sig sedda snarare än informerade.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "sätta på en mask" och "ogräsplanta i en vacker trädgård", som bär insikter om att undvika konflikter och hur det förvärrar situationen. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 70/100 (threshold: 70). Inkluderande 'jag' och delad erfarenhet. Frågor som engagerar läsaren, men något pedagogisk ton.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren om din kollega
– trycker ner frustrationen i Slack-meddelanden
–"
- **W004** (regex, weight: 15): Found: "
Nej."

### ❌ Failed (1)
- **W006** (regex, weight: 15): Pattern not found: (\/[A-ZÅÄÖ]|\n\/)
