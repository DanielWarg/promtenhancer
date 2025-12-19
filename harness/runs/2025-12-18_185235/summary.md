# Run Summary

**Run ID:** 2025-12-18_185235
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:52:47.892Z

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

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du håller med i mötet, men suckar i korridoren efteråt  
– Du skriver ”🙂” i Slack när du egentligen menar ”det här är inte okej”  
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001** (llm_judge, weight: 40): LLM judge error: Unsupported parameter: 'max_tokens' is not supported with this model. Use 'max_completion_tokens' instead.
- **W005** (llm_judge, weight: 30): LLM judge error: Unsupported parameter: 'max_tokens' is not supported with this model. Use 'max_completion_tokens' instead.
- **W007** (llm_judge, weight: 30): LLM judge error: Unsupported parameter: 'max_tokens' is not supported with this model. Use 'max_completion_tokens' instead.

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
