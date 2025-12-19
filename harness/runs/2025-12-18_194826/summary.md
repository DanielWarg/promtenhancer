# Run Summary

**Run ID:** 2025-12-18_194826
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:49:14.716Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 70 | 95 | ❌ NOT MET |
| Quality | 40 | 85 | ❌ NOT MET |
| Total | 58 | - | - |

## Check Results

### ✅ Passed (7)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende de inte vill erkänna och använder direkt tilltal samt tydlig kontrast mellan önskan (raka besked) och handling (ler och säger "det är lugnt").
- **W002** (regex, weight: 20): Found: "möte"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (4)
- **W007b** (heuristic, weight: 10): Hittade 1 fingerpekning: "du ska"
- **W005** (llm_judge, weight: 30): – Texten är stark och igenkännbar men innehåller ingen tydlig, konkret och visuell metafor som bär en egen insikt; formuleringar som "inslagen i trevlig ton och smileys" ligger nära bildspråk men fungerar mer som beskrivning än som bärande metafor.
- **W007** (llm_judge, weight: 30): Score: 82/100 (median of 3 calls: [82, 82, 82]) (threshold: 85). Tydlig självinkludering och vi-känsla ("Jag har gjort det här själv", beskriver egen övning); Använder humor och självdistans ("inte du såklart", signaturen); Speglande frågor istället för pekpinnar
- **W003** (regex, weight: 20): Pattern not found: –.*\n.*–.*\n.*–

## Iteration History

### v1
- Compliance: 55
- Quality: 70
- Total: 61
- Failed: W007b, W007, W003, W004

### v2
- Compliance: 70
- Quality: 40
- Total: 58
- Failed: W007b, W005, W007, W003
- **Patch Applied:** rytm
  - Location: after line 2 (fallback: no list found)
  - Lines changed: 4
  - Placement: Inserted rhythm block after line 2 (fallback: no list found)

### v3
- Compliance: 70
- Quality: 40
- Total: 58
- Failed: W007b, W005, W007, W003
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 70
- Quality: 40
- Total: 58
- Failed: W007b, W005, W007, W003
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
