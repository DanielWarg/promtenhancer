# Run Summary

**Run ID:** 2025-12-18_200102
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T19:01:34.688Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 79 | - | - |

## Check Results

### ✅ Passed (9)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren direkt med ett självbedrägeri och använder tydlig kontrast/negation som skapar friktion och känslan av att bli sedd snarare än informerad.
- **W005** (llm_judge, weight: 30): – Metaforen med läckan i taket och handdukarna är konkret, visuellt tydlig och bär en tydlig insikt om undvikandebeteende som ersätter verklig problemlösning, vilket skapar stark igenkänning.
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– du skriver en syrlig kommentar i Slack i stället för att ta ett samtal  
– du suckar i korridoren efter mötet där du log och sa “bra diskussion”  
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W007** (llm_judge, weight: 30): Score: 78/100 (threshold: 85). Tydlig självinkludering och vi-känsla mot slutet; Humor och självdistans (t.ex. om egna DM); Inledningen är konfronterande och lätt dömande i tonen
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W007, W004

### v2
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 85
- Quality: 70
- Total: 79
- Failed: W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
