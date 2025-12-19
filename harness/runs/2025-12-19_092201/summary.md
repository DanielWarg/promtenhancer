# Run Summary

**Run ID:** 2025-12-19_092201
**Profile:** brev
**Timestamp:** 2025-12-19T08:22:01.955Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 70 | 95 | ❌ NOT MET |
| Quality | SKIPPED (LLM disabled) | 85 | ⏭️ SKIPPED |
| Total | 70 | - | - |
| Formula | compliance_only (quality skipped) | - | - |
| Run Status | OFFLINE_INCOMPLETE | - | - |

## Check Results

### ✅ Passed (6)
- **B002** (heuristic, weight: 18): Found 3 micro-details: soffan, magen, dator
- **B003** (heuristic, weight: 16): Line breaks: 10/8, Lonely sentences: 4/3
- **B007** (heuristic, weight: 6): Length: 807 chars (target: 800-1200)
- **G001** (heuristic, weight: 6): No cloning detected
- **B004** (regex, weight: 14): Found: "Jag har varit"
- **B006** (regex, weight: 10): No forbidden patterns found

### ❌ Failed (2)
- **B001a** (heuristic, weight: 12): Opening lacks clear emotional connection
- **B001** (regex, weight: 18): Pattern not found: (Du som|Till dig som|Du som är|Till dig)

### ⏭️ Skipped (2) - LLM disabled
- **B005** (llm_judge, weight: 55): [SKIPPED] LLM judge disabled for B005 (NO_NETWORK mode enabled (NO_NETWORK=1 or --no-network flag))
- **B008** (llm_judge, weight: 45): [SKIPPED] LLM judge disabled for B008 (NO_NETWORK mode enabled (NO_NETWORK=1 or --no-network flag))

## Iteration History

### v1
- Compliance: 70
- Quality: null
- Total: 70
- Failed: B001a, B001
