# Run Summary

**Run ID:** challenge_test_1_2025-12-19_133322
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:33:35.962Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de kanske inte är så öppna för feedback som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad som påstås och vad som faktiskt görs, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen om att hålla en het potatis är konkret och visuell, bär en insikt om att undvikande av svåra samtal kan leda till mer skada, och skapar igenkänning kring rädslan för konflikter.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Avsändaren delar egen erfarenhet och känslor. Inkluderande språk skapar en känsla av gemenskap.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
