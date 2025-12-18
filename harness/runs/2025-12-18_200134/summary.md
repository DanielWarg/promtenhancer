# Run Summary

**Run ID:** 2025-12-18_200134
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T19:02:10.916Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 65 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 67 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende som motsäger deras självbild och använder direkt tilltal och kontrast ("vill ha raka besked" vs "gör allt för att slippa") som skapar friktion och igenkänning.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [82, 88, 88]) (threshold: 85). Tydlig självinkludering och vi-känsla ("Jag har gjort det här själv", självdistans i signaturen); Speglande frågor som bjuder in till reflektion snarare än dömer; Viss konfrontativ skärpa men inramad med värme och humor
- **W002** (regex, weight: 20): Found: "möte"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W005** (llm_judge, weight: 30): – Texten är träffsäker och konkret, men innehåller ingen tydlig, bärande metafor som visualiserar en insikt på ett nytt sätt. Alla formuleringar är i princip bokstavliga snarare än bildliga.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 65
- Quality: 40
- Total: 55
- Failed: W005, W007, W003, W004

### v2
- Compliance: 65
- Quality: 70
- Total: 67
- Failed: W005, W003, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 65
- Quality: 70
- Total: 67
- Failed: W005, W003, W004
- **Patch Applied:** lista
