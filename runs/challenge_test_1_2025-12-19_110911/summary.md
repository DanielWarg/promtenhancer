# Run Summary

**Run ID:** challenge_test_1_2025-12-19_110911
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:09:22.335Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om deras beteende, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad folk säger och vad de faktiskt gör, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "bär på en tung ryggsäck av osäkerhet" och "lösa ett problem med en lapp i kylskåpet", som ger insikter om hur vi hanterar svåra samtal och konflikter. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande språk med 'vi' och 'oss', men tonen är något pedagogisk. Avsändaren delar insikter men kan uppfattas som överlägsen ibland.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
