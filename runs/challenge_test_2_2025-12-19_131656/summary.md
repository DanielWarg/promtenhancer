# Run Summary

**Run ID:** challenge_test_2_2025-12-19_131656
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:17:08.568Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en självklarhet de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Den negativa kontrasten mellan självbild och verklighet skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen "det är som att säga att man älskar att simma, men bara i en plaskdamm" är konkret och visuell, bär en insikt om att undvika verkliga utmaningar, och skapar igenkänning kring rädslan för att konfrontera konflikter. Dessutom förstärker metaforen temat i texten och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– viskar i korridoren istället för att ta direktkontakt  
– skickar passivt aggressiva meddelanden i Slack  
– skjuter upp viktiga diskussioner med "vi tar det sen" –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 45/100 (threshold: 70). Avsändaren pekar finger och ställer frågor som dömer. Tonen känns mer som en uppmaning än en inkluderande reflektion.
