# Run Summary

**Run ID:** 2025-12-18_194734
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T18:48:26.621Z

## Models used
- **Generation:** gpt-5.1
- **Judge:** gpt-5.1
- **Patch:** gpt-5.1

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 70 | 85 | ❌ NOT MET |
| Total | 88 | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): Inga explicita fingerpekning-fraser hittade
- **W007c** (heuristic, weight: 0): Inga subtila föreläsarfraser hittade
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett självbedrägeri genom direkt tilltal och tydlig negation, vilket skapar friktion. Den avslöjar ett beteende läsaren har men sannolikt inte vill erkänna.
- **W005** (llm_judge, weight: 30): – Metaforen om att "träna men bara i huvudet på vägen till gymmet" är konkret, visuellt och bär en tydlig insikt om självbedrägeri kring konflikträdsla, på ett sätt som skapar stark igenkänning.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– Du biter ihop i mötet men släpper ut frustrationen vid kaffemaskinen  
– Du skriver ett syrligt "🙂" i Slack istället för att skriva vad som faktiskt skaver  
–"
- **W004** (regex, weight: 15): Found: "
Precis."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (1)
- **W007** (llm_judge, weight: 30): Score: 82/100 (median of 3 calls: [82, 82, 82]) (threshold: 85). Tydlig självinkludering och sårbarhet ("Jag har gjort det här själv", "fortfarande övar"); Använder humor och liknelser på ett avväpnande sätt; Direkt tilltal men mer speglande än dömande, bjuder in till reflektion

## Iteration History

### v1
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007

### v2
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v3
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3

### v4
- Compliance: 100
- Quality: 70
- Total: 88
- Failed: W007
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
