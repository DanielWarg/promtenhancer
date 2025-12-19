# Run Summary

**Run ID:** 2025-12-18_191840
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:19:07.682Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsarens självbild direkt, avslöjar ett självbedrägeri och använder kontrast/negation som skapar friktion.
- **W005** (llm_judge, weight: 30): – Metaforen "försöka laga en vattenläcka med post-it-lappar" är konkret, visuellt och bär en tydlig insikt om hur kosmetiska åtgärder inte löser grundproblemet, vilket skapar stark igenkänning.
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegel-ironi: läsaren känner igen sig i konkreta, vardagliga exempel utan att bli direkt utskälld; Humor och lek med formuleringar ("Nej. Nej nej. Exakt.", post-it-metaforen) avväpnar och gör tonen varm trots konfrontation; Stark självinkludering ("vi", signatur med egen svaghet: "den som fortfarande övar...") minskar pekpinnar och ökar igenkänning
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skriver en syrlig rad i Slack istället för att ta ett samtal  
– Du skakar på huvudet vid skrivbordet men säger "det är lugnt" i mötet  
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
