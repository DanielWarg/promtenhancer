# Run Summary

**Run ID:** 2025-12-18_191614
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:16:38.481Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): – Texten konfronterar direkt läsaren med ett självbedrägeri genom negation och kontrast, och avslöjar ett beteende läsaren sannolikt inte vill erkänna.
- **W005** (llm_judge, weight: 30): – Metaforen "Konflikträdsla är som att gå runt med grus i skon men bara byta strumpor" är konkret, visuellt och bär en tydlig insikt om att man hanterar symtom istället för orsaken, på ett sätt som skapar stark igenkänning.
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegel-ironi riktad mot läsarens självbild utan hårt dömande ('Nej, inte du förstås'); Stark igenkänning via konkreta vardagssituationer som läsaren kan se sig själv i; Självinkludering och sårbarhet i slutet ('den som fortfarande övar...') som avväpnar predikotonen
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du biter ihop på mötet och släpper ut allt i korridoren efteråt  
– Du skriver en syrlig rad i Slack istället för att lyfta luren  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W004

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** rytm
  - Location: after line 14 (end of list)
  - Lines changed: 3
  - Placement: Inserted rhythm block after list line 14 (list ended at line 14, inserted at 15)
