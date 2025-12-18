# Run Summary

**Run ID:** 2025-12-18_195144
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:52:30.672Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Texten konfronterar läsaren med ett beteende de inte vill erkänna och avslöjar självbedrägeriet bakom ord som "smidigt" och "professionellt", med tydlig kontrast och friktion.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [88, 88, 88]) (threshold: 85). Tydlig självinkludering ('Jag har gjort det här själv', 'fortfarande övar'); Använder humor och ironi på ett avväpnande sätt; Direkt tilltal men utan hårt dömande, mer speglande än förebrående
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du nickar i mötet, men suckar i korridoren  
– Du skriver "absolut!" i Slack, men biter ihop framför skärmen  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W005** (llm_judge, weight: 30): – Texten är stark och konkret, men använder ingen tydlig, bärande metafor av typen "X är Y" som ger en ny visuell bild; formuleringar som "stänga av dig själv" är mer idiomatiska än insiktsbärande metaforer i den mening som efterfrågas.

## Iteration History

### v1
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007c, W005

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W005
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W005
- **Patch Applied:** metafor
