# Run Summary

**Run ID:** 2025-12-18_190535
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:05:58.257Z

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
- **W005** (llm_judge, weight: 30): – Metaforen "jobbet blir som en snygg fasad med sprickor bakom whiteboarden" är konkret, visuellt och bär en tydlig insikt om dolda konflikter bakom en polerad yta, vilket skapar stark igenkänning.
- **W007** (llm_judge, weight: 30): Score: 92/100 (threshold: 85). Tydlig spegelton med igenkänning: konkreta vardagssituationer där läsaren känner igen sig utan att bli direkt utskälld; Humor och ironi ("Nej, inte du såklart", "Du 'vill bara undvika onödig dramatik'") som avväpnar istället för att döma; Stark självinkludering på slutet ("den som fortfarande övar...") som visar sårbarhet och minskar föreläsningskänslan
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skriver en syrlig rad i Slack och lägger till en smiley så att det "inte ska verka hårt"  
– Du suckar i korridoren och får med dig kollegan på en liten klagokör  
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
  - Location: after line 10 (end of list)
  - Lines changed: 3
