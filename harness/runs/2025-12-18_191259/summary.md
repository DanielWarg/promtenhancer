# Run Summary

**Run ID:** 2025-12-18_191259
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:13:21.457Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett självbedrägeri genom direkt tilltal och tydlig negation, vilket skapar friktion. Läsaren känner sig sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): – Metaforen "konflikträdsla med kostym på" är konkret, visuellt och bär en tydlig insikt om hur rädsla maskeras som professionalism, och "det där korta, obekväma samtalet innan det blivit en lång, tyst mur" förstärker igenkänningen och stannar kvar.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 85). Tydlig spegel-ironi: läsaren känner igen sig i exemplen och de korta 'Nej. Nej nej. Exakt.' utan att bli direkt utskälld; Humor och värme genom formuleringar som 'konflikträdsla med kostym på' och 'Nej, inte du såklart' som leker med läsarens försvar; Självinkludering i slutet ('den som fortfarande övar på...') som visar sårbarhet och minskar föreläsar-tonen
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du skriver en syrlig rad i Slack istället för att lyfta det i standupen  
– Du suckar till kollegan i korridoren men säger inget till personen det gäller  
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
