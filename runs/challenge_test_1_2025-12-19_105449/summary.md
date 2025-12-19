# Run Summary

**Run ID:** challenge_test_1_2025-12-19_105449
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:54:49.902Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 60 | 95 | ❌ NOT MET |
| Quality | SKIPPED (LLM disabled) | 85 | ⏭️ SKIPPED |
| Total | 60 | - | - |
| Formula | compliance_only (quality skipped) | - | - |
| Run Status | OFFLINE_INCOMPLETE | - | - |

## Check Results

### ✅ Passed (4)
- **G001** (heuristic, weight: 5): No cloning detected
- **W002** (regex, weight: 20): Found: "DM"
- **W003** (regex, weight: 20): Found: "– Skriver de ett "snällt" DM istället för att ringa.
– Nickar de i mötet men ventilerar i korridoren.
–"
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (3)
- **W001a** (heuristic, weight: 15): First 3 sentences lack direct address (du/ni)
- **W007b** (heuristic, weight: 10): No self-involvement found (jag/vi). Text may feel preachy.
- **W004** (regex, weight: 15): Pattern not found: (^|\n)(Nej\.|Nej nej\.|Exakt\.|Precis\.|Eller\?)

### ⏭️ Skipped (3) - LLM disabled
- **W001** (llm_judge, weight: 40): [SKIPPED] LLM judge disabled for W001 (OPENAI_API_KEY not set)
- **W005** (llm_judge, weight: 30): [SKIPPED] LLM judge disabled for W005 (OPENAI_API_KEY not set)
- **W007** (llm_judge, weight: 30): [SKIPPED] LLM judge disabled for W007 (OPENAI_API_KEY not set)
