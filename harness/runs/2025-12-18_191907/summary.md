# Run Summary

**Run ID:** 2025-12-18_191907
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:19:33.387Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 80 | 95 | ❌ NOT MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 76 | - | - |

## Check Results

### ✅ Passed (8)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende de ogärna erkänner och använder direkt tilltal med tydlig kontrast mellan önskan (raka besked) och handling (gör allt för att undvika dem).
- **W007** (llm_judge, weight: 30): Score: 90/100 (threshold: 85). Tydlig spegelton med igenkännbara vardagsscener där läsaren känner sig avslöjad utan att bli utskälld; Humor och ironisk vändning ("Inte är det du, såklart") som avväpnar istället för att döma; Stark självinkludering i slutet ("den som fortfarande övar...") som minskar överlägsenhet och predikoton
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (2)
- **W005** (llm_judge, weight: 30): – Texten är träffsäker och konkret, men använder ingen tydlig, bärande metaforbild; formuleringar som “läcker ut i sidoblickar” ligger nära bildspråk men fungerar mer som beskrivande uttryck än som insiktsbärande metaforer.
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 65
- Quality: 100
- Total: 79
- Failed: W003, W004

### v2
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W005, W003
- **Patch Applied:** rytm
  - Location: after line 2 (fallback: no list found)
  - Lines changed: 4
  - Placement: Inserted rhythm block after line 2 (fallback: no list found)

### v3
- Compliance: 80
- Quality: 70
- Total: 76
- Failed: W005, W003
- **Patch Applied:** lista → metafor
