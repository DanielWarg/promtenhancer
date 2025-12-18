# Run Summary

**Run ID:** 2025-12-18_202852
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T19:28:56.281Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 0 | 85 | ❌ NOT MET |
| Total | 60 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du biter ihop på mötet och släpper allt i korridoren efteråt  
– Du skriver en “vänlig” kommentar i Slack som alla fattar är en pik  
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001** (llm_judge, weight: 40): [STUB] LLM judge disabled for W001
- **W005** (llm_judge, weight: 30): [STUB] LLM judge disabled for W005
- **W007** (llm_judge, weight: 30): [STUB] LLM judge disabled for W007

## Iteration History

### v1
- Compliance: 100
- Quality: 0
- Total: 60
- Failed: W001, W005, W007

### v2
- Compliance: 100
- Quality: 0
- Total: 60
- Failed: W001, W005, W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 0
- Total: 60
- Failed: W001, W005, W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 100
- Quality: 0
- Total: 60
- Failed: W001, W005, W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
