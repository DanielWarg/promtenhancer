# Run Summary

**Run ID:** challenge_test_1_2025-12-19_111109
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T10:11:21.740Z

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
- **W001** (llm_judge, weight: 40): . Öppningen konfronterar läsaren med en insikt om deras beteende, vilket skapar en känsla av att de blir sedda snarare än bara informerade. Det finns en tydlig kontrast mellan vad de säger och vad de faktiskt gör, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen om att "bära på en tung ryggsäck av osäkerhet" är konkret och visuell, bär insikt om hur osäkerhet påverkar kommunikation och skapar igenkänning. Jämförelsen mellan en lapp i fikarummet och en öppen dialog förstärker vikten av direkt kommunikation.
- **W002** (regex, weight: 20): Found: "korridor"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "/T"

### ❌ Failed (4)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 65/100 (threshold: 70). Inkluderande 'vi' och reflektioner om gemensamma beteenden. Tonen är något pedagogisk men ändå med en känsla av delaktighet.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
