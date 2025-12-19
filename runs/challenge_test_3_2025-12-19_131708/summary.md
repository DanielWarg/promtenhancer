# Run Summary

**Run ID:** challenge_test_3_2025-12-19_131708
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T12:17:19.656Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en motsägelse mellan deras självbild och verkligheten, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig friktion mellan det som påstås och det som faktiskt görs.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "tidsinställd konfliktbomb" och "rensa bort skräpet i ett rum", som bär insikter om konflikthantering och kommunikation. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– Du låter frustrationen växa
 – Du låter missförstånd blomma
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren står utanför och dömer. Tonen pekar finger och skapar skuldbeläggning.
