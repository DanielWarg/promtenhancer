# Run Summary

**Run ID:** challenge_test_3_2025-12-19_105832
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:58:44.243Z

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
- **W001** (llm_judge, weight: 40): . Textens öppning konfronterar läsaren med en insikt om deras beteende som de kanske inte vill erkänna, vilket skapar en känsla av att bli sedd snarare än informerad. Det finns en tydlig kontrast mellan vad läsaren säger och vad de faktiskt gör, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Metaforen "att sätta en filt över en brinnande fackla" är konkret och visuell, bär en insikt om att undvikande inte löser problem och skapar igenkänning kring konflikthantering.
- **W002** (regex, weight: 20): Found: "korridor"
- **W003** (regex, weight: 20): Found: "– undvika ögonkontakt när någon tar upp en jobbig fråga
 – smyga förbi någon i korridoren för att slippa en konfrontation
 –"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W007** (llm_judge, weight: 30): Score: 30/100 (threshold: 70). Avsändaren pekar finger och dömer beteenden. Tonen känns distanserad och föreläsande.
