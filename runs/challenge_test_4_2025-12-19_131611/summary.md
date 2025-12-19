# Run Summary

**Run ID:** challenge_test_4_2025-12-19_131611
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:16:23.411Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 76 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en motsägelse mellan deras självbild och deras beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan påståendet om att vara öppen och det faktiska undvikandet av svåra samtal.
- **W005** (llm_judge, weight: 30): . Metaforen "kvadratisk relation i en cirkulär värld" är konkret och visuell, bär insikt om bristen på tydlighet i relationer, och skapar igenkänning hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 55/100 (threshold: 70). Inkluderande språk med 'vi' men något pedagogisk ton. Visar förståelse för känslor men har inslag av dömande.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
