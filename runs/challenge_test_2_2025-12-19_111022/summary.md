# Run Summary

**Run ID:** challenge_test_2_2025-12-19_111022
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:10:36.022Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast som skapar friktion och uppmanar till reflektion.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att "försöka stänga in en storm i ett litet rum", vilket bär en insikt om att undvikande av konflikter är ohållbart. Metaforen skapar igenkänning och stannar kvar genom att relatera till känslor av frustration och lättnad.
- **W002** (regex, weight: 20): Found: "Korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande 'vi' i vissa delar, men har också en överpedagogisk ton. Avsändaren delar egen erfarenhet, vilket skapar en viss igenkänning.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
