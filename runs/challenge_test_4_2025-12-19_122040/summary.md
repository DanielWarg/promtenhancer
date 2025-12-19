# Run Summary

**Run ID:** challenge_test_4_2025-12-19_122040
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T11:20:51.897Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): . Texten innehåller en konkret och visuell metafor om att ha en spegel framför sig, vilket ger insikt om självbedrägeri och skapar igenkänning kring att undvika svåra samtal. Metaforen bär en djupare betydelse och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du pratar om transparens, men står stilla när det brinner.  
– Du vill bygga relationer, men skapar bara avstånd.  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren pekar finger och dömer läsaren. Tonen är övergripande och kritisk, utan inkludering.
