# Run Summary

**Run ID:** challenge_test_5_2025-12-19_122051
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:21:01.931Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 79 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en kontrast mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "spela teater" och "ruttnar under ytan", som bär insikter om bristen på äkthet och konfrontation i kommunikationen. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– "Vi tar det sen."
 – "Det ordnar sig nog."
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack contrast/negation
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och pekar finger. Tonen är dömande och kritisk utan inkludering.
