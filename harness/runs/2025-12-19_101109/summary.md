# Run Summary

**Run ID:** 2025-12-19_101109
**Profile:** warm_provocation
**Timestamp:** 2025-12-19T09:11:32.434Z

## Scores

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Compliance | 100 | 95 | ✅ MET |
| Quality | 100 | 85 | ✅ MET |
| Total | 100 | - | - |
| Formula | 0.6 * compliance + 0.4 * quality | - | - |
| Run Status | SUCCESS | - | - |

## Check Results

### ✅ Passed (10)
- **G001** (heuristic, weight: 5): No cloning detected
- **W001a** (heuristic, weight: 15): Hook has direct address and contrast
- **W007b** (heuristic, weight: 10): No imperatives found, has self-involvement
- **W001** (llm_judge, weight: 40): Textens öppning avslöjar en känsla av självbedrägeri genom att beskriva hur vi undviker svåra samtal, vilket läsaren kan relatera till. Det finns en kontrast mellan det ytliga instämmandet och den inre önskan att ta upp det obekväma, vilket skapar friktion.
- **W005** (llm_judge, weight: 30): . Texten innehåller flera konkreta och visuella metaforer, som "vi bygger murar av tystnad" och "låter konflikterna växa som ogräs", som bär insikter om kommunikation och autenticitet. Dessa metaforer skapar igenkänning och stannar kvar hos läsaren.
- **W007** (llm_judge, weight: 30): Score: 75/100 (threshold: 70). Inkluderande språk med 'vi' skapar gemenskap. Avsändaren delar egen erfarenhet, vilket ger värme.
- **W002** (regex, weight: 20): Found: "möte"
- **W003** (regex, weight: 20): Found: "– En passivt aggressiv blinkning i Slack. 
– Viskar i korridoren men tystnar när vi samlas. 
–"
- **W004** (regex, weight: 15): Found: "
Nej."
- **W006** (regex, weight: 15): Found: "
/"

### ❌ Failed (0)

## Iteration History

### v1
- Compliance: 90
- Quality: 100
- Total: 94
- Failed: W007b

### v2
- Compliance: 100
- Quality: 100
- Total: 100
- **Patch Applied:** de-moralisera
  - Location: any
  - Lines changed: 1
