# Run Summary

**Run ID:** challenge_test_1_2025-12-19_133702
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:37:15.925Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en självbedräglig attityd hos läsaren genom att påpeka att de säger sig vara öppna för diskussioner, men i praktiken undviker svåra samtal. Det skapas en kontrast mellan vad som sägs och vad som faktiskt görs, vilket gör att läsaren känner sig sedd.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "obekväm tickande bomb" och "dölja en läckande kran med en mopp", som bär insikter om konflikträdsla och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– "Vi tar det senare."
– "Det är inte så viktigt."
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 50/100 (threshold: 70). Blandad ton, inkluderande men också något dömande. Avsändaren ställer frågor men pekar också på beteenden.
