# Run Summary

**Run ID:** challenge_test_3_2025-12-19_122247
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:22:58.058Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan vad som sägs och vad som görs, vilket uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "som en dålig låt du inte kan få ur ditt huvud" och "om du inte rensar bort ogräset, kväver det blommorna", som bär insikter om att undvika konflikter och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– skriva passivt aggressiva meddelanden i Slack
– viska i korridoren men hålla tyst i mötet
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och pekar finger. Tonen är dömande och kritisk mot läsarens beteende.
