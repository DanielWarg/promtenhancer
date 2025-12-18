# Run Summary

**Run ID:** 2025-12-18_195117
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:51:43.922Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende de inte vill erkänna och skapar friktion mellan vad de säger och vad de faktiskt känner. Direkt tilltal och tydlig kontrast gör att läsaren känner sig sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): – Metaforen "det brinner inuti" är konkret, visuell och fångar igenkännbart inre känslokaos bakom en lugn fasad, och "dina axlar skriker protest" ger en tydlig kroppslig bild av undertryckt motstånd som bär en psykologisk insikt.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [88, 88, 88]) (threshold: 85). Tydlig självinkludering och vi-känsla ("Jag har gjort det här själv", "fortfarande övar"); Varm, speglande ton med humor och självdistans; Ställer öppna reflektionsfrågor istället för att döma
- **W002** (regex, weight: 20): Found: "möte"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 65
- Quality: 70
- Total: 67
- Failed: W007, W003, W004

### v2
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W003, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W003, W004
- **Patch Applied:** lista
