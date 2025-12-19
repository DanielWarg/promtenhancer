# Run Summary

**Run ID:** challenge_test_2_2025-12-19_133445
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:34:57.462Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras självbild och beteende, vilket skapar en känsla av att de blir sedda snarare än informerade. Det finns en tydlig friktion mellan påståendet om ärlighet och det faktiska beteendet.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "sätta en plåster på en sårig relation" och "låser in dem i ett mörkt rum", som bär insikter om hur konflikter hanteras. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren inkluderar sig själv med egen erfarenhet. Tonen är konfrontativ men ändå inkluderande.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
