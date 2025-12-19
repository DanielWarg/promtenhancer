# Run Summary

**Run ID:** challenge_test_1_2025-12-19_111210
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:12:24.238Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 55 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 61 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de kanske inte är så öppna för feedback som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan påståendet om öppenhet och det faktiska beteendet som beskrivs.
- **W005** (llm_judge, weight: 30): . Metaforen om att "laga mat utan att sätta på spisen" är konkret och visuell, bär insikten att utan handling förblir samtalen kalla och obekväma. Den skapar igenkänning och stannar kvar genom att koppla samman matlagning med kommunikation.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Tonen är dömande och pekar ut beteenden som negativa. Avsändaren står utanför och ger intryck av att föreläsa snarare än att inkludera.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
