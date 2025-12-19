# Run Summary

**Run ID:** 2025-12-18_195040
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:51:17.396Z

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

### ✅ Passed (11)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett självbedrägeri genom direkt tilltal, tydlig negation och friktion mellan självbild och verklighet.
- **W005** (llm_judge, weight: 30): – Metaforen med "små grus i skon" är konkret, lätt att visualisera och bär en tydlig insikt om lågintensivt men ihållande obehag som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [88, 88, 88]) (threshold: 85). Tydlig självinkludering och vi-känsla ("Jag har gjort det här själv", delar egna brister); Använder humor och självdistans ("Ninja-psykolog", skämt om DM vs möte); Speglande frågor som bjuder in till reflektion istället för att döma
- **W002** (regex, weight: 20): Found: "Slack"
- **W003** (regex, weight: 20): Found: "– Du skriver en lite för vass kommentar i Slack istället för att ta ett samtal  
– Du suckar till kollegan i korridoren men säger inget i mötet  
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007c, W007

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
