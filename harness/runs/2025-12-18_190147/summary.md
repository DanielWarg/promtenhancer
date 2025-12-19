# Run Summary

**Run ID:** 2025-12-18_190147
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:02:05.053Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 91 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett självbedrägeri genom direkt tilltal och tydlig negation, vilket skapar friktion. Läsaren känner sig avslöjad snarare än informerad.
- **W005** (llm_judge, weight: 30): – Metaforen med att stå och svära över disken men vägra gå in i vardagsrummet är konkret, visuellt och bär en tydlig insikt om undvikandebeteende som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 85). Tydlig spegelton med igenkänning genom konkreta vardagssituationer (möten, Slack, inre monolog); Humor och ironisk självdistans ("Nej, inte du såklart", "Du 'vill ju bara ha arbetsro'"), utan att kännas dömande; Stark självinkludering i slutet ("den som fortfarande övar"), vilket avväpnar predikotonen och skapar värme och gemenskap
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du biter ihop på mötet och släpper ut ångan i korridoren efteråt  
– Du skriver neutralt i Slack men alla hör syrligheten mellan raderna  
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W004

### v2
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W004
- **Patch Applied:** rytm
