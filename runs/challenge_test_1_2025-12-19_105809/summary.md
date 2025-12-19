# Run Summary

**Run ID:** challenge_test_1_2025-12-19_105809
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:58:21.321Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning avslöjar en självklarhet som många läsare kan relatera till men kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Kontrasten mellan att säga sig vara öppen för feedback och det faktiska beteendet skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen om att "försöka blunda för en läckte kran" är konkret och visuell, bär insikten att undvikande av problem bara förvärrar situationen, och skapar igenkänning kring svåra samtal.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande språk med 'vi' och 'känner du igen dig?' Viss pedagogisk ton men ändå en del delad erfarenhet.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
