# Run Summary

**Run ID:** challenge_test_3_2025-12-19_122136
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:21:49.268Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan att påstå sig vara öppen och det faktiska undvikandet av feedback.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "stå i en folksamling och blunda" och "som en dålig låt du inte kan få ur huvudet", som bär insikter om att undvika konflikter och skapar igenkänning. Dessa metaforer förmedlar tydligt känslan av att undvika obekväma samtal och dess negativa konsekvenser.
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
- **W007** (llm_judge, weight: 30): Score: 40/100 (threshold: 70). Avsändaren pekar finger och dömer beteendet. Det finns en känsla av att avsändaren står utanför situationen.
