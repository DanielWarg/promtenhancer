# Run Summary

**Run ID:** 2025-12-18_194914
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:50:14.110Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende som motsäger deras önskan om ärlighet och avslöjar ett självbedrägeri. Direkt tilltal och kontrasten mellan vilja och handling skapar tydlig friktion.
- **W005** (llm_judge, weight: 30): – Metaforen "som en konfliktversion av självtvättande skjortor" är konkret, visuellt och bär en tydlig insikt om önsketänkande kring att konflikter ska lösa sig själva, på ett sätt som känns originellt och minnesvärt.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [88, 88, 88]) (threshold: 85). Tydlig självinkludering och vi-känsla ("Jag har gjort det här själv"); Avväpnande humor och självdistans (t.ex. självtvättande skjortor, egen övning); Speglande frågor istället för pekpinnar
- **W002** (regex, weight: 20): Found: "Teams"
- **W003** (regex, weight: 20): Found: "– Du skriver om meningen tre gånger i Teams för att den inte ska låta "för hård"
– Du skämtar om problemet vid kaffemaskinen men är tyst i mötet
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 85
- Quality: 100
- Total: 91
- Failed: W007c, W004

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007c, W007
- **Patch Applied:** rytm
  - Location: after line 9 (end of list)
  - Lines changed: 3
  - Placement: Inserted rhythm block after list line 9 (list ended at line 9, inserted at 10)

### v3
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
