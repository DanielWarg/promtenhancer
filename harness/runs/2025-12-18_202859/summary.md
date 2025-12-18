# Run Summary

**Run ID:** 2025-12-18_202859
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T19:29:05.047Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 85 | 95 | ❌ NOT MET |
| Quality | 0 | 85 | ❌ NOT MET |
| Total | 51 | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W002** (regex, weight: 20): Found: "mail"
- **W003** (regex, weight: 20): Found: "– Du skriver om meningen tre gånger i mailet för att den inte ska låta "för hård"
– Du pratar av dig i korridoren men säger inget när alla sitter i mötet
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W001** (llm_judge, weight: 40): [STUB] LLM judge disabled for W001
- **W005** (llm_judge, weight: 30): [STUB] LLM judge disabled for W005
- **W007** (llm_judge, weight: 30): [STUB] LLM judge disabled for W007
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

## Iteration History

### v1
- Compliance: 85
- Quality: 0
- Total: 51
- Failed: W007c, W001, W005, W007, W004

### v2
- Compliance: 85
- Quality: 0
- Total: 51
- Failed: W001, W005, W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 85
- Quality: 0
- Total: 51
- Failed: W001, W005, W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 85
- Quality: 0
- Total: 51
- Failed: W001, W005, W007, W004
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
