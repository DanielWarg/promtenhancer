# Run Summary

**Run ID:** challenge_test_4_2025-12-19_110942
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:09:51.404Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och deras beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Den framhäver en kontrast som skapar friktion och uppmanar till självreflektion.
- **W005** (llm_judge, weight: 30): . Metaforen "att försöka lösa en läcka med tejp" är konkret och visuell, bär en insikt om att ytliga lösningar inte fungerar och skapar igenkänning kring att undvika svåra samtal.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 55/100 (threshold: 70). Inkluderande 'vi' används, men tonen är något överpedagogisk. Avsändaren delar egen erfarenhet men pekar också på andras beteenden.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
