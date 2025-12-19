# Run Summary

**Run ID:** challenge_test_2_2025-12-19_110922
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:09:32.564Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | INCOMPLETE | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om att de kanske inte är så öppna som de tror, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan självbild och verklighet som skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen om att stå vid kanten av en bassäng och aldrig dyka i är konkret och visuell, bär insikten om rädslan för att konfrontera konflikter, och skapar igenkänning i situationer där man undviker svåra samtal.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Man viskar i korridoren istället för att ta det i mötet.
– Passivt aggressiva meddelanden i Slack blir vår nya kommunikation.
– Vi säger “vi tar det sen” –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande 'vi' och personlig erfarenhet, men tonen är något pedagogisk. Det finns inslag av fingerpekning och uppmaningar som kan kännas dömande.
