# Run Summary

**Run ID:** challenge_test_5_2025-12-19_111257
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:13:06.686Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 70 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 70 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en kontrast mellan självbild och verklighet, vilket skapar friktion och får läsaren att känna sig sedd. Det direkt tilltalande språket uppmanar till reflektion över beteenden som ofta förnekas.
- **W005** (llm_judge, weight: 30): . Texten innehåller metaforen "det här är inte samarbete. Det är rollspel", som är konkret och visuell, bär insikt om undvikande beteende och skapar igenkänning kring problematiken i arbetsmiljön.
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 25/100 (threshold: 70). Avsändaren pekar finger och dömer kollegor. Tonen är distanserad och kritisk, vilket skapar en känsla av överlägsenhet.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
