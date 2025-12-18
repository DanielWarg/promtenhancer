# Run Summary

**Run ID:** 2025-12-18_191948
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:20:01.659Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsarens självbild direkt, avslöjar ett självbedrägeri och använder kontraster/negationer som skapar friktion.
- **W005** (llm_judge, weight: 30): – Metaforen med att stå och svära över disken utan att röra tallriken är konkret, visuellt och bär en tydlig insikt om undvikande beteende som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 85). Tydlig humor och ironi ("Nej nej. Inte du.", "Du 'är ju bara mån om stämningen'") som speglar utan att skambelägga; Stark igenkänning genom konkreta vardagssituationer (Slack, korridoren, koordineringsmöte) istället för abstrakta pekpinnar; Avsändaren inkluderar sig själv tydligt ("den som fortfarande övar"), vilket skapar värme och minskar föreläsar-tonen
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skriver en syrlig rad i Slack istället för att ta ett samtal  
– Du skakar på huvudet vid skrivbordet men säger "det är lugnt" i mötet  
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)
