# Run Summary

**Run ID:** challenge_test_1_2025-12-19_105911
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:59:20.817Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om att de kanske inte är så öppna för feedback som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan påståendet om öppenhet och de faktiska beteendena som avslöjar motsatsen.
- **W005** (llm_judge, weight: 30): . Metaforen om den "gamla, trasiga bilen" med ny lack är konkret och visuell, bär en insikt om att ytliga förbättringar inte döljer underliggande problem, och skapar igenkänning kring hur vi hanterar svåra samtal.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 50/100 (threshold: 70). Blandad ton, inkluderande men också dömande. Avsändaren delar insikter men står delvis utanför situationen.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
