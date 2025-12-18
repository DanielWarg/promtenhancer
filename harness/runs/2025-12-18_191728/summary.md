# Run Summary

**Run ID:** 2025-12-18_191728
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:17:48.395Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsarens självbild direkt ("Du tror... Det är du visst") och avslöjar ett självbedrägeri med tydlig friktion och kontrast mellan teori och praktik.
- **W005** (llm_judge, weight: 30): – Metaforen "Det är som att stå bredvid en brand och bara öppna fönstret" är konkret, visuellt och bär en tydlig insikt om passiv konflikthantering som känns igen och fastnar.
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig humor och ironi som speglar läsaren utan att skambelägga; Stark igenkänning genom konkreta vardagssituationer och formuleringar som 'Du vet exakt vem jag menar. Nej, inte du förstås.'; Avsändaren inkluderar sig själv ('den som fortfarande övar...'), vilket skapar värme och minskar predikotonen
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skriver en syrlig rad i Slack istället för att lyfta det i mötet  
– Du suckar i korridoren och "ventilerar" med kollegan som ändå håller med dig  
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
  - Location: after line 11 (end of list)
  - Lines changed: 3
  - Placement: Inserted rhythm block after list line 11 (list ended at line 11, inserted at 12)
