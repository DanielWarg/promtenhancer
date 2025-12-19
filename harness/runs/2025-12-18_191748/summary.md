# Run Summary

**Run ID:** 2025-12-18_191748
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:18:07.881Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 55 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 61 | - | - |

## Check Results

### ✅ Passed (6)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende de ogärna erkänner och använder direkt tilltal med tydlig kontrast mellan önskan (raka besked) och handling (gör allt för att slippa säga dem).
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegel-ironi: läsaren känner igen sig i konkreta situationer utan att bli direkt utskälld; Humor och vändningar som "Inte dig förstås" och "Du 'vill bara ha en god stämning'" skapar varm, träffsäker igenkänning snarare än moralism; Avsändaren visar egen sårbarhet i slutet ("den som fortfarande övar...") vilket balanserar det direkta tilltalet och minskar predikotonen
- **W002** (regex, weight: 20): Found: "möte"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W007b** (heuristic, weight: 10): Hittade 1 fingerpekning: "du borde"
- **W005** (llm_judge, weight: 30): – Texten är träffsäker och konkret i sina exempel, men innehåller ingen tydlig, bärande metafor som i sig ger en ny insikt utöver det bokstavliga innehållet.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 55
- Quality: 70
- Total: 61
- Failed: W007b, W005, W003, W004

### v2
- Compliance: 55
- Quality: 70
- Total: 61
- Failed: W007b, W005, W003, W004
- **Patch Applied:** lista
