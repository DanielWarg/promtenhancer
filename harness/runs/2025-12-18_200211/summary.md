# Run Summary

**Run ID:** 2025-12-18_200211
**Profile:** warm_provocation
**Timestamp:** 2025-12-18T19:02:50.289Z

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
- **W001** (llm_judge, weight: 40): – Öppningen konfronterar läsaren med ett beteende de inte vill erkänna och avslöjar självbedrägeriet i att kalla konflikträdsla för "smidigt" och "professionellt", vilket skapar tydlig friktion.
- **W005** (llm_judge, weight: 30): – Metaforen om "sömnlösa nätter och upprepade dusch-samtal där du säger allt du inte vågar säga högt" är konkret, visuellt och bär en tydlig insikt om inre konflikter som många känner igen och minns.
- **W007** (llm_judge, weight: 30): Score: 88/100 (median of 3 calls: [88, 88, 88]) (threshold: 85). Tydlig självinkludering: 'Jag har gjort det här själv', 'fortfarande övar'; Använder humor och självdistans ('Inte du, såklart', signaturen); Speglande frågor som bjuder in till reflektion snarare än pekar finger
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– nicka i mötet, ventilera i korridoren  
– skriva "bra poäng!" i chatten, rulla med ögonen efteråt  
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 100
- Quality: 40
- Total: 76
- Failed: W007c, W005, W007

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
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: ending + preachy removal
  - Lines changed: 3
