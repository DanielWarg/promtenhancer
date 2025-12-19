# Run Summary

**Run ID:** challenge_test_1_2025-12-19_131646
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:16:56.842Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 79 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de kanske inte är så öppna för feedback som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad som sägs och vad som faktiskt görs, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "belöna en gammal, trasig bil med ny lack" och "gå på äggskal", som bär insikter om att undvika svåra samtal och dess konsekvenser. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Inkluderande språk med 'vi' och 'jag har också varit där'. Skapar igenkänning utan att döma direkt.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
