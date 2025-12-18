# Run Summary

**Run ID:** 2025-12-18_190916
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:09:50.814Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 90 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 94 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett självbedrägeri genom direkt tilltal och tydlig negation, vilket skapar friktion. Läsaren känner sig sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): – Metaforen med “små grus i skon” är konkret, visuellt och bär en tydlig insikt om hur små, olösta konflikter snedvrider vardagen, på ett sätt som känns igen och fastnar.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 85). Tydlig spegelton med igenkänning genom konkreta vardagssituationer (Slack, suck i korridoren, skjuta upp samtal); Humor och ironi används varmt ("Nej, inte du förstås", "onödigt drama") utan att skuldbelägga läsaren; Stark självinkludering och sårbarhet ("Jag har gjort det här själv", "den som fortfarande övar...") som minskar predikande känsla
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– du skriver en syrlig kommentar i Slack istället för att lyfta luren  
– du suckar i korridoren men sitter tyst i mötet  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007b** (heuristic, weight: 10): Hittade 1 fingerpekning: "du ska"

## Iteration History

### v1
- Compliance: 75
- Quality: 100
- Total: 85
- Failed: W007b, W004

### v2
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b
- **Patch Applied:** rytm
  - Location: after line 10 (end of list)
  - Lines changed: 3
  - Placement: Inserted rhythm block after list line 10 (list ended at line 10, inserted at 11)

### v3
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
