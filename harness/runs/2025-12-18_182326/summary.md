# Run Summary

**Run ID:** 2025-12-18_182326
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T17:23:26.122Z

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
- **W002** (regex, weight: 20): Found: "DM"
- **W003** (regex, weight: 20): Found: "– Du skriver ett "snällt" DM istället för att ringa.
– Du nickar i mötet men ventilerar i korridoren.
–"
- **W004** (regex, weight: 15): Found: "
Nej nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001** (llm_judge, weight: 40): [STUB] LLM judge disabled (no API key). Set OPENAI_API_KEY to enable.
- **W005** (llm_judge, weight: 30): [STUB] LLM judge disabled (no API key). Set OPENAI_API_KEY to enable.
- **W007** (llm_judge, weight: 30): [STUB] LLM judge disabled (no API key). Set OPENAI_API_KEY to enable.

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
- **Patch Applied:** hook
