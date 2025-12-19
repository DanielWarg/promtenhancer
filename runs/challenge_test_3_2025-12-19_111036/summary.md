# Run Summary

**Run ID:** challenge_test_3_2025-12-19_111036
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:10:44.963Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 70 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 70 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras påstående och beteende, vilket skapar friktion och får dem att känna sig sedda.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, såsom "smyger förbi problemet som en katt på jakt" och "låt frustrationer växa som ogräs". Dessa metaforer bär insikter om konflikträdsla och skapar igenkänning genom att beskriva en vanlig mänsklig upplevelse.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 35/100 (threshold: 70). Tonen är dömande och pekar finger mot avsändaren. Inkluderar inte avsändarens egna erfarenheter eller känslor.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
